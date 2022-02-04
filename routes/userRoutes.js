const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// get curent
router.get('/user/info', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user)
})

// get user
router.get('/user/:uid', (req, res) => {
  User.findOne({ where: { id: req.params.uid } })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

// get usernames
router.get('/usernames', (req, res) => {
  User.findAll({})
    .then(users => {
      let usernames = []
      users.forEach(user => {
        usernames.push(user.username)
      });
      res.json(usernames)
    })
    .catch(err => res.json(err))
})

// Register User (Add new user)
router.post('/user/register', (req, res) => {
  let status = {
    name: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  }
  const { name, email, phone, username, password } = req.body
  const lowerCaseUsername = username.toLowerCase()


  // checks for non empty inputs
  name.length < 1 && (status.name = 'Please Enter your full name')
  email.length < 1 && (status.email = 'Please Enter a Valid Email')
  phone.length < 1 && (status.phone = 'Please Enter your phone number')
  username.length < 1 && (status.username = 'Please Enter a Username')
  password.length < 1 && (status.password = 'Please Enter a Password')

  // checks for valid email
  const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
  !emailValid && (status.email = 'Please Enter a Valid Email')

  let registeredUsers = {
    email: [],
    username: [],
    phone: []
  }

  // grab registered users data to cross reference for duplicates
  User.findAll({})
    .then(users => {
      users.forEach(user => {
        registeredUsers.email.push(user.email)
        registeredUsers.username.push(user.username)
        registeredUsers.phone.push(user.phone)
      })
    })
    .catch(err => console.log(err))

  // error status conditional
  if (status.name || status.username || status.password || status.email || status.phone) {
    res.json({
      status: status,
      message: 'Unable to Register'
    })
  } else {
    // registration
    User.register(new User({ name, email, phone, username: lowerCaseUsername }), req.body.password, err => {
      if (err) {
        registeredUsers.email.indexOf(email) !== -1 && (status.email = "Email is Already in Use")
        registeredUsers.username.indexOf(username) !== -1 && (status.username = "Username is Already in Use")
        res.json({
          status: status,
          message: 'Registration Unsuccessful',
          err
        })
        return
      }
      else {
        // login
        User.authenticate()(lowerCaseUsername, password, (err, user) => {
          if (err) { console.log(err) }
          if (user) {
            res.json({
              status: 200,
              login: true,
              message: 'User successfully logged in',
              user: jwt.sign({ id: user.id }, process.env.SECRET)
            })
          } else {
            res.json({
              status: 400,
              login: true,
              message: 'Login Failed',
              user: null
            })
          }

        })
      }
    })
  }


  // User.register(new User({ name, email, phone, username }), req.body.password, err => {
  //   if (err) { console.log(err) }
  //   User.authenticate()(req.body.username, req.body.password, (err, user) => {
  //     if (err) { console.log(err) }
  //     // webtoken (store to represent users login)
  //     res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  //   })
  // })
})

// Login user
router.post('/user/login', (req, res) => {
  const { login, password } = req.body
  // login is an email
  if (login.includes('@')) {
    // grab username from user using email
    User.findOne({ where: { email: login } })
      .then(({ username }) => {
        User.authenticate()(username, password, (err, user) => {
          if (err) { console.log(err) }
          // webtoken (store to represent users login)
          if (user) {
            res.json({
              status: 200,
              login: true,
              message: 'User successfully logged in',
              user: jwt.sign({ id: user.id }, process.env.SECRET)
            })
          } else {
            res.json({
              status: 200,
              login: false,
              message: 'Incorrect password',
              user: null
            })
          }
        })
      })
      .catch(err => res.json({
        status: 200,
        login: false,
        email: login,
        exist: false,
        message: `Email not registered`,
        user: null
      }))
  }
  // login is username
  else {
    User.authenticate()(login, password, (err, user) => {
      if (err) { console.log(err) }
      // webtoken (store to represent users login)
      if (user) {
        res.json({
          status: 200,
          login: true,
          message: 'User successfully logged in',
          user: jwt.sign({ id: user.id }, process.env.SECRET)
        })
      } else {
        res.json({
          status: 200,
          login: false,
          message: 'Incorrect password',
          user: null
        })
      }
    })
  }
})

// Update current user (needs update)
router.put('/user', passport.authenticate('jwt'), (req, res) => {
  User.update(req.body, { where: { id: req.user.id } })
    .then(() => res.sendStatus(200))
    .catch(err => res.json(err))
})

// Delete user
router.delete('/user', passport.authenticate('jwt'), (req, res) => {
  User.destroy({ where: { id: req.user.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})


module.exports = router
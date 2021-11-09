require('dotenv').config()
let PORT = 3001

const express = require('express')
const { join } = require('path')
// Database
const syncDB = require('./db')
const { User, Listing } = require('./models')
// Authentication / Strategy
const passport = require('passport')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const app = express()

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

// New stuff
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}

passport.use(new JWTStrategy(opts, (jwt_payload, cb) => {
  User.findOne({ id: jwt_payload, include: [Listing] })
    .then(user => cb(null, user))
    .catch(err => cb(err))
}))

app.use(require('./routes'))

// { force: true }
syncDB.sync({})
  .then(() => {
    console.log("server running")
    app.listen(process.env.PORT || PORT)
  })
  .catch(err => console.log(err))



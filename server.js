require('dotenv').config()
let PORT = 3001

const express = require('express')
const { join } = require('path')
const cors = require('cors')

const { User, Listing } = require('./models')
// Authentication / Strategy
const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const app = express()

app.use(cors())

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



let strategy = new JwtStrategy(opts, async (jwt_payload, cb) => {
  console.log(jwt_payload)
  User.findById(jwt_payload.id)
    .then(user => cb(null, user))
    .catch(err => cb(err))

})

passport.use(strategy)

app.use(require('./routes'))

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(join(__dirname, 'client', 'build', 'index.html'))
  })
}

// { force: true }
require('./db')
  .then(() => {
    console.log("server running")
    app.listen(process.env.PORT || PORT)
  })
  .catch(err => console.log(err))



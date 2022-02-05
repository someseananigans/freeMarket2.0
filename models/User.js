

const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
  isAdmin: Boolean,
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    trim: false
  },
  gender: String,
  username: {
    type: String,
    index: {
      unique: true,
      sparse: true
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    unique: true,
    trim: true
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    zipCode: Number,
    country: String
  },
  profile: String,
  summart: String,
  languages: String,
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'listing'
  }],
  listing: [{
    type: Schema.Types.ObjectId,
    ref: 'listing'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }],
  createdAt: { type: Date, default: Date.now }
})

UserSchema.plugin(require('passport-local-mongoose'), { usernameField: 'email' })

module.exports = model('user', UserSchema)
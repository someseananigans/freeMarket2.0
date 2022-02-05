

const { model, Schema } = require('mongoose')

const ListingSchema = new Schema({
  isArchive: Boolean,
  title: {
    type: String,
    required: true
  },
  description: String,
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'category'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  favorited: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: { type: Date, default: Date.now }
})

module.exports = model('listing', ListingSchema)
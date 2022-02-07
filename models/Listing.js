

const { model, Schema } = require('mongoose')

const ListingSchema = new Schema({
  isArchive: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  description: String,
  hashTag: [String],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  brand: String,
  condition: {
    type: String,
    required: true
  },
  color: String,
  shippingZip: Number,
  shippingFee: String,
  price: Number,
  sellingFee: Number,
  deliveryCharge: Number,
  earning: Number,
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
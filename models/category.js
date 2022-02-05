const { model, Schema } = require('mongoose')

const CategorySchema = new Schema({
  title: String,
  listings: [{
    type: Schema.Types.ObjectId,
    ref: 'listing'
  }],
})

module.exports = model('category', CategorySchema)
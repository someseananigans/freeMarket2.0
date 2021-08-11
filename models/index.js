const User = require('./User.js')
const Listing = require('./Listing.js')

// establish connection between tables
User.hasMany(Listing, { foreignKey: 'uid' })
Listing.belongsTo(User, { foreignKey: 'uid' })

module.exports = { User, Listing }
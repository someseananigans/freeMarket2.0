const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Listing extends Model { }

// Create listings Table with columns
Listing.init({
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  category: DataTypes.STRING,
  image: DataTypes.STRING,
}, { sequelize, modelName: 'listings' })

module.exports = Listing
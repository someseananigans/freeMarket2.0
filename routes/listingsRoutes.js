const router = require('express').Router()
const { Listing } = require('../models')
const { User } = require('../models')
const passport = require('passport')

// Get all listings (No authentication necessary)
router.get('/listings', (req, res) => {
  Listing.findAll({
    include: [
      {
        model: User,
        attributes: ['name', 'email', 'phone']
      }
    ]
  })
    .then(listings => res.json(listings))
    .catch(err => res.json(listings))
})

// Get all listings (No authentication necessary)
router.get('/listings/:position', (req, res) => {
  Listing.findAll({
    include: [
      {
        model: User,
        attributes: ['name', 'email', 'phone']
      }
    ]
  })
    .then(listings => {
      let position = req.params.position
      let limit = 10
      let splitListings = listings.slice((position - 1) * limit, position * limit)
      res.json({
        total: listings.length,
        // subtotal: `${splitListings.length} out of ${listings.length}`,
        subtotal: splitListings.length,
        listings: splitListings
      })
    })
    .catch(err => res.json(listings))
})

// ------> All listings under user can be grabbed via the user data itself <------

// search bar get via title input
router.get('/listings/search/:title', (req, res) => {
  Listing.findAll({
    include: [
      {
        model: User,
        attributes: ['name', 'email', 'phone']
      }
    ]
  })
    .then(listing => {
      let searchResults = []
      for (let i = 0; i < listing.length; i++) {
        if (listing[i].title.includes(req.params.title)) {
          searchResults.push(listing[i])
        }
      }
      searchResults.sort((a, b) => (a.createdAt - b.createdAt))
      res.json(searchResults)
    })
    .catch(listing => res.json(err))
})

// Get listings by category
router.get('/listings/category/:category', (req, res) => {
  Listing.findAll({
    where: { category: req.params.category },
    include: { model: User, attributes: ['name', 'email', 'phone'] }

  })
    .then(listing => res.json(listing))
    .catch(listing => res.json(err))
})
// Get listing
router.get('/listings/id/:id', (req, res) => {
  Listing.findOne({
    where: { id: req.params.id },
    include: { model: User, attributes: ['name', 'email', 'phone'] }
  })
    .then(listing => res.json(listing))
    .catch(listing => res.json(err))
})

// // Get listings by title
// router.get('/listings/:title', (req, res) => {
//   Listing.findAll({ where: { title: req.params.title } })
//     .then(listing => res.json(listing))
//     .catch(listing => res.json(err))
// })

// // Get listings by tag
// router.get('/listings/tagsearch/:tag', (req, res) => {
//   Listing.findAll({})
//     .then(listing => {
//       let searchResults = []
//       for (let i = 0; i < listing.length; i++) {
//         if (listing[i].tag.includes(req.params.tag)) {
//           searchResults.push(listing[i])
//         }
//       }
//       searchResults.sort((a, b) => (a.createdAt - b.createdAt))
//       res.json(searchResults)
//     })
//     .catch(listing => res.json(err))
// })

// // Get user listings
// router.get('/listings/user', passport.authenticate('jwt'), (req, res) => {
//   Listing.findAll({ where: { uid: req.body.user.id } })
//     .then(listings => res.json(listings))
//     .catch(err => res.json(err))
// })

// Add new listing
router.post('/listings/', passport.authenticate('jwt'), (req, res) => {
  let lowerCaseTitle = req.body.title.toLowerCase()
  Listing.create({
    title: lowerCaseTitle,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    uid: req.user.id
  })
    .then(listing => res.json(listing))
    .catch(err => res.json(err))
})

// Update a listing (list unique id)
router.put('/listings/:id', passport.authenticate('jwt'), (req, res) => {
  Listing.update(req.body, { where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => res.json(err))
})

// Delete a listing (list unique id)
router.delete('/listings/:id', passport.authenticate('jwt'), (req, res) => {
  Listing.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => res.json(err))
})

module.exports = router
const router = require('express').Router()
const { join } = require('path')

router.get('/myProfile/', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'myProfile.html'))
})

router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'login.html'))
})

router.get('/createListing', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'createListing.html'))
})

router.get('/myListings', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'myListings.html'))
})

router.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'))
})


module.exports = router

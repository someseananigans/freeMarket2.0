const router = require('express').Router()

router.use('/api', require('./listingsRoutes.js'))
router.use('/api', require('./userRoutes.js'))
router.use('/seed', require('./seedRoutes.js'))
router.use('/', require('./viewRoutes.js'))

module.exports = router

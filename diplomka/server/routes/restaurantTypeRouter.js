const Router = require('express')
const router = new Router()
const restaurantTypeController = require('../controllers/restaurantTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), restaurantTypeController.create)
router.get('/:id', restaurantTypeController.getOne)
router.get('/', restaurantTypeController.getAll)
router.get('/alltype/:id', restaurantTypeController.getAllTypes)

module.exports = router

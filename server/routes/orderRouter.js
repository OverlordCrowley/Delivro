const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', orderController.create)
router.post('/update', orderController.update)
router.get('/', orderController.getAllOrdersByUserId)

module.exports = router

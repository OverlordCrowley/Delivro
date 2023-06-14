const Router = require('express')
const router = new Router()
const emailController = require('../controllers/emailController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', emailController.create)

module.exports = router

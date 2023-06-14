const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, basketController.create)
router.post('/user', authMiddleware, basketController.getAll)

module.exports = router

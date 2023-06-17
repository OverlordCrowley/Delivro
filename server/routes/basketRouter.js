const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, basketController.create)
router.post('/user', basketController.getAll)
router.delete('/', basketController.deleteOne)
router.put('/', basketController.updateOne)

module.exports = router

const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const restaurantRouter = require('./restaurantRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./restaurantTypeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/restaurant', restaurantRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)

module.exports = router

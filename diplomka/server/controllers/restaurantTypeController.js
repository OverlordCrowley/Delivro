const {RestaurantType, Device, FoodType} = require('../models/models')
const ApiError = require('../error/ApiError');

class RestaurantTypeController{
    async create(req, res) {
        const {name, restaurantId} = req.body
        const restaurantType = await RestaurantType.create({name, restaurantId})
        return res.json(restaurantType)
    }

    async getOne(req, res) {
        const {id} = req.params
        const restaurantType = await RestaurantType.findAll(
            {
                where: {restaurantId: id},
            },
        )
        return res.json(restaurantType)
    }

    async getAll(req, res) {
        const restaurantType = await RestaurantType.findAll()
        return res.json(restaurantType)
    }

    async getAllTypes(req, res) {
        const {id} = req.params
        const serializedData = await Device.findAll({
            where: { restaurantId: id },
            include: [
                {
                    model: FoodType,
                    attributes: ['id', 'name'],
                },
            ],
        });

        const serializedDevices = serializedData.map(device => ({
            id: device.id,
            name: device.name,
            composition: device.composition,
            price: device.price,
            weight: device.weight,
            discount_price: device.discount_price,
            img: device.img,
            foodType: {
                id: device.food_type.id,
                name: device.food_type.name,
            },
        }));

        return res.json(serializedDevices)
    }

}

module.exports = new RestaurantTypeController()

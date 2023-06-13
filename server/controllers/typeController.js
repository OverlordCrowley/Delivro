const {FoodType} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const foodType = await FoodType.create({name})
        return res.json(foodType)
    }

    async getAll(req, res) {
        const foodType = await FoodType.findAll()
        return res.json(foodType)
    }

}

module.exports = new TypeController()

const {Restaurant, Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const uuid = require("uuid");
const path = require("path");
const {Op} = require("sequelize");

class RestaurantController {
    async create(req, res) {
        const {name} = req.body
        const {time} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const restaurant = await Restaurant.create({name, time, img: fileName});
        return res.json(restaurant)
    }

    async getAll(req, res) {
        if(req.query.name){
            const restaurant = await Restaurant.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.name}%`
                    }
                }
            });
            return res.json(restaurant);
        }
        const restaurant = await Restaurant.findAll()
        return res.json(restaurant)
    }

    async getOne(req, res) {
        const {id} = req.params
        const restaurant = await Restaurant.findOne(
            {
                where: {id},
            },
        )
        return res.json(restaurant)
    }


}

module.exports = new RestaurantController()

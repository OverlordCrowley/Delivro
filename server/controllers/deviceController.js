const {Device, BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError');
const uuid = require("uuid");
const path = require("path");


class DeviceController {
    async create(req, res, next) {
        try {
            let {name, composition, weight, price, discount_price, restaurantId, foodTypeId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))


            const device = await Device.create({name, composition,  price, weight, discount_price, restaurantId, foodTypeId, img: fileName});

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {

        let { userId } = req.query;
        let id = userId || 1;
        let devices;

            devices = await Device.findAll({ where: { restaurantId: id } });


        return res.json(devices || []);

    }

}

module.exports = new DeviceController()

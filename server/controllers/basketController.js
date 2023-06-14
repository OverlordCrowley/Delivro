const uuid = require('uuid')
const path = require('path');
const {Basket, BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController {
    async create(req, res, next) {
        try {
            let {userId, deviceId} = req.body
            const basket = await Basket.findOne({ where: {'userId': userId}});
            const basketDevices = await BasketDevice.findOne({ where: {'basketId': basket.id, 'deviceId': deviceId}});

            if(basketDevices){
                const basketDevice = await BasketDevice.update({'basketId': basket.id, 'deviceId': deviceId}, {'count': 1});
                return res.json(basketDevice)
            }
            else{
                const basketDevice = await BasketDevice.create({'basketId': basket.id, 'deviceId': deviceId, 'count': 1});
                return res.json(basketDevice)
            }

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {

        let { userId } = req.query;
        let basket, basketDevice;
        if (userId) {
            basket = await Basket.findOne({ where: { userId: userId } });
            basketDevice = await BasketDevice.findAll({ where: { basketId: basket.id } });
        }

        return res.json(basketDevice || []);

    }

}

module.exports = new BasketController()

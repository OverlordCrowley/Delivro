const uuid = require('uuid')
const path = require('path');
const {Basket, BasketDevice, Device} = require('../models/models')
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

    async getAll(req, res, next) {

        let { userId } = req.body;

        try {
            const basket = await Basket.findByPk(userId, {
                include: {
                    model: BasketDevice,
                    include: Device,
                },
            });
            if (!basket) {
                return 'Корзина не найдена';
            }


            const basketContents = await basket.basket_devices.map((basketDevice) => {
                const { id, count, device } = basketDevice;
                const { name, composition, price, weight, discount_price, img } = device;
                return {
                    id,
                    count,
                    device: {
                        name,
                        composition,
                        price,
                        weight,
                        discount_price,
                        img,
                    },
                };
            });

            return res.json(basketContents || [])

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async deleteOne(req, res, next) {

        try {
            let { userId, deviceId } = req.body;
            const basket = await Basket.findByPk(userId, {
                include: {
                    model: BasketDevice,
                    include: Device,
                },
            });

            let basket1 = basket.basket_devices.map(async (basketDevice) => {
                if (basketDevice.id === deviceId) {
                    await BasketDevice.destroy({
                        where: {
                            id: basketDevice.id,
                            basketId: basket.id,
                        },
                    });
                }
            });

            return res.json([]);
        } catch (error) {
            next(error);
        }

    }



    async updateOne(req, res, next) {

        let { userId, deviceId, count } = req.body;

            const basket = await Basket.findByPk(userId, {
                include: {
                    model: BasketDevice,
                    include: Device,
                },
            });


            const basketContents = basket.basket_devices.map((basketDevice) => {
                if(basketDevice.id === deviceId){
                    BasketDevice.update({ 'count': count }, { where: { id: basketDevice.id, 'basketId': basket.id } })
                }

            });

            return res.json([])

    }
}

module.exports = new BasketController()

const {Order, Basket, BasketDevice, Device, User} = require('../models/models')
const ApiError = require('../error/ApiError');
const nodemailer = require('nodemailer');
const directTransport = require('nodemailer-direct-transport');
const {Op} = require("sequelize");

class OrderController {
    async create(req, res, next) {
        try {
            const { userId, phone } = req.body;

            const basket = await Basket.findByPk(userId, {
                include: {
                    model: BasketDevice,
                    include: Device,
                },
            });

            // await BasketDevice.update(
            //     { finished: 1 },
            //     { where: { basketId: basket.id } }
            // );

            const order = await Order.create({
                phone: phone,
                basketId: basket.id,
            });


            return res.json(order);
        } catch (error) {
            next(error);
        }
    }

    async getAllOrdersByUserId(req, res, next) {
        try {
            const { userId } = req.params;

            const orders = await Order.findAll({
                where: {
                    userId: userId,
                },
                include: {
                    model: Basket,
                    include: {
                        model: BasketDevice,
                        where: {
                            finished: { [Op.ne]: 1 },
                        },
                    },
                },
            });

            return res.json(orders);
        } catch (error) {
            next(error);
        }
    }





    async update(req, res, next) {
        try {
            const { userId, text } = req.body;

            const basket = await Basket.findByPk(userId, {
                include: {
                    model: BasketDevice,
                    include: Device,
                },
            });

            if (text === 'В процессе') {
                await BasketDevice.update(
                    { finished: 1 },
                    { where: { basketId: basket.id } }
                );
            } else if (text === 'Закончен') {
                await BasketDevice.destroy({ where: { basketId: basket.id } });
                await Order.destroy({ where: { basketId: basket.id } });
            } else {
                return res.status(400).json({ error: 'Некорректное значение текста' });
            }

            return res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }



}

module.exports = new OrderController();


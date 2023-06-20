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


            const order = await Order.create({
                phone: phone,
                basketId: basket.id,
                finished: 0
            });


            return res.json(order);
        } catch (error) {
            next(error);
        }
    }

    async getAllOrdersByUserId(req, res, next) {
        try {
            const orders = await Order.findAll({

            });
            return res.json(orders);
        } catch (error) {
            next(error);
        }
    }







    async update(req, res, next) {
        const { orderId, text } = req.body;

        try {
            const order = await Order.findByPk(orderId);

            if (!order) {
                throw new Error('Order not found');
            }

            const basket = await Basket.findOne({ where: { 'id': order.basketId } });

            if (!basket) {
                throw new Error('Basket not found');
            }

            if (text === 'Не обработан') {
                return res.json({ message: 'Order status unchanged' });
            } else if (text === 'В процессе') {
                order.finished = 1;
            } else if (text === 'Завершен') {
                const basketId = basket.id;

                // Удаление связанных BasketDevice
                await BasketDevice.destroy({ where: { basketId } });
                await Order.destroy({ where: { basketId } });

                // Удаление заказа
                await order.destroy();

                return res.json({ message: 'Order deleted successfully' });
            } else {
                throw new Error('Invalid text value');
            }

            await order.save();

            return res.json({ message: 'Order updated successfully' });
        } catch (error) {
            next(error);
        }
    }









}

module.exports = new OrderController();


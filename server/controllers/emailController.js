const {Email} = require('../models/models')
const ApiError = require('../error/ApiError');
const nodemailer = require('nodemailer');
const directTransport = require('nodemailer-direct-transport');

class EmailController {
    async create(req, res, next) {
        let { email, message } = req.body;

        try {

            const mail = await Email.create({ email, message });

            console.log(email, message)
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jagerduque@gmail.com',
                    pass: 'sgtgunmakuzrjsxe',
                },
            });

            let result = await transporter.sendMail({
                from: 'jagerduque@gmail.com',
                to: email,
                subject: 'Письмо о сотрудничестве',
                text: 'Письмо о сотрудничестве',
                html: '<p>Здравствуйте, наш менеджер в скором времени свяжется с вами</p>',
            });

            console.log('Письмо успешно отправлено');

            return res.json(mail || []);
        } catch (error) {
            console.error('Ошибка при создании письма', error);
            next(error);
        }
    }


}

module.exports = new EmailController()

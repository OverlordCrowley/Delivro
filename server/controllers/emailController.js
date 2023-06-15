const {Email} = require('../models/models')
const ApiError = require('../error/ApiError');
const nodemailer = require('nodemailer');
const directTransport = require('nodemailer-direct-transport');

class EmailController {
    async create(req, res, next) {
        let {email, message} = req.body
        const mail = await Email.create({'email': email, 'message': message});

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'delivrodelivro87@gmail.com',
                pass: 'fghfgh45h5HEHeh90imweh@',
            },
        });

        let result = await transporter.sendMail({
            from: 'delivrodelivro87@gmail.com',
            to: 'email',
            subject: 'Письмо о сотрудничестве',
            text: 'Письмо о сотрудничестве',
            html:
                '<p>Здравствуйте, наш менеджер в скором времени свяжется с вами</p>',
        });



        return(mail || []);



    }


}

module.exports = new EmailController()

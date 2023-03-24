const nodemailer = require('nodemailer');
require('dotenv').config();

const emailsController = {};

emailsController.contactEmail = async (req, res) => {
    try {
        const { name, subject, email, message } = req.body;

        const transporter = await nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const info = await transporter.sendMail({
            from: '"MENSAJE - " < ' +  process.env.MAIL_USERNAME + '>',
            to: process.env.MAIL_USERNAME,
            subject: subject,
            html: `
            <h1>${subject} - PETICIÓN DESDE LA WEB</h1>

            <h2>Nombre: ${name}</h2>
            <h2>Email: ${email}</h2>
            <h2>Mensaje: ${message}</h2>
        `
        });

        res.status(200).send({
            message: 'Email enviado correctamente.'
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error
        })
    }
}

module.exports = emailsController;
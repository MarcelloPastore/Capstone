const express = require('express');
const nodemailer = require('nodemailer');
const email = express.Router();


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'oran.schuppe@ethereal.email',
        pass: 'c1K6Z7YArxhcAe13hg'
    }
});

email.post('/sendEmail', async (req, res) => {
    const { subject, text } = req.body;
    const mailOptions = {
        from: 'noreply@GamerBlog.com',
        to: 'oran.schuppe@ethereal.email',
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        }
        console.log('email sent');
        res.status(200).send(info);
    })
})


module.exports = email;
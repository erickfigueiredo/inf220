require('dotenv').config();
const Message = require('../utils/Message');
const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');

const transporter = nodemailer.createTransport({
    host: 'mail.sm-sites.com',
    port: 465,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
    }
});

let mailOptions = {
    from: 'savio.miranda@sm-sites.com'
};

let readHTML = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) throw err;
        else callback(null, html);
    });
};

class Email {

    static confirmAccount(name, email, token) {
        mailOptions = {
            to: email,
            from: 'savio.miranda@sm-sites.com',
            subject: 'Confirmação de Conta - iStones'
        }

        readHTML(__dirname + '/../email/confirmation.html', function (err, html) {

            try {
                let template = handlebars.compile(html);
                let replacements = {
                    nome: name,
                    link: 'http://localhost:3001/confirmar-conta?token=' + token
                };
                mailOptions['html'] = template(replacements);
                transporter.sendMail(mailOptions, function (error, response) {
                    if (error) callback(error);
                    else Message.info('Email enviado!');
                });
            } catch (error) {
                Message.warning(error);
            }
        });
    }

    static recoverPassword(name, email, token) {
        mailOptions = {
            to: email,
            from: 'savio.miranda@sm-sites.com',
            subject: 'Recuperação de Senha - iStones'
        }

        readHTML(__dirname + '/../email/password-reset.html', function (err, html) {

            try {
                let template = handlebars.compile(html);
                let replacements = {
                    nome: name,
                    link: 'http://localhost:3001/nova-senha?token=' + token
                };
                mailOptions['html'] = template(replacements);
                transporter.sendMail(mailOptions, function (error, response) {
                    if (error) callback(error);
                    else Message.info('Email enviado!');
                });
            } catch (error) {
                Message.warning(error);
            }
        });
    }

    static advertiseSale(data) {
        try {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) Message.warning(error);
                else res.send('Enviou: ' + info);
            });
        } catch (error) {
            Message.warning(error);
        }
    }

    static advertiseInvoice(data) {
        try {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) Message.warning(error);
                else res.send('Enviou: ' + info);
            });
        } catch (error) {
            Message.warning(error);
        }
    }
}

module.exports = Email;
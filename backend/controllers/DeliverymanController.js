const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class DeliverymanController {
    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const client = await User.index('D', page);
        return client.success ? res.send(client) : res.status(404).send(client);
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });

        const client = await User.findOne(id, 'D');
        return client.success ? res.send(client) : res.status(404).send(client);
    }

    static async create(req, res) {
        const form = req.body;

        const existEmail = User.findBy('email', { email: form.email });
        if (existEmail.success)
            return res.status(409).send({ success: false, message: 'Email já cadastrado!' });

        const salt = bcrypt.genSaltSync(saltRounds);
        form.password = bcrypt.hashSync(form.password, salt);

        form.type = 'D';

        const client = await User.create(form, true);
        return client.success ? res.send(client) : res.status(400).send(client);
    }

    static async update(req, res) {
        const form = req.body;

        const existClient = User.findOne(id, 'D');
        if (existClient.success) {

            const existEmail = User.findBy('email', { email: form.email });
            if (existEmail.success)
                return res.status(409).send({ success: false, message: 'Email já cadastrado!' });


            const client = await User.update(form);
            return client.success ? res.send(client) : res, status(400).send(client);
        } else return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            res.status(400).send({ success: false, message: 'Id inválido!' });

        const existClient = User.findOne(id, 'D');
        if (existClient.success) {
            const result = await User.delete(id);

            return result.success ? res.send(result) : res.status(400).send(result);
        } else return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
    }
};

module.exports = DeliverymanController;

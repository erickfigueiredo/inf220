const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class DeliverymanController {
    static async index(req, res) {
        let page = req.query.page;

        const deliveryman = await User.findAll('D');
        return deliveryman.success ? res.send(deliveryman) : res.status(404).send(deliveryman);
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });

        const deliveryman = await User.findOne(id, 'D');
        return deliveryman.success ? res.send(deliveryman) : res.status(404).send(deliveryman);
    }

    static async create(req, res) {
        const form = req.body;

        const existEmail = User.findBy('email', { email: form.email });
        if (existEmail.success)
            return res.status(409).send({ success: false, message: 'Email já cadastrado!' });

        const salt = bcrypt.genSaltSync(saltRounds);
        form.password = bcrypt.hashSync(form.password, salt);

        form.type = 'D';

        const deliveryman = await User.create(form, true);
        console.log(deliveryman)
        return deliveryman.success ? res.send(deliveryman) : res.status(400).send(deliveryman);
    }

    static async update(req, res) {
        const form = req.body;
        const id = form.id_deliveryman;

        console.log(id)
        const existDeliveryman = await User.findOne(id, 'D');

        if (existDeliveryman.success) {

            if (form.email) {
                const existEmail = User.findBy({ email: form.email });
                if (existEmail.success)
                    return res.status(409).send({ success: false, message: 'Email já cadastrado!' });
            }

            const deliveryman = await User.update(form);
            return deliveryman.success ? res.send(deliveryman) : res.status(400).send(deliveryman);
        } else return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            res.status(400).send({ success: false, message: 'Id inválido!' });

        const existDeliveryman = User.findOne(id, 'D');
        if (existDeliveryman.success) {
            const result = await User.delete(id);

            return result.success ? res.send(result) : res.status(400).send(result);
        } else return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
    }

    static async getAvailableToOrder() {
        const result = await User.hasDeliverymanAvailable();

        return result.success ? res.send(result) : res.status(400).send(result);
    }
};

module.exports = DeliverymanController;

const PaymentMethod = require('../models/PaymentMethod');

class PaymentMethodController {
    static async index(req, res) {
        const id = req.params.id_client;
        const payment = await PaymentMethod.findAll(id);
        return discounts.success ? res.send(discounts) : res.status(404).send(discounts);
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' })

        const payment = await PaymentMethod.findOne(id);
        return payment.success ? res.send(payment) : res.status(404).send(payment);
    }

    static async create(req, res) {
        const { name, type, number, valid_date, id_user } = req.body;

        const user = await User.findOne(id_user);
        if (!user.success)
            return res.status(400).send({ success: false, message: 'Usuário inexistente!' });

        const result = await PaymentMethod.create({name, type, number, valid_date, id_user});
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' })

        const payment = await Payment.findOne(id);

        if (payment.success && payment.payment.is_deleted || !payment.success)
            return res.status(400).send({ success: false, message: 'Cartão não existe!' });

        const result = await PaymentMethod.delete(id);
        return result.success ? res.send(result) : res.status(404).send(result);
    }
};

module.exports = PaymentMethodController;
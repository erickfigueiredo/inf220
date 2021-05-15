const User = require('../models/User');

class ClientController {
    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const user = await User.index('C', page);
        return user.success ? res.send(user) : res.status(404).send(user);
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });

        const user = await User.findOne(id, 'C');
        return user.success ? res.send(user) : res.status(404).send(user);
    }

    static async create(req, res) {
        const form = req.body;

        const existEmail = User.findBy('email');
        if (existEmail.success)
            return res.status(409).send({success: false, message: 'Email já cadastrado!'});

        
        const today = new Date();

        datetime = new Date();
        let hundred = datetime.setFullYear(datetime.getFullYear() - 100);
        hundred = new Date(hundred);
        hundred = hundred.toISOString().slice(0, 10);





    }

    static async update(req, res) {

    }

    static async delete(req, res) {

    }
};

module.exports = ClientController;

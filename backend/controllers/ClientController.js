const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);
class ClientController {
    static async index(req, res) {
        const client = await User.findAll('C');
        return client.success ? res.send(client) : res.status(404).send(client);
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });

        const client = await User.findOne(id, 'C');
        return client.success ? res.send(client) : res.status(404).send(client);
    }

    static async create(req, res) {
        const form = req.body;

        const existEmail = User.findBy({ email: form.email });
        if (existEmail.success)
            return res.status(409).send({ success: false, message: 'Email já cadastrado!' });

        const salt = bcrypt.genSaltSync(saltRounds);
        form.password = bcrypt.hashSync(form.password, salt);

        form.type = 'C';

        const client = await User.create(form);
        return client.success ? res.send(client) : res.status(400).send(client);
    }

    static async update(req, res) {
        const form = req.body;
        const id = req.body.id_client;

        const existClient = await User.findOne(id, 'C');
        if (existClient.success) {

            const existEmail = User.findBy('email', { email: form.email });
            if (existEmail.success)
                return res.status(409).send({ success: false, message: 'Email já cadastrado!' });


            const client = await User.update(form);
            console.log(client)
            return client.success ? res.send(client) : res.status(400).send(client);
        } else return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            res.status(400).send({ success: false, message: 'Id inválido!' });

        const existClient = await User.findOne(id, 'C');
        if (existClient.success) {
            const result = await User.delete(id);
            return result.success ? res.send(result) : res.status(400).send(result);
        } else return res.status(404).send({ success: false, message: 'Usuário inexistente!' });
    }

    static async login(req, res) {
        const { email, password } = req.body;

        const existClient = Client.findBy({ email });
        if (existClient.success) {
            bcrypt.compare(password, existClient.password, (err, res) => {
                if (err) return res.status(400).send({ success: false, message: 'E-mail ou senha não conferem!' });

                return res.send(
                    {
                        success: true,
                        client: {
                            id: existClient.id,
                            name: existClient.name,
                            email: existClient.email,
                            type: existClient.type,
                            idAddress: existClient.id_address,
                            idWallet: existClient.id_wallet
                        }
                    }
                )
            });
        }
        return res.status(404).send({ success: false, message: 'Cliente inexistente!' });
    }
};

module.exports = ClientController;

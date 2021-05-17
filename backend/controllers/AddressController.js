const Address = require('../models/Address');
const User = require('../models/User');
const Market = require('../models/Market');

class AddressController {
    static async index(req, res) {

        const id_user = req.params.id_user;

        if (isNaN(parseInt(id_user)))
            return res.status(400).send({ success: false, message: 'Id inválido' });


        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const address = await Address.findAll(id_user, page);
        return address.success ? res.send(address) : res.status(404).send(address);
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido' });


        const address = await Address.findOne(id);
        return address.success ? res.send(address) : res.status(404).send(address);
    }

    static async create(req, res) {
        const { id_user, alias, street, neigh, complement, num, zipcode, city, state, country, latitude, longitude, type } = req.body;

        const data = {
            alias,
            street,
            neigh,
            complement,
            num,
            zipcode,
            city,
            state,
            country,
            latitude,
            longitude,
            id_user,
            type
        }

        let user;
        if (type == 'M') {
            user = await Market.findOne(id_user);
            if (!user.success) return res.status(400).send({ success: false, message: 'Id inválido!' });
        } else {
            user = await User.findOne(id_user);
            if (!user.success) return res.status(400).send({ success: false, message: 'Id inválido!' });
        }

        if (type == 'M') {
            if (user.id_address)
                return res.status(409).send({ success: false, message: 'Mercado já possui um endereço cadastrado!' });
        } else {
            const existAlias = await Address.findByUserAlias(id_user, alias);
            if (existAlias.address && Object.keys(existAlias.address).length)
                return res.status(409).send({ success: false, message: 'Apelido já cadastrado!' });
        }

        const result = await Address.create(data, type);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {

        const { id, alias, street, neigh, complement, num, zipcode, city, state, country, latitude, longitude } = req.body;

        const form = {
            id,
            alias,
            street,
            neigh,
            complement,
            num,
            zipcode,
            city,
            state,
            country,
            latitude,
            longitude
        };

        const address = await Address.findOne(form.id);

        if (address.success && Object.keys(address.address).length) {
            const result = await Address.update(form);
            return result.success ? res.send(result) : res.status(400).send(result);
        } else {
            return res.status(404).send({ success: false, message: 'Não foi possível encontrar o endereço!' });
        }
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido' });


        const address = await Address.findOne(id);
        if ((!address.success || (address.success && !Object.keys(address.address).length)) || (address.success && Object.keys(address.address).length && address.address.is_deleted))
            return res.status(404).send({ success: false, message: 'Endereço inexistente' });


        const result = await Address.delete(id);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = AddressController;

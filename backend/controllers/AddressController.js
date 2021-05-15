const Address = require('../models/Address');
const User = require('../models/User');

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
        const schema = AddressSchema.createValidate();
        const { error } = schema.validate(req.body);

        if (error) 
            return res.status(400).send({ success: false, message: error.details[0].message });
            

        const { id_user, alias } = req.body;

        const user = await User.findOne(id_user);
        if (!user.success) 
            return res.status(404).send(user);
        

        if (user.user.type == 'V') {
            const address = await Address.findAll(id_user, 1);

            if (!address.success || (address.success && Object.keys(address.address.data).length))
                return res.status(409).send({ success: false, message: 'Vendedor já possui um endereço cadastrado!' });
                
        } else {
            const existAlias = await Address.findByUserAlias(id_user, alias);
            if (existAlias.address && Object.keys(existAlias.address).length) 
                return res.status(409).send({ success: false, message: 'Apelido já cadastrado!' });
        }

        const result = await Address.create(req.body, user.user.type);

        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const schema = AddressSchema.updateValidate();
        const { error } = schema.validate(req.body);

        if (error) 
            return res.status(400).send({ success: false, message: error.details[0].message });
    

        const { id, alias, street, neigh, complement, num, zipcode, city, state, country } = req.body;

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
            country
        };

        const address = await Address.findOne(form.id);
        
        if (address.success && Object.keys(address.address).length) {

            const toUpdate = {};

            if (form.alias && address.alias != form.alias) toUpdate.alias = form.alias;

            if (form.street && address.street != form.street) toUpdate.street = form.street;

            if (form.neigh && address.neigh != form.neigh) toUpdate.neigh = form.neigh;

            if (form.num && address.num != form.num) toUpdate.num = form.num

            if (address.complement != form.complement) toUpdate.complement = toUpdate.complement;

            if (form.city && address.city != form.city) toUpdate.city = form.city;

            if (form.state && address.state != form.state) toUpdate.state = form.state;

            if (form.country && address.country != form.country) toUpdate.country = form.country;

            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await Address.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(address);
        }else {
            return res.status(404).send({success: false, message: 'Não foi possível encontrar o endereço!'});
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

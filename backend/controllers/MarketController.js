const Market = require('../models/Market');
const MarletSchema = require('../schemas/AddressSchema');
const User = require('../models/User');

class MarketController {
    static async index(req, res) {
        
        const id_market = req.params.id_market;

        if (isNaN(parseInt(id_market)))
            return res.status(400).send({ success: false, message: 'Id inválido' });
            

        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const markets = await Market.findAll(id_market, page);
        return markets.success ? res.send(markets) : res.status(404).send(markets);
    }

    static async show(req, res) {
        const id_market = req.params.id_market;

        if (isNaN(parseInt(id_market))) 
            return res.status(400).send({ success: false, message: 'Id inválido' });
            
        const market = await Market.findOne(id_market);
        return market.success ? res.send(market) : res.status(404).send(market);
    }

    static async create(req, res) {
        const schema = MarketSchema.createValidate();
        const { error } = schema.validate(req.body);

        if (error) 
            return res.status(400).send({ success: false, message: error.details[0].message });
            

        const { business_name, cnpj, email, phone, password } = req.body;

        let market = {
            business_name,
            cnpj, 
            email,
            phone,
            password
        }

        if (!CNPJ.validate(cnpj))
        return res.status(400).send({ success: false, message: 'CNPJ deve ser válido!' });

        const existEmail = await Market.findByEmail(email);
        if (existEmail.market && Object.keys(existEmail.market).length)
            return res.status(409).send({ success: false, message: 'Email já cadastrado!' });

        const existCnpj = await Market.findByCnpj(cnpj);
        if (existCnpj.market && Object.keys(existCnpj.market).length)
            return res.status(409).send({ success: false, message: 'CNPJ já cadastrado!' });

        const existTel = await Market.findByTel(phone);
        if (existTel.market && Object.keys(existTel.market).length)
            return res.status(409).send({ success: false, message: 'Telefone já cadastrado!' });

        const salt = bcrypt.genSaltSync(saltRounds);
        market.password = bcrypt.hashSync(password, salt);

        const result = await Market.create(market);
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async update(req, res) {
        const schema = AddressSchema.updateValidate();
        const { error } = schema.validate(req.body);

        if (error) 
            return res.status(400).send({ success: false, message: error.details[0].message });
    

        const { id, business_name, email, phone } = req.body;

        const form = {
            id,
            business_name, 
            email,
            phone
        };

        const market = await Market.findOne(form.id);
        
        if (market.success && Object.keys(market.market).length) {

            const toUpdate = {};

            if (form.business_name && market.business_name != form.business_name) toUpdate.business_name = form.business_name;
            if (form.email && market.email != form.email) toUpdate.email = form.email;
            if (form.phone && market.phone != form.phone) toUpdate.phone = form.phone
            if (Object.keys(toUpdate).length) {
                toUpdate.id = form.id;
                const result = await Market.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(market);
        }else {
            return res.status(404).send({success: false, message: 'Não foi possível encontrar o mercado!'});
        } 
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido' });
            

        const market = await Market.findOne(id);
        if ((!market.success || (market.success && !Object.keys(market.market).length)) || (market.success && Object.keys(address.address).length && market.market.is_deleted)) 
            return res.status(404).send({ success: false, message: 'Mercado inexistente' });


        const result = await Market.delete(id);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = MarketController;

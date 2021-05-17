const Market = require('../models/Market');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class MarketController {
    static async index(req, res) {
        const markets = await Market.findAll();
        return markets.success ? res.send(markets) : res.status(404).send(markets);
    }

    static async show(req, res) {
        const id_market = req.params.id;

        if (isNaN(parseInt(id_market)))
            return res.status(400).send({ success: false, message: 'Id inválido' });

        const market = await Market.findOne(id_market);
        return market.success ? res.send(market) : res.status(404).send(market);
    }

    static async create(req, res) {
        const { alias, street, neigh, complement, num, zipcode, city, state, country, latitude, longitude, business_name, cnpj, email, phone, password } = req.body;

        let market = {
            business_name,
            cnpj,
            email,
            phone,
            password
        }

        let address = {
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
        }

        const existEmail = await Market.findByEmail(email);
        if (existEmail.market && Object.keys(existEmail.market).length)
            return res.status(409).send({ success: false, message: 'Email já cadastrado!' });


        const existTel = await Market.findByTel(phone);
        if (existTel.market && Object.keys(existTel.market).length)
            return res.status(409).send({ success: false, message: 'Telefone já cadastrado!' });

        const salt = bcrypt.genSaltSync(saltRounds);
        market.password = bcrypt.hashSync(password, salt);

        const result = await Market.create(market, address);
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async update(req, res) {
        const { id_market, business_name, email, phone, name } = req.body;

        const form = {
            id_market,
            business_name,
            email,
            phone,
            name
        };

        const market = await Market.findOne(form.id_market);
        console.log(market)
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
        } else {
            return res.status(404).send({ success: false, message: 'Não foi possível encontrar o mercado!' });
        }
    }
}

module.exports = MarketController;

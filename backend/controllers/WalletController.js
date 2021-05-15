const Wallet = require('../models/Wallet');
const WalletSchema = require('../schemas/WalletSchema');
const User = require('../models/User');

class WalletController {
    static async index(req, res) {
        const wallets = await Wallet.findAll(id_market, page);
        return wallets.success ? res.send(wallets) : res.status(404).send(wallets);
    }

    static async show(req, res) {
        const id_wallet = req.params.id_wallet;

        if (isNaN(parseInt(id_wallet))) 
            return res.status(400).send({ success: false, message: 'Id inválido' });
            
        const wallet = await Wallet.findOne(id_wallet);
        return wallet.success ? res.send(wallet) : res.status(404).send(wallet);
    }

    static async update(req, res) {
        const schema = WalletSchema.updateValidate();
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

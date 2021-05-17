const Wallet = require('../models/Wallet');

class WalletController {
    static async index(req, res) {
        const wallets = await Wallet.findAll();
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
        const { id, pix_key } = req.body;

        const wallet = await Wallet.update(id, {pix_key});
        return wallet.success ? res.send(wallet) : res.status(400).send(wallet);
    }

    static async incrementTotal(req, res) {
        const {id, value} = req.body;

        const wallet = await Wallet.changeTotalInWallet(id, value);
        return wallet.success ? res.send(wallet) : res.status(400).send(wallet);
    }
}

module.exports = WalletController;
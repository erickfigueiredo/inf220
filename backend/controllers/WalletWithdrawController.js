const WalletWithdraw = require('../models/WalletWithdraw');
const Wallet = require('../models/Wallet');
const User = require('../models/User');
const Market = require('../models/Market');

class WalletWithdrawController {
    static async index(req, res) {
        const id_user = req.params.id_user

        const user = await User.findOne(id_user);
        const market = await Market.findOne(id_user);

        if(!user.success && !market.success) return res.status(400).send(user);
        let id_wallet;


        user.user ? id_wallet = user.user.id_wallet : id_wallet = market.market.id_wallet;

        const withdraws = await WalletWithdraw.findAll(id_wallet);
        return withdraws.success ? res.send(withdraws) : res.status(404).send(withdraws);
    }

    static async show(req, res) {
        const id_withdraw = req.params.id_withdraw;

        if (isNaN(parseInt(id_withdraw))) 
            return res.status(400).send({ success: false, message: 'Id inválido' });
            
        const withdraw = await WalletWithdraw.findOne(id_withdraw);
        return withdraw.success ? res.send(withdraw) : res.status(404).send(withdraw);
    }

    static async create(req, res){
        const { id_wallet, value } = req.body;

        const wallet = await Wallet.findOne(id_wallet);
        if(!wallet.success) return res.status(400).send(wallet);
        if(wallet.wallet.value - value < 0) return res.status(400).send({success: false, message: "Saldo não suficiente!"});
        
        const result = await WalletWithdraw.create({value, total: wallet.wallet.value - value}, id_wallet);
        if(result.success) return res.send(result)
        else res.status(400).send(result);
    }
}

module.exports = WalletWithdrawController;
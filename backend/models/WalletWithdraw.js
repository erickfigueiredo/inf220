const knex = require("../database/knex");
const Message = require('../utils/Message');

class WalletWithdraw {
    static async findOne(id) {
        try {
            const withdraw = await knex.select("*").from('tb_wallet_withdraw').where({ id })
            return withdraw[0] ? { success: true, wallet: withdraw[0] } : { success: false, message: 'Não foi possível recuperar o saque / Saque inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o saque!' };
        }
    }

    static async findAll() {
        try {
            const withdraw = await knex.select("*").from('tb_wallet_withdraw')
            return withdraw[0] ? { success: true, withdraw: withdraw[0] } : { success: false, message: 'Não foi possível recuperar os saques / Saques inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os saques!' };
        }
    }

    static async create(data, id_wallet) {
        try {
            return await knex.transaction(async trx => {
                await trx('tb_wallet').update({total: data.total}).where({ id: id_wallet }).returning('*');
                let withdraw = await trx('tb_wallet_withdraw').insert({id_wallet, value: data.value}).returning('*');
                return withdraw[0] ? { success: true, withdraw: withdraw[0] } : { success: false, message: 'Não foi possível criar o saque!' };
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Saque não criado!' };
        }
    }
}

module.exports = WalletWithdraw;
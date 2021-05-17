const knex = require("../database/knex");
const Message = require('../utils/Message');

class Wallet {
    static async findOne(id) {
        try {
            const wallet = await knex.select("*").from('tb_wallet').where({ id })
            return wallet[0] ? { success: true, wallet: wallet[0] } : { success: false, message: 'Não foi possível recuperar as carteiras / Carteiras inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar as carteiras!' };
        }
    }

    static async findAll() {
        try {
            const wallet = await knex.select("*").from('tb_wallet')
            return wallet[0] ? { success: true, wallet } : { success: false, message: 'Não foi possível recuperar as carteiras / Carteiras inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar as carteiras!' };
        }
    }

    static async update(id, data) {
        try {
            let wallet = await knex.table('tb_wallet').update(data).where({ id }).returning('*');
            return wallet[0] ? { success: true, wallet: wallet[0] } : { success: false, message: 'Não foi possível atualizar a carteira!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Carteira não atualizada!' };
        }
    }

    static async changeTotalInWallet(id, value) {
        try {
            let wallet = await knex.table('tb_wallet').update({ total: knex.raw('?? + ' + value, ['total']) }).where({ id }).returning('*');
            return wallet[0] ? { success: true, wallet: wallet[0] } : { success: false, message: 'Não foi possível atualizar o total da carteira!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Carteira não atualizada!' };
        }
    }
}

module.exports = Wallet;
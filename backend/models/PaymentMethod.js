const knex = require('../database/knex');
const Message = require('../utils/Message');

class PaymentMethodController {
    static async findOne(id) {
        try {
            const payment = await knex.select('*')
                .from('tb_payment_method')
                .where({ id, 'is_deleted': false });

            return payment[0] ? { success: true, discount: payment[0] } : { success: false, message: 'Não foi possível recuperar o cartão / Cartão inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o cartão!' };
        }
    }

    static async findAll(id) {
        try {
            const payment = await knex.select('*')
                .from('tb_payment_method')
                .where({ 'is_deleted': false, id_user: id })

            return payment[0] ? { success: true, payment } : { success: false, message: 'Não foi possível recuperar o cartão / Cartão inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o cartão!' };
        }
    }

    static async create(data) {
        try {
            return await knex.transaction(async trx => {
                const payment = await trx('tb_payment_method').insert(data, '*');

                return payment[0] ? { success: true, payment: payment[0] } : { success: false, message: 'Não foi possível recuperar o cartão / Cartão inexistentes!'};
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir o cartão!' };
        }
    }

    static async delete(id) {
        try {

            return await knex.transaction(async trx => {
                await trx('tb_payment_method').update({ is_deleted: true })
                    .where({ id })

                return { success: true, message: 'Desconto deletado!' };
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Desconto não deletado!' };
        }
    }

};

module.exports = PaymentMethodController;
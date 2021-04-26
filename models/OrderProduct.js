const Message = require('../utils/Message');
const knex = require('../database/knex');

class OrderProduct {
    static async findOne(id) {
        try {
            const order = await knex.select('*')
                .where({ id, "is_deleted": false })
                .from('tb_order_product');

            return order[0] ? { success: true, order_products: order[0] } : { success: false, message: 'Não foi possível recuperar os dados da compra / Compra inexistente' };
        } catch (error) {
            Message.warning(error);
            return { success: false, messagem: 'Houve um erro ao recuperar os dados da compra!' };
        }
    }

    static async findAll(id_order) {
        try {
            const order = await knex.select('*')
                .where({ id_order, "is_deleted": false })
                .from('tb_order_product');

            return order ? { success: true, order_products: order } : { success: false, message: 'Não foi possível recuperar os dados da compra / Compra inexistente' };
        } catch (error) {
            Message.warning(error);
            return { success: false, messagem: 'Houve um erro ao recuperar os dados da compra!' };
        }
    }
};

module.exports = OrderProduct;

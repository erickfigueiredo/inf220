const knex = require('../database/knex');
const Message = require('../utils/Message');

class OrderProduct {

    static async findAll(id_order) {
        try {
            const order_products = await knex.select('*')
                .from('tb_order_product')
                .where({ id_order });

            return order_products[0] ? { success: true, order_products } : { success: false, message: 'Falha ao recuperar os produtos da compra!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os produtos da compra' };
        }
    }
}

module.exports = OrderProduct;

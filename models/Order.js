const knex = require('../database/knex');
const Message = require('../utils/Message');
const OrderProduct = require('../models/OrderProduct');

class Order {

    async findOne(id) {
        try {
            const order = await knex.select('*')
                .from('tb_order')
                .where({ id, "is_deleted": false });

            return order[0] ? { success: true, order: order[0] } : { success: false, message: 'Não foi possível recuperar os dados da compra / Compra inexistente' };
        } catch (error) {
            Message.warning(error);
            return { success: false, messagem: 'Houve um erro ao recuperar os dados da compra!' };
        }
    }

    async findAll(id_client, page) {
        try {
            const order = await knex.select('*')
                .from('tb_order')
                .where({ id_client, "is_deleted": false })
                .orderBy('created_at', 'DESC')
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return order.data[0] ? { success: true, order } : { success: false, message: 'Não foi possível recuperar os dados da compra / Compra inexistente' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar a compra!' };
        }
    }

    async create(data) {
        try {
            const order = await knex.insert(data).table('tb_order').returning('*');

            return order[0] ? { success: true, order: order[0] } : { success: false, message: 'Não foi possível cadastrar a  compra!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha na compra' }
        }
    }

    async update(data) {

        try {
            const id = data.id;

            delete data['id'];

            await knex.update(data)
                .table('tb_order')
                .where({ id, "is_deleted": false });

            return { success: true, message: 'Compra atualizada!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Compra não atualizada!' };
        }
    }

    async delete(id) {
        try {
            await knex.update({ is_deleted: true })
                .table('tb_order')
                .where({ id, "is_deleted": false });

            return { success: true, message: 'Compra deletada!' }
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Compra não deletada' };
        }
    }
}

module.exports = new Order();
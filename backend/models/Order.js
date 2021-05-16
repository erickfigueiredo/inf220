const knex = require('../database/knex');
const Message = require('../utils/Message');

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

    async create(data, id_products, quantity, description) {
        try {
            return await knex.transaction(async trx => {

                let products = [];
                let discounts = [];
                let total_order = 0;

                for (let i = 0; i < id_products.length; i++) {
                    let product = await trx('tb_product').select('*');
                    let discount = await trx('tb_discount').select("*");
                    if (product[0].quantity > quantity[i]) throw new Error('Quantidade maior que a disponível');
                    products.push(product[0]);
                    discounts.push(discount[0] || {});

                    let value = product[0].price * quantity[i];
                    discount[0].value ? value *= discount[0].value : undefined;
                    total_order += value;
                }

                data.status = 'P';
                data.order_total = total_order;

                let order = await trx('tb_order').insert(data).returning('*');
                const id_order = order[0].id;
                for (let i = 0; i < id_products.length; i++) {
                    await trx('tb_product').update({ "quantity": products[i].quantity - quantity[i] }).where({ id: id_products[i] });
                    let discount = await trx('tb_discount').sleect("*");

                    let data = {
                        price: products[i].price,
                        discount: discount[0] * products[i].price,
                        quantity: quantity[i],
                        description,
                        id_product: id_products[i],
                        id_order //TODO
                    }
                    let product_order = await trx('tb_order_product').insert(data);
                }
                return { success: true, order: order[0] };
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Compra não criada!' };
        }
    }

    async update(data, id) {
        try {
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
const knex = require('../database/knex');
const Message = require('../utils/Message');

class Order {

    static async findOne(id) {
        try {
            const order = await knex.select('*')
                .from('tb_order')
                .where({ id });

            return order[0] ? { success: true, order: order[0] } : { success: false, message: 'Não foi possível recuperar os dados da compra / Compra inexistente' };
        } catch (error) {
            Message.warning(error);
            return { success: false, messagem: 'Houve um erro ao recuperar os dados da compra!' };
        }
    }

    static async findAll(id_client) {
        try {
            const order = await knex.select('*')
                .from('tb_order')
                .where({ id_client })
                .orderBy('created_at', 'DESC');

            return order[0] ? { success: true, order } : { success: false, message: 'Não foi possível recuperar os dados da compra / Compra inexistente' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar a compra!' };
        }
    }

    static async listOrders(id, type) {
        try {
            let complement;

            if (type == 'C') complement = 'id_client';
            else complement = 'id_deliveryman';

            const order = await knex.raw('SELECT FROM tb_order WHERE tb_order.' + complement + ' = ' + id);

            return order[0] ? { success: true, order } : { success: false, message: 'Falha ao recuperar a lista de compras em que o usuário esta presente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, messagem: 'Houve um erro ao recuperar as compras desse usuário!' };
        }
    }

    static async rankByMostNumOrder() {
        try {
            const order = await knex.raw('select tb_user.id, tb_user.name, COUNT(tb_order.id_client) as qtd_orders from tb_user join tb_order on tb_user.id = tb_order.id_client group by tb_user.id order by qtd_orders limit 10');

            return order[0] ? { success: true, order } : { success: false, message: 'Não foi possível recuperar o ranking de consumidores!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o ranking de compras!' }
        }
    }


    static async create(data, id_products, quantity, description) {
        try {
            return await knex.transaction(async trx => {

                let products = [];
                let discounts = [];
                let total_order = 0;

                for (let i = 0; i < id_products.length; i++) {
                    let product = await trx('tb_product').select('*').where({ id: id_products[i] });
                    let discount = await trx('tb_discount').select("*").where({ id: product[0].id_discount });

                    if (product[0].quantity > quantity[i]) throw new Error('Quantidade indisponível do produto desejado!');

                    products.push(product[0]);
                    discounts.push(discount[0] || {});

                    let value = product[0].price * quantity[i];
                    discount[0].value ? value *= discount[0].value : undefined;
                    total_order += value;
                }

                data.status = 'P';
                data.order_total = total_order;

                const order = await trx('tb_order').insert(data).returning('*');
                const id_order = order[0].id;

                for (let i = 0; i < id_products.length; i++) {
                    await trx('tb_product').update({ "quantity": products[i].quantity - quantity[i] }).where({ id: id_products[i] });
                    let discount = await trx('tb_discount').select("*").where({ id: id_products[i].id_discount });

                    let data = {
                        price: products[i].price,
                        discount: discount[0] * products[i].price,
                        quantity: quantity[i],
                        description,
                        id_product: id_products[i],
                        id_order
                    }

                    await trx('tb_order_product').insert(data);
                }
                return { success: true, order: order[0] };
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Erro ao efetuar a compra!' };
        }
    }

    static async update(data, id) {
        try {
            await knex.update(data)
                .table('tb_order')
                .where({ id });

            return { success: true, message: 'Compra atualizada!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Compra não atualizada!' };
        }
    }
}

module.exports = Order;

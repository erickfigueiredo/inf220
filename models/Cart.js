const knex = require('../database/knex');
const Message = require('../utils/Message');

class Cart {

    static async findOne(id) {
        try {
            const cart = await knex.select(['tb_cart.id AS id_item', 'tb_salesman.business_name', 'tb_product.id AS id_product', 'tb_cart.quantity AS cart_quantity', 'tb_product.title', 'tb_product.price', 'tb_product.quantity AS product_quantity', 'tb_product.url_image', 'tb_product.key_image', 'tb_product.id_material', 'tb_product.id_salesman', 'tb_product.id_discount'])
                .from('tb_cart')
                .where({ 'tb_cart.id': id })
                .orderBy('tb_cart.id')
                .innerJoin('tb_product', 'tb_product.id', 'tb_cart.id_product')
                .innerJoin('tb_salesman', 'tb_salesman.id', 'tb_product.id_salesman');

            return cart[0] ? { success: true, item: cart[0] } : { success: false, message: 'Não foi possível recuperar o item / Item inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o item!' };
        }
    }

    static async findCartByUser(id_user, page) {
        try {
            const cart = await knex('tb_cart')
                .select(['tb_cart.id AS id_item', 'tb_product.id AS id_product', 'tb_salesman.business_name', 'tb_cart.quantity AS cart_quantity', 'tb_product.title', 'tb_product.price', 'tb_product.quantity AS product_quantity', 'tb_product.url_image', 'tb_product.key_image', 'tb_product.id_material', 'tb_product.id_salesman', 'tb_product.id_discount'])
                .where({ 'tb_cart.id_user': id_user })
                .orderBy('tb_cart.id')
                .innerJoin('tb_product', 'tb_product.id', 'tb_cart.id_product')
                .innerJoin('tb_salesman', 'tb_salesman.id', 'tb_product.id_salesman')
                .paginate({ perPage: 5, currentPage: page, isLengthAware: true });
            console.log('\n', cart)
            return cart.data ? { success: true, cart } : { success: false, message: 'Não foi possível recuperar o item / Itens inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o carrinho!' };
        }
    }

    static async findCartQuantity(id_user) {
        try {
            const cart = await knex('tb_cart')
                .sum({ total: 'quantity' })
                .where({ 'id_user': id_user });
            return cart[0] ? { success: true, items: parseInt(cart[0].total) } : { success: false, message: 'Não foi possível recuperar a quantidade do carrinho / Itens inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o carrinho!' };
        }
    }

    static async create(data) {
        try {
            const item = await knex.insert(data).table('tb_cart').returning('*');

            return item[0] ? { success: true, item: item[0] } : { success: false, message: 'Não foi possível cadastrar o item!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir item!' };
        }
    }

    static async updateByIdItem(id_item, data) {
        try {
            const item = await knex.update(data)
                .table('tb_cart')
                .where({ id: id_item })
                .returning('*');

            return item[0] ? { success: true, item: item[0] } : { success: false, message: 'Falha ao atulizar item! ' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Item não atualizado!' };
        }
    }

    static async updateByIdUserAndIdProduct(id_user, id_product, quantity) {
        try {
            const item = await knex.update({ quantity })
                .table('tb_cart')
                .where({ id_user })
                .andWhere({ id_product })
                .returning('*');

            return item[0] ? { success: true, item: item[0] } : { success: false, message: 'Falha ao atulizar item! ' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Item não atualizado!' };
        }
    }

    static async delete(id) {
        try {
            await knex.delete()
                .table('tb_cart')
                .where({ id });

            return { success: true, message: 'Item deletado!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Item não deletado!' };
        }
    }
}

module.exports = Cart;
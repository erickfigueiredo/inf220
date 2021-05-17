const knex = require('../database/knex');
const Message = require('../utils/Message');

class Product {
    static async findOne(id) {
        try {
            const product = await knex.select('*').from('tb_product').where({ id });
            return product[0] ? { success: true, product: product[0] } : { success: false, message: 'Não foi possível recuperar o produto / Produto inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o produto!' };
        }
    }

    static async findAllMarketProducts(id_market, page) {
        try {
            const product = await knex.select('*')
                .from('tb_product')
                .where({ id_market })
                .paginate({ perPage: 20, currentPage: page });

            return product.data[0] ? { success: true, product } : { success: false, message: 'Não foi possível recuperar o produto / Produto inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o produto!' };
        }
    }

    static async searchProduct(filter, page) {

    }

    static async create(data) {
        try {
            const product = await knex('tb_product').insert(data, '*');
            return product[0] ? { success: true, product: product[0] } : { success: true, message: 'Não foi possível criar o produto!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir produto!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id_product;
            delete data['id_product'];

            const product = await knex('tb_product').update(data, '*').where({ id });
            return product[0] ? { success: true, product: product[0] } : { success: true, message: 'Não foi possível atualizar o produto!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao atualizar produto!' };
        }
    }

    static async delete(id) {
        try {
            const product = await knex('tb_product').update({ is_deleted: true }, '*').where({ id });
            return product[0] ? { success: true, product: product[0] } : { success: true, message: 'Não foi possível deletar o produto!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao deletar produto!' };
        }
    }
}

module.exports = Product;

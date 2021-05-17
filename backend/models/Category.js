const knex = require('../database/knex');
const Message = require('../utils/Message');

class Category {
    static async findOne(id) {
        try {
            const category = await knex.select('*').from('tb_category').where({ id });
            return category[0] ? { success: true, category: category[0] } : { success: false, message: 'Não foi possível recuperar a categoria / Categoria inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o produto!' };
        }
    }

    static async findName(name) {
        try {
            const category = await knex.select('*').from('tb_category').where({ name });
            return category[0] ? { success: true, product: product[0] } : { success: false, message: 'Não foi possível recuperar a categoria / Categoria inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o produto!' };
        }
    }

    static async findAll() {
        try {
            const category = await knex.select('*').from('tb_category')

            return category[0] ? { success: true, category } : { success: false, message: 'Não foi possível recuperar as categorias / Categorias inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar as categorias!' };
        }
    }

    static async create(data) {
        try {
            const category = await knex('tb_category').insert(data, '*');
            return category[0] ? { success: true, category: category[0] } : { success: false, message: 'Não foi possível criar a categoria!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir categoria!' };
        }
    }
}

module.exports = Category;

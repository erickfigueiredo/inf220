const knex = require('../database/knex');
const Message = require('../utils/Message');

class Discount {
    static async findOne(id) {
        try {
            const discount = await knex.select('*')
                .from('tb_product_discount')
                .where({ id, 'is_deleted': false });

            return discount[0] ? { success: true, discount: discount[0] } : { success: false, message: 'Não foi possível recuperar o desconto / Desconto inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o desconto!' };
        }
    }

    static async findAll(page) {
        try {
            const discount = await knex.select('*')
                .from('tb_product_discount')
                .where({ 'is_deleted': false })
                .paginate({
                    perPage: 20,
                    currentPage: page
                });
            return discount.data[0] ? { success: true, discount } : { success: false, message: 'Não foi possível recuperar os descontos / Descontos inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os descontos!' };
        }
    }

    static async create(data, id_product) {
        try {
            return await knex.transaction(async trx => {
                const discount = await trx('tb_product_discount').insert(data, '*');
                await trx('tb_product').update({ id_discount: discount[0].id }).where({ id: id_product });

                return discount[0] ? { success: true, discount: discount[0] } : { success: true, discount: discount[0] };
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir desconto!' };
        }
    }

    static async update(id, data) {
        try {
            return await knex.transaction(async trx => {
                const discount = await trx('tb_product_discount')
                    .update(data)
                    .where({ id })
                    .returning('*');

                return discount[0] ? { success: true, discount: discount[0] } : { success: false, message: 'Falha ao atualizar desconto!' }
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Desconto não atualizado!' };
        }
    }

    static async delete(id) {
        try {

            return await knex.transaction(async trx => {
                await trx('tb_product_discount').update({ is_deleted: true })
                    .where({ id })
                await trx('tb_product').update({ id_discount: null })
                    .where({ id_discount: id })

                return { success: true, message: 'Desconto deletado!' };
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Desconto não deletado!' };
        }
    }

};

module.exports = Discount;
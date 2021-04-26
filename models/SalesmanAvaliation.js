const knex = require('../database/knex');
const Message = require('../utils/Message');

class SalesmanAvaliation {
    static async findOne(id) {
        try {
            const avaliation = await knex.select('*')
                .from('tb_salesman_avaliation')
                .where({ id, is_deleted: false });

            return avaliation[0] ? { success: true, avaliation: avaliation[0] } : { success: false, messaage: 'Não foi possível recuperar a avaliação / Avaliação inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar a avaliação!' };
        }
    }

    static async findByOrder(id_order) {
        try {
            const avaliation = await knex.select('*')
                .from('tb_salesman_avaliation')
                .where({ id_order, is_deleted: false });

            return avaliation[0] ? { success: true, avaliation: avaliation[0] } : { success: false, messaage: 'Não foi possível recuperar a avaliação / Avaliação inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar a avaliação!' };
        }
    }

    static async findAll(id_salesman, page) {
        try {
            const avaliation = await knex.select('*')
                .from('tb_salesman_avaliation')
                .where({ id_salesman, is_deleted: false })
                .orderBy('created_at', 'DESC')
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return avaliation.data[0] ? { success: true, avaliation } : { success: false, message: 'Não foi possível recuperar as avaliações / Avaliações inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar as avaliações!' };
        }
    }

    static async create(data) {
        try {
            const avaliation = await knex.insert(data).table('tb_salesman_avaliation').returning('*');

            return avaliation[0] ? { success: true, avaliation: avaliation[0] } : { success: false, message: 'Não foi possível cadastrar a avaliação!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir avaliação!' }
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const avaliation = await knex.table('tb_salesman_avaliation')
                .update(data)
                .where({ id }).returning('*');

            return { success: true, avaliation: avaliation[0]};
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao atualizar avaliação!' };
        }
    }

    static async delete(id) {
        try {
            await knex.update({ is_deleted: true })
                .where({ id })
                .table('tb_salesman_avaliation');

            return { success: true, message: 'Avaliação deletada!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Avaliação não deletada!' };
        }
    }
};

module.exports = SalesmanAvaliation;

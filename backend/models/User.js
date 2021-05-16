const knex = require('../data/knex');
const Message = require('../utils/Message');

class User {
    static async findOne(id, type) {
        try {
            const user = await knex.select('*')
                .from('tb_user')
                .where({ id, type, "is_deleted": false });

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Não foi possível recuperar o usuário / Usuário inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o usuário!' };
        }
    }

    static async findBy(value) {
        try {
            const user = await knex.select('*')
                .from('tb_user')
                .where(value);


            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Não foi possível recuperar o usuário / Usuário inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os usuários!' };
        }
    }

    static async findAll(type, page) {
        try {
            const user = await knex.select('*')
                .from('tb_user')
                .where({ type, "is_deleted": false })
                .orderBy('id')
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return user.data[0] ? { success: true, user } : { success: false, message: 'Não foi possível recuperar os usuários / Não existem usuários!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os usuários!' };
        }
    }

    static async create(data, isDeliveryman = false) {
        try {
            if (isDeliveryman) {
                return await knex.transaction(async trx => {

                    const idWallet = await trx('tb_wallet')
                        .insert({total: 0}, id);

                    data.id_wallet = idWallet;
                    const result = await trx('tb_user')
                        .insert(data)
                        .returning('*');
                });
            }

            const user = await knex('tb_user')
                .insert(data)
                .returning('*');

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Falha ao inserir usuário!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao inserir usuário!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const user = await knex('tb_user')
                .update(data)
                .where(id)
                .returning('*');

            return user[0] ? { success: true, user: user[0] } : { success: false, message: 'Falha ao inserir usuário!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao atualizar usuário!' };
        }
    }

    static async delete(id) {
        try {
            const isActive = await knex('tb_user')
                .update({ is_deleted: true })
                .where('id')
                .returning('is_deleted');

            return !isActive ? { success: true, message: 'Usuário deletado com sucesso!' } : { success: false, message: 'Houve uma falha ao deletar o usuário!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao deletar o usuário!' };
        }
    }
}

module.exports = User;
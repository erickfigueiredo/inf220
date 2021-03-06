const knex = require('../database/knex');
const Message = require('../utils/Message');

class User {

    static async findOne(id) {
        try {
            const user = await knex.select('*')
                .from('tb_user')
                .where({ id, "is_deleted": false });

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

    static async findAll(type) {
        try {
            const user = await knex.select('*')
                .from('tb_user')
                .where({ type, "is_deleted": false })
                .orderBy('id')

            return user[0] ? { success: true, user } : { success: false, message: 'Não foi possível recuperar os usuários / Não existem usuários!' };
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
                        .insert({ total: 0, pix_key: data.pix_key }).returning('id');

                    data.id_wallet = idWallet[0];
                    delete data.pix_key
                    const result = await trx('tb_user')
                        .insert(data)
                        .returning('*');

                    return { success: true, user: result[0] };
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
            const id = data.id_client || data.id_deliveryman;
            delete data['id_client'];
            delete data['id_deliveryman'];

            const user = await knex('tb_user')
                .update(data)
                .where({ id })
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
                .where({ id })
                .returning('is_deleted');
            console.log(isActive)
            return isActive[0] ? { success: true, message: 'Usuário deletado com sucesso!' } : { success: false, message: 'Houve uma falha ao deletar o usuário!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao deletar o usuário!' };
        }
    }

    static async hasDeliverymanAvailable() {
        try {
            let subquery = await knex.select('id_deliveryman')
                .from('tb_order')
                .where({ status: 'P' });

            const ids = subquery.map(obj => obj.id_deliveryman);

            let available;
            if (ids) {
                available = await knex.select('id')
                    .from('tb_user')
                    .where({ type: 'D' }).andWhere('id', 'not in', ids);
            } else {
                available = await knex.select('id')
                    .from('tb_user')
                    .where({ type: 'D' });
            }

            if(available.length) return { success: true, deliveryman: available[0].id };
            
            return { success: false, message: 'Não há entregadores disponíveis!' };

        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao verificar os entregadores disponíveis' };
        }
    }
}

module.exports = User;
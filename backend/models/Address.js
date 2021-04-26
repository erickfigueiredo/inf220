const knex = require('../database/knex');
const Message = require('../utils/Message');

class Address {

    static async findOne(id) {
        try {
            const address = await knex.select('*')
                .from('tb_address')
                .where({ id, "is_deleted": false });

            return address[0] ? { success: true, address: address[0] } : { success: false, message: 'Não foi possível recuperar o endereço / Endereço inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o endereço!' };
        }
    }
    
    static async findAll(id_user, page) {
        try {
            const address = await knex.select('*')
                .from('tb_address')
                .where({ id_user, "is_deleted": false })
                .orderBy('alias')
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return address.data[0] ? { success: true, address} : { success: false, message: 'Não foi possível recuperar os endereços / Não existem endereços!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os endereços!' };
        }
    }

    static async findByUserAlias(id_user, alias) {
        try {
            const address = await knex.select('id')
                .from('tb_address')
                .where({ id_user, alias, "is_deleted": false });

            return address[0] ? { success: true, address: address[0] } : { success: false, message: 'Não foi possível recuperar o endereço / Endereço inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o endereço!' };
        }
    }

    static async create(data, type) {
        try {
            return await knex.transaction(async trx => {
                const address = await trx('tb_address').insert(data).returning('*');
                if (type == 'V') await trx('tb_salesman').update({ id_address: address[0].id });

                return { success: true, address: address[0] };
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir endereço!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const address = await knex.update(data)
                .table('tb_address')
                .where({ id, "is_deleted": false }).returning('*');

            return { success: true, address: address[0] };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Endereço não atualizado!' };
        }
    }

    static async delete(id) {
        try {
            await knex.update({ is_deleted: true })
                .table('tb_address')
                .where({ id, "is_deleted": false });

            return { success: true, message: 'Endereço deletado!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Endereço não deletado!' };
        }
    }
}

module.exports = Address;

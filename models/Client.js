const knex = require("../database/knex");
const Message = require('../utils/Message');

class Client {
    static async findOne(id) {
        try {
            const client = await knex.select('tb_client.id as id_client', 'tb_user.id as id_user', 'cpf', 'cnpj', 'tb_client.is_deleted', 'tb_client.created_at', 'tb_client.updated_at', 'name', 'surname', 'email', 'tel', 'type', 'birthdate', 'is_verified')
                .from('tb_client')
                .where({ 'tb_client.id': id, 'tb_client.is_deleted': false })
                .innerJoin('tb_user', 'tb_client.id_user', '=', 'tb_user.id');

            return client[0] ? { success: true, client: client[0] } : { success: false, message: 'Não foi possível recuperar o cliente / Cliente inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o cliente!' };
        }
    };

    static async findAll(page) {
        try {
            const client = await knex.select('tb_client.id as id_client', 'tb_user.id as id_user', 'cpf', 'cnpj', 'tb_client.is_deleted', 'tb_client.created_at', 'tb_client.updated_at', 'name', 'surname', 'email', 'tel', 'type', 'birthdate', 'is_verified')
                .from('tb_client')
                .innerJoin('tb_user', 'tb_client.id_user', '=', 'tb_user.id')
                .where({ 'tb_client.is_deleted': false })
                .orderBy(['tb_user.name', 'tb_user.surname'])
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return client.data[0] ? { success: true, client } : { success: false, message: 'Não foi possível recuperar os clientes / Clientes inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os clientes!' };
        }
    };

    static async findByCnpjOrCpf(cpf, cnpj) {
        try {
            console.log(cpf, cnpj)
            const client = await knex.select('tb_client.id as id_client', 'tb_user.id as id_user', 'cpf', 'cnpj', 'tb_client.is_deleted', 'tb_client.created_at', 'tb_client.updated_at', 'name', 'surname', 'email', 'tel', 'type', 'birthdate', 'is_verified')
                .from('tb_client')
                .innerJoin('tb_user', 'tb_client.id_user', '=', 'tb_user.id')
                .where({ cnpj }).orWhere({ cpf });

            return client[0] ? { success: true, client: client[0] } : { success: false, message: 'Não foi possível recuperar o cliente / Cliente inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o cliente!' };
        }
    }

    static async findByEmail(email) {
        try {
            const client = await knex.select('tb_client.id as id_client', 'tb_user.id as id_user', 'cpf', 'cnpj', 'tb_client.is_deleted', 'tb_client.created_at', 'tb_client.updated_at', 'name', 'surname', 'email', 'tel', 'type', 'birthdate', 'is_verified')
                .from('tb_client')
                .innerJoin('tb_user', 'tb_client.id_user', '=', 'tb_user.id')
                .where({ 'tb_user.email': email });

            return client[0] ? { success: true, client: client[0] } : { success: false, messaage: 'Não foi possível recuperar o cliente / Cliente inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o cliente!' };
        }
    }

    static async findByTel(tel) {
        try {
            const client = await knex.select('tb_client.id as id_client', 'tb_user.id as id_user', 'cpf', 'cnpj', 'tb_client.is_deleted', 'tb_client.created_at', 'tb_client.updated_at', 'name', 'surname', 'email', 'tel', 'type', 'birthdate', 'is_verified')
                .from('tb_client')
                .innerJoin('tb_user', 'tb_client.id_user', '=', 'tb_user.id')
                .where({ 'tb_user.tel': tel });

            return client[0] ? { success: true, client: client[0] } : { success: false, messaage: 'Não foi possível recuperar o cliente / Cliente inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o cliente!' };
        }
    }

    static async create(user, client) {
        if (user.cpf == '0') user.cpf = null;
        if (user.cnpj == '0') user.cnpj = null;

        try {
            return await knex.transaction(async trx => {
                const id_user = await trx('tb_user').insert(user, 'id');
                client['id_user'] = id_user[0];

                const result = await trx('tb_client').insert(client).returning('*');

                return { success: true, client: result[0] };
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir cliente!' };
        }
    };

    static async update(id_user, id_client, user, client) {
        try {
            return await knex.transaction(async trx => {
                if (Object.keys(client).length) await trx('tb_client').update(client).where({ id: id_client });
                if (Object.keys(user).length) await trx('tb_user').update(user).where({ id: id_user });

                return { success: true };
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Cliente não atualizado!' };
        }
    }

    static async delete(id_user, id_client) {
        try {
            return await knex.transaction(async trx => {
                await trx('tb_client').update({ is_deleted: true }).where({ id: id_client });
                await trx('tb_user').update({ is_deleted: true }).where({ id: id_user });

                return { success: true, message: 'Cliente deletado!' };
            });
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Cliente não deletado!' };
        }
    }
};

module.exports = Client;

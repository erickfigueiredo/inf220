const knex = require('../database/knex');
const Message = require('../utils/Message');

class Bank {

    static async findOne(id) {
        try {
            const bank = await knex.select('*')
                .from('tb_bank')
                .where({ id, "is_deleted": false });

            return bank[0] ? { success: true, bank: bank[0] } : { success: false, message: 'Não foi possível recuperar o banco / Banco inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o banco!' };
        }
    }

    static async findAll() {
        try {
            const bank = await knex.select(['id', 'name'])
                .from('tb_bank')
                .where({ "is_deleted": false })
                .orderBy('name');

            return bank[0] ? { success: true, bank } : { success: false, message: 'Não foi possível recuperar os bancos / Bancos inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os bancos!' };
        }
    }

    static async findByCode(code) {
        try {
            const bank = await knex.select('*')
                .from('tb_bank')
                .where({ code, "is_deleted": false });

            return bank[0] ? { success: true, bank: bank[0] } : { success: false, message: 'Não foi possível recuperar o banco / Banco inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o banco!' };
        }
    }

    static async findByISPB(ispb) {
        try {
            const bank = await knex.select('*')
                .from('tb_bank')
                .where({ ispb, "is_deleted": false });

            return bank[0] ? { success: true, bank: bank[0] } : { success: false, message: 'Não foi possível recuperar o banco / Banco inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o banco!' };
        }
    }

    static async findByName(name) {
        try {
            const bank = await knex.select('*')
                .from('tb_bank')
                .where({ name, "is_deleted": false });

            return bank[0] ? { success: true, bank: bank[0] } : { success: false, message: 'Não foi possível recuperar o banco / Banco inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o banco!' };
        }
    }

    static async create(data) {
        try {
            const bank = await knex.insert(data).table('tb_bank').returning('*');

            return bank[0] ? { success: true, bank: bank[0] } : { success: false, message: 'Não foi possível cadastrar o banco!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir banco!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id;
            delete data['id'];

            const bank = await knex.update(data)
                .table('tb_bank')
                .where({ id, "is_deleted": false })
                .returning('*')

            return bank[0] ? { success: true, bank: bank[0] } : { success: false, message: 'Não foi possível atualaizar o banco!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Banco não atualizado!' };
        }
    }

    static async delete(id) {
        try {
            await knex.update({ is_deleted: true })
                .table('tb_bank')
                .where({ id, "is_deleted": false });

            return { success: true, message: 'Banco deletado!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Banco não deletado!' };
        }
    }
}

module.exports = Bank;
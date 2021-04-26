const knex = require('../database/knex');
const Message = require('../utils/Message');
const bcrypt = require('bcrypt');
const User = require('./User');

class ConfirmationToken {
    static async create(id_user, salt) {
        try {
            const token = bcrypt.hashSync(salt + id_user + 'N0BugS', 10);
            await knex.insert({ token, id_user }).table('tb_email_confirmation').returning('id');

            return { success: true, message: 'Token inserido com sucesso!', token }
        } catch (error) {
            Message.warning(error.message);
            return { success: false, message: 'Falha ao inserir token!' };
        }
    }

    static async findUserIdByToken(token) {
        try {
            const id_user = await knex.select('id_user').from('tb_email_confirmation').where({ token });
            if (!id_user[0]) throw new Error();
            const user = await User.findOne(id_user[0].id_user);

            return user;
        } catch (error) {
            Message.warning(error.message);
            return { success: false, message: 'Houve um erro ao recuperar o Token!' };
        }
    }

    static async delete(id_user) {
        try {
            await knex('tb_email_confirmation').where('id_user', id_user).delete();

            return { success: true, message: 'Token deletado!' }
        } catch (error) {
            Message.warning(error.message);
            return { success: false, message: 'Token não deletado!' };
        }
    }
}

module.exports = ConfirmationToken;

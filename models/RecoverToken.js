const knex = require('../database/knex');
const Message = require('../utils/Message');
const bcrypt = require('bcrypt');
const User = require('./User');

class RecoverToken {
    static async create(email, id_user) {
        try {
            const token = bcrypt.hashSync(email + 'N0BugS', 10);
            const id = await knex.insert({ token, id_user }).table('tb_password_recover').returning('id');

            return id[0] ? { success: true, message: 'Token criado com sucesso!', token } : { success: false, message: 'Falha ao inserir token!' };
        } catch (error) {
            Message.warning(error.message);
            return { success: false, message: 'Falha ao inserir token!' };
        }
    }

    static async findUserIdByToken(token) {
        try {
            const id_user = await knex.select('id_user')
                .from('tb_password_recover')
                .where({ token });
            console.log(id_user[0].id_user)
            if (!id_user[0]) throw new Error();

            const user = await User.findOne(id_user[0].id_user);

            return user;
        } catch (error) {
            Message.warning(error.message);
            return { success: false, message: 'Token inválido!' };
        }
    }

    static async delete(id_user) {
        try {
            await knex('tb_password_recover')
                .delete()
                .where('id_user', id_user);

            return { success: true, message: 'Token inserido com sucesso!' }
        } catch (error) {
            Message.warning(error.message);
            return { success: false, message: 'Falha ao inserir token!' };
        }
    }
}

module.exports = RecoverToken;
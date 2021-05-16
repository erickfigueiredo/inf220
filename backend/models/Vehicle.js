const knex = require('../database/knex');
const Message = require('../utils/Message');

class Vehicle {

    static async findOne(id) {
        try {
            const vehicle = await knex.select('*')
                .from('tb_vehicle')
                .where({ id, "is_deleted": false });
            return vehicle[0] ? { success: true, vehicle: vehicle[0] } : { success: false, message: 'Não foi possível recuperar o veículo / Veículo inexistente!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar o veículo!' };
        }
    }

    static async findAll(id_deliveryman) {
        try {
            const vehicle = await knex.select('*')
                .from('tb_user')
                .where({ id: id_deliveryman })
                .orderBy('id')
            return vehicle[0] ? { success: true, vehicle: vehicle[0] } : { success: false, message: 'Não foi possível recuperar os veículos / Não existem veículos!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao recuperar os veículos!' };
        }
    }

    static async create(data) {
        try {
            const vehicle = await knex('tb_vehicle').insert(data);
            return vehicle[0] ? { success: true, vehicle: vehicle[0] } : { success: false, message: 'Falha ao inserir veículo!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao inserir o veículo!' };
        }
    }

    static async update(data, id) {
        try {
            const vehicle = await knex('tb_vehicle')
                .update(data)
                .where({ id })
                .returning('*');

            return vehicle[0] ? { success: true, vehicle: vehicle[0] } : { success: false, message: 'Falha ao atulizar veículo!' };
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao atualizar o veículo!' };
        }
    }
}

module.exports = Vehicle;
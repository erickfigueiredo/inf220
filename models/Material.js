const knex = require('../database/knex');
const Message = require('../utils/Message');

class Material {
    static async findOne(id) {
        try {
            const material = await knex.select('*')
                .from('tb_material')
                .where({ id, "is_deleted": false });

            return material[0] ? { success: true, material: material[0] } : { success: false, message: 'Não foi possível recuperar o material / Material inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o material!' };
        }
    }

    static async findAll() {
        try {
            const material = await knex.select('*')
                .from('tb_material')
                .where({ "is_deleted": false })
                .orderBy('name')

            return material[0] ? { success: true, material } : { success: false, message: 'Não foi possível recuperar os materiais / Materiais inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os materiais!' };
        }
    }

    static async findByName(name) {
        try {
            const material = await knex.select('*')
                .from('tb_material')
                .where({ "is_deleted": false })
                .andWhereRaw("unaccent(:materialName:) ilike unaccent(:name)", {
                    materialName: 'tb_material.name',
                    name: name
                });

            return material[0] ? { success: true, material: material[0] } : { success: false, message: 'Não foi possível recuperar o material / Material inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o material!' };
        }
    }

    static async create(data) {
        try {
            const material = await knex.insert(data).table('tb_material').returning('*');

            return material[0] ? { success: true, material: material[0] } : { success: false, message: 'Não foi possível cadastrar o material!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir material!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id;

            delete data['id'];

            const material = await knex.update(data)
                .table('tb_material')
                .where({ id, "is_deleted": false }).returning('*');

            return { success: true, material: material[0] };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Material não atualizado!' };
        }
    }

    static async delete(id) {
        try {
            await knex.update({ is_deleted: true })
                .table('tb_material')
                .where({ id, "is_deleted": false });

            return { success: true, message: 'Material deletado!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Material não deletado!' };
        }
    }
}

module.exports = Material;
const knex = require("../database/knex");
const Message = require('../utils/Message');

class Market {
    static async findByEmail(email) {
        try {
            const market = await knex.select('id', 'business_name', 'cnpj', 'email', 'phone').from('tb_market').where({ email });
            return market[0] ? { success: true, market: market[0] } : { success: false, message: 'Não foi possível recuperar o mercado / Mercado inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o mercado!' };
        }
    }

    static async findByTel(tel) {
        try {
            const market = await knex.select('id', 'business_name', 'cnpj', 'email', 'phone').from('tb_market').where({ tel });
            return market[0] ? { success: true, market: market[0] } : { success: false, message: 'Não foi possível recuperar o mercado / Mercado inexistente!' };
        } catch (error) {
            return { success: false, message: 'Houve um erro ao recuperar o mercado!' };
        }
    }

    static async findMarketWithPassword(email) {
        try {
            const market = await knex.select('*')
                .from('tb_market')
                .where({ email });

            return market[0] ? { success: true, market: market[0] } : { success: false, message: 'Não foi possível recuperar o mercado / Mercado inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o mercado!' };
        }
    }

    static async findOne(id) {
        try {
            const market = await knex.select('id', 'business_name', 'cnpj', 'email', 'phone')
                .from('tb_market')
                .where({ id, 'is_deleted': false });
            console.log(market)
            return market[0] ? { success: true, market: market[0] } : { success: false, message: 'Não foi possível recuperar o mercado / Mercado inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o mercado!' };
        }
    }

    static async findAll(page) {
        try {
            const market = await knex.select('id', 'business_name', 'cnpj', 'email', 'phone')
                .from('tb_market')
                .where({ 'is_deleted': false })
                .orderBy(['business_name'])
                .paginate({
                    perPage: 20,
                    currentPage: page
                });

            return market.data[0] ? { success: true, market } : { success: false, message: 'Não foi possível recuperar os mercados / Mercados inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar mercado!' };
        }
    }

    static async create(data) {
        try {
            return await knex.transaction(async trx => {
                const idWallet = await trx('tb_wallet')
                    .insert({total: 0, pix_key: data.pix_key}).returning('id');
                
                data.id_wallet = idWallet[0];
                delete data.pix_key
                const result = await trx('tb_market')
                    .insert(data)
                    .returning('*');

                    return { success: true, market: result[0] };
            });
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir mercado!' }
        }
    }

    static async update(id, data) {
        try {
            return await knex.transaction(async trx => {
                let market = await trx('tb_market').update(data).where({ id }).returning('*');
                return market[0] ? { success: true, market: market[0] } : { success: false, message: 'Não foi possível atualizar o mercado!' };
            })
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Mercado não atualizado!' };
        }
    }

    static async delete(id) {
        try {
            await knex.update({ is_deleted: true })
                .table('tb_market')
                .where({ id });

            return { success: true, message: 'Mercado deletado!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Mercado não deletado!' };
        }
    }
}

module.exports = Market;
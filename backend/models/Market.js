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
            const market = await knex.select('*')
                .from('tb_market')
                .where({ id, 'is_deleted': false });

            return market[0] ? { success: true, market: market[0] } : { success: false, message: 'Não foi possível recuperar o mercado / Mercado inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o mercado!' };
        }
    }

    static async findAll() {
        try {
            const markets = await knex.select('id', 'business_name', 'cnpj', 'email', 'phone')
                .from('tb_market')
                .where({ 'is_deleted': false })
                .orderBy(['business_name'])

            return markets[0] ? { success: true, markets } : { success: false, message: 'Não foi possível recuperar os mercados / Mercados inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar mercado!' };
        }
    }

    static async retrieveRecord(id) {
        try {
            const record = await knex.select('tb_market.id', 'tb_market.business_name', 'tb_market.cnpj', 'tb_wallet.pix_key', 'tb_wallet.total', 'tb_wallet.updated_at', 'tb_wallet.id as wallet')
                .from('tb_market')
                .leftJoin('tb_wallet', 'tb_wallet.id', 'tb_market.id_wallet')
                .where('tb_market.id', id);

            record[0].withdraws = await knex.select('value', 'updated_at')
                .from('tb_wallet_withdraw')
                .where('id_wallet', record[0].wallet)
                .orderBy('updated_at', 'DESC');

            return record[0] ? {success: true, record: record[0]} : {success: false, message: 'Falha ao obter histórico financeiro'};
        } catch (e) {
            Message.warning(e);
            return { success: false, message: 'Houve um erro ao reuperar o histórico financeiro!' };
        }
    }

    static async create(data, address) {
        try {
            address.type = 'M'
            return await knex.transaction(async trx => {
                const idWallet = await trx('tb_wallet')
                    .insert({ total: 0, pix_key: data.pix_key }).returning('id');

                const idAddress = await trx('tb_address')
                    .insert(address).returning('id');

                data.id_wallet = idWallet[0];
                data.id_address = idAddress[0];
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
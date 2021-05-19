const knex = require('../database/knex');
const Message = require('../utils/Message');

class Product {
    static async findOne(id) {
        try {
            const product = await knex.select('tb_product.id', 'tb_product.title', 'tb_product.desc', 'tb_product.price', 'tb_product.unt', 'tb_product.brand', 'tb_product.validate', 'tb_product.uri', 'tb_product.quantity', 'tb_product_discount.value', 'tb_product_discount.id AS id_discount', 'tb_category.name as category').from('tb_product')
                .leftJoin('tb_product_discount', 'tb_product_discount.id', 'tb_product.id_discount')
                .join('tb_category', 'tb_category.id', 'tb_product.id_category')
                .where({ 'tb_product.id': id });
            return product[0] ? { success: true, product: product[0] } : { success: false, message: 'Não foi possível recuperar o produto / Produto inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o produto!' };
        }
    }

    static async findAll() {
        try {
            const product = await knex.select('tb_product.id', 'tb_product.title', 'tb_product.desc', 'tb_product.price', 'tb_product.unt', 'tb_product.brand', 'tb_product.validate', 'tb_product.uri', 'tb_product.quantity', 'tb_product_discount.value', 'tb_product_discount.id AS id_discount', 'tb_category.name as category').from('tb_product')
                .leftJoin('tb_product_discount', 'tb_product_discount.id', 'tb_product.id_discount')
                .join('tb_category', 'tb_category.id', 'tb_product.id_category')
                .where({ 'tb_product.is_deleted': false });
            console.log(product)
            return product[0] ? { success: true, product } : { success: false, message: 'Não foi possível recuperar o produto / Produto inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o produto!' };
        }
    }

    static async findPromo() {
        try {
            const products = await knex.select('tb_product.id', 'tb_product.title', 'tb_product.desc', 'tb_product.price', 'tb_product.unt', 'tb_product.brand', 'tb_product.validate', 'tb_product.uri', 'tb_product.quantity', 'tb_product_discount.value', 'tb_product_discount.id AS id_discount', 'tb_category.name as category').from('tb_product')
                .join('tb_product_discount', 'tb_product_discount.id', 'tb_product.id_discount')
                .join('tb_category', 'tb_category.id', 'tb_product.id_category')
                .where({ 'tb_product.is_deleted': false });
            return products[0] ? { success: true, products } : { success: false, message: 'Não foi possível recuperar o produto / Produto inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o produto!' };
        }
    }

    static async findAllMarketProducts(id_market) {
        try {
            const product = await knex.select('*')
                .from('tb_product')
                .where({ id_market, is_deleted: false });

            return product[0] ? { success: true, product } : { success: false, message: 'Não foi possível recuperar o produto / Produto inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o produto!' };
        }
    }

    static async searchProduct(filter) {
        try {
            const product = await knex('tb_product')
                .leftJoin('tb_product_discount', { 'tb_product_discount.id': 'tb_product.id_discount' })
                .join('tb_category', { 'tb_category.id': 'tb_product.id_category' })
                .join('tb_market', { 'tb_market.id': 'tb_product.id_market' })
                .select(
                    'tb_product.id',
                    'tb_product.title',
                    'tb_product.price',
                    'tb_product.uri',
                    'tb_product.quantity',
                    'tb_product.brand',
                    'tb_category.name as category',
                    'tb_market.business_name as market',
                    'tb_product_discount.value'
                )
                .where(function () {
                    this.whereRaw('unaccent(:productTitle:) ilike unaccent(:search) or ' +
                        'unaccent(:categoryName:) ilike unaccent(:search) or ' +
                        'unaccent(:productDesc:) ilike unaccent(:search) or ' +
                        'unaccent(:marketName:) ilike unaccent(:search)', {
                        productTitle: 'tb_product.title',
                        productDesc: 'tb_product.desc',
                        categoryName: 'tb_category.name',
                        marketName: 'tb_market.business_name',
                        search: '%' + filter.search + '%'
                    })
                })
                .andWhere(function () {
                    if (filter.minPrice) this.andWhere('tb_product.price', '>=', filter.minPrice);
                    if (filter.maxPrice) this.andWhere('tb_product.price', '<=', filter.maxPrice);
                })
                .andWhere(function (){
                    if (filter.category) this.whereRaw('unaccent(:categoryName:) ilike unaccent(:filterCat)',
                        {
                            categoryName: 'tb_category.name',
                            filterCat: '%' + filter.category + '%'
                        })
                })
                .andWhere({
                    'tb_product.is_deleted': false,
                    'tb_product.is_active': true
                })
                .orderBy('tb_product.created_at', 'DESC');

            return product[0] ? { success: true, product } : { success: false, message: 'Não foi possível recuperar os produtos da pesquisa / Não existem produtos relacionados à pesquisa!' }

        } catch (error) {
            console.log(error)
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o produto da pesquisa!' };
        }
    }

    static async create(data) {
        try {
            const product = await knex('tb_product').insert(data, '*');
            return product[0] ? { success: true, product: product[0] } : { success: true, message: 'Não foi possível criar o produto!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao inserir produto!' };
        }
    }

    static async update(data) {
        try {
            const id = data.id_product;
            delete data['id_product'];

            const product = await knex('tb_product').update(data, '*').where({ id });
            return product[0] ? { success: true, product: product[0] } : { success: true, message: 'Não foi possível atualizar o produto!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao atualizar produto!' };
        }
    }

    static async delete(id) {
        try {
            const product = await knex('tb_product').update({ is_deleted: true }, '*').where({ id });
            return product[0] ? { success: true, product: product[0] } : { success: true, message: 'Não foi possível deletar o produto!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Falha ao deletar produto!' };
        }
    }
}

module.exports = Product;

const knex = require('../database/knex');
const Message = require('../utils/Message');

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const aws = require('aws-sdk');
const s3 = new aws.S3();

class Product {
    static async findAll(page) {
        try {
            const product = await knex('tb_product')
                .join('tb_material', { 'tb_material.id': 'tb_product.id_material' })
                .leftJoin('tb_product_discount', { 'tb_product_discount.id': 'tb_product.id_discount' })
                .join('tb_salesman', { 'tb_salesman.id': 'tb_product.id_salesman' })
                .select(
                    'tb_product.id',
                    'tb_product.title',
                    'tb_product.price',
                    'tb_product.avaliation',
                    'tb_product.url_image',
                    'tb_product.key_image',
                    'tb_product.quality',
                    'tb_product.style',
                    'tb_material.name AS material',
                    'tb_product_discount.value AS discount',
                    'tb_product_discount.id AS id_discount',
                    'tb_salesman.business_name',
                )
                .where({
                    'tb_product.is_deleted': false,
                    'tb_product.is_active': true
                })
                .orderBy('tb_product.created_at', 'DESC')
                .paginate({ perPage: 20, currentPage: page });

            return product.data[0] ? { success: true, product } : { success: false, message: 'Não foi possível recuperar os produtos / Produtos inexistentes!' };

        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os produtos!' };
        }
    }

    static async findOne(id) {
        try {
            const product = await knex('tb_product')
                .join('tb_material', { 'tb_material.id': 'tb_product.id_material' })
                .join('tb_salesman', 'tb_salesman.id', 'tb_product.id_salesman')
                .leftJoin('tb_product_discount', { 'tb_product_discount.id': 'tb_product.id_discount' })
                .select(
                    'tb_product.id',
                    'tb_product.title',
                    'tb_product.price',
                    'tb_product.avaliation',
                    'tb_product.description',
                    'tb_product.num_access',
                    'tb_product.quantity',
                    'tb_product.quality',
                    'tb_product.width',
                    'tb_product.style',
                    'tb_product.depth',
                    'tb_product.height',
                    'tb_product.is_active',
                    'tb_product.is_deleted',
                    'tb_material.name AS material',
                    'tb_material.id as id_material',
                    'tb_product_discount.value AS discount',
                    'tb_product_discount.id AS id_discount',
                    'tb_product.id_salesman',
                    'tb_product.key_image',
                    'tb_product.url_image',
                    'tb_salesman.business_name'
                )
                .where({
                    'tb_product.is_deleted': false,
                    'tb_product.is_active': true,
                    'tb_product.id': id
                })
                .orderBy('tb_product.created_at', 'DESC')

            if (product) {
                const images = await knex.select(['key', 'url']).from('tb_product_image').where({ id_product: product[0].id });

                product[0].images = [...images];
                return { success: true, product: product[0] };
            }
            return { success: false, message: 'Não foi possível recuperar o produto / Produto inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os produto!' };
        }
    }

    static async findAllSalesmanProducts(id_salesman, page) {
        try {
            const product = await knex('tb_product')
                .join('tb_material', { 'tb_material.id': 'tb_product.id_material' })
                .leftJoin('tb_product_discount', { 'tb_product_discount.id': 'tb_product.id_discount' })
                .join('tb_salesman', { 'tb_salesman.id': 'tb_product.id_salesman' })
                .select(
                    'tb_product.id',
                    'tb_product.title',
                    'tb_product.price',
                    'tb_product.style',
                    'tb_product.avaliation',
                    'tb_product.url_image',
                    'tb_product.key_image',
                    'tb_product_discount.value AS discount',
                    'tb_product_discount.id AS id_discount',
                    'tb_material.name AS material',
                    'tb_product_discount.value',
                    'tb_salesman.business_name'
                )
                .where({
                    'tb_product.is_deleted': false,
                    'tb_product.is_active': true,
                    'tb_product.id_salesman': id_salesman
                })
                .orderBy('tb_product.created_at', 'DESC')
                .paginate({ perPage: 20, currentPage: page, isLengthAware: true });

            return product.data[0] ? { success: true, product } : { success: false, message: 'Não foi possível recuperar os produtos / Produtos inexistentes!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os produtos!' };
        }
    }

    static async findByTitleAndSalesman(title, id_salesman) {
        try {
            const product = await knex.select('id').where({ title, id_salesman, "is_deleted": false }).from('tb_product');
            return product.data[0] ? { success: true, product: product } : { success: false, message: 'Não foi possível recuperar o produto / produto inexistente!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar o produto!' };
        }
    }

    static async findRelationable(filter, page) {

        try {
            const product = await knex('tb_product')
                .join('tb_material', { 'tb_material.id': 'tb_product.id_material' })
                .leftJoin('tb_product_discount', { 'tb_product_discount.id': 'tb_product.id_discount' })
                .join('tb_salesman', { 'tb_salesman.id': 'tb_product.id_salesman' })
                .select(
                    'tb_product.id',
                    'tb_product.title',
                    'tb_product.price',
                    'tb_product.style',
                    'tb_product.avaliation',
                    'tb_product.url_image',
                    'tb_product.key_image',
                    'tb_product.quantity',
                    'tb_material.name as material',
                    'tb_product.quality',
                    'tb_product.id_salesman',
                    'tb_product_discount.value AS discount',
                    'tb_product_discount.id AS id_discount',
                    'tb_salesman.business_name',
                    'tb_product.created_at'
                )
                .where(function() {
                    this.whereRaw("unaccent(:productTitle:) ilike unaccent(:search) or " +
                        "unaccent(:materialName:) ilike unaccent(:search) or " +
                        "unaccent(:productDesc:) ilike unaccent(:search) or " +
                        "unaccent(:salesmanBusiness:) ilike unaccent(:search)", {
                            productTitle: 'tb_product.title',
                            productDesc: 'tb_product.description',
                            materialName: 'tb_material.name',
                            salesmanBusiness: 'tb_salesman.business_name',
                            search: '%' + filter.search + '%'
                        })
                })
                .andWhere(function() {
                    if (filter.minPrice) this.andWhere('tb_product.price', '>=', filter.minPrice);

                    if (filter.maxPrice) this.andWhere('tb_product.price', '<=', filter.maxPrice);

                    if (filter.minAvaliation) this.andWhere('tb_product.avaliation', '>=', filter.minAvaliation);

                    if (filter.maxAvaliation) this.andWhere('tb_product.avaliation', '<=', filter.maxAvaliation);;

                    if (filter.minQuality) this.andWhere('tb_product.quality', '>=', filter.minQuality);

                    if (filter.maxQuality) this.andWhere('tb_product.quality', '<=', filter.maxQuality);
                })
                .andWhere({
                    'tb_product.is_deleted': false,
                    'tb_product.is_active': true
                })
                .orderBy('tb_product.created_at', 'DESC')
                .paginate({ perPage: 5, currentPage: page, isLengthAware: true });
            return product.data[0] ? { success: true, product } : { success: false, message: 'Não foi possível recuperar os produtos da pesquisa / Não existem produtos!' };
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Houve um erro ao recuperar os produtos da pesquisa!' };
        }
    }

    static async create(product, product_images) {
        try {
            return await knex.transaction(async trx => {
                let result = {}
                const prod = await trx('tb_product').insert(product, '*');
                result.id = prod[0].id;

                result.images = [];
                for (let p of product_images) {
                    p.id_product = result.id;
                    const img = await trx('tb_product_image').insert(p, ['key', 'url']);
                    result.images.push(img);
                }

                Message.info('Produto criado com sucesso!');
                return { success: true, product: prod[0] };
            });
        } catch (error) {
            this.deleteImages(product_images);

            Message.warning(error);
            return { success: false, message: 'Falha ao inserir produto!' };
        }
    }

    static async update(id, data, product_images, delete_images, delete_cover) {
        try {

            return await knex.transaction(async trx => {
                let result = {}
                let prod = await trx('tb_product').update(data).where({ id }).returning('*');
                result.id = prod[0].id;

                result.images = [];
                for (let p of product_images) {
                    p.id_product = result.id;
                    const img = await trx('tb_product_image').insert(p, ['key', 'url']);
                    result.images.push(img);
                }

                if (delete_images && delete_images.length) {
                    await this.deleteImages(delete_images);
                    for (let i of delete_images) await trx('tb_product_image').where('key', i.key).delete();
                }

                if (delete_cover) {
                    const images = await trx('tb_product_image')
                        .select('key', 'url')
                        .where({ id_product: id })
                        .orderBy('id')
                        .limit(1)
                    if (images.length) prod = await trx('tb_product').update({ key_image: images[0].key, url_image: images[0].url }).where({ id }).returning('*');
                    else await trx('tb_product').update({ key_image: product_images[0].key, url_image: product_images[0].url }).where({ id });
                }
                Message.info('Produto atualizado com sucesso!');
                return { success: true, product: prod[0] };
            });
        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Produto não atualizado!' };
        }
    }

    static async delete(id) {
        try {
            const keyImages = await knex.select('key').from('tb_product_image').where({ id_product: id });

            await knex.transaction(async trx => {
                await trx('tb_product_image').where({ id_product: id }).delete();
                await trx('tb_product').update({ is_deleted: true }).where({ id });
            });

            this.deleteImages(keyImages);

            Message.info('Produto deletado com sucesso');
            return { success: true, message: 'Produto deletado!' };

        } catch (error) {
            Message.warning(error);
            return { success: false, message: 'Produto não deletado!' };
        }
    }

    static deleteImages(product_images) {
        const images = product_images.map(p => {
            return { Key: p.key }
        });
        if (process.env.STORAGE_TYPE === 's3') {
            s3.deleteObjects({
                Bucket: process.env.BUCKET_NAME,
                Delete: { Objects: images }
            }, (error, data) => {
                if (error) Message.error(error);

                else Message.info('Delete', data);
            });
        } else {
            try {
                for (img of images) {
                    promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', img.Key));
                }
            } catch (error) {
                Message.warning(error);
            }
        }
    }
}

module.exports = Product;
const Product = require('../models/Product');
const Market = require('../models/Market');
const Category = require('../models/Category');

const multer = require('multer');
const multerConfig = require('../config/Multer');

const fs = require('fs');

class ProductController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });

        const product = await Product.findOne(id);
        return product.success ? res.send(product) : res.status(404).send(product);
    }

    static async index(req, res) {
        const id_market = req.params.id_market;

        if (isNaN(parseInt(id_market)))
            return res.status(400).send({ success: false, message: 'Id de mercado inválido!' });

        const existMarket = Market.findOne(id_market);
        if (existMarket.success) {
            let page = req.query.page;
            if (isNaN(parseInt(page))) page = 1;

            const product = await Product.findAllMarketProducts(id_market, page);
            return product.success ? res.send(product) : res.status(400).send();
        } else return res.status(404).send({ success: false, message: 'Id de mercado inexistente!' });
    }

    static async search(req, res) {

    }

    static async create(req, res) {
        const fileProps = { allowedMimes: ['image/png', 'image/jpeg'], numFiles: 1 };

        const upload = multer(multerConfig('gallery', fileProps)).single('file');
        upload(req, res, async (fail) => {
            if (fail instanceof multer.MulterError)
                return res.status(400).send({ success: false, message: 'Extensão de arquivo inválida!' });

            if (!req.file)
                return res.send({ success: false, message: 'É necessário submeter um arquivo!' });

            req.body = JSON.parse(req.body.data);

            const existMarket = Market.findOne(req.body.id_market);
            if (!existMarket.success) {
                fs.unlinkSync(`${file.path}`);

                return res.status(404).send({ success: false, message: 'Mercado inexistente!' });
            }

            const existCategory = Category.findOne(req.body.id_category);
            if (!existCategory.success) {
                fs.unlinkSync(`${file.path}`);

                return res.status(404).send({ success: false, message: 'Categoria inexistente!' });
            }

            data.uri = file.path;

            const result = await Product.create(req.body);

            if (!result.success) {
                fs.unlinkSync(`${file.path}`);

                return res.status(400).send(result);
            }

            return res.send(result);
        });
    }

    static async update(req, res) {
        const existProduct = Product.findOne(req.body.id);
        if (!existProduct.success) return res.status(404).send({ success: false, message: 'Produto inexistente!' });

        const existCategory = Category.findOne(req.body.id_category);
        if (!existCategory.success) return res.status(404).send({ success: false, message: 'Categoria inexistente!' });

        const product = await Product.update(req.body);
        return product.success ? res.send(product) : res.status(400).send(product);
    }

    static async delete(req, res) {
        const id = req.params.id;

        const existProduct = await Product.findOne(id);

        if (existProduct.success) {
            const result = await Product.delete(id);

            return result.success ? res.send(result) : res.status(400).send(result);
        } else return res.status(404).send({ success: false, message: 'Produto inexistente!' });
    }
}

module.exports = ProductController;
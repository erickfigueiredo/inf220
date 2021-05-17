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

        const existMarket = await Market.findOne(id_market);
        console.log(existMarket, id_market)
        if (existMarket.success) {
            let page = req.query.page;
            if (isNaN(parseInt(page))) page = 1;

            const product = await Product.findAllMarketProducts(id_market, page);
            return product.success ? res.send(product) : res.status(400).send(product);
        } else return res.status(404).send({ success: false, message: 'Id de mercado inexistente!' });
    }

    static async indexAll(req, res) {

        const product = await Product.findAll();
        return product.success ? res.send(product) : res.status(400).send(product);
    }
    
    static async search(req, res) {
        const { category, min_price, max_price } = req.query;
        let { search } = req.query.search;

        search = search.replace(/[+]/gi, ' ');
        search = search.replace(/[`~!@#$%^&*()_+|\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        const filter = {};

        if (search) {
            filter.search = search;

            if (min_price && isNaN(parseInt(min_price)) && min_price >= 0) filter.minPrice = min_price;
            if (max_price && isNaN(parseInt(max_price)) && max_price > 0) filter.maxPrice = max_price;
            if (category) filter.category = category;
        }

        const result = await Product.searchProduct(filter);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async create(req, res) {
        const fileProps = { allowedMimes: ['image/png', 'image/jpeg'], numFiles: 1 };

        const upload = multer(multerConfig('gallery', fileProps)).single('file');
        upload(req, res, async (fail) => {
            if (fail instanceof multer.MulterError)
                return res.status(400).send({ success: false, message: 'Extensão de arquivo inválida!' });

            if (!req.file)
                return res.send({ success: false, message: 'É necessário submeter um arquivo!' });
            
            console.log(req.file)

            req.body = JSON.parse(req.body.data);

            const existMarket = await Market.findOne(req.body.id_market);

            if (!existMarket.success) {
                fs.unlinkSync(`${req.file.path}`);
                return res.status(404).send({ success: false, message: 'Mercado inexistente!' });
            }

            const existCategory = await Category.findOne(req.body.id_category);
            console.log(existCategory)
            if (!existCategory.success) {
                fs.unlinkSync(`${req.file.path}`);
                return res.status(404).send({ success: false, message: 'Categoria inexistente!' });
            }

            req.body.uri = req.file.key;
            const result = await Product.create(req.body);

            if (!result.success) {
                fs.unlinkSync(`${req.file.path}`);
                return res.status(400).send(result);
            }
            return res.send(result);
        });
    }

    static async update(req, res) {
        const existProduct = await Product.findOne(req.body.id_product);
        if (!existProduct.success) return res.status(404).send({ success: false, message: 'Produto inexistente!' });

        if (req.body.id_category) {
            const existCategory = await Category.findOne(req.body.id_category);
            if (!existCategory.success) return res.status(404).send({ success: false, message: 'Categoria inexistente!' });
        }

        const product = await Product.update(req.body);
        return product.success ? res.send(product) : res.status(400).send(product);
    }

    static async delete(req, res) {
        const id = req.params.id;

        const existProduct = await Product.findOne(id);
        if (existProduct.success) {
            const result = await Product.delete(id);
            console.log(result)
            return result.success ? res.send({ success: true, message: 'Produto apagado!' }) : res.status(400).send(result);
        } else return res.status(404).send({ success: false, message: 'Produto inexistente!' });
    }
}

module.exports = ProductController;

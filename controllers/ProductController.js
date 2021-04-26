const Product = require('../models/Product');
const ProductSchema = require('../schemas/ProductSchema');
const multer = require('multer');
const multerConfig = require('../config/multer');
const Material = require('../models/Material');
const Discount = require('../models/Discount');

class ProductController {

    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const product = await Product.findAll(page);
        return product.success ? res.send(product) : res.status(404).send(product);
    }

    static async indexBySalesman(req, res) {
        const id_salesman = req.params.id_salesman;

        if (isNaN(parseInt(id_salesman)))
            return res.status(404).send({ success: false, message: 'id de vendedor inválido!' });

        let page = req.query.page;
        if (isNaN(parseInt(page))) page = 1;

        const product = await Product.findAllSalesmanProducts(id_salesman, page);
        return product.success ? res.send(product) : res.status(404).send(product);
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(404).send({ success: false, message: 'id inválido!' });

        const product = await Product.findOne(id);
        product.success ? res.send(product) : res.status(404).send(product);
    }

    static async search(req, res) {

        const { min_price, max_price, min_avaliation, max_avaliation, min_quality, max_quality } = req.query;
        let { search } = req.query;
        search = search.toString();
        const filter = {};

        search = search.replace(/[+]/gi, ' ');
        search = search.replace(/[`~!@#$%^&*()_+|\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        if (search) {

            filter.search = search;

            if (min_price && !isNaN(parseInt(min_price)) && min_price >= 0) filter.minPrice = min_price;

            if (max_price && !isNaN(parseInt(max_price)) && max_price > 0) filter.maxPrice = max_price;

            if (min_avaliation && !isNaN(parseInt(min_avaliation)) &&
                (min_avaliation >= 0 && min_avaliation <= 100)) filter.minAvaliation = min_avaliation;

            if (max_avaliation && !isNaN(parseInt(max_avaliation)) &&
                (max_avaliation >= 0 && max_avaliation <= 100)) filter.minAvaliation = max_avaliation;

            if (min_quality && !isNaN(parseInt(min_quality)) &&
                (min_quality >= 0 && min_quality <= 100)) filter.minQuality = min_quality;

            if (max_quality && !isNaN(parseInt(max_quality)) &&
                (max_quality >= 0 && max_quality <= 100)) filter.maxQuality = max_quality;
        }

        let page = req.query.page;
        if (isNaN(parseInt(page))) page = 1;

        const result = await Product.findRelationable(filter, page);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async create(req, res) {

        const upload = multer(multerConfig).array('file', 15);
        let product_img = [];
        upload(req, res, async(fail) => {

            req.body.data = JSON.parse(req.body.data)

            const schema = ProductSchema.createValidate();
            const { error } = schema.validate(req.body.data);

            if (error)
                return res.status(400).send({ success: false, message: error.details[0].message });

            const existTitle = await Product.findByTitleAndSalesman(req.body.data.title, req.body.data.id_salesman)
            if (existTitle.success && Object.keys(existTitle.product).length)
                return res.status(409).send({ success: false, message: 'Título já cadastrado em sua loja!' });

            if (!req.files.length)
                return res.status(400).send({ success: false, message: 'As imagens não foram carregadas!' });

            if (fail instanceof multer.MulterError)
                return res.status(400).send({ success: false, message: 'Houve um erro no processamento das imagens!' });

            for (let file of req.files) {
                const { originalname: name, size, key, location: url = '' } = file;
                product_img.push({ name, size, key, url });
            }

            req.body.data.key_image = product_img[0].key;
            req.body.data.url_image = product_img[0].url;

            const result = await Product.create(req.body.data, product_img);
            return result.success ? res.send(result) : res.status(400).send(result);
        });
    }

    static async update(req, res) {
        const upload = multer(multerConfig).array('file', 5);

        let product_img = [];
        let toUpdate = {};
        upload(req, res, async(fail) => {
            console.log(req.body.data)
            req.body.data = JSON.parse(req.body.data);
            const { title, id_material, style, description, price, quantity, quality, width, height, depth, is_active, id_product, delete_image, discount } = req.body.data;

            const schema = ProductSchema.updateValidate();
            const { error } = schema.validate(req.body.data);

            if (error)
                return res.status(400).send({ success: false, message: error.details[0].message });

            const product = await Product.findOne(id_product);
            if (product.success) {
                if (title && product.product.title != title) {
                    const existTitle = await Product.findByTitleAndSalesman(title, product.product.id_salesman)

                    if (existTitle.success && Object.keys(existTitle.product).length)
                        return res.status(409).send({ success: false, message: 'Título já cadastrado em sua loja!' });
                } else toUpdate['title'] = title;
            }

            if (description && description != product.product.description) toUpdate['description'] = description;
            if (price && price != product.product.price) toUpdate['price'] = price;
            if (quality && quality != product.product.quality) toUpdate['quality'] = quality;
            if (quantity && quantity != product.product.quantity) toUpdate['quantity'] = quantity;
            if (width && width != product.product.width) toUpdate['width'] = width;
            if (depth != product.product.depth) toUpdate['depth'] = depth;
            if (height && height != product.product.width) toUpdate['height'] = height;
            if (is_active && is_active != product.product.is_active) toUpdate['is_active'] = is_active;
            if (style && style != product.product.style) toUpdate['style'] = style;
            
            if (id_material && id_material != product.product.id_material){
                const existsMaterial = await Material.findOne(id_material);
                if(existsMaterial.success && Object.keys(existsMaterial.material).length) toUpdate['id_material'] = id_material;
                else return res.status(400).send({success: false, message: 'Material não existe!'});
            }

            if(discount && discount != product.product.discount){
                if(product.product.discount === null){
                    const result = await Discount.create({value: discount}, id_product);
                    if(!result.success) return res.status(400).send(result);
                }else{
                    const result = await Discount.update(product.product.id_discount, {value: discount});
                    console.log(result)
                    if(!result.success) return res.status(400).send(result);
                }

            }

            if (fail instanceof multer.MulterError)
                return res.status(400).send({ success: false, message: 'Houve um erro no processamento das imagens!' });

            let delete_img = [];
            let delete_cover = false;
            if (delete_image && delete_image.length)
                for (let i of delete_image) {
                    delete_img.push({ key: i })
                    if (product.product.key_image == i) delete_cover = true;
                };

            for (let file of req.files) {
                const { originalname: name, size, key, location: url = '' } = file;
                product_img.push({ name, size, key, url });
            }

            if (product.product.images.length + product_img.length - delete_img.length > 5 ||
                product.product.images.length + product_img.length - delete_img.length < 1)
                return res.status(400).send({ success: false, message: 'Você não pode adicionar mais de 5 ou remover todas as imagens do anúncio!' });
            console.log(product_img, delete_img, delete_cover);
            const result = await Product.update(id_product, toUpdate, product_img, delete_img, delete_cover);
            return result.success ? res.send(result) : res.status(404).send(result);
        });
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });

        const product = await Product.findOne(id);

        if (!product.success ||
            (product.success && !Object.keys(product.product).length) ||
            (product.success && Object.keys(product.product).length && product.product.is_deleted))
            return res.status(404).send({ success: false, message: 'Produto inexistente!' });

        const result = await Product.delete(id);
        return result.success ? res.send(result) : res.status(404).send(result);
    }
}

module.exports = ProductController;
const Category = require('../models/Category');

class CategoryController {
    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });

        const category = await Category.findOne(id);
        return category.success ? res.send(category) : res.status(404).send(category);
    }

    static async index(req, res) {
        const category = await Category.findAll();
        return category[0] ? res.send({ success: true, category }) : res.status(404).send(category);
    }

    static async create(req, res) {
        const existName = await Category.findName(req.body.name);
        if (existName.success)
            return res.status(409).send({ success: false, message: 'Categoria já cadastrada!' });

        const category = await Category.create(req.body);
        return category.success ? res.send(category) : res.status(400).send(category);
    }
}

module.exports = CategoryController;

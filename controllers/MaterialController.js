const Material = require('../models/Material');
const MaterialSchema = require('../schemas/MaterialSchema');

class MaterialController {
    static async index(req, res) {
        const material = await Material.findAll();
        return material.success ? res.send(material) : res.status(404).send(material);
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido' });


        const material = await Material.findOne(id);
        material.success ? res.send(material) : res.status(404).send(material);
    }

    static async create(req, res) {
        const schema = MaterialSchema.createValidate();
        const { error } = schema.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const name = req.body.name.toLowerCase();

        const existName = await Material.findByName(name);
        if (existName.success && Object.keys(existName.material).length) {
            res.status(409).send({ success: false, message: 'Nome já cadastrado!' });
            return;
        }

        req.body.name = name;

        const result = await Material.create(req.body);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const schema = MaterialSchema.updateValidate();
        const { error } = schema.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const { id, name } = req.body;

        const form = {
            id,
            name: name.toLowerCase()
        };

        const material = await Material.findOne(form.id);

        if (material.success && Object.keys(material.material).length) {
            const toUpdate = {};

            if (form.name && material.name != form.name) {
                const existName = await Material.findByName(form.name);
                if (existName.success && Object.keys(existName.material).length)
                    return res.status(409).send({ success: false, message: 'Material já cadastrado' });


                toUpdate.name = form.name;
            }

            if (Object.keys(toUpdate).length) {

                toUpdate.id = form.id;

                const result = await Material.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(material);
        }
        return res.status(404).send({ success: false, message: 'O material não existe!' });
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' });


        const material = await Material.findOne(id);
        if ((!material.success ||
                (material.success && !Object.keys(material.material).length)) ||
            (material.success && Object.keys(material.material).length && material.material.is_deleted))
            return res.status(404).send({ success: false, message: 'Material inexistente!' });


        const result = await Material.delete(id);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = MaterialController;
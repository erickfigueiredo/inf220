const SalesmanAvaliation = require('../models/SalesmanAvaliation');
const Order = require('../models/Order');
const Salesman = require('../models/Salesman');
const Client = require('../models/Client');
const SalesmanAvaliationSchema = require('../schemas/SalesmanAvaliationSchema');

class SalesmanAvaliationController {
    static async index(req, res) {

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido' });
    
        
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const id = req.params.id_salesman;

        const avaliation = await SalesmanAvaliation.findAll(id, page);
        return avaliation.success ? res.send(avaliation) : res.status(404).send(avaliation);
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) 
            return res.status(400).send({ success: false, message: 'Id inválido' });


        const avaliacao = await SalesmanAvaliation.findOne(id);
        avaliacao.success ? res.send(avaliacao) : res.status(404).send(avaliacao);
    }

    static async create(req, res) {
        const schema = SalesmanAvaliationSchema.createValidate();
        const { error } = schema.validate(req.body);

        if (error) 
            return res.status(400).send({ success: false, message: error.details[0].message });


        const { liked, comment, id_order, id_client, id_salesman } = req.body;

        let avaliation = {
            liked,
            comment,
            id_order,
            id_client,
            id_salesman
        }

        const existOrder = await Order.findOne(id_order);
        if (!existOrder.success || !existOrder.order.id) 
            return res.status(404).send({ success: false, message: 'Ordem inexistente!'});


        const existClient = await Client.findOne(id_client);
        if (!existClient.success || !existClient.client.id_client) 
            return res.status(404).send({ success: false, message: 'Cliente inexistente!'});

        
        const existSalesman = await Salesman.findOne(id_salesman);
        if (!existSalesman.success || !existSalesman.salesman.id_salesman) 
            return res.status(404).send({ success: false, message: 'Vendedor inexistente!'});


        const existAvaliationInOrder = await SalesmanAvaliation.findByOrder(id_order);
        if (existAvaliationInOrder.success &&
            existAvaliationInOrder.avaliation.id_order &&
            existAvaliationInOrder.avaliation.id_client == id_client) 
                return res.status(409).send({ success: false, message: 'Já existe avaliação para essa ordem!'});


        const result = await SalesmanAvaliation.create(avaliation);
        result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {
        const schema = SalesmanAvaliationSchema.updateValidate();
        const { error } = schema.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });
    
        // Refazer
        const { liked, comment, id } = req.body;
        let form = {liked, comment, id};

        const avaliation = await SalesmanAvaliation.findOne(form.id);

        if(avaliation.success && Object.keys(avaliation.avaliation).lenght) {
            const toUpdate = {};

            if (form.liked && avaliation.liked != form.liked) toUpdate.liked = form.liked;

            if (form.comment && avaliation.comment != form.comment) toUpdate.comment = form.comment;

            if(Object.keys(toUpdate).length) {
                toUpdate.id = form.id;

                const result = await SalesmanAvaliation.update(toUpdate);
                return result.success ? res.send(result) : res.status(400).send(result);
            }
            return res.send(avaliation);
        } else {
            return res.status(404).send({success: false, message: 'Não foi possível encontrar a avaliação!'});
        }
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' })


        const avaliation = await SalesmanAvaliation.findOne(id);
        if (avaliation.success && avaliation.avaliation.is_deleted) 
            return res.status(404).send({ success: false, message: 'Avaliação não existe!' });
        
        else if (!discount.success) 
            return res.status(404).send({ success: false, message: 'Avaliação não existe!' });


        const result = await SalesmanAvaliation.delete(id);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
};

module.exports = SalesmanAvaliationController;

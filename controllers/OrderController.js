const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');
//const Product = require('../models/Product');

class OrderController {
    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const id_client = req.params.id_client;

        if (isNaN(parseInt(id_client))) {
            res.status(400).send({ success: false, message: 'Id inválido' });
            return;
        }


        let order = await Order.findAll(id_client, page); //Recupera os dados da ordem
        if (order.success) {
            let orderProducts = [];

            for (let i = 0; i < Object.keys(order.orders).length; i++) { //Para cada ordem recupera os
                const id_order = order.orders[i].id;                     //os registros do ordem_product
                orderProducts.push(await OrderProduct.findAll(id_order));
            }

            orderProducts = orderProducts[0];
            if (!orderProducts || !Object.keys(orderProducts).length) {
                res.status(404).send({ success: false, message: 'Falha ao recuperar ordem!' });
                return;
            }

            for (let i = 0; i < Object.keys(orderProducts).length; i++) {  //Para cada ordem_product
                if (!orderProducts.order_products[i]) {                    //recupera o produto 
                    res.status(404).send({ success: false, message: 'Falha ao recuperar ordem!' });
                    return;
                }
                const id_product = orderProducts.order_products[i].id_product;
                orderProducts.order_products[i].product = id_product; //TODO retrieve product
            }

            order.orders[0].order_products = orderProducts.order_products;  //Adiciona a ordem todos esses dados
            res.send(order);
        } else res.status(404).send(order)
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            res.status(404).send({ success: false, message: 'Id inválido' });
            return;
        }

        let order = await Order.findOne(id); //Recupera os dados da ordem
        if (order.success) {

            const id_order = order.order.id;
            let orderProducts = await OrderProduct.findAll(id_order);

            if (!orderProducts.success) {
                res.status(404).send({ success: false, message: 'Falha ao recuperar compra!' });
                return;
            }

            for (let i = 0; i < Object.keys(orderProducts.order_products).length; i++) {
                if (!orderProducts.order_products[i]) {                    //recupera o produto 
                    res.status(404).send({ success: false, message: 'Falha ao recuperar compra!' });
                    return;
                }
                const id_product = orderProducts.order_products[i].id_product;
                orderProducts.order_products[i].product = id_product; //TODO retrieve product
            }

            order.order.order_products = orderProducts.order_products;  //Adiciona a ordem todos esses dados
            res.send(order);
        } else res.status(404).send(order)
    }

    static async create(req, res) {
        const result = await Order.create(req.body);
        result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {

        const toUpdate = {
            id: req.body.id,
            is_delivered: true
        };

        const result = await Order.update(toUpdate);
        result.success ? res.send(result) : res.status(400).send(result);
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) {
            res.status(400).send({ success: false, message: 'Id inválido' });
            return;
        }

        const order = await Order.findOne(id);
        if ((!order.success || (order.success && !Object.keys(order.order).length)) || (order.success && Object.keys(order.order).length && order.order.is_deleted)) {
            res.status(404).send({ success: false, message: 'Compra inexistente' });
            return;
        }

        const result = await Order.delete(id);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = OrderController;

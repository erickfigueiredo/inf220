const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const Market = require('../models/Market');
const Address = require('../models/Address');

class OrderController {

    static async index(req, res) {
        const id_client = req.params.id_client;

        if (isNaN(parseInt(id_client)))
            return res.status(400).send({ success: false, message: 'Id inválido' });


        const order = await Order.findAll(id_client);
        if(order.success) {
            for(let i = 0; i < order.order.length; i++){
                const id_order = order.order[i].id;
                const products = await OrderProduct.findAll(id_order)
                order.order[i].orderProducts = products.order_products;
            }
            return res.send(order);
        } else res.status(404).send(order);
    }

    static async show(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id))) 
            return res.status(404).send({ success: false, message: 'Id inválido' });
            
        

        const order = await Order.findOne(id); //Recupera os dados da ordem
        if (order.success) {

            const id_order = order.order.id;
            const orderProducts = await OrderProduct.findAll(id_order);

            if (!orderProducts.success)
                return res.status(404).send(orderProducts);


            for (let i = 0; i < Object.keys(orderProducts.order_products).length; i++) {
                let id_product = orderProducts.order_products[i].id_product;
                const product = await Product.findOne(id_product);
                orderProducts.order_products[i].product = product.product;
            }

            order.order.order_products = orderProducts.order_products;  
        } else return res.status(404).send(order);
    }

    static async rankClients(req, res) {
        const result = await Order.rankByMostNumOrder();

        result.success ? res.send(result) : res.status(400).send(result);
    }

    static async rankProducts(req, res) {
        const id_category = req.params.id_category;

        if(isNaN(parseInt(id_category)))
            return res.status(400).send({success: false, message: 'Id inválido'});
        
        const existCategory = await Category.findOne(id_category);
        if(!existCategory.success)
            res.status(404).send({success: false, message: 'Categoria inexistente!'});

        const result = await Order.rankByQuantityProductCategory(id_category);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async listOrders(req, res) {
        const id = req.params.id_user;

        const existUser = await User.findOne(id);

        if (existUser.success) {
            let result = await Order.listOrders(id, existUser.user.type);
            return result.success ? res.send(result) : res.status(400).send(result);
        }

        return res.send({ success: false, message: 'Usuário inexistente!' });
    }

    static async create(req, res) {
        const { id_products, id_client, id_market, quantities, tip, id_payment_method, description } = req.body

        let data = {
            id_client,
            id_market,
            tip,
            id_payment_method
        }

        const existClient = await User.findOne(id_client);
        if (!existClient.success)
            return res.status(404).send(existClient);

        const existMarket = await Market.findOne(id_market);
        if (!existMarket.success)
            return res.status(404).send(existMarket);

        const marketAddress = await Address.findOne(existMarket.market.id_address);
        const clientAddress = await Address.findByUser(existClient.user.id);

        data.shipping = Math.floor(Math.abs(parseInt(marketAddress.address.zipcode) - parseInt(clientAddress.address.zipcode)) / 1200000 * Math.E + 7);


        const hasDeliveryman = await User.hasDeliverymanAvailable();
        if (!hasDeliveryman.success)
            return res.send({ success: false, message: 'Não há entregadores disponíveis no momento!' });

        data.id_deliveryman = hasDeliveryman.deliveryman;


        const result = await Order.create(data, id_products, quantities, description);

        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async update(req, res) {

        const { id_order, is_delivered, status } = req.body
        const data = {
            is_delivered,
            status
        }

        const existOrder = await Order.findOne(id_order);
        if(existOrder.success) {

            const result = await Order.update(data, id_order);
            result.success ? res.send(result) : res.status(400).send(result);
        }
        return res.status(404).send(existOrder);
    }
}

module.exports = OrderController;

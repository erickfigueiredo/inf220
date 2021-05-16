const Cart = require('../models/Cart');
const Client = require('../models/User');
const Product = require('../models/Product');

class CartController {
    static async index(req, res) {
        const id_user = req.params.id_user;

        if (isNaN(parseInt(id_user)))
            return res.status(400).send({ success: false, message: 'Id inválido' });

        const user = await Client.findOne(id_user);
        if (!user.success) return res.status(400).send({ success: false, message: 'Usuário não existe!' });

        const cart = await Cart.findCartByClient(id_user, page);
        return cart.success ? res.send(cart) : res.status(404).send(cart);
    }

    static async show(req, res) {
        const id_item = req.params.id_item;

        if (isNaN(parseInt(id_item)))
            return res.status(400).send({ success: false, message: 'Id inválido' });

        const cart = await Cart.findOne(id_item);
        cart.success ? res.send(cart) : res.status(404).send(cart);
    }

    static async quantity(req, res) {
        const id_user = req.params.id_user;

        if (isNaN(parseInt(id_user)))
            return res.status(400).send({ success: false, message: 'Id inválido' });

        const user = await Client.findOne(id_user);
        if (!user.success) return res.status(404).send('Usuário não existe!');

        const cart = await Cart.findCartQuantity(id_user);
        return cart.success ? res.send(cart) : res.status(404).send(cart);
    }

    static async create(req, res) {
        const { id_user, id_product, quantity } = req.body

        let data = {
            id_user,
            id_product,
            quantity
        }

        const itemsInCart = await Cart.findCartByUser(id_user);
        if (itemsInCart.success && itemsInCart.cart.data.length) {
            for (let item of itemsInCart.cart.data) {
                if (item['id_product'] == id_product && item['cart_quantity'] + quantity > item.product_quantity) return res.status(400).send({ success: false, message: 'Quantidade maior que a disponível!' });
                else if (item['id_product'] == id_product) {
                    data.quantity = item.cart_quantity + quantity;
                    data.exists = true;
                }
            }
        }

        if (data.exists) {
            const result = await Cart.updateByIdUserAndIdProduct(id_user, id_product, data.quantity);
            return result.success ? res.send(result) : res.status(400).send(result);
        } else {
            const result = await Cart.create(data);
            return result.success ? res.send(result) : res.status(400).send(result);
        }
    }

    static async update(req, res) {

        const { id_item, quantity } = req.body;
        if (!quantity) {
            const result = await this.delete(req, res);
            return result.success ? res.send(result) : res.status(400).send(result);
        }

        const cartItem = await Cart.findOne(id_item);
        if (!cartItem.success)
            return res.status(400).send(cartItem);


        const product = await Product.findOne(cartItem.item.id_product);
        console.log(cartItem)
        if (quantity > product.product.quantity)
            return res.status(400).send({ success: false, message: 'Quantidade maior que a disponível!' });

        const result = await Cart.updateByIdItem(id_item, { quantity });
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async delete(req, res) {
        const id_item = req.params.id_item || req.body.id_item;

        if (isNaN(parseInt(id_item)))
            return res.status(400).send({ success: false, message: 'Id inválido' });

        const item = await Cart.findOne(id_item);
        if ((!item.success || (item.success && !Object.keys(item.item).length)))
            return res.status(404).send({ success: false, message: 'Item não existe!' });


        const result = await Cart.delete(id_item);
        return result.success ? res.send(result) : res.status(400).send(result);
    }
}

module.exports = CartController;
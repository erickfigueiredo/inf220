const router = require('express').Router();

const AddressController = require('../controllers/AddressController');
const CartController = require('../controllers/CartController');
const CategoryController = require('../controllers/CategoryController');
const ClientController = require('../controllers/ClientController');
const DeliverymanController = require('../controllers/DeliverymanController');
const MarketController = require('../controllers/MarketController');
const OrderController = require('../controllers/OrderController');
const PaymentMethodController = require('../controllers/PaymentMethodController');
const ProductController = require('../controllers/ProductController');
const VehicleController = require('../controllers/VehicleController');
const WalletController = require('../controllers/WalletController');
const WalletWithdrawController = require('../controllers/WalletWithdrawController');

// Address routes
router.get('/address/all/:id_user', AddressController.index);
router.get('/address/:id', AddressController.show);
router.post('/address', AddressController.create);
router.put('/address', AddressController.update);
router.delete('/address/:id', AddressController.delete);

// Cart routes
router.get('/cart/all/:id_user', CartController.index);
router.get('/cart/:id_item', CartController.show);
router.get('/cart/quantity', CartController.quantity);
router.post('/cart', CartController.create);
router.put('/cart', CartController.update);
router.delete('/cart', CartController.delete);

// Category routes
router.get('/category/all', CategoryController.index);
router.get('/category/:id', CategoryController.show);
router.post('/category', CategoryController.create);

// Client routes
router.get('/client/all', ClientController.index);
router.get('/client/:id', ClientController.show);
router.post('/client', ClientController.create);
router.put('/client', ClientController.update);
router.delete('/client/:id', ClientController.delete);

// Deliveryman routes
router.get('/deliveryman/all', DeliverymanController.index);
router.get('/deliveryman/:id', DeliverymanController.show);
router.get('/deliveryman/available', DeliverymanController.getAvailableToOrder);
router.post('/deliveryman', DeliverymanController.create);
router.put('/deliveryman', DeliverymanController.update);
router.delete('/deliveryman/:id', DeliverymanController.delete);

// Market routes
router.get('/market/all', MarketController.index);
router.get('/market/:id', MarketController.show);
router.post('/market', MarketController.create);
router.put('/market', MarketController.update);

// Order routes
router.get('/order/all/:id_client', OrderController.index);
router.get('/order/:id', OrderController.show);
router.post('/order', OrderController.create);
router.put('/order', OrderController.update);

// Payment routes
router.get('/paymentmethod/all/:id_client', PaymentMethodController.index);
router.get('/paymentmethod/:id', PaymentMethodController.show);
router.post('/paymentmethod', PaymentMethodController.create);
router.delete('/paymentmethod/:id',PaymentMethodController.delete);

// Product routes
router.get('/product/all/:id_market', ProductController.index);
router.get('/product/:id', ProductController.show);
router.post('/product/search', ProductController.search);
router.post('/product', ProductController.create);
router.put('/product', ProductController.update);
router.delete('/product', ProductController.delete);

// Vehicle routes
router.get('/vehicle/all/:id_user', VehicleController.index);
router.get('/vehicle/:id', VehicleController.show);
router.post('/vehicle', VehicleController.create);

// Wallet routes
router.get('/wallet/all', WalletController.index);
router.get('/wallet/:id_wallet', WalletController.show);
router.put('/wallet', WalletController.update);

// Wallet Withdraw routes
router.get('/withdraw/all', WalletWithdrawController.index);
router.get('/withdraw/:id_withdraw', WalletWithdrawController.show);
router.post('/withdraw', WalletWithdrawController.create);

// Erro 404
router.get('/bermuda_triangle', (req, res) => {
    res.status(404).send('ERRO 404 | What??? Maybe you should not be here... ¯\\_(ツ)_/¯');
});

router.get('*', (req, res) => {
    res.redirect('/bermuda_triangle');
});

module.exports = router;
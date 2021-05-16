const router = require('express').Router();

const AddressController = require('../controllers/AddressController');
const CartController = require('../controllers/CartController');
const CategoryController = require('../controllers/CategoryController');
const ClientController = require('../controllers/ClientController');
const DeliverymanController = require('../controllers/DeliverymanController');
const MarketController = require('../controllers/MarketController');
const ProductController = require('../controllers/ProductController');
const WalletController = require('../controllers/WalletController');

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

// Erro 404
router.get('/bermuda_triangle', (req, res) => {
    res.status(404).send('ERRO 404 | What??? Maybe you should not be here... ¯\\_(ツ)_/¯');
});

router.get('*', (req, res) => {
    res.redirect('/bermuda_triangle');
});

module.exports = router;
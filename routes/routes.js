const router = require('express').Router();


// User routes
const UserController = require('../controllers/UserController');

// -> Login
router.post('/login', UserController.login);

router.get('/user/all', UserController.index);
router.get('/user/:id', UserController.show);
router.post('/user', UserController.create);
router.put('/user', UserController.update);
router.delete('/user/:id', UserController.delete);

// client routes
const ClientController = require('../controllers/ClientController');

router.get('/client/all', ClientController.index);
router.get('/client/:id', ClientController.show);
router.post('/client', ClientController.create);
router.put('/client', ClientController.update);
router.delete('/client/:id', ClientController.delete);

// Salesman routes
const SalesmanController = require('../controllers/SalesmanController');

router.get('/salesman/all', SalesmanController.index)
router.get('/salesman/:id', SalesmanController.show)
router.post('/salesman', SalesmanController.create)
router.put('/salesman', SalesmanController.update)
router.delete('/salesman/:id', SalesmanController.delete)

// Bank routes
const BankController = require('../controllers/BankController');

router.get('/bank/all', BankController.index);
router.get('/bank/:id', BankController.show);
router.post('/bank', BankController.create);
router.put('/bank', BankController.update);
router.delete('/bank/:id', BankController.delete);

// Material routes
const MaterialController = require('../controllers/MaterialController');

router.get('/material/all', MaterialController.index);
router.get('/material/:id', MaterialController.show);
router.post('/material', MaterialController.create);
router.put('/material', MaterialController.update);
router.delete('/material/:id', MaterialController.delete);

// Address routes
const AddressController = require('../controllers/AddressController');

router.get('/address/all/:id_user', AddressController.index);
router.get('/address/:id', AddressController.show);
router.post('/address', AddressController.create);
router.put('/address', AddressController.update);
router.delete('/address/:id', AddressController.delete);

// Order routes
const OrderController = require('../controllers/OrderController');

router.get('/order/all/:id_client', OrderController.index);
router.get('/order/:id', OrderController.show);
router.post('/order', OrderController.create);
router.put('/order', OrderController.update);
router.delete('/order/:id', OrderController.delete);

// Discount routes
const DiscountController = require('../controllers/DiscountController');

router.get('/discount/all', DiscountController.index);
router.get('/discount/:id', DiscountController.show);
router.post('/discount', DiscountController.create);
router.put('/discount', DiscountController.update);
router.delete('/discount/:id', DiscountController.delete);

// Product routes
const ProductController = require('../controllers/ProductController');

router.get('/product/all', ProductController.index);
router.get('/product/search', ProductController.search);
router.get('/product/:id', ProductController.show);
router.get('/product/salesman/:id_salesman', ProductController.indexBySalesman);
router.post('/product', ProductController.create);
router.put('/product', ProductController.update);
router.delete('/product/:id', ProductController.delete);

//Recovery routes
router.get('/confirm', UserController.confirmEmail); //query param token needed
router.post('/recover-password', UserController.recoverPassword);
router.post('/resend-confirm', UserController.resendConfirm)
router.post('/change-password', UserController.changePassword); //query param token needed

//Cart Routes
const CartController = require('../controllers/CartController');
router.get('/cart/:id_item', CartController.show);
router.get('/cart/quantity/:id_user', CartController.quantity);
router.get('/cart/all/:id_user', CartController.index);
router.post('/cart', CartController.create);
router.put('/cart', CartController.update);
router.delete('/cart/:id_item', CartController.delete);

// Erro 404
router.get('/bermuda_triangle', (req, res) => {
    res.status(404).send('ERRO 404 | What??? Maybe you should not be here... ¯\\_(ツ)_/¯');
});

router.get('*', (req, res) => {
    res.redirect('/bermuda_triangle');
});

module.exports = router;
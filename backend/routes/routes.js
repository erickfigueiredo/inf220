const router = require('express').Router();

const AddressController = require('../controllers/AddressController');
const ClientController = require('../controllers/ClientController');
const DeliverymanController = require('../controllers/DeliverymanController');
const MarketplaceController = require('../controllers/MarketplaceController');
const ProductController = require('../controllers/ProductController');
const WalletController = require('../controllers/WalletController');

// Address routes

router.get('/address/all/:id_user', AddressController.index);
router.get('/address/:id', AddressController.show);
router.post('/address', AddressController.create);
router.put('/address', AddressController.update);
router.delete('/address/:id', AddressController.delete);

// Erro 404
router.get('/bermuda_triangle', (req, res) => {
    res.status(404).send('ERRO 404 | What??? Maybe you should not be here... ¯\\_(ツ)_/¯');
});

router.get('*', (req, res) => {
    res.redirect('/bermuda_triangle');
});

module.exports = router;
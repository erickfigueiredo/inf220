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

// Address routes
const AddressController = require('../controllers/AddressController');

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
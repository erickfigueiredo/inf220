require('dotenv').config();

const Message = require('./utils/Message');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const router = require('./routes/routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.get('/login', function(req, res) {
    res.render('pages/login');
});

app.get('/register', function(req, res) {
    res.render('pages/register');
});

app.get('/cart', function(req, res) {
    var oferts = [
        {name:'teste1', preco:'testePreco', desc:'testeDesc', image:'srcImage'},
        {name:'teste2', preco:'testePreco', desc:'testeDesc', image:'srcImage'},
        {name:'teste3', preco:'testePreco', desc:'testeDesc', image:'srcImage'},
        {name:'teste4', preco:'testePreco', desc:'testeDesc', image:'srcImage'},
        {name:'teste4', preco:'testePreco', desc:'testeDesc', image:'srcImage'},
        {name:'teste3', preco:'testePreco', desc:'testeDesc', image:'srcImage'},
        {name:'teste4', preco:'testePreco', desc:'testeDesc', image:'srcImage'},
        {name:'teste4', preco:'testePreco', desc:'testeDesc', image:'srcImage'}
    ];

    res.render('pages/cart', {
        oferts: oferts
    });
});

app.get('/market', function(req, res) {
    res.render('pages/market');
});

app.get('/product', function(req, res) {
    res.render('pages/product');
});

app.get('/', function(req, res) {

    var oferts = [
        {name:'teste1', preco:'testePreco', desc:'testeDesc', image:'srcImage'},
        {name:'teste2', preco:'testePreco', desc:'testeDesc', image:'srcImage'},
        {name:'teste3', preco:'testePreco', desc:'testeDesc', image:'srcImage'},
        {name:'teste4', preco:'testePreco', desc:'testeDesc', image:'srcImage'}
    ];

    res.render('pages/home', {
        oferts: oferts
    });
});
// Raiz usará o módulo router
app.use('/', router);

app.listen(process.env.APP_PORT, (error) => {
    Message.release('\nVersão: 0.0.1')
    Message.success(`\nServidor rodando na porta ${process.env.APP_PORT}\n`);
    if(error) Message.error('Servidor encerrado!\n');
});
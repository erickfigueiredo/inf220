const path = require('path')
const Message = require('./utils/Message')
const morgan = require('morgan')
const express = require('express')
const app = express()
const router = require('./routes/routes')
const helmet = require('helmet')

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

if (process.env.STORAGE_TYPE === 'local') {
    app.use(
        '/files',
        express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    )
}

// Raiz usará o o modulo router
app.use('/', router)

Message.info('\nNão faça alterações no sistema!')

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    allowEIO4: true,
    cors: {
        origin: 'http://localhost:3001'
    }
})
const WebSockets = require('./utils/WebSockets.js')

global.io = io.listen(server)
global.io.on('connection', WebSockets.connection)

server.listen(process.env.APP_PORT || 3000, error => {
    Message.release(`\nAPI Versão: ${process.env.APP_VERSION}`)
    Message.success(
        `Servidor rodando na porta: ${process.env.APP_PORT || 3000}  ;^)\n`
    )
    if (error) Message.error('Servidor encerrado! >:^(\n')
})
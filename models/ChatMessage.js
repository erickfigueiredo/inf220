const uuid = require('uuid')
require('dotenv').config()
const dynamo = require('dynamodb')
const Joi = require('joi')

dynamo.AWS.config.update({
    region: 'sa-east-1'
})

const ChatRoom = new dynamo.define('ChatMessage', {
    hashKey: 'id',

    timestamps: true,

    schema: {
        id: dynamo.types.uuid(),
        id_room: Joi.string(),
        message: Joi.string(),
        posted_by: Joi.number(),
        is_media: Joi.boolean()
    }
})

dynamo.createTables();

module.exports = ChatRoom
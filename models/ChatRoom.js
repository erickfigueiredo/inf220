const uuid = require('uuid')
require('dotenv').config()
const dynamo = require('dynamodb')
const Joi = require('joi')

dynamo.AWS.config.update({
    region: 'sa-east-1'
})

const ChatRoom = new dynamo.define('ChatRoom', {
    hashKey: 'user_one',
    rangeKey: 'user_two',

    timestamps: true,

    schema: {
        user_one: Joi.number(),
        user_two: Joi.number(),
        id: dynamo.types.uuid(),
        updatedAt: Joi.date().timestamp()
    }
})

dynamo.createTables();

module.exports = ChatRoom
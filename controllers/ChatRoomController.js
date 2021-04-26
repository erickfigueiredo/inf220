const ChatRoom = require('../models/ChatRoom')
const ChatMessage = require('../models/ChatMessage');;
const ChatSchema = require('../schemas/ChatSchema');
const User = require('../models/User');

class ChatRoomController {
    static async initiate(req, res) {
        try {
            const schema = await ChatSchema.initiateValidate()
            const { error } = schema.validate(req.body)

            if (error)
                return res.status(400).send({ success: false, message: error.details[0].message })

            const { id_client, id_salesman } = req.body
            const chatRoom = await ChatRoom.get({
                user_one: id_client,
                user_two: id_salesman
            })

            if (chatRoom)
                return res.status(200).json({ success: true, data: { isNew: false, id_room: chatRoom.attrs.id, message: 'Sala já existe' } });

            const newRoom = await ChatRoom.create({ user_one: id_client, user_two: id_salesman, updatedAt: new Date().getTime()})
            return res.status(200).json({ success: true, data: { isNew: true, id_room: newRoom.attrs.id, message: 'Sala não existe, criando nova...' } });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, error: error })
        }
    }

    static async postMessage(req, res) {
        try {
            const schema = await ChatSchema.messageValidate()
            const { error } = schema.validate(req.body)

            if (error)
                return res.status(400).send({ success: false, message: error.details[0].message })

            const { id_room, message } = req.body;
            const currentLoggedUser = req.locals.id_user; //req.locals.id_user; //TODO avaliar isso do middleware...

            const post = await ChatMessage.create({ id_room, message, posted_by: currentLoggedUser, is_media: false });
            const room = await ChatRoom.scan().limit(1).where('id').equals(id_room).attributes(['user_one', 'user_two']).exec(async (error, data, c) => {
                if(data && data.Items.length){
                    console.log(data.Items)
                    const updated = await ChatRoom.update({user_one: data.Items[0].attrs.user_one, user_two: data.Items[0].attrs.user_two, updatedAt: new Date().getTime()})
                }
            })


            global.io.sockets.in(id_room).emit('newMessage', { message: post.attrs });
            return res.status(200).json({ success: true, data: post.attrs });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, error: error })
        }
    }

    static async postMedia(req, res) {

    }

    static async getConversationByRoom(req, res) {
        try {
            const { id_room } = req.params;
            ChatMessage.scan().limit(500).where('id_room').equals(id_room).attributes(['createdAt', 'message', 'is_media', 'id', 'posted_by']).exec((error, data, c) => {
                console.log(error)
                return res.status(200).json({
                    success: true,
                    conversation: data.Items || {},
                });
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, error });
        }
    }

    static async getUserChats(req, res) {
        try {
            const { id_user } = req.params;
            ChatRoom.scan().limit(500).where('user_one').equals(parseInt(id_user)).attributes(['id', 'user_two', 'updatedAt']).exec((error, data1, c) => {
                ChatRoom.scan().limit(500).where('user_two').equals(parseInt(id_user)).attributes(['id', 'user_one', 'updatedAt']).exec(async (error, data2, c) => {
                    const otherUsersId = [];
                    data1.Items = data1.Items.map(room => {
                        otherUsersId.push(room.attrs.user_two ? room.attrs.user_two : room.attrs.user_one);
                        return {
                            id_room: room.attrs.id,
                            other_user: room.attrs.user_two ? room.attrs.user_two : room.attrs.user_one,
                            updatedAt: room.attrs.updatedAt
                        }
                    })

                    data2.Items = data2.Items.map(room => {
                        otherUsersId.push(room.attrs.user_two ? room.attrs.user_two : room.attrs.user_one);
                        return {
                            id_room: room.attrs.id,
                            other_user: room.attrs.user_two ? room.attrs.user_two : room.attrs.user_one,
                            updatedAt: room.attrs.updatedAt
                        }
                    })

                    const users = await User.findSalesmanOrClientByUserId(otherUsersId);
                    if (!users.success) return res.status(400).send({ success: false, message: users.message });
                    let data = [...data1.Items, ...data2.Items];
                    data = data.map(room => {
                        for (const user of users.users) {
                            if (user.id == room.other_user) {
                                room['other_user'] = user ;
                                return room;
                            }
                            
                        }
                    })

                    return res.status(200).json({
                        success: true,
                        conversations: data || [],
                    })
                })
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, error });
        }
    }
}

module.exports = ChatRoomController
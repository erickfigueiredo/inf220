let users = [];
class WebSockets {
    connection(client) {
        // event fired when the chat room is disconnected
        client.on("disconnect", () => {
            users = users.filter(user => user.socketId != client.id)
        });
        // add identity of user mapped to the socket id
        client.on("identify", (userId) => {
            console.log('entrou', userId, users)
            users.push({
                socketId: client.id,
                userId: userId,
            });
        });
        // subscribe person to chat & other user as well
        client.on("subscribe", (room) => {
            client.join(room);
        });
        // mute a chat room
        client.on("unsubscribe", (room) => {
            client.leave(room);
            console.log(client.id)
            users = users.filter(user => user.socketId != client.id)
        });
    }

    subscribeOtherUser(room, otherUserId) {
        const userSockets = this.users.filter(
            (user) => user.userId === otherUserId
        );
        userSockets.map((userInfo) => {
            const socketConn = global.io.sockets.connected(userInfo.socketId);
            if (socketConn) {
                socketConn.join(room);
            }
        });
    }
}

module.exports = new WebSockets();
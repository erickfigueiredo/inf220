<template>
  <div class="flex flex-col">
    <input type="checkbox" id="click" />
    <label class="bg-red-600" for="click">
      <i class="far fa-comments"></i>
    </label>
    <div class="wrapper mr-5">
      <div class="chat h-100">
        <div class="bg-gray-800 rounded-t-lg">
          <div class="contact bar">
            <div class="name text-white font-bold text-xl">
              {{ salesman.business_name }}
            </div>
          </div>
        </div>
        <div class="flex justify-center content-center">
          <svg
            class="ml-32 pl-4"
            v-if="loading"
            version="1.1"
            id="L4"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 250 200"
            enable-background="new 0 0 0 0"
            xml:space="preserve"
          >
            <circle fill="#333" stroke="none" cx="6" cy="50" r="6">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.1"
              />
            </circle>
            <circle fill="#333" stroke="none" cx="26" cy="50" r="6">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.2"
              />
            </circle>
            <circle fill="#333" stroke="none" cx="46" cy="50" r="6">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.3"
              />
            </circle>
          </svg>
        </div>
        <div v-if="!loading" class="messages h-100" id="messages">
            <template v-for="message in messages" :key="message.id">
              <div
                class="message"
                :class="{ me: message.posted_by == id_user }"
              >
                {{ message.message }}
              </div>
              <small
                align="right"
                class="w-full block hour"
                :class="{ me: message.posted_by == id_user }"
                >{{new Date(message.createdAt).toLocaleString()}}</small
              >
            </template>
          <div v-if="!loading && !messages.length">
            <p class="flex justify-center">Nenhuma mensagem ainda...</p>
          </div>
          <div ref="last" class="none"></div>
        </div>
        <div class="input">
          <input
            v-model="message"
            placeholder="Digite sua mensagem aqui!"
            @keyup="sendMessage"
            class="rounded focus:border-red-600 focus:outline-none"
            type="text"
          />
          <i
            class="fas fa-paper-plane text-red-600 hover:text-red-800 mr-4 cursor-pointer"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from "../services/Chat";
export default {
  data() {
    return {
      id_client: undefined,
      id_room: undefined,
      messages: [],
      message: undefined,

      loading: true,
    };
  },
  props: {
    salesman: {},
  },
  sockets: {
    newMessage(data) {
      this.messages.push(data.message);
      console.log(data)
      setTimeout(() => this.scroll(), 500);
    },
  },
  methods: {
    scroll(){
        const scrDiv = document.getElementById('messages'); 
        scrDiv.scrollTop = scrDiv.scrollHeight;
    },
    async sendMessage(event) {
      if (event.key != "Enter") return;

      const result = await Chat.sendMessage({
        id_room: this.id_room,
        message: this.message,
      });
      result.success ? undefined : console.log(result);
      this.scroll();
      this.message = '';
    },
  },
  async created() {
    console.log(this.$socket);
    this.id_user = this.$store.state.user.user.id_user;
    const res = this.$socket.client.emit(
      "identify",
      this.id_client
    );

    const chatRoom = await Chat.initiateChatRoom({
      id_client: this.id_user,
      id_salesman: this.salesman.id_user,
    });
    if (chatRoom.success) {
      this.id_room = chatRoom.data.id_room;
      const res = this.$socket.client.emit("subscribe", this.id_room);
      const messages = await Chat.retriveChatMessage(this.id_room);
      
      if (messages.success) {
        messages.conversation.sort((a, b) => {
          if(new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()) return 1;
          else return -1;
        })
        this.messages = messages.conversation;
      }
      this.loading = false;
      setTimeout(() => this.scroll(), 500);
    }
  },
  beforeUnmount() {
    this.$socket.client.emit('unsubscribe', this.id_room);
    console.log('unsubscribe')
  },
};
</script>

<style scoped>
input:focus {
  border: none !important;
}

.center {
  position: absolute;
  top: 50%;
  left: calc(50% + 12rem);
  transform: translate(-50%, -50%);
}

.pic {
  width: 4rem;
  height: 4rem;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.contact {
  position: relative;
  margin-bottom: 1rem;
  padding-left: 1rem;
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.contact .pic {
  position: absolute;
  left: 0;
}
.contact .name {
  margin-bottom: 0.125rem;
}
.contact .message,
.contact .seen {
  font-size: 0.9rem;
  color: #999;
}
.contact .badge {
  box-sizing: border-box;
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  padding-top: 0.125rem;
  border-radius: 1rem;
  top: 0;
  left: 2.5rem;
  background: #333;
  color: white;
}

.contacts {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-6rem, -50%);
  width: 24rem;
  height: 32rem;
  padding: 1rem 2rem 1rem 1rem;
  box-sizing: border-box;
  border-radius: 1rem 0 0 1rem;
  cursor: pointer;
  background: white;
  box-shadow: 0 0 8rem 0 rgba(0, 0, 0, 0.1),
    2rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5);
  transition: transform 500ms;
}
.contacts h2 {
  margin: 0.5rem 0 1.5rem 5rem;
}
.contacts .fa-bars {
  position: absolute;
  left: 2.25rem;
  color: #999;
  transition: color 200ms;
}
.contacts .fa-bars:hover {
  color: #666;
}
.contacts .contact:last-child {
  margin: 0;
}
.contacts:hover {
  transform: translate(-23rem, -50%);
}

.chat {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20rem;
  height: 30rem;
  z-index: 2;
  box-sizing: border-box;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 0 8rem 0 rgba(0, 0, 0, 0.1),
    0rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5);
}
.chat .contact.bar {
  flex-basis: 3.5rem;
  flex-shrink: 0;
  margin: 0.3rem;
  box-sizing: border-box;
}
.chat .messages {
  padding: 1rem;
  background: #f7f7f7;
  height: 100%;
  flex-shrink: 2;
  overflow-y: auto;
  overflow-x: hidden;
  overflow: none;
  box-shadow: inset 0 2rem 2rem -2rem rgba(0, 0, 0, 0.05),
    inset 0 -2rem 2rem -2rem rgba(0, 0, 0, 0.05);
}
.chat .messages .time {
  font-size: 0.8rem;
  background: #eee;
  padding: 0.25rem 1rem;
  border-radius: 2rem;
  color: #999;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.chat .messages .message {
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  margin: 1rem;
  background: #fff;
  border-radius: 1.125rem 1.125rem 1.125rem 0;
  min-height: 2.25rem;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  max-width: 66%;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075),
    0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word;
}
.chat .messages .message.me {
  margin: 1rem 1rem 0rem auto;
  border-radius: 1.125rem 1.125rem 0 1.125rem;
  background: #2d3748;
  color: white;
}
.chat .messages .message .typing {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0rem;
  box-sizing: border-box;
  background: #ccc;
  border-radius: 50%;
}
.chat .messages .message .typing.typing-1 {
  -webkit-animation: typing 3s infinite;
  animation: typing 3s infinite;
}
.chat .messages .message .typing.typing-2 {
  -webkit-animation: typing 3s 250ms infinite;
  animation: typing 3s 250ms infinite;
}
.chat .messages .message .typing.typing-3 {
  -webkit-animation: typing 3s 500ms infinite;
  animation: typing 3s 500ms infinite;
}
.chat .input {
  box-sizing: border-box;
  flex-basis: 4rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0 1.5rem;
}
.chat .input i {
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #666;
  cursor: pointer;
  transition: color 200ms;
}
.chat .input i:hover {
  color: #333;
}
.chat .input input {
  border: none;
  background-image: none;
  background-color: white;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 1.125rem;
  flex-grow: 2;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1),
    0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.2);
  font-family: Red hat Display, sans-serif;
  font-weight: 400;
  letter-spacing: 0.025em;
}
.chat .input input:placeholder {
  color: #999;
}

@-webkit-keyframes typing {
  0%,
  75%,
  100% {
    transform: translate(0, 0.25rem) scale(0.9);
    opacity: 0.5;
  }
  25% {
    transform: translate(0, -0.25rem) scale(1);
    opacity: 1;
  }
}

@keyframes typing {
  0%,
  75%,
  100% {
    transform: translate(0, 0.25rem) scale(0.9);
    opacity: 0.5;
  }
  25% {
    transform: translate(0, -0.25rem) scale(1);
    opacity: 1;
  }
}

.wrapper {
  position: absolute;
  right: 10px;
  bottom: 0px;
  max-width: 400px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
#click:checked ~ label i.fas {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) rotate(180deg);
}
#click:checked ~ label i.fab {
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(180deg);
}
#click:checked ~ .wrapper {
  opacity: 1;
  bottom: 85px;
  pointer-events: auto;
}

label {
  position: absolute;
  right: 30px;
  bottom: 20px;
  height: 55px;
  width: 55px;
  text-align: center;
  line-height: 55px;
  border-radius: 50px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
}
label i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
}
label i.fas {
  opacity: 0;
  pointer-events: none;
}
#click {
  display: none;
}

.hour.me {
  box-sizing: border-box;
  background: transparent;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  max-width: 66%;

  margin: 0rem 1rem 0rem auto;
  border-radius: 1.125rem 1.125rem 0 1.125rem;
  color: #333;
}
.hour {
  box-sizing: border-box;
  background: transparent;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  max-width: 50%;
  margin-left: 1rem;
  margin-top: 0rem;
}
.seller {
  margin-bottom: 0.5rem !important;
  margin-top: 0rem !important;
}
.me {
  margin-bottom: 0.5rem !important;
  margin-top: 0.5rem !important;
}
</style>
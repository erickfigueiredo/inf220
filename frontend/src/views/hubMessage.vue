<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow px-6 pt-8 pb-2">
      <div class="flex-none md:flex md:flex-row-reverse">
        <div
          class="w-full md:w-4/6 rounded-lg md:rounded-none md:rounded-tr-lg md:rounded-br-lg bg-gray-700 pt-4 pl-4 pr-4"
        >
          <div id="messages" v-if="chats.length" class="chat-area overflow-y-auto px-2">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="my-2 message p-2 rounded-t-lg shadow-xl"
              :class="{
                'message-out rounded-bl-lg': message.posted_by == $store.state.user.user.id_user,
                'message-in rounded-br-lg': message.posted_by !==  $store.state.user.user.id_user,
              }"
            >
              <span class="font-bold">{{message.posted_by == $store.state.user.user.id_user ? $store.state.user.user.name : chatOpen.other_user.business_name}}</span>
              <p>{{ message.message }}</p>
              <div class="text-right">
                <small>{{ new Date(message.createdAt).toLocaleString() }}</small>
              </div>
            </div>
          </div>
          <div v-if="!chats.length">
            <p class="text-gray-200 text-center sm:mt-5 sm:mb-5 lg:mt-20">Você ainda não tem conversas...</p>
          </div>
          <div v-if="chats.length" class="flex my-2">
            <input
              v-model="message"
              @keypress="sendMessage"
              name="input-message"
              type="text"
              placeholder="Digite sua mensagem..."
              class="p-4 w-full border rounded-full text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 px-4 shadow-inner my-3 md:my-0"
              required
            />
            <button type="button" @click="sendMessage" class="mx-3 bg-red-600 text-white rounded-full h-10 w-16">
              <i class="far fa-paper-plane"></i>
            </button>
          </div>
        </div>
        <div
          class="w-full md:w-2/6 rounded-lg md:rounded-none md:rounded-tl-lg md:rounded-bl-lg bg-gray-300 p-4"
        >
          <p class="text-gray-600 font-semibold mb-4">Central de Mensagens</p>
          <div class="chat-area overflow-y-auto px-2">
            <div
              v-for="(chat, index) in chats"
              :key="chat.id_room"
              @click="openRoom(chat.id_room, index)"
              class="bg-gray-200 rounded-lg mr-2 p-4 flex mb-3 cursor-pointer"
              :class="{'bg-red-600 text-gray-200': chatOpen.index == index}"
            >
              <p class="truncate mr-4 my-auto align-middle" :class="{'text-gray-600': chatOpen.index != index}">
                {{ chat.other_user.business_name || chat.other_user.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Chat from '../services/Chat';

export default {
  data() {
    return {
      message: '',
      messages: [],
      chats: [],
      chatOpen: {}
    };
  },
  methods: {
    scroll(){
        const scrDiv = document.getElementById('messages'); 
        scrDiv.scrollTop = scrDiv.scrollHeight;
    },
    async openRoom(id_room, index){
      if(index == this.chatOpen.index) return;
      this.$socket.client.emit('unsubscribe', this.chatOpen.id_room);

      this.chatOpen = {...this.chats[index], index};
      this.messages = [];

      this.$socket.client.emit("subscribe", this.chatOpen.id_room);

      let messages = await Chat.retriveChatMessage(id_room);
      if(messages.success){ 
        messages.conversation.sort((a, b) => {
          if(new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()) return 1;
          else return -1;
      })
      this.messages = messages.conversation;
      }
      setTimeout(() => this.scroll(), 500);
    },  
    async sendMessage(event){
      if (event.key && event.key != "Enter") return;
      const msg = this.message;
      this.message = '';
      this.messages.push({message: msg, createdAt: new Date().toLocaleString(), posted_by: this.$store.state.user.user.id_user})
      const result = await Chat.sendMessage({
        id_room: this.chatOpen.id_room,
        message: msg,
      });
      result.success ? console.log(result)  : this.messages.pop();

      this.scroll();
    },
  },
  sockets: {
    newMessage(data) {
      console.log(data)
      if(this.data.posted_by != this.$store.state.user.user.id_user){
        this.messages.push(data.message);
        setTimeout(() => {this.scroll();}, 500)
      }
    },
  },
  async created() {
    if(!this.$store.state.login.login.isLogged) return this.push('/login');

    const chats = await Chat.getChatRooms(this.$store.state.user.user.id_user);
    if(chats.success){
      chats.conversations.sort((a, b) => {
        if(new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime()) return -1;
        else return 1;
      })

      this.chats = chats.conversations;
      this.chatOpen = {...this.chats[0], index: 0};
      this.$socket.client.emit(
        "identify",
        this.id_client
      );
      
      if(!this.chats.length) return
      const res = this.$socket.client.emit("subscribe", this.chats[0].id_room);

      if(res){
        const messages = await Chat.retriveChatMessage(this.chats[0].id_room);
        if(messages.success) {
            messages.conversation.sort((a, b) => {
            if(new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()) return 1;
            else return -1;
          })
          this.messages = messages.conversation;
        }
      }
      setTimeout(() => {this.scroll();}, 500)
    }else return this.$router.push('/');

  },
  components: {
    Footer,
  }
};

</script>

<style>
.chat-area {
  height: calc(100vh - 14rem);
}

.message-out {
  background: #e53e3e;
  color: white;
  margin-left: 50%;
}

.message-in {
  background: #e2e8f0;
  color: black;
}

@media screen and (min-width: 800px) {
  .message {
    width: 50%;
    font-size: 0.8em;
  }
}

@media screen and (max-width: 799px) {
  .message {
    width: 100%;
    font-size: 0.8em;
    margin: 0.8rem 0;
  }
}
</style>
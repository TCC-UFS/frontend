<template>
  <v-container>
    <v-row class="text-center mt-2">
      <v-col v-if="$vuetify.display.mobile" class="d-flex justify-center">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-auto"
          contain
          max-width="100"
        />
      </v-col>
      <v-col cols="12 d-flex justify-center">
        <v-img v-if="!$vuetify.display.mobile"
          :src="require('../assets/logo.png')"
          class="my-auto mr-5"
          contain
          max-width="150"
        />
        <span class="text-left font-mono font-extrabold text-8xl my-auto">
          <span>Chat</span>
          <span class="cyan">M</span><span class="orange">Q</span>
        </span>
      </v-col>
      <!-- <v-col class="d-flex flex-col items-center">
        <span class="d-flex text-center font-extrabold font-mono text-white text-4xl">Chat Pessoal</span>
      </v-col> -->
    </v-row>
    <v-row v-if="!$vuetify.display.mobile">
      <v-col class="d-flex flex-col items-center">
        <div class="d-flex w-full justify-center relative">
          <div class="userList">
            <div class="text-center">Chats</div>
            <hr class="mt-1" />
            <div v-if="chats.length === 0" class="p-2">
              Nenhum chat online.
            </div>
            <div v-for="u in chats" @click="to=u; scrollBottom()" :key="u"
              :class="['hover:text-white pt-2 cursor-pointer', to === u ? 'bg-[#ff6600ef]' : 'hover:bg-[#ff6600df]']">
              <span class="p-2">{{u}}</span>
              <hr class="mt-2" />
            </div>
          </div>
          <div class="absolute pl-[15rem]" v-if="to">
            <div class="text-white bg-[#388f99] px-2 pb-[0.2rem] chip">{{to.slice(1)}}</div>
          </div>
          <div class="d-flex flex-col items-center chat-box">
            <div id="chatbox" class="bg-white text-lg chat d-flex flex-col chat-web">
              <div v-for="(msg, index) in messagesArr" :key="index" :class="`d-flex flex-col`">
                <div :class="`py-1 w-fit my-auto ${msg.isSender ? 'pr-3 pl-8 mb-2 mr-2 self-end text-right' : 'pl-3 pr-8 mb-2 ml-2 text-left'}`">
                  <span class="text-black font-extrabold my-auto">{{ msg.sender }}</span>
                  <div>
                    <span class="text-gray-800 font-bold">{{ '  ' }} {{ msg.message }}</span>
                  </div>
                </div>
              </div>
              
            </div>
            <div class="w-[100%] d-flex justify-center">
              <v-text-field id="message-input" base-color="#fff" bg-color="#388f99" color="#fff" variant="solo" class="w-[50%]" elevation="5" v-model="myMessage" label="Mensagem" @keyup.enter="sendMessage()" append-inner-icon="mdi-send" @click:append-inner="sendMessage()" />
            </div>
          </div>
        </div>
        
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="d-flex flex-col items-center mt-2">
        <v-row class="chats-mobile justify-center text-center">
          <v-select bg-color="#005163" base-color="#fff" item-color="#f60" :items="chats" v-model="to" variant="solo" label="Chats" no-data-text="Nenhum chat online." />
        </v-row>
        <v-row class="w-full justify-center relative">
          <div class="absolute" v-if="to">
            <div class="text-white bg-[#388f99] px-2 pb-[0.2rem] chip-mobile">{{to.slice(1)}}</div>
          </div>
          <div class="d-flex flex-col items-center chat-box-mobile">
            <div id="chatbox" class="bg-white text-lg chat border-[#388f99] border-4 d-flex flex-col">
              <div v-for="(msg, index) in messagesArr" :key="index" :class="`d-flex flex-col`">
                <div :class="`py-1 w-fit my-auto ${msg.isSender ? 'pr-3 pl-8 mb-2 mr-2 self-end text-right' : 'pl-3 pr-8 mb-2 ml-2 text-left'}`">
                  <span class="text-black font-extrabold my-auto">{{ msg.sender }}</span>
                  <div>
                    <span class="text-gray-800 font-bold">{{ '  ' }} {{ msg.message }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[100%] d-flex justify-center">
              <v-text-field id="message-input" base-color="#fff" bg-color="#388f99" color="#fff" variant="solo" class="w-[50%]" elevation="5" v-model="myMessage" label="Mensagem" @keyup.enter="sendMessage()" append-inner-icon="mdi-send" @click:append-inner="sendMessage()" />
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mb-24">
    </v-row>
    <v-row v-if="$vuetify.display.mobile" class="mb-36"></v-row>
  </v-container>
</template>

<style>
#message-input {
  border-radius: 0px !important;
}

.userList::-webkit-scrollbar {
  display: none;
}
.userList{
  box-shadow: #000 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  border-radius: 10px 0 0 10px;
  background-color: #005163;
  color: #fff;
  height: 28.17rem;
  width: 20%;
  max-width: 250px;
  margin-bottom: -5px;
  margin-right: -5px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.chip {
  border-top: 4px solid #005163;
  border-radius: 0 0 12px 12px;
}

.chip-mobile {
  border-radius: 0 0 12px 12px; 
}

.chat-box {
  width: 40%;
}
.chat-box-mobile {
  width: 90%;
}
.chats-mobile {
  width: 90%;
  margin-bottom: -20px;
}

.chat::-webkit-scrollbar {
  display: none;
}
.chat {
  margin-bottom: -5px;
  width: 100% !important;
  height: 25rem !important;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-anchor: none;
}
.chat > :first-child {
  margin-top: auto;
}
.chat > :last-child {
  overflow-anchor: auto;
}

.chat-web {
  border-top: 4px solid #005163;
  border-right: 4px solid #005163;
}

.orange {
  color: #f60;
}
.cyan {
  color: #388f99;
}
.dark-cyan {
  color: #005163;
}
</style>

<script>
export default {
  name: "PersonalChat",
  data: () => ({
    interval: null,
    messages: [],
    myMessage: "",
    to: "",
    chats: []
  }),
  props: {
    userLogged: Boolean,
    userData: Object,
  },
  computed: {
    isUserLogged: function () {
      return this.userLogged;
    },
    messagesArr: function () {
      return this.messages.filter(msg => [this.to].includes(`@${msg.sender.toLowerCase()}`) || (msg.isSender && [this.to].includes(msg.to)));
    },
    getChats: function () {
      return this.chats;
    }
  },
  methods: {
    onMessage(frame) {
      let msg = JSON.parse(frame.body);
      this.messages.push(msg);
      this.scrollBottom(10);
    },
    scrollBottom(delay = 0) {
      setTimeout(() => {
        var element = document.getElementById('chatbox');
        element.scrollTo(0, element.scrollHeight);
      }, delay);
    },
    sendMessage() {
      if (!this.to)
        return this.$toast.error("Nenhum chat selecionado.");
      
      if (!this.myMessage) return;

      this.$api.sendMessage(this.myMessage, this.to, this.userData.id).then(_ => {
        this.messages.push({isSender: true, sender: this.userData.currentUser, message: this.myMessage, to: this.to});
        this.myMessage = "";
        this.scrollBottom(10);
      })
      .catch(err => this.$toast.error(err.error || err.message));
    }
  },
  mounted() {
    if (this.isUserLogged) {
      this.interval = setInterval(() => {
        this.$api.listChats(this.userData.id).then(res => this.chats = res.chats.filter(u => u != `@${this.userData.currentUser.toLowerCase()}`))
          .catch(err => this.$toast.error(err.message || err.error || err));
      }, 10*1000);
      this.$api.listChats(this.userData.id).then(res => this.chats = res.chats.filter(u => u != `@${this.userData.currentUser.toLowerCase()}`))
          .catch(err => this.$toast.error(err.message || err.error || err));
      this.$channel.subscribe(`/exchange/chatmq/@${this.userData.currentUser.toLowerCase()}`, this.onMessage, { durable: false });
    }
    else this.$router.push("/");
  },
  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>
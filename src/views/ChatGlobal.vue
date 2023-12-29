<template>
  <v-container>
    <v-row class="text-center mt-2">
      <v-col cols="12 d-flex justify-center">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-auto"
          contain
          max-width="150"
        />
        <span class="text-left ml-5 font-mono font-extrabold text-8xl my-auto">
          <span>Chat</span>
          <span class="cyan">M</span><span class="orange">Q</span>
        </span>
      </v-col>
      <v-col class="d-flex flex-col items-center">
        <span class="d-flex text-center font-extrabold font-mono text-white text-4xl">Chat Global</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <div class="bg-white rounded-lg text-lg chat mb-2 relative">
          <div class="absolute bottom-0 w-full d-flex flex-col">
            <div v-for="(msg, index) in messagesArr" :key="index" class="d-flex flex-col">
              <div :class="`py-1 bg-[${msg.isSender ? '#f60' : '#388f99'}] rounded-2xl w-fit my-auto ${msg.isSender ? 'pr-3 pl-8 mb-2 mr-2 self-end text-right' : 'pl-3 pr-8 mb-2 ml-2 text-left'}`">
                <span class="text-black font-extrabold my-auto">{{ msg.sender }}</span>
                <div>
                  <span class="text-gray-800 font-bold">{{ '  ' }} {{ msg.message }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="mb-20">
      <v-col class="d-flex justify-center" v-if="isUserLogged">
        <div class="w-3/4 d-flex">
          <v-text-field class="w-3/4" v-model="myMessage" label="Mensagem" @keyup.enter="sendMessage()" append-inner-icon="mdi-send" @click:append-inner="sendMessage()" />
          <v-select label="Destinatário" :items="chats" v-model="to" class="w-1/4"></v-select>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.chat {
  width: 75% !important;
  height: 25rem !important;
  overflow-y: scroll;
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
  name: "ChatGlobal",
  data: () => ({
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
      return this.messages;
    }
  },
  methods: {
    onMessage(frame) {
      let msg = JSON.parse(frame.body);
      this.messages.push(msg);
    },
    sendMessage() {
      if (!this.to)
        return this.$toast.error("Nenhum desetinatário selecionado.");
      
      if (!this.myMessage) return;

      this.$api.sendMessage(this.myMessage, this.to, this.userData.id).then(_ => {
        this.messages.push({isSender: true, sender: this.userData.currentUser, message: this.myMessage});
        this.myMessage = "";
      })
      .catch(err => this.$toast.error(err.error || err.message));
    }
  },
  mounted() {
    if (this.isUserLogged) {
      this.$api.listChats(this.userData.id).then(res => this.chats = res.chats.filter(u => u != `@${this.userData.currentUser.toLowerCase()}`))
        .catch(err => this.$toast.error(err.message || err.error || err));
      this.$channel.subscribe(`/exchange/chatmq/@${this.userData.currentUser.toLowerCase()}`, this.onMessage, { durable: false });
    }
    else this.$router.push("/");
  }
};
</script>
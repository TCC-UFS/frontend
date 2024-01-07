<template>
  <v-container>
    <Logo />
    <v-row>
      <v-col class="d-flex justify-center">
        <div
          class="mt-20 mr-4 w-5/12 d-flex flex-col justify-center border-4 border-[#388f99] active:bg-[#388f9928] rounded-xl text-center py-10 hover:bg-[#388f9911] cursor-pointer"
          @click="$router.push('groups')"
        >
          <div class="self-center pb-2">
            <img :src="require('../assets/icon-group.png')" width="80" />
          </div>
          <div class="font-bold text-2xl">Grupos</div>
        </div>
        <div
          class="mt-20 ml-4 w-5/12 d-flex flex-col justify-center border-4 border-[#f60] hover:bg-[#ff660011] active:bg-[#ff660028] cursor-pointer rounded-xl text-center py-10"
          @click="$router.push('users')"
        >
          <div class="self-center pb-2">
            <img :src="require('../assets/icon-user.png')" width="80" />
          </div>
          <div class="font-bold text-2xl">Usuários</div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="isUserLogged">
      <v-col class="d-flex justify-center">
        <div
          class="mt-4 w-1/2 d-flex justify-center border-4 border-[#fff] hover:bg-[#ffffff11] active:bg-[#ffffff28] cursor-pointer rounded-lg text-center py-4"
          @click="$router.push('chats/personal')"
        >
          <div class="font-bold text-2xl">Chat Pessoal</div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="$vuetify.display.mobile" class="mb-72"></v-row>
  </v-container>
</template>

<style>
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
import Logo from '../components/Logo.vue'

export default {
  name: "HomeView",
  props: {
    userLogged: Boolean,
    userData: Object,
  },
  components: {
    Logo
  },
  computed: {
    isUserLogged: function () {
      return this.userLogged;
    },
  },
};
</script>

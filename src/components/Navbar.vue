<template>
  <div>
    <div class="d-flex w-100 px-4 py-2 bg-slate-950">
      <div class="d-flex my-auto mr-2">
        <img class="w-8" :src="require('../assets/logo.png')" @click="$router.push('/')" />
      </div>
      <ul class="d-flex w-fit justify-start my-auto" v-if="!$vuetify.display.mobile">
        <li v-for="item in items" :key="item.id">
          <div
            @click="$router.push(item.path)"
            class="d-flex hover:bg-slate-800 cursor-pointer px-4 py-2 rounded-md"
          >
            <v-icon :icon="item.icon" class="my-auto" />
            <span class="my-auto ml-2">{{ item.text }}</span>
          </div>
        </li>
      </ul>
      <v-spacer />
      <div class="my-auto text-white mx-2" v-if="$route.path != '/login'">
        <v-btn
          variant="outlined"
          @click="loginDialog = true"
          v-if="!isUserLogged"
        >
          Entrar no chat
        </v-btn>
        <div v-else class="d-flex my-auto mx-2">
          <span class="mx-4 text-xl font-semibold">
            Olá {{ userData.currentUser }}
          </span>
          <v-tooltip text="Sair" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon
                icon="mdi-logout my-auto"
                v-bind="props"
                @click="logout()"
              />
            </template>
          </v-tooltip>
        </div>
      </div>
      <v-dialog v-model="loginDialog" class="w-1/4 min-w-[350px]">
        <v-card class="d-flex justify-center p-5">
          <v-card-title class="text-center">Nome</v-card-title>
          <v-card-text class="text-left">
            <v-text-field
              label="Digite seu nome"
              v-model="username"
              :rules="[rules.required, rules.min, rules.max]"
            />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              variant="outlined"
              color="danger"
              @click="loginDialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn variant="outlined" color="success" @click="login()">
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <div class="my-auto">
          <v-tooltip text="Alterar Tema" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon icon="mdi-circle-half-full" v-bind="props" @click="toggleDark(); toggleTheme();"></v-icon>
            </template>
          </v-tooltip>
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    username: null,
    rules: {
      required: (value) => !!value || "Campo obrigatório.",
      min: (value) => value.length >= 4 || "Mínimo 4 caracteres.",
      max: (value) => value.length <= 20 || "Máximo 20 caracteres.",
    },
    items: [
      {
        id: crypto.randomUUID(),
        text: "Home",
        icon: "mdi-home",
        path: "/",
      },
      {
        id: crypto.randomUUID(),
        text: "Grupos",
        icon: "mdi-account-group",
        path: "/groups",
      },
      {
        id: crypto.randomUUID(),
        text: "Usuarios",
        icon: "mdi-account-multiple",
        path: "/users",
      },
    ],
    loginDialog: false,
  }),
  props: {
    userLogged: Boolean,
    userData: Object,
  },
  computed: {
    isUserLogged: function () {
      return this.userLogged;
    },
  },
  methods: {
    logout() {
      this.$api.logout().then(_ => {
        this.$cookies.remove('user');
        this.$emit("logout");
        this.$router.push("/");
      }).catch(err => {
        return this.$toast.error(err.message);
      })
    },
    login() {
      if (!this.username) return this.$toast.error("Campo obrigatório.");
      if (this.username.length < 4)
        return this.$toast.error("Nome muito curto.");
      if (this.username.length > 16)
        return this.$toast.error("Nome muito logno.");

      this.$api.login(this.username).then(res => {
        let user = res.data;
        this.$cookies.set('user', JSON.stringify(user), 60*60*4);
        this.loginDialog = false;
        this.$emit("logged");
        this.$router.push("/");
      }).catch(err => {
        return this.$toast.error(err.message);
      })
    },
  }
};
</script>

<!-- <script setup>
import { useDark, useToggle } from "@vueuse/core";
import { useTheme } from 'vuetify'

const theme = useTheme()

const isDark = useDark();
const toggleDark = useToggle(isDark)
function toggleTheme () {
  theme.global.name.value = !isDark.value ? 'light' : 'dark'
}
</script> -->

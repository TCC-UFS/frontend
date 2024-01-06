import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import "./assets/tailwind.css";
import webstomp from 'webstomp-client';
import * as api from './services/api';
import VueCookies from 'vue-cookies';
import { Buffer } from 'buffer';

async function main() {
var basic = await api.getBasic();

var str = basic.replace('scwkcRW3dFScuuTjjJ', '').replace('vECG5vxpX3KdWAFmwI8zyu', '');
var jsonData = Buffer.from(str, 'base64').toString('ascii');
var data = JSON.parse(jsonData);

const HOST = data.HOST;
const USER = data.USER;
const PWD = data.PWD;

loadFonts();

const app = createApp(App)

var client = await webstomp.client(HOST);
client.debug = () => {};
app.config.globalProperties.$api = api;
app.config.globalProperties.$login = USER;
app.config.globalProperties.$pass = PWD;
app.config.globalProperties.$channel = await new Promise((resolve, reject) => {
  client.connect({ host: 'chat_sd', login: USER, passcode: PWD }, () => {
    resolve(client);
  }, (err) => {
    reject(err);
  });
});


app.use(router)
.use(store)
.use(vuetify)
.use(ToastPlugin)
.use(VueCookies, { expires: '2h' });
  
app.mount("#app");
};
main();
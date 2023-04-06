import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { createPinia } from "pinia";
import "@mdi/font/css/materialdesignicons.css";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(store);

app.mount("#app");

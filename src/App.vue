<template>
  <v-app class="" id="app">
    <v-main class=""> <NavBar /> <router-view class="px-0" /></v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss"></style>

<template>
  <v-app-bar class="px-md-10 navbar">
    <router-link to="/" class="text-decoration-none">
      <v-toolbar-title>
        <strong class="success"> {{ projectName }} </strong>
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn link to="/" color="green">Home</v-btn>
    <v-btn link to="/data" color="green">Data</v-btn>
    <v-btn link to="/about" color="green">About Me</v-btn>
  </v-app-bar>
</template>

<script setup>
// eslint-disable-next-line vue/no-export-in-script-setup
import { ref } from "vue";

const projectName = ref("OptimasAI");
</script>

<style scoped>
.success {
  color: #4caf50 !important;
}
.navbar {
  background-color: #fff !important;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.171) !important;
}
</style>

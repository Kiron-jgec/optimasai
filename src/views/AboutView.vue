<template>
  <v-main>
    <v-container class="text-center">
      <v-card max-width="350" class="mx-auto">
        <v-avatar color="white" size="150" elevation="3">
          <v-img :src="img" alt="Injamamul Hoque"></v-img>
        </v-avatar>
        <v-card-title>Injamamul Hoque</v-card-title>
        <v-conntent>
          <div>I am a web developer.</div>

          <div class="mt-5">
            <v-chip
              v-for="(skill, id) in skills"
              :key="id"
              class="ma-1"
              color="green"
              >{{ skill }}</v-chip
            >
          </div>
        </v-conntent>
        <v-card-actions class="text-center">
          <v-spacer></v-spacer>
          <v-btn
            icon
            link
            href="https://www.facebook.com/injamamul00"
            target="_blank"
            color="grey-darken-2"
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>

          <v-btn
            icon
            link
            href="https://www.linkedin.com/in/injamamul-hoque/"
            target="_blank"
            color="grey-darken-2"
          >
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
          <v-btn
            icon
            color="grey-darken-2"
            link
            href="https://github.com/Kiron-jgec"
            target="_blank"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
import myImage from "../assets/kiron.png";
const img = myImage;
const skills = [
  "JavaScript",
  "VueJS",
  "Vuetify",
  "NodeJs",
  "ExpressJs",
  "MongoDB",
  "Git",
];
</script>

<!-- <script setup></script>

<template>
  <div class="mx-auto text-center mt-5">
    <h1>Counter</h1>
    <p>
      Current count: <strong>{{ counter.count }}</strong> -
      <strong>
        {{ counter.doubleCount }}
      </strong>
    </p>
    <v-btn @click="counter.increment()" class="mt-2">Increment</v-btn>
    <v-btn @click="counter.count--" class="ml-2 mt-2">Decrement-</v-btn>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/store/CounterStore.js";

let counter = useCounterStore();
</script>

<style></style> -->

<template>
  <v-alert
    color="red"
    theme="dark"
    class="mx-10 mt-5"
    icon="mdi-alert-circle-outline"
    elevation="1"
    variant="text"
    v-if="errormsg"
  >
    {{ errormsg }}
  </v-alert>

  <v-container class="pa-10 red" v-if="allData.length > 0">
    <v-card class="pa-5 red mx-auto" max-width="1200px" :loading="loading">
      <v-card-title>All Data </v-card-title>

      <v-table>
        <thead>
          <tr>
            <th class="text-left">Avatar</th>
            <th class="text-center">Full Name</th>
            <th class="text-center">Gender</th>
            <th class="text-center">Phone No</th>
            <th class="text-center">Skills</th>
            <th class="text-center">Country</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in allData" :key="idx">
            <td>
              <v-avatar color="grey-lighten-4">
                <v-img :src="item.uploadImage" :alt="item.fullName"></v-img>
              </v-avatar>
            </td>
            <td>{{ item.fullName }}</td>
            <td class="text-center">{{ item.gender }}</td>
            <td class="text-center">{{ item.contactNo }}</td>
            <td>
              <v-chip
                v-for="(skill, id) in item.skills"
                :key="id"
                class="mx-1"
                color="green"
                >{{ skill }}</v-chip
              >
            </td>

            <td class="text-center">{{ item.country }}</td>
            <td class="text-center">
              <v-btn
                icon="mdi-pencil"
                small
                color="warning"
                variant="text"
                density="comfortable"
                elevation="1"
                link
                :to="{ name: 'update', params: { id: item.id } }"
              ></v-btn>
              <v-btn
                color="error"
                icon="mdi-delete"
                small
                variant="text"
                elevation="1"
                class="ml-2"
                density="comfortable"
                @click="openDialog(item.id)"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
  <v-container
    fluid
    v-else
    class="text-center mt-10 d-flex justify-center align-center nodataFound"
  >
    <div>
      <v-icon color="red-lighten-1" size="50">mdi-alert-circle-outline</v-icon>

      <p class="text-body-1">No data found in the database !</p>
    </div>
  </v-container>

  <!-- delete dialog -->

  <v-dialog v-model="dialog" persistent width="auto">
    <v-card class="pa-4">
      <v-card-title class="text-h5">
        Do you really want to delete this data?
      </v-card-title>
      <v-card-text>
        It will be deleted permanently from the database.
      </v-card-text>
      <v-card-actions class="px-4">
        <v-btn
          color="green-darken-1"
          variant="outlined"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red-darken-1" variant="outlined" @click="confirmDelete">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar
    v-model="snackbar"
    timeout="2000"
    class="text-red"
    :color="snackbarColor"
    location="top right"
  >
    {{ snackbarMsg }}

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<!-- <script setup>
// import { useFromDataStore } from "../store/FormDataStore.js";

// let allFromDatas = useFromDataStore();
// allFromDatas.getallfromData();
</script> -->

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();
let allData = ref([]);
let errormsg = ref(null);
const loading = ref(true);
const dialog = ref(false);
const deleteId = ref(null);
const snackbar = ref(false);
const snackbarMsg = ref(null);
const snackbarColor = ref(null);
// const testItem = computed(() => store.state.count);
store
  .dispatch("getAllFormData")
  .then((res) => {
    allData.value = res;
    loading.value = false;
  })
  .catch((err) => {
    console.log(err);
    errormsg.value = err;
    loading.value = false;
  });

// delete one data from the database

const openDialog = (id) => {
  dialog.value = true;
  deleteId.value = id;
};
const confirmDelete = () => {
  store
    .dispatch("deleteOneData", deleteId.value)
    .then((res) => {
      console.log(res);
      dialog.value = false;
      snackbarColor.value = "success";
      snackbar.value = true;
      snackbarMsg.value = "Data deleted successfully";
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
      dialog.value = false;
      snackbarColor.value = "error";
      snackbar.value = true;
      snackbarMsg.value = "Something went wrong";
    });
};

// const increment = () => {
//   store.commit("increment");
// };
// const increment2 = () => {
//   store.dispatch("increment2");
// };
</script>

<style scoped>
.nodataFound {
  height: 50vh;
  width: 100vw;
}
</style>

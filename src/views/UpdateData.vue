<template>
  <v-container class="fromContainer mt-8 mb-15 pa-4" v-if="!submitted">
    <div class="text-h6 text-center text-green">Update Data</div>
    <!-- // update form  -->
    <v-form @submit.prevent="submit" ref="form">
      <v-container>
        <!-- full name -->
        <div class="">Full Name*:</div>
        <v-text-field
          v-model="fullName"
          :counter="20"
          variant="underlined"
          color="green"
          autofocus
          placeholder="Full Name"
          density="compact"
          :rules="fullNameRules"
        ></v-text-field>
        <!-- contact number -->
        <div class="">Contact Number* :</div>
        <v-text-field
          v-model="contactNo"
          color="green"
          placeholder="7845125451"
          density="compact"
          variant="underlined"
          :counter="10"
          :rules="contactNoRules"
          type="number"
        ></v-text-field>
        <!-- gender -->
        <div class="">Gender* :</div>
        <v-radio-group
          inline
          color="green"
          density="comfortable"
          v-model="gender"
          :rules="genderRules"
        >
          <v-radio
            v-for="(item, idx) in ['Male', 'Female', 'Other']"
            :key="idx"
            :label="item"
            :value="item"
          ></v-radio>
        </v-radio-group>
        <!-- skills -->
        <div class="">Skills* :</div>
        <div class="d-flex flex-wrap">
          <v-checkbox
            v-for="(item, idx) in ['Html', 'CSS', 'Vuejs', 'NodeJs']"
            :key="idx"
            :value="item"
            :label="item"
            type="checkbox"
            color="green"
            v-model="skills"
            class="mb-0 green"
            hide-details="true"
            density="comfortable"
          ></v-checkbox>
        </div>
        <div
          class="text-caption text-left text-red-darken-3 font-weight-medium"
        >
          {{ skillsRules }}
        </div>
        <!-- image upload -->
        <div class="mt-2">Upload Image* :</div>
        <div class="text-center">
          <input
            accept="image/*"
            type="file"
            id="file-input"
            class="d-none"
            @change="onFileChange"
            ref="fileInput"
          />
        </div>
        <!-- show image preview -->
        <div v-if="imageInput" class="lighten-4 text-center" elevation="1">
          <v-avatar color="grey-lighten-4" size="100">
            <v-img :src="imageInput.url" :alt="fullName"></v-img>
          </v-avatar>

          <div>
            <v-btn
              class=""
              onclick="document.getElementById('file-input').click()"
              variant="text"
              color="grey"
            >
              <v-icon dark class="mr-2"> mdi-cloud-upload </v-icon> Upload Image
            </v-btn>
          </div>
        </div>

        <div
          v-if="imageError"
          class="text-caption text-left text-red-darken-3 font-weight-medium"
        >
          {{ imageError }}
        </div>
        <!-- country -->
        <div class="text-body-1">Country* :</div>
        <v-select
          v-model="country"
          :items="items"
          label=""
          color="green"
          density="comfortable"
          variant="underlined"
        ></v-select>
        <!-- // submit button -->
        <v-btn
          class="mt-4 py-5"
          type="submit"
          block
          color="green"
          :loading="loading"
          :disabled="loading"
        >
          Update
        </v-btn>
      </v-container>
    </v-form>
  </v-container>

  <!-- response snackbar -->
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
<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    // form data
    const items = ref(["India", "Singapore", "Dubai", "USA"]);
    const fullName = ref("");
    const contactNo = ref("");
    const gender = ref("");
    const skills = ref([]);
    const uploadImage = ref("");
    const country = ref("India");
    const imageInput = ref(null);
    const imageError = ref(null);
    const skillsRules = ref(null);
    const loading = ref(false);
    // respnse from store
    const submitted = ref(false);
    const errorMsg = ref(null);
    const snackbar = ref(false);
    const snackbarColor = ref("red");
    const snackbarMsg = ref(null);
    const successMsg = ref(null);
    // form
    const form = ref(null);

    // form validation rules
    const fullNameRules = [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 2) || "Name must be more than 2 characters",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ];
    const contactNoRules = [
      (v) => !!v || "Contact No is required",
      (v) => (v && v.length >= 10) || "Contact No must be in 10 digits",
      (v) => (v && v.length <= 10) || "Contact No must be in 10 digits",
    ];

    const genderRules = [(v) => !!v || "Gender is required"];

    // methods

    // image  preview and convert to base64
    const onFileChange = () => {
      imageError.value = null;
      const file = document.querySelector("#file-input").files[0];
      const values = {
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      };

      imageInput.value = values;

      // convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        uploadImage.value = reader.result;
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    };

    // remove image
    const removeImage = () => {
      imageInput.value = null;
      imageError.value = null;
      uploadImage.value = null;
    };

    // submit form
    const submit = async () => {
      // return false if form is not valid
      const { valid } = await form.value.validate();
      if (!valid) {
        // go to top of the page
        window.scrollTo(0, 0);
        return;
      }

      let data = {
        fullName: fullName.value,
        contactNo: contactNo.value,
        gender: gender.value,
        skills: skills.value,
        uploadImage: uploadImage.value,
        country: country.value,
        id: window.location.pathname.split("/")[2],
      };
      loading.value = true;
      // valid before submit
      if (imageInput.value === null || skills.value.length === 0) {
        if (imageInput.value === null) {
          imageError.value = "Please upload an image";
          loading.value = false;
        }
        if (skills.value.length === 0) {
          skillsRules.value = "Please select minimum one skill !";
          loading.value = false;
        }
        return;
      }

      // submit form
      store
        .dispatch("updateOneData", data)
        .then((res) => {
          console.log(res);
          loading.value = false;
          snackbar.value = true;
          snackbarColor.value = "green";
          snackbarMsg.value = store.state.successMsg;
          setTimeout(() => {
            window.location.href = "/data";
          }, 500);
        })
        .catch((err) => {
          snackbarMsg.value = err;
          snackbar.value = true;
          loading.value = false;
        });
    };

    // get updated data
    store
      .dispatch("getOneData", window.location.pathname.split("/")[2])
      .then((res) => {
        let image = {
          url: res.uploadImage,
        };
        imageInput.value = image;
        fullName.value = res.fullName;
        contactNo.value = res.contactNo;
        gender.value = res.gender;
        skills.value = res.skills;
        uploadImage.value = res.uploadImage;
        country.value = res.country;
      })
      .catch((err) => {
        snackbarColor.value = "red";
        snackbarMsg.value = "Something went wrong !";
        snackbar.value = true;
        console.log(err);
      });

    return {
      fullName,
      contactNo,
      gender,
      skills,
      uploadImage,
      country,
      items,
      // rules
      fullNameRules,
      contactNoRules,
      genderRules,
      skillsRules,
      form,
      //image
      imageInput,
      imageError,

      // loading
      loading,
      // response
      submitted,
      errorMsg,
      snackbar,
      successMsg,
      snackbarMsg,
      snackbarColor,
      // methods
      onFileChange,
      removeImage,
      submit,
    };
  },
};
</script>

<style scoped lang="scss">
.red {
  background-color: red;
}
.fromContainer {
  max-width: 600px;
  //   border: 1px solid #e4e4e4;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>

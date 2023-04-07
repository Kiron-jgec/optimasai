<template>
  <v-container class="fromContainer mt-8 mb-15 pa-4" v-if="!submitted">
    <div class="text-h6 text-center text-green">Submit Form</div>
    <!-- input form  -->
    <v-form @submit.prevent="submit" class="" ref="form">
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
        <!-- Gender -->
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
        <!-- Skills -->
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
        <!-- image upload  -->
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
          <v-btn
            class="my-2"
            onclick="document.getElementById('file-input').click()"
            variant="outlined"
            color="grey"
            v-if="!imageInput"
          >
            <v-icon dark class="mr-2"> mdi-cloud-upload </v-icon> Upload Image
          </v-btn>
        </div>
        <!-- preview image -->
        <v-table v-if="imageInput" class="mt-4" elevation="1">
          <tbody>
            <tr class="gray">
              <td>
                <img :src="imageInput.url" width="50" class="my-auto" />
              </td>
              <td>
                {{ imageInput.name }}
              </td>

              <td>{{ imageInput.size / 1000 }} KB</td>
              <td>
                <v-btn
                  icon
                  density="comfortable"
                  color="red"
                  variant="text"
                  @click="removeImage"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
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

        <v-btn
          class="mt-4 py-5"
          type="submit"
          block
          color="green"
          :loading="loading"
          :disabled="loading"
        >
          submit
        </v-btn>
      </v-container>
    </v-form>
  </v-container>

  <!-- success message -->
  <v-container
    fluid
    class="mx-auto text-center mt-10 refill d-flex justify-center align-center"
    v-else
  >
    <div class="text-center">
      <v-icon size="50" color="green">mdi-check-circle-outline </v-icon>
      <div class="text-body-1">From Submitted Successfully</div>
      <v-btn class="mt-10" color="green" @click="fillAgain">
        Fill Another Form
      </v-btn>
    </div></v-container
  >
  <!-- error message -->
  <v-snackbar
    v-model="snackbar"
    timeout="2000"
    class="text-red"
    color="red"
    location="top right"
  >
    {{ errorMsg }}

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
    // form
    const form = ref(null);

    // validation rules
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

    // preview image and convert to base64 string
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
      };
      loading.value = true;
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
      // call action from
      store
        .dispatch("submitForm", data)
        .then((res) => {
          console.log(res);
          submitted.value = store.state.formSubmitted;
          loading.value = false;
        })
        .catch((err) => {
          errorMsg.value = err;
          snackbar.value = true;
          loading.value = false;
        });
    };
    // reset form
    const fillAgain = () => {
      submitted.value = false;
      fullName.value = "";
      contactNo.value = "";
      gender.value = "";
      skills.value = [];
      skillsRules.value = null;
      uploadImage.value = "";
      imageInput.value = null;
      country.value = "India";
    };

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
      // form
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
      // methods
      onFileChange,
      removeImage,
      submit,
      fillAgain,
      // handleReset,
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
.refill {
  height: 70vh;
}
</style>

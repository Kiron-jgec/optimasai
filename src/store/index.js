import { createStore } from "vuex";
import axios from "axios";
import config from "@/config";
export default createStore({
  state: {
    errorMsg: "",
    successMsg: "",
    formSubmitted: false,
    allFormData: null,
    oneData: null,
  },
  mutations: {},
  actions: {
    // submit form data
    async submitForm(context, payload) {
      try {
        let res = await axios.post(`${config.jsonServerUrl}/values`, payload);
        context.state.successMsg = "Form submitted successfully";
        context.state.formSubmitted = true;
        return res.data;
      } catch (e) {
        console.log(e);
        context.state.errorMsg = "Something went wrong";
        return "Something went wrong";
      }
    },

    // get all form data
    async getAllFormData(context) {
      try {
        let res = await axios.get(`${config.jsonServerUrl}/values`);
        context.state.allFormData = res.data;
        // console.log(res.data);
        return res.data;
      } catch (e) {
        console.log(e);
        context.state.errorMsg = "Something went wrong";
        return "Something went wrong";
      }
    },

    // get one form data
    async getOneData(context, id) {
      try {
        let res = await axios.get(`${config.jsonServerUrl}/values/${id}`);
        context.state.oneData = res.data;
        // console.log(res.data);
        return res.data;
      } catch (e) {
        console.log(e);
        context.state.errorMsg = "Something went wrong";
        return "Something went wrong";
      }
    },

    // update one form data
    async updateOneData(context, payload) {
      try {
        let res = await axios.put(
          `${config.jsonServerUrl}/values/${payload.id}`,
          payload
        );
        context.state.successMsg = "Value updated successfully";
        context.state.formSubmitted = true;
        return res.data;
      } catch (e) {
        console.log(e);
        context.state.errorMsg = "Something went wrong";
        return "Something went wrong";
      }
    },
    // delete one form data
    async deleteOneData(context, id) {
      try {
        let res = await axios.delete(`${config.jsonServerUrl}/values/${id}`);
        context.state.successMsg = "Item deleted successfully";
        context.state.formSubmitted = true;
        return res.data;
      } catch (e) {
        console.log(e);
        context.state.errorMsg = "Something went wrong";
        return "Something went wrong";
      }
    },
  },

  getters: {},

  modules: {},
});

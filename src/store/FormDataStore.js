import { defineStore } from "pinia";
import axios from "axios";
import config from "@/config";
// import jsonData from "@/data/index.json";
export let useFromDataStore = defineStore("fromdata", {
  // data
  state() {
    return {
      allfromData: [],
      numberItem: 0,
    };
  },
  // methods
  actions: {
    increment() {
      this.numberItem++;
    },

    async getallfromData() {
      let items = await import("../data/index.json");
      this.$state.allfromData = items.default;
    },

    async submitFormData(data) {
      try {
        // const testData = {
        //   fullName: "Injamamul Hoque",
        //   contactNo: "1234567890",
        //   gender: "male",
        //   skills: ["HTML", "CSS", "Vue"],
        //   uploadImage: "bolbdhwqudhwuq",
        //   country: "India",
        // };
        console.log(data);

        let res = await axios.post(`${config.jsonServerUrl}/values`, data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
  // computed
  getters: {},
});

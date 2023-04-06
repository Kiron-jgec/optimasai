import { defineStore } from "pinia";

export let useCounterStore = defineStore("counter", {
  // data
  state() {
    return {
      count: 5,
    };
  },
  // methods
  actions: {
    increment() {
      this.count++;
    },
  },
  // computed
  getters: {
    doubleCount() {
      return this.count * 2;
    },
  },
});

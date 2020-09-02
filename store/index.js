import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
const state = {
  sessionId: ""
};
const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    actions
  });
};
export default createStore;

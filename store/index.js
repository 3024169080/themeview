import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import themeModule from "./modules/themeModule.js";
const state = {
  screenWidth: "", //设备宽度
  previewWidth: "", //展示宽度
  globalDeviceType: 2, //设备模式  1手机2PC
  sessionId: "",
  olShopInfo: {}
};
const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
      themeModule
    }
  });
};
export default createStore;

const golbalOptions = ["globalColor"];
const mutations = {
  changeDeviceType(state, val) {
    state.globalDeviceType = val;
  },
  screenWidth(state, val) {
    state.screenWidth = val;
  },
  previewWidth(state, val) {
    state.previewWidth = val;
  },
  // 设置商城信息
  SET_OL_SHOP_INFO(state, val) {
    state.olShopInfo = val;
    let shopThemeData = JSON.parse(state.olShopInfo.shopThemeData);
    Object.keys(shopThemeData).forEach(key => {
      if (golbalOptions.includes(key)) {
        state.globleThemeData[key] = shopThemeData[key];
      }
    });
    console.log(state.globleThemeData,'--------------------22');
  }
};
export default mutations;

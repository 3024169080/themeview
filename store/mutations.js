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
  }
};
export default mutations;

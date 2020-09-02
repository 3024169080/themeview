import shop from "~/api/shop";
const actions = {
  async nuxtServerInit({ commit, state, dispatch, query }, nuxtContext) {
    try {
      await dispatch("getShopInfo");
      commit("themeModule/SET_THEMEINSTALLPAGE", []);
      await dispatch("themeModule/getThemeInstallPages", {
        id: state.olShopInfo.id,
        key: nuxtContext.route.query.browseKey || ""
      });
    } catch (error) {
      console.log(error, "-------------------------error");
    }
  },
  //商城配置
  async getShopInfo({ commit, dispatch, state }) {
    await shop
      .getShopInfo()
      .then(res => {
        if (res.code == 200) {
          commit("SET_OL_SHOP_INFO", res.data);
        }
      })
      .catch(error => {});
  }
};
export default actions;

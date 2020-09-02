import { themePagesInfo, browseThemeInfo } from "~/api/theme/themePages";
import { singlePageInfo } from "~/api/theme/singlePage";

const state = {
  //多主题安装页面
  themeInstallPages: []
};
const mutations = {
  SET_THEMEINSTALLPAGE(state, val, rootSatate) {
    state.themeInstallPages = val;
  }
};
const getters = {
  // shopPageId: state => {
  //   return state.themeInstallPages.filter(item => item.done)
  // }
};
const actions = {
  /* 获取商城安装页面 */
  async getThemeInstallPages({ commit }, val) {
    let pageData = null;
    if (val.key) {
      await browseThemeInfo(val.key).then(res => {
        if (res.code == "200") {
          pageData = res.data;
        }
      });
    }

    await themePagesInfo({
      shopid: val.id
    })
      .then(response => {
        if (response.code == 200) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            if (pageData) {
              response.data.forEach((item, index) => {
                if (item.id == pageData.id) {
                  response.data.splice(index, 1, pageData);
                }
              });
            }
            commit("SET_THEMEINSTALLPAGE", response.data);
          }
        }
      })
      .catch(err => {});
  },
  /* 获取单页面组件 */
  async getSinglePageInfo({ commit }, pageId) {
    return new Promise((resolve, reject) => {
      singlePageInfo({ id: pageId })
        .then(response => {
          if (response.code == 200) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
export default {
  namespaced: true, //命名空间
  state,
  mutations,
  actions,
  getters
};

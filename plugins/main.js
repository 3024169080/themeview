import Vue from "vue";
import Vant from "vant";
import { DFSImg } from "~/plugins/commFunc";
import componentsList from "~/assets/js/components";
import componentData from "~/assets/js/componentData";
if (process.browser) {
  require("@vant/touch-emulator");
}
let opts = componentData;
Vue.use(componentsList, opts);

Vue.use(Vant);

//定义一个图片过滤器(双向绑定)
Vue.filter("DFSImg", DFSImg);

// 页面返回判断是否有历史记录
Vue.prototype.$RouterBack = () => {
  if (window.history.length <= 1) {
    $nuxt.$router.push("/");
    return;
  } else {
    // sessionStorage中存入 firstComingShowDetail 说明：分享出去的页面有左上角返回按钮，会点击无效果，加此判断跳转到首页或使用自定义返回
    let isBackHome = window.sessionStorage.getItem("firstComingShowDetail");
    if (isBackHome && isBackHome == $nuxt.$route.path) {
      window.sessionStorage.removeItem("firstComingShowDetail");
      $nuxt.$router.push("/");
      return;
    }
    $nuxt.$router.back();
  }
};

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    let getMixId = "";
    if (app.context.query.mixid) {
      getMixId = app.context.query.mixid;
    }
    // 给每一次跳转添加mixid
    let query = { ...to.query, mixid: getMixId };
    if (to.query.mixid == undefined && getMixId) {
      next({ path: to.path, query: query });
    } else {
      next();
    }
  });
};

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

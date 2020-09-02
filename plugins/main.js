import Vue from "vue"
import Vant from "vant"
import { DFSImg } from "~/plugins/commFunc";
Vue.use(Vant);

//定义一个图片过滤器(双向绑定)
Vue.filter("DFSImg", DFSImg);


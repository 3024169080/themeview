import ele from "./index.vue";
ele.install = Vue => Vue.component(ele.name, ele); //注册组件
export default ele;

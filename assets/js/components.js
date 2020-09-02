import imageRow from "@/components/theme/imageRow/index.js";
import imageText from "@/components/theme/imageText/index.js";
import banner from "@/components/theme/banner/index.js";
import articles from "@/components/theme/articles/index.js";
import goodsList from "@/components/theme/goodsList/index.js";
import cutaway from "@/components/theme/cutaway/index.js";
const components = [imageRow, imageText, banner, goodsList, articles, cutaway];

// 注册组件
const install = (Vue, opts) => {
  Vue.mixin({
    data() {
      return { opt: returnOpt(this.$options.name) };
    }
  });

  function returnOpt(name) {
    return opts.list.filter(item => {
      return item.componentCode == name;
    })[0];
  }

  components.map(component => {
    Vue.component(component.name, component);
  });
};
export default {
  install
};

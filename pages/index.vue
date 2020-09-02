<template>
  <div class="container" :style="[{'background':backgroundColor}]">
    <ThemeDataPlant :datas="modelList" :pageSettingData="pageSettingData" ref="ThemeDataPlant"></ThemeDataPlant>
  </div>
</template>

<script type="text/ecmascript-6">
import shop from "~/api/shop";
import ThemeDataPlant from "~/components/ThemeDataPlant";
import { mapState } from "vuex";
export default {
  name: "container",
  data() {
    return {};
  },
  components: {
    ThemeDataPlant,
  },
  computed: {
    ...mapState(["screenWidth", "previewWidth", "globalDeviceType"]),
    backgroundColor() {
      return this.$store.state.globleThemeData.globalColor.componentData.page_op
        .pageColor;
    },
  },
  watch: {
    globalDeviceType(val) {
      this.initView();
      bus.$emit("initComponentsView");
    },
  },
  async asyncData(context) {
    let asyncData = {
      modelList: [],
      pageSettingData: "",
    };
    // 组件
    let pageList = context.store.state.themeModule.themeInstallPages;
    if (pageList.length > 0) {
      let item = pageList.filter((item) => item.pageCode == 9)[0];
      asyncData.modelList = JSON.parse(item.pageData).filter(
        (item) =>
          !item.componentInfo ||
          (item.componentInfo && item.componentInfo.visible == 1)
      );
      asyncData.pageSettingData = item.pageSettingData;
    }
    return asyncData;
  },
  created() {},
  mounted() {
    let that = this;
    that.initView();
    window.addEventListener("resize", function () {
      that.initView();
    });
  },
  methods: {
    initView() {
      this.$store.commit("screenWidth", document.body.offsetWidth);
      this.$store.commit("previewWidth", document.body.offsetWidth);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  font-size: 12px;
}
</style>

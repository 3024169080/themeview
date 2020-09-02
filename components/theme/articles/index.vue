<template>
  <!-- 文章组件 -->
  <div class="articles" :class="{'articlesMobule':deviceType==1}">
    <h3 class="title">{{title}}</h3>
    <div
      class="content"
      :class="{'wideScreen':!wideScreenShow}"
      :style="[{'font-weight':useBold?'bold':''},{'font-style':useItalics?'oblique ':''},{'font-size':textSize+'em'},{'line-height':'1.3em'}]"
      v-html="content"
    ></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "articles",
  props: {
    render: {
      type: Boolean,
      default: false,
    },
    deviceType: {
      type: Number,
      default: 2,
    },
    datas: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    wideScreenShow() {
      return this.datas.componentData.wideScreenShow || false;
    },
    title() {
      return this.datas.componentData.title || "";
    },
    content() {
      return this.datas.componentData.content || "";
    },
    useBold() {
      return this.datas.componentData.useBold || "";
    },
    useItalics() {
      return this.datas.componentData.useItalics || "";
    },
    textSize() {
      return this.datas.componentData.textSize || 1.2;
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.articles {
  padding: 20px 20px;
  box-sizing: border-box;
  font-size: 12px;
  .title {
    text-align: center;
    font-size: 24px;
  }
  .content {
    margin: 20px auto 0;
    text-align: center;
  }
  .wideScreen {
    width: 60%;
  }
}
.articlesMobule {
  width: 100%;
  .wideScreen {
    width: 100%;
  }
}
</style>

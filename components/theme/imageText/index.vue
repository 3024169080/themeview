<template>
  <!-- 图文组件 -->
  <div class="imageText flex" :class="{'imageTextMoblie':deviceType==1}">
    <div class="bg">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598092514179&di=0e18ba763cacbc72ec4f92fb14a8db34&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-26%2F59f182e5c1157.jpg"
        alt
      />
    </div>
    <div class="text">
      <h3 class="title">带文本叠加的图片</h3>
      <p class="info">使用叠加文本让客户深入了解您的品牌。选择与您的风格和故事相关的图片和文本。</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "imageText",
  props: {
    render: {
      type: Boolean,
      default: false,
    },
    deviceType: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.imageText {
  font-size: 12px;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 480px;
  overflow: hidden;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    filter: brightness(0.8);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .text {
    position: relative;
    z-index: 2;
    color: #fff;
    padding: 0 50px;
    font-family: Helvetica, "Helvetica Neue", Arial, "Lucida Grande", sans-serif;
    font-style: normal;
    font-weight: 400;
    h3 {
      font-size: 4em;
      text-align: center;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    }
    .info {
      max-width: 75%;
      margin: 10px auto 0;
      text-align: center;
      font-size: 1.8em;
    }
  }
}
.imageTextMoblie {
  height: 488px!important;
  .title {
    font-size: 2em!important;
  }
  .info {
    font-size: 0.9em!important;
  }
}
</style>

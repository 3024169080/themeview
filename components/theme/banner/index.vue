<template>
  <!-- 纯文本组件 -->
  <div class="banner">
    <van-swipe
      ref="Swiper"
      class="my-swipe"
      :autoplay="intervalTime*1000"
      indicator-color="var(--main-color)"
    >
      <van-swipe-item v-for="(item,index) in imgList" :key="index">
        <div class="img" :style="{'height':pictureHeight/12+'em'}" @click="toPage(item)">
          <img draggable="false" :src="item.imgUrl | DFSImg" alt />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/js/eventBus";
export default {
  name: "banner",
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
    imgList() {
      return this.datas.componentData.imgList || [];
    },
    pictureHeight() {
      return this.datas.componentData.pictureHeight;
    },
    intervalTime() {
      return this.datas.componentData.intervalTime;
    },
  },
  created() {},
  mounted() {
    this.init();
    bus.$on("initComponentsView", this.init);
  },
  methods: {
    init() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.$refs.Swiper && this.$refs.Swiper.resize) {
            this.$refs.Swiper.resize();
          }
        }, 500);
      });
    },
    toPage(item) {
      if (!this.render) {
        return;
      }
      if (item.links.links) {
        window.open(item.links.links);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  font-size: 12px;
  width: 100%;
  .my-swipe {
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
      background-color: #efefef;
      .img {
        width: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>

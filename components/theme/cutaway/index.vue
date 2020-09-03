<template>
  <!-- 切图 -->
  <div class="cutaway">
    <div class="imgList flex" v-for="(item,index) in imgList" :key="index">
      <div class="imgItem" v-for="(item1,index1) in item" :key="index1">
        <img :src="item1.imgUrl" @click="toPage(item1)" alt />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "cutaway",
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
  },
  created() {},
  mounted() {},
  methods: {
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
.cutaway {
  .imgList {
    .imgItem {
    }
  }
}
</style>

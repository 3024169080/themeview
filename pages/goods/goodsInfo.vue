<template>
  <!-- 商品详情 -->
  <div class="goodsInfo">
    <headersMy title="商品详情" @returnClick="backTo"></headersMy>
    <p>{{globalDeviceType}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
import headersMy from "~/components/common/headersMy";
export default {
  name: "goodsInfo",
  data() {
    return {};
  },
  components: {
    headersMy,
  },
  computed: {
    ...mapState(["globalDeviceType"]),
  },
  created() {},
  mounted() {},
  methods: {
    backTo() {
      this.$RouterBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.goodsInfo {
}
</style>

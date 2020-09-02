<template>
  <div class="container">
    <p>首页</p>
  </div>
</template>

<script type="text/ecmascript-6">
import shop from "~/api/shop";
export default {
  name: "container",
  data() {
    return {
    };
  },
  components: {},
  computed: {},
  async asyncData() {
    let asyncData = {};
    await shop.getShopInfo().then((res) => {
      console.log(res, "----------------------------------------21");
    });
    return asyncData;
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  font-size: 12px;
}
</style>

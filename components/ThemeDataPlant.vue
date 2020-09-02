<template>
  <div ref="ThemeDataPlant" class="ThemeDataPlant" :style="[{'width':previewWidth+'px'}]">
    <div v-for="(element,index) in datas" :key="index" class="list-complete-item">
      <component
        :is="element.componentCode"
        :datas="element"
        v-if="!element.componentInfo || (element.componentInfo && element.componentInfo.visible==1)"
        :ref="element.componentCode+index"
        :render="render"
        :deviceType="globalDeviceType==1||screenWidth<=1045?1:globalDeviceType"
      ></component>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    datas: {
      type: Array,
    },
    pageSettingData: {
      type: Object | String,
    },
  },
  computed: {
    ...mapState(["globalDeviceType", "screenWidth", "previewWidth"]),
  },
  data() {
    return {
      render: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(datas) {},
  },
};
</script>

<style lang="scss" scoped>
.ThemeDataPlant {
  width: 100%;
  position: relative;
}
</style>
<template>
  <!-- 头部 -->
  <section v-if="globalDeviceType==1">
    <div class="headersMy flex">
      <div class="header_left">
        <i v-if="isArrow" class="iconfont iconarrow-down" @click="back"></i>
      </div>
      <div class="header_mid line-clamp1" v-if="showLogo==''">{{title}}</div>
      <div class="showLogo flex" v-else>
        <div class="img">
          <img :src="showLogo | DFSImg" alt="">
        </div>
        <p class="line-clamp1">{{title}}</p>
      </div>
    </div>
    <div class="height59"></div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "headersMy",
  props: {
    title: {
      type: String,
      default: ""
    },
    isArrow:{
      type:Boolean,
      default:true
    },
    showLogo:{
      type:String,
      default:''
    }
  },
  computed:{
    ...mapState(["screenWidth", "previewWidth", "globalDeviceType"]),
  },
  components: {},
  created() {},
  mounted() {},
  methods:{
    back(){
      this.$emit("returnClick")
    }
  }
};
</script>

<style lang="scss" scoped>
.hei {
  height: 10px;
  // background-color: #e5e5e5;
}
.height59{
  width:100%;
  height:49px;
}
.headersMy {
  position: fixed;
  z-index:1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 49px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border-bottom:1px solid #e5e5e5;
  .header_left {
    .iconfont {
      font-size: 18px;
      position: absolute;
      top:50%;
      transform:translateY(-50%);
      left: 10px;
    }
  }
  .header_mid {
    width: 60%;
    font-size: 17px;
    font-weight: 400;
    color: #191919;
    text-align: center;
  }
  .showLogo{
    align-items: center;
    justify-content: center;
    max-width: 60%;
    font-size: 17px;
    font-weight: 400;
    color: #191919;
    text-align: center;
    .img{
      width: 36px;
      height: 36px;
      border-radius: 36px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    p{
      margin-left: 6px;
      flex: 1;
    }
  }
}
</style>


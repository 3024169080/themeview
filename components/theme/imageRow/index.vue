<template>
  <!-- 图片列 -->
  <div class="imageRow" :class="{'imageRowMoblie':deviceType==1}">
    <div class="list" v-for="(item,index) in list" :key="index" :class="'list'+list.length">
      <div class="img">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598092514179&di=0e18ba763cacbc72ec4f92fb14a8db34&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-26%2F59f182e5c1157.jpg"
          alt
        />
      </div>
      <div class="text">
        <p class="title">展示标题或标语{{index}}</p>
        <p class="describe">与您的客户分享博客文章、产品或促销信息。使用此文本描述产品、分享有关供货情况和风格的详细信息，或将此文本作为显示最近评论或常见问题解答的区域。</p>
      </div>
    </div>
    <div class="list" style="dislpay:none;" v-for="(item,index) in 3" :key="index+1*999"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "imageRow",
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
    return {
      list:[
        {
          name:"",
        },
        {
          name:"",
        },
        {
          name:"",
        },
        {
          name:"",
        },
        {
          name:"",
        },
        {
          name:"",
        },
      ]
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.imageRow {
  padding: 50px;
  font-size: 12px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  .list {
    padding: 0 10px;
    width: 30%;
    margin-top: 20px;
    .img {
      width: 100%;
      padding-bottom: 100%;
      height: 0;
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .text {
      .title {
        margin-top: 10px;
        color: var(--minor-color);
        font-size: 1.4em;
        font-weight: bold;
      }
      .describe {
        margin-top: 10px;
        font-size: 1.2em;
        color: #333232;
      }
    }
  }
  .list2{
    width: 46%;
  }
}
.imageRowMoblie {
  padding: 10px 0;
  display: block;
  .list {
    width: 100% !important;
    box-sizing: border-box;
  }
}
</style>

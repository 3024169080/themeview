<template>
  <!-- 商品列表 -->
  <div class="goodsList" :class="{'imageRowMoblie':deviceType==1}">
    <h2 class="topTitle">{{title}}</h2>
    <div class="listItem">
      <div
        class="list"
        v-for="(item,index) in goodsList"
        :key="index"
        :class="'list'+goodsList.length"
        :style="{'width':rows==1?'100%':(100/rows-2)+'%'}"
      >
        <div class="img">
          <img :src="(item.coverImage==''?item.productImgUrl:item.coverImage)" />
          <div class="text">
            <p class="title" :style="[{'font-size':textSize+'em'}]">{{item.productName}}</p>
          </div>
        </div>
      </div>
      <div
        class="list"
        style="dislpay:none;margin:0;"
        v-for="(item,index) in 3"
        :style="{'width':rows==1?'100%':(100/rows-2)+'%'}"
        :key="index+1*999"
      ></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "goodsList",
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
    return {
      toInit: true,
    };
  },
  components: {},
  computed: {
    title() {
      return this.datas.componentData.title || "";
    },
    rows() {
      return this.datas.componentData.rows || 3;
    },
    goodsSource() {
      return this.datas.componentData.goodsSource;
    },
    goodsSort() {
      return this.datas.componentData.goodsSort;
    },
    categoryId() {
      return this.datas.componentData.categoryId;
    },
    categoryName() {
      return this.datas.componentData.categoryName;
    },
    textSize() {
      return this.datas.componentData.textSize;
    },
    goodsList: {
      get() {
        return this.datas.componentData.goodsList || [];
      },
      set(newVal) {
        this.datas.componentData.goodsList = newVal;
      },
    },
    goodsListLength() {
      return this.goodsList.length;
    },
  },
  watch: {
    goodsListLength() {
      if (this.toInit) {
        this.toInit = false;
        this.init();
      }
    },
    // 监听排序修改
    goodsSort() {
      this.init();
    },
    // 监听分类修改
    categoryId() {
      this.init();
    },
  },
  created() {
    if (process.browser) {
      this.init();
    }
  },
  mounted() {},
  methods: {
    init() {
      console.log(this.goodsSource, "----------------107");
      if (this.goodsSource == 1) {
        //商品分类
        this.getProductList(2);
      } else {
        //指定商品
        this.getProductList(1);
      }
    },
    async getProductList(code) {
      //分类查
      if (code == 1) {
        // this.datas.componentData.goodsList = [];
        let query = {
          categoryId: this.categoryId,
          page: 1, // 当前页
          rows: this.goodsList.length, // 一页多少条
          sortColumn: this.goodsSort,
          sortType: this.goodsSort != 2 ? 1 : 0,
          // whetherShowSoldOutGoods: false, //查询销售数量
          // whetherQueryCollectCount: false, //查询收藏数
          // whetherUseVirtualSalesQty: false, //是否使用虚拟销售数量
          // whetherUseVirtualCollectCount: false, //是否使用虚拟收藏人数
          // whetherFindDistributionCommission: 0, //是否查询商品佣金（0：不查询，1：展示，为空不查佣金）
          // whetherFindRecommendedCardFlag: false ? 1 : 0, //是否查询会员价  1是  0否
          // whetherShowGoodsDefaultTagFlag: false ? 1 : 0, //是否展示营销标签  1是  0否
        };
        console.log(query, "----137");
        if (this.categoryName == "") {
          this.toInit = true;
          return;
        }
        this.opt.queryProductInfo(query).then((res) => {
          this.toInit = true;
          //  || (!this.render && res.data.code == 200)
          if (res.code == 200 || (!this.render && res.data.code == 200)) {
            this.goodsList = this.render ? res.data.list : res.data.data.list;
            this.goodsList.forEach((item) => {
              item.coverImage = this.opt.DFSImg(item.coverImage);
              item.productImgUrl = this.opt.DFSImg(item.productImgUrl);
            });
          }
        });
      } else {
        // 商品产品详情
        let productIdList = [];
        let goodsList = this.goodsList;
        goodsList.forEach((element) => {
          element.productImgUrl = "";
          element.productName = "";
          element.minPrice = "";
          productIdList.push(element.productId);
        });
        if (productIdList.length == 0) {
          this.toInit = true;
          return;
        }
        let query = {
          sortColumn: this.goodsSort,
          sortType: this.goodsSort != 2 ? 1 : 0,
          page: 1, // 当前页
          rows: productIdList.length, // 一页多少条
          productIdList: productIdList,
          // whetherShowSoldOutGoods: false,
          // whetherQueryCollectCount: false,
          // whetherUseVirtualSalesQty: false, //是否使用虚拟销售数量
          // whetherUseVirtualCollectCount: false, //是否使用虚拟收藏人数
          // whetherFindDistributionCommission: 0, //是否查询商品佣金（0：不查询，1：展示，为空不查佣金）
          // whetherFindRecommendedCardFlag: false ? 1 : 0, //是否查询会员价  1是  0否
          // whetherShowGoodsDefaultTagFlag: false ? 1 : 0, //是否展示营销标签  1是  0否
        };
        console.log(query, "----176");
        this.opt.queryProductInfo(query).then((res) => {
          this.toInit = true;
          if (res.code == 200 || (!this.render && res.data.code == 200)) {
            this.goodsList = this.render ? res.data.list : res.data.data.list;
            this.goodsList.forEach((item) => {
              item.coverImage = this.opt.DFSImg(item.coverImage);
              item.productImgUrl = this.opt.DFSImg(item.productImgUrl);
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.goodsList {
  font-size: 12px;
  .topTitle {
    text-align: center;
    padding: 30px;
    padding-bottom: 0;
    font-size: 2em;
  }
  .listItem {
    padding: 20px;
    padding-bottom: 0;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    .list {
      width: 30%;
      margin-bottom: 20px;
      cursor: pointer;
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
        .text {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 100%;
          z-index: 1;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          .title {
            padding: 10px;
            color: var(--minor-color);
            font-size: 2.4em;
            font-weight: bold;
            text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
            color: #fff;
          }
        }
      }
    }
    .list2 {
      width: 46%;
    }
  }
}
.imageRowMoblie {
  padding-top: 20;
  .list {
    width: 48% !important;
    box-sizing: border-box;
  }
  .title {
    font-size: 1.6em;
  }
}
</style>

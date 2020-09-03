<template>
  <!-- 商品详情 -->
  <div class="goodsInfo" :class="getGlobalClass">
    <headersMy title="商品详情" @returnClick="backTo"></headersMy>
    <div class="content">
      <!-- 轮播图 -->
      <div class="banner">
        <van-swipe
          class="my-swipe"
          ref="Swiper"
          :autoplay="3000"
          indicator-color="var(--main-color)"
        >
          <van-swipe-item v-for="(item,index) in productPics" :key="index">
            <img draggable="false" :src="item.url" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="info">
        <!-- 名字 -->
        <h2 class="name">{{goodsInfo.productName}}</h2>
        <!-- 价格 -->
        <div class="priceItem">
          <span
            class="price"
            v-if="(goodsInfo.minDiscountPrice-0)<(goodsInfo.maxDiscountPrice-0)&&(goodsInfo.selectedPrice==''||goodsInfo.selectedPrice==null)"
          >￥{{goodsInfo.minDiscountPrice | keepTwoNum}}-{{goodsInfo.maxDiscountPrice | keepTwoNum}}</span>
          <span
            class="price"
            v-else-if="goodsInfo.selectedPrice!=='' && goodsInfo.selectedPrice!=null"
          >￥{{goodsInfo.selectedPrice | keepTwoNum}}</span>
          <span
            class="price"
            v-else-if="goodsInfo.minDiscountPrice"
          >￥{{goodsInfo.minDiscountPrice | keepTwoNum}}</span>
        </div>
        <!-- 规格 -->
        <div class="commoditySty">
          <ul>
            <li v-for="(ProductItem,n) in goodsGuiges" :key="n">
              <div class="property">{{ProductItem.specificationName}}</div>
              <div class="specification clearfix">
                <div
                  v-for="(oItem,index) in ProductItem.specificationValue"
                  :key="index"
                  @click="specificationBtn(oItem.name,n,$event,index)"
                  :class="[oItem.isShow?'':'soldOut',subIndex[n] == index?'active':'']"
                  class="specification-item"
                >
                  <div>{{oItem.name}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/js/eventBus";
import { mapState } from "vuex";
import headersMy from "~/components/common/headersMy";
import commodity from "~/api/commodity";
import { DFSImg } from "~/plugins/commFunc";
export default {
  name: "goodsInfo",
  data() {
    return {
      isChoice: true, //显示“请选择规格”
      isSingle: false, //是否为单规格商品
      isGetMixId: false, // 是否取价格
      product_goods_info: {
        afterSaleContent: "",
        goodsImgUrl: "",
        maxQty: "",
        pdtName: "",
        productGoodsId: "",
        productGoodsMixId: "",
        productId: "",
        referencePrice: "",
        marketPrice: "",
        oversoldFlag: Number,
        originalPrice: "",
        sellMaxQty: "",
        limitQty: "",
        specifications: [], //原规格
        discountPrice: "",
      },
      allSellOut: false, //全部售罄标识
    };
  },
  components: {
    headersMy,
  },
  async asyncData({ query }) {
    let asyncData = {
      goodsInfo: {},
      productPics: [], //商品图片列表
      goodsGuiges: [],
      subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
      shopItemInfo: {}, //存放要和选中的值进行匹配的数据
      getProductInfos: [], //产品信息数组
    };
    return asyncData;
  },
  computed: {
    ...mapState(["globalDeviceType"]),
    getGlobalClass() {
      return this.globalDeviceType == 1 ? "goodsInfoMobile" : "goodsInfoPc";
    },
  },
  created() {},
  mounted() {
    this.init();
    bus.$on("initComponentsView", this.initView);
  },
  methods: {
    backTo() {
      this.$RouterBack();
    },
    initView() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.$refs.Swiper && this.$refs.Swiper.resize) {
            this.$refs.Swiper.resize();
          }
        }, 500);
      });
    },
    async init() {
      let { productId } = this.$route.query;
      let getProductInfoQuery = {
        productId,
      };
      await commodity.getProductInfo(getProductInfoQuery).then((res) => {
        if (res.code == 200) {
          this.goodsInfo = res.data;
          this.productPics = this.goodsInfo.productPictures;
          this.productPics.forEach((item, index) => {
            item.url = DFSImg(item.url);
          });
        }
      });
      await commodity
        .getProductGoodsByProductInfo({ productInfoId: productId })
        .then((res) => {
          if (res.code == 200) {
            this.getProductInfos = res.data;
            this.product_goods_info.productGoodsId = res.data[0].productGoodsId;
            this.product_goods_info.goodsId = res.data[0].goodsId;
            this.product_goods_info.productGoodsMixId =
              res.data[0].productGoodsMixId;
            this.product_goods_info.specifications = res.data[0].specifications;
            this.product_goods_info.oversoldFlag = res.data[0].oversoldFlag;
          }
        });

      await commodity
        .getProductGoodsSpecifications({ productId })
        .then((res) => {
          if (res.code == 200) {
            this.goodsGuiges = res.data;
            let isSingles = [];
            this.goodsGuiges.forEach((item, index) => {
              if (item.specificationValue.length >= 2) {
                isSingles.push(1);
              }
              if (isSingles.length != 0) {
                this.isSingle = false; //多规格
                this.goodsGuige = [];
                this.subIndex.pop();
              } else {
                this.isSingle = true; // 单规格商品
                this.isChoice = false;
                // this.goodsGuige.push(item.specificationValue[0]);
                this.goodsGuige = [];
                this.subIndex.push(0);
                // 通过mixid取价格
              }
            });
            if (this.isSingle == true) {
              this.getMixId(0);
            }

            //  规格数据重组
            for (var i = 0; i < this.goodsGuiges.length; i++) {
              for (
                var j = 0;
                j < this.goodsGuiges[i].specificationValue.length;
                j++
              ) {
                this.goodsGuiges[i].specificationValue[j] = {
                  name: this.goodsGuiges[i].specificationValue[j],
                  isShow: true,
                };
              }
            }
            this.getProductInfos.forEach((item, index) => {
              item.twoSpecifications = [];
              item.specifications.forEach((item1, index1) => {
                item.specifications.splice(index1, 1, item1.specificationValue);
                item.twoSpecifications.splice(
                  index1,
                  1,
                  item1.specificationValue
                );
              });
              item.specifications = item.specifications.join("abab@&*");
            });
            for (var i in this.getProductInfos) {
              this.shopItemInfo[
                this.getProductInfos[i].specifications
              ] = this.getProductInfos[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
            }
            let defaultnoSellOut = this.getProductInfos.filter(
              (item, index) => {
                return !(
                  (item.oversoldFlag == 0 && item.saleQty - 0 <= 0) ||
                  item.saleStatus == "0"
                );
              }
            );
            if (defaultnoSellOut.length == 1) {
              // 默认选中一个只有一个未售罄的规格
              this.defaultSelection(
                defaultnoSellOut[0].twoSpecifications,
                this.goodsGuiges
              );
            }
            if (defaultnoSellOut.length == 0) {
              this.allSellOut = true;
            }
          }
        });
    },
    // 取价格
    getMixId(val, getNewPrice, flag) {
      this.isGetMixId = true;
      let query = {};
      query = {
        productGoodsMixId: this.product_goods_info.productGoodsMixId,
        goodsQty: this.buyQty || 1,
      };
      commodity.getProductGoodsByMixId(query).then((res) => {
        if (res.code == 200) {
          this.product_goods_info.goodsImgUrl =
            DFSImg(res.data.productUrl, 400, 400) || DFSImg("", 400, 400);
          this.product_goods_info.marketPrice = res.data.marketPrice;
          this.product_goods_info.originalPrice = res.data.originalPrice;
          this.product_goods_info.discountPrice = res.data.discountPrice;
          this.product_goods_info.sellMaxQty = res.data.sellMaxQty; //可销售库存
          this.product_goods_info.limitQty = res.data.limitQty; //  实际库存
          this.product_goods_info.productMinCount = res.data.productMinCount; //最小购买数  0不限
          this.product_goods_info.maxQty = res.data.maxQty; // 最大购买数   0不限
          this.product_goods_info.oversoldFlag = res.data.oversoldFlag; // 1超卖 0不超卖
          this.product_goods_info.goodsSuggestedRetailPrice =
            res.data.goodsSuggestedRetailPrice;
          this.product_goods_info.singleItemActivityId =
            res.data.singleItemActivityId;
        }
      });
    },
    // 默认选中一组规格
    // 两个参数goodsSpc,allSpc  sku及所有规格
    defaultSelection(goodsSpc, allSpc) {
      console.log(goodsSpc, "-------371");
      console.log(allSpc, "-------372");
      for (let i = 0; i < allSpc.length; i++) {
        for (let j = 0; j < allSpc[i].specificationValue.length; j++) {
          for (let k = 0; k < goodsSpc.length; k++) {
            if (allSpc[i].specificationValue[j].name == goodsSpc[k]) {
              this.specificationBtn(
                allSpc[i].specificationValue[j].name,
                i,
                null,
                j
              );
              break;
            }
          }
        }
      }
    },
    specificationBtn(item, n, event, index) {
      this.isChoice = false;
      if (this.goodsGuige[n] != item) {
        this.goodsGuige[n] = item;
        // this.goodsGuige[n] = item;
        this.subIndex[n] = index;
        this.subIndex.splice(n, 1, index);
      } else {
        this.goodsGuige[n] = "";
        this.subIndex[n] = -1; //去掉选中的颜色
        this.subIndex.splice(n, 1, -1); //去掉选中的颜色
        this.product_goods_info.discountPrice = null;
        this.goodsStand = 1;
        let isChoice = 0;
        // this.product_goods_info.goodsImgUrl=DFSImg(this.goodsImg,400,400);
        this.product_goods_info.goodsImgUrl =
          this.goodsImg || DFSImg("", 1024, 1024);
        this.sellOut = false;
        this.isGetMixId = false;
        this.goodsGuige.forEach((item, index) => {
          if (item == "") {
            isChoice++;
          }
        });
        if (isChoice == this.goodsGuige.length) {
          this.isChoice = true;
          this.goodsGuige = [];
          isChoice = 0;
        } else {
          this.isChoice = false;
        }
      }
      // if(!item.isShow){
      //   if(item.oversoldFlag==0&&item.saleQty-0<=0){
      //     this.$emit("sellingOut", {
      //       sellOut: false, //售罄及无库存且不是超卖
      //     });
      //   }
      //   return;
      // }
      this.checkItem();
      let noStr = 0;
      this.goodsGuige.forEach((item, index) => {
        if (item != "") noStr++;
      });
      if (noStr == this.goodsGuiges.length) {
        this.getMixId(1);
      } else {
        this.$emit("sellingOut", {
          sellOut: false, //售罄及无库存且不是超卖
        });
        // console.log("换主图")
        // this.$set(this.product_goods_info,'goodsImgUrl',this.productUrl);
        // console.log(this.product_goods_info.goodsImgUrl,this.productUrl,"cg532")
      }
    },
    checkItem() {
      var option = this.goodsGuiges;
      var result = []; //定义数组存储被选中的值
      // console.log(this.goodsGuiges,"cg524")
      for (var i in option) {
        result[i] = this.goodsGuige[i] ? this.goodsGuige[i] : "";
      }
      for (var i in option) {
        var last = result[i]; //把选中的值存放到字符串last去
        for (var k in option[i].specificationValue) {
          result[i] = option[i].specificationValue[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
          option[i].specificationValue[k].isShow = this.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
        }
        result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
      }
      this.$forceUpdate(); //重绘
    },
    isMay: function (result) {
      for (var i in result) {
        if (result[i] == "") {
          return true; //如果数组里有为空的值，那直接返回true
        }
      }
      // console.log(result,this.goodsGuige,"cg494")
      for (var i in this.shopItemInfo) {
        let newArr = i.split("abab@&*");
        let isTrue = this.isContained(result, newArr);
        if (isTrue == true) {
          // console.log(newArr,i,result,"cg498")
          if (this.goodsGuige.length == this.goodsGuiges.length) {
            let isGoods = this.isContained(this.goodsGuige, newArr);
            if (isGoods == true) {
              this.product_goods_info.productGoodsMixId = this.shopItemInfo[
                i
              ].productGoodsMixId;
              this.product_goods_info.productGoodsId = this.shopItemInfo[
                i
              ].productGoodsId;
              this.product_goods_info.goodsId = this.shopItemInfo[i].goodsId;
            }
          }
          if (
            this.shopItemInfo[i].saleStatus == 0 ||
            (this.shopItemInfo[i].oversoldFlag == 0 &&
              this.shopItemInfo[i].saleQty - 0 <= 0)
          ) {
            return false;
          } else {
            return true;
          }

          // return this.shopItemInfo[i].saleStatus == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
        }
      }
    },
    isContained(aa, bb) {
      if (
        !(aa instanceof Array) ||
        !(bb instanceof Array) ||
        aa.length < bb.length
      ) {
        return false;
      }
      for (var i = 0; i < bb.length; i++) {
        var flag = false;
        for (var j = 0; j < aa.length; j++) {
          if (aa[j] == bb[i]) {
            flag = true;
            break;
          }
        }
        if (flag == false) {
          return flag;
        }
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.goodsInfo {
  font-size: 12px;
  .content {
    display: flex;
    margin: 0 auto;
    .commoditySty {
      ul {
        height: 95%;
        li {
          height: 100%;
          .property {
            padding: 10px 0;
            font-size: 16px;
            color: var(--minor-color);
            border-bottom: 1px solid #efefef;
            margin-bottom: 10px;
          }
          .specification {
            div.specification-item {
              cursor: pointer;
              border-radius: 15px;
              color: #333;
              text-align: center;
              padding: 0 10px;
              float: left;
              margin-right: 12px;
              margin-bottom: 12px;
              box-sizing: content-box;
              font-size: 12px;
              background-color: #f2f2f2;
              height: 30px;
              line-height: 30px;
              div {
                text-align: left;
                display: inline-block;
              }
            }
            div.active {
              color: #fff;
              background-color: var(--main-color);
              border-color: var(--main-color);
            }
            div.soldOut {
              background-color: #ccc;
              opacity: 0.4;
              color: #000;
              pointer-events: none;
              border-color: #606060;
            }
          }
        }
      }
    }
  }
}
.goodsInfoMobile {
  .content {
    display: block;
    .banner {
      width: 100%;
      .my-swipe {
        width: 100%;
      }
    }
  }
}
.goodsInfoPc {
  display: flex;
  justify-content: center;
  .content {
    display: flex;
    margin-top: 50px;
    .banner {
      width: 500px;
      height: 500px;
      .my-swipe {
        width: 500px;
        height: 500px;
      }
    }
    .info {
      width: 500px;
      flex: 1;
      margin-left: 20px;
      margin-top: 20px;
      .name {
        font-size: 24px;
        color: var(--minor-color);
      }
      .priceItem {
        font-size: 20px;
        margin-top: 10px;
        font-weight: bold;
        color: var(--main-color);
      }
    }
  }
}

.my-swipe .van-swipe-item {
  background: #efefef;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>

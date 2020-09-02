import { DFSImg } from "~/plugins/commFunc";

export default {
  list: [
    {
      componentCode: "goodsList",
      queryProductInfo: require("~/api/index").default.queryProductInfo,
      DFSImg: DFSImg
    }
  ]
};

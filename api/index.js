import { fetch } from '~/plugins/axios'
import config from '~/config'
export default {
  // 搜索产品
  queryProductInfo(data) {
    return fetch(`${config.OLSHOP_URL}/product/query_product_info`, { data });
  },
};
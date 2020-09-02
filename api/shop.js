import { fetch } from '@/plugins/axios'
import config from '~/config'

export default {
  // 获得积分获取规则
  getIntegralConfig(data) {
    return fetch(`${config.OLSHOP_URL}/shop/get_integral_config`, { data });
  },
  // 获取店铺信息
  getShopInfo(data) {
    return fetch(`${config.OLSHOP_URL}/shop/get_shop_info`, { data });
  },
  // 获取店铺会员卡信息(列表)
  getShopCardConfigs(data) {
    return fetch(`${config.OLSHOP_URL}/shop/get_shop_card_configs`, { data });
  },
  // 获取店铺会员卡信息
  queryShopList(data) {
    return fetch(`${config.OLSHOP_URL}/shop/query_shop_list`, { data });
  },
  // 获取选中会员卡信息
  userCardDetail(params) {
    return fetch(`${config.OLSHOP_URL}/user/user_card_detail`, { params });
  },
  getShopExtConfiguration() {
    return fetch(`${config.OLSHOP_URL}/shop/get_shop_ext_configuration`);
  },
  // 获取线下门店列表
  getOfflineStoreData(data) {
    return fetch(`${config.OLSHOP_URL}/shop/get_offline_store_data`, { data });
  },
  // 首页获取线下门店列表
  getThousandsStoresOfflineStore(data) {
    return fetch(
      `${config.OLSHOP_URL}/shop/get_thousands_stores_offline_store`,
      { data }
    );
  },
  // 获取线下门店详情
  getOfflineStoreDetail(params) {
    return fetch(`${config.OLSHOP_URL}/shop/get_offline_store_detail`, {
      params
    });
  },
  // 获取选中门店
  getOfflineShopInfo() {
    return fetch(`${config.OLSHOP_URL}/shop/get_offline_shop_info`);
  },
  // 获取选中线下门店
  getShopInfoByCode(params) {
    return fetch(`${config.OLSHOP_URL}/shop/get_shop_info_by_code`, { params });
  },

  // 获取新版入口会员卡
  getV3PortalShopCard() {
    return fetch(`${config.OLSHOP_URL}/user/portal_card`);
  },
  // 获取新版会员卡列表
  getV3CardList(params) {
    return fetch(`${config.OLSHOP_URL}/user/membership_card_list`, { params });
  },
  //商品详情获取推荐会员卡及会员价
  query_recommend_membership_card(params) {
    return fetch(`${config.OLSHOP_URL}/product/query_recommend_membership_card`, { params });
  },
  // 领取新版无门槛会员卡
  drawV3Card(params) {
    return fetch(`${config.OLSHOP_URL}/user/draw_membership_card`, { params });
  },
  // 获取新版会员卡详情
  getV3CardDetail(params) {
    return fetch(`${config.OLSHOP_URL}/user/membership_card_detail`, {
      params
    });
  },
  //首页分享
  indexWxShare(params){
    return fetch(`${config.OLSHOP_URL}/shop/get_store_share_config`, { params })
  }
};
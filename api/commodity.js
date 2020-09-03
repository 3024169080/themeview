import { fetch } from '@/plugins/axios'
import config from '~/config'
//  商品
export default {
    // 获取商品详情
    getProductGoods(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_product_goods`, { params })
    },
    //商品图片
    getProductPicture(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_product_picture`, { params })
    },
    //商品规格
    getProductSpecification(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_product_specification`, { params })
    },

    //查询是否收藏
    getCollectGoodsFlag(params) {
        return fetch(`${config.OLSHOP_URL}/product/collect_goods_flag`, { params })
    },
    //收藏
    collectGoods(params) {
        return fetch(`${config.OLSHOP_URL}/product/collect_goods`, { params })
    },
    //取消收藏
    uncollectGoods(params) {
        return fetch(`${config.OLSHOP_URL}/product/uncollect_goods`, { params })
    },
    //足迹添加
    myTracks(params) {
        return fetch(`${config.OLSHOP_URL}/user/my_tracks`, { params })
    },

    //商品售后服务信息
    productAfterService(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_product_after_service`, { params })
    },
    // 获取产品详情
    getProductInfo(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_product_info`, { params })
    },
    getProductGoodsByProductInfo(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_product_goods_by_product_info`, { params })
    },
    getProductAttributeValues(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_product_attribute_values`, { params })
    },
    getProductGoodsByMixId(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_product_goods_by_mix_id`, { params })
    },
    // 获取商品所有规格
    getProductGoodsSpecifications(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_goods_specifications`, { params })
    },
    //获取服务
    getProductServiceInfo(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_product_service_by_productId`, { params })
    },
    //获取商品库存
    getInventoryByGoodsId(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_inventory_by_goodsId`, { params })
    },
    //是否展示销量
    getShopConfiguration(params) {
        return fetch(`${config.OLSHOP_URL}/shop/get_shop_configuration`, { params })
    },

    //获取收藏列表
    getCollectGoodsList(params) {
        return fetch(`${config.OLSHOP_URL}/product/my_collect_goods`, { params })
    },
    //获取足迹列表
    getqueryBrowseInfoList(params) {
        return fetch(`${config.OLSHOP_URL}/user/queryBrowseInfoList`, { params })
    },
    //查询商品常见问题
    getProductCommonProblem(params) {
        return fetch(`${config.OLSHOP_URL}/product/get_product_common_problem`, { params })
    },
    //根据商品获取正在直播的直播房间接口
    getLivingByProductId(data){
        return fetch(`${config.OLSHOP_URL}/liveBroadcastGoods/getLiveIdByGoodsId`, { data })
    }
}

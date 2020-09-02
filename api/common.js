import {fetch} from '@/plugins/axios'
import config from '~/config'

// 获取个人资料
export default{
    getWxConfig(params) {
        return fetch(`${config.OLSHOP_URL}/common/get_wx_config_json`, {params})
    },
    // 获取微信卡包配置
    addCard(data) {
        return fetch(`${config.OLSHOP_URL}/common/get_add_card_json`, {data})
    },
    // 获取系统配置
    get_system_config_by_code(params) {
        return fetch(`${config.OLSHOP_URL}/common/get_system_config_by_code`, { params })
    },
}

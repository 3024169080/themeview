import { fetch } from '@/plugins/axios'
import config from '~/config'
export default {
    //POST 获取智能表单详情
    getSmartForm(formId) {
        return fetch(`${config.OLSHOP_URL}/smartForm/getSmartForm/${formId}`, {})
    },
    //POST 客户端获取本次答题表单内容
    userGetForm(data) {
        return fetch(`${config.OLSHOP_URL}/smartForm/userGetForm`, { data })
    },
    //POST /smartForm/userGetFormResult/{formUserSubmitId}通过客户提交ID查询表单结果信息
    userGetFormResult(formUserSubmitId) {
        return fetch(`${config.OLSHOP_URL}/smartForm/userGetFormResult/${formUserSubmitId}`, {})
    },
    //POST 客户端提交表单内容
    userSubmitForm(data) {
        return fetch(`${config.OLSHOP_URL}/smartForm/userSubmitForm`, { data })
    },
}
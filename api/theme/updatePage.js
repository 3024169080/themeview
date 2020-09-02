import request from '@/plugins/axios.js'
import config from '@/config'

export function updatePageInfo(data) {
  return request({
    url: `${config.OLSHOP_URL}/cmsService/shopPage/save_or_update_shop_page_and_data`,
    method: 'post',
    data
  })
}
export function browseThemeInfo(params) {

  console.log(`/innerApi/cmsService/shopPage/preview/${params}`)
  // return request({
  //   url: `/innerApi/cmsService/shopPage/preview/`,
  //   method: 'get',
  // })
}
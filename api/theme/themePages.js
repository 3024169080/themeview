/*
 * @Author: your name
 * @Date: 2020-06-18 13:47:08
 * @LastEditTime: 2020-08-28 14:05:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mayi-moblie-shop\api\theme\themePages.js
 */
import { fetch } from '@/plugins/axios'

export function themePagesInfo(data) {
  return fetch(`/innerApi/shopApiService/cms/get_shop_install_pages`, { data })
}

export function browseThemeInfo(params) {
  return fetch(`/innerApi/cmsService/shopPage/preview/${params}`,null,true)
}

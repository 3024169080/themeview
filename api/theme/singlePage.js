import { fetch } from '@/plugins/axios'
import config from '~/config'

export function singlePageInfo(params) {
  return fetch(`/innerApi/shopApiService/cms/get_shop_page_by_id`, { params })
 
}

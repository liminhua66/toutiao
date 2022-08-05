import request from '@/utils/request'

/**
 * 获取联想建议
 * @param {String} q 关键词
 * @returns Promise
 */
export const getSearchSuggestionsApi = (q) =>
  request({
    url: '/v1_0/suggestion',
    params: { q }
  })

export const getSearchResultApi = () =>
  request({
    url: '/v1_0/search'
  })

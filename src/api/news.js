import request from '@/utils/request'

/**
 *
 * @param {*} channelId 频道的ID
 * @param {*} timestamp 请求第一页数据时为当前的时间戳，请求上一页时传上一页的时间戳
 * @returns Promise
 */
export const getArticleAPI = (channelId, timestamp) =>
  request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })

// import store from '@/store'
import request from '@/utils/request'

import storage from '@/utils/storage'

export const getMyChannel = () =>
  request({
    url: '/v1_0/user/channels'
    // header: {
    //   Authorization: 'Bearer' + store.state.tokenObj.token
    // }
  })

export const getAllChannels = () =>
  request({
    url: '/v1_0/channels'
  })

export const delChannel = (target) =>
  request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })

export const addChannel = (id, seq) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })

// 封装存储删除本地channels数据

const HEIMA_TOUTIAO_MY_CHANNELS = ''
export const setMyChannelsToLocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannels)
}

export const getMyChannelsByLocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}

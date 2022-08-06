import request from '@/utils/request'
/**
 *
 * @param {*string} mobile 手机号
 * @param {*string} code 验证码
 * @returns
 */
// 登入注册  /v1_0/authorizations post 参数 mobile code
export const getLogin = (data) =>
  request({
    url: '/v1_0/authorizations',
    data,
    method: 'POST'
  })
// 发送验证码
export const getCodeApi = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`
  })
/**
 *  获取用户信息
 * @returns Promise
 */
export const getUserInfo = () =>
  request({
    url: '/v1_0/user/profile'
  })

/**
 *  编辑用户头像、身份证照片
 * @returns Promise
 */
export const setUserPhoto = (photo) =>
  request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: { photo }
  })

/**
 * 上传头像
 * @param {*} file 图片的file对象
 * @returns  Promise
 */
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

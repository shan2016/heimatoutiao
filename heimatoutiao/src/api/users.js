import axios from '@/utils/myaxios.js'

export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 获取用户详情
export const getUserInfo = (id) => {
  return axios({
    url: `/user/${id}`
  })
}

// 编辑用户信息
export const editUserInfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}
// 实现用户注册
export const userRegister = (data) => {
  return axios({
    method: 'post',
    url: `/register`,
    data
  })
}

// 关注用户
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 取消关注
export const unFollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}

// 点赞文章
export const likeArticleById = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 收藏文章
export const collectArticleById = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 获取我的关注
export const getMyFollow = (id) => {
  return axios({
    url: `/user_follows`
  })
}

// 我的收藏
export const getMyCollections = (id) => {
  return axios({
    url: `/user_star`
  })
}

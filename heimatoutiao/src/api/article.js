// 处理与新闻相关的业务
import axios from '@/utils/myaxios.js'

// 2. 获取指定栏目的所有新闻数据
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 3.根据文章id获取文章的详情
export const getArticleDetail = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 发表文章评论--包括回复
export const sendComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}

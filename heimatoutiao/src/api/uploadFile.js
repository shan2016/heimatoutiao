// 处理文件上传业务
// 引入axios
import axios from '@/utils/myaxios.js'

// 实现文件上传
export const uploadFile = (data) => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}

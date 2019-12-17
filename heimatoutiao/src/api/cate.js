// 处理与栏目分类相关的业务
import axios from '@/utils/myaxios.js'

export const getCateList = () => {
  return axios({
    url: '/category'
  })
}

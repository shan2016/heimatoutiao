import axios from 'axios'
import { Toast } from 'vant'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
localStorage.setItem('hm_40_baseURL', axios.defaults.baseURL)
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config)
  let token = localStorage.getItem('heima_40_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
}
)

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response)
  if (response.data.message === '用户信息验证失败！' || response.data.message === '用户信息验证失败') {
    Toast.fail('用户信息验证失败')
    window.location.href = '#/login'
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
export default axios

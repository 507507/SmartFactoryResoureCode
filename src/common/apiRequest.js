//封装axios 到时候直接引用
import axios from 'axios'
import { baseURL } from '../common/index'

//service:创建好axios封装
const service = axios.create({
  baseURL: baseURL()
})

//请求拦截器————在axios发起请求之前要做的事  aop思想
service.interceptors.request.use(
  (config) => {
    // console.log('请求前完成')
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

//请求拦截器————在axios发起请求之前要做的事  aop思想
service.interceptors.request.use(
  async (response) => {
    // console.log('请求已经响应')
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service

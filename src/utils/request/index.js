import axios from 'axios'
import * as api from '../../config/server'


const service = axios.create({
  baseURL: api.attendanceApi,
  timeout: 15000
})

service.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': '7213dba014dbb106a3e27b76a11aced4'
  }
 return config
})

service.interceptors.response.use(response => {
  if (response.status === 200) {
    return response
  }
})

export default service
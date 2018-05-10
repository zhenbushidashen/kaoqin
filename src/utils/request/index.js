import axios from 'axios'
import * as api from '../../config/server'


const service = axios.create({
  baseURL: api.attendanceApi,
  timeout: 15000
})

service.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': '899ba0768c0296f12e2d6f8a4eac4588'
  }
 return config
})

service.interceptors.response.use(response => {
  if (response.status === 200) {
    return response
  }
})

export default service
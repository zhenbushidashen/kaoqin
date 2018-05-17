import axios from 'axios'
import * as api from '../../config/server'


const service = axios.create({
  baseURL: api.attendanceApi,
  timeout: 15000
})

service.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': '7e2bd51d41ce6c3e40994f9fcf4cd655'
  }
 return config
})

service.interceptors.response.use(response => {
  if (response.status === 200) {
    return response
  }
})

export default service
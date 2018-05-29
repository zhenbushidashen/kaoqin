import axios from 'axios'
import * as api from '../../config/server'
import {getToken} from '../../auth'


const service = axios.create({
  baseURL: api.attendanceApi,
  timeout: 15000
})
var tokenInfo = getToken(window.location.href)
service.interceptors.request.use(config => {
  if(tokenInfo.success){
    console.log(tokenInfo)
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'token': tokenInfo.token
    } 
  } 
 return config
})

service.interceptors.response.use(response => {
   if(response.status === 200 || response.status === 201 || response.status === 304){
     return response
   } else {
    return Promise.reject(response.message)
   }
}, error => {
  return Promise.reject(error)
})

export default service
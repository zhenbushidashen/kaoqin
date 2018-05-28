import http from '../utils/request'
import {attendanceApi} from '../config/server'
export const exportAttendanceExcel = (param => {
     window.open(`${attendanceApi}/record/org/${param.oId}/download`)
})

export const searchAttendanceData = (param => {
    return http.get(`/record/org/${param.oId}/location/${param.locationId}?begin=${param.startDate}&end=${param.endDate}&limit=10&offset=${param.signType}`)
}) 

export const getOriganationInfo = (param => {
    return http.request({
        method: 'get',
        baseURL: 'http://183.196.130.125:9002/contact',
        url:`/org?pId=${param.oId}`
      })
}) 

                                                                              
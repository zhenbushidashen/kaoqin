import http from '../utils/request'
import {attendanceApi} from '../config/server'
export const exportAttendanceExcel = (param => {
     window.open(`${attendanceApi}/record/org/${param.oId}/download`)
})

export const searchAttendanceData = (param => {
    return http.get(`/record/org/${param.oId}/location/${param.locationId}?begin=${param.startDate}&end=${param.endDate}&limit=10&offset=${param.signType}`)
}) 

                                                                              
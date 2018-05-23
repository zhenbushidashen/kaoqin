import http from '../utils/request'

export const exportAttendanceExcel = (param => {
    return http.get(`/record/org/${param.oId}/download`)
})

                                                                              
import http from '../utils/request'

export const GET_ATTENDANCEITEMS = ({state, commit}) => {
    return http.get('/rule')
}
export const CLOSE_ATTENDANCEITEM = ({state, commit}, ID) => {
    return http.put(`/rule/${ID}`, {status: 0})
}
export const OPEN_ATTENDANCEITEM = ({state, commit}, ID) => {
    return http.put(`/rule/${ID}`, {status: 1})
}
export const DELETE_ATTENDANCEITEM = ({state, commit}, ID) => {
  return http.delete(`/location/${ID}`)
}
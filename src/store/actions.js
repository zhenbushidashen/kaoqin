import http from '../utils/request'

export const GET_ATTENDANCEITEMS = ({state, commit}) => {
    return http.get('/rule')
}
export const GET_ATTENDANCEITEM = ({state, commit}, ID) => {
    return http.get(`/rule/${ID}`)
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
export const CREATE_LOCATION = ({state, commit}, PAYLOAD) => {
    return http.post('/location', {
        place: PAYLOAD.place,
        latitude: PAYLOAD.latitude,
        longitude: PAYLOAD.longitude,
        radius: PAYLOAD.radius
    })
}

export const CREATE_RULE = ({state, commit}, PAYLOAD) => {
    return http.post('/rule', {
        oId: PAYLOAD.oId,
        locationId: PAYLOAD.locationId,
        signIn: PAYLOAD.signIn,
        signOut:PAYLOAD.signOut
    })
}
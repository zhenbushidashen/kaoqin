export const INIT_ATTENDANCEITEMS = (state, payload) => {
    state.attendanceItems = payload
}
export const UPDATE_ATTENDANCEITEM = (state, payload) => {
    state.attendanceItems.forEach((value, idx) => {

        if(value.locationId === payload.locationId) {
            state.attendanceItems[idx][payload.key] = payload.value
        }
    });
}

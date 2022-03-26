import  { UserActionTypes }  from "./user.types";

export const checkUserLog = user => ({
    type: UserActionTypes.CHECK_USER_LOG,
	payload: user
})

export const LogOut = () => ({
    type: UserActionTypes.LOG_OUT
})

export const LogIn = user => ({
    type: UserActionTypes.LOG_IN,
    payload: user
})
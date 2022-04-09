import { DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_USER_FAIL, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, PROFILE_FAIL, PROFILE_REQUEST, PROFILE_SUCCESS, UPDATE_AVATAR_FAIL, UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../Constant/UserConstant";


// State: User Register
// Method: POST
// Access: Public
export const userRegister = (state = { user: false }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false, user: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

//State: User Login
//Method: POST
//Access: Public
export const userLogin = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false, userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}
        default: return state
    }
}



// State: User Profile
// Method: GET
// Access: Protected
export const userProfileReducer = (state = { profileInfo: {} }, action) => {
    switch (action.type) {
        case PROFILE_REQUEST:
            return { loading: true };
        case PROFILE_SUCCESS:
            return { loading: false, profileInfo: action.payload };
        case PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default: return state;
    }
}

// State: Get All User
// Method: GET
// Access: Admin only
export const getAllUserReducer = (state = { allUser: false }, action) => {
    switch (action.type) {
        case GET_ALL_USER_REQUEST:
            return { loading: true };
        case GET_ALL_USER_SUCCESS:
            return { loading: false, allUser: action.payload };
        case GET_ALL_USER_FAIL:
            return { loading: false, error: action.payload }
        default: return state;
    }
}



export const deleteUserReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return { loading: true }
        case DELETE_USER_SUCCESS:
            return { loading: false, success: true }
        case DELETE_USER_FAIL:
            return { loading: false, error: action.payload }
        default: return state;
    }
}


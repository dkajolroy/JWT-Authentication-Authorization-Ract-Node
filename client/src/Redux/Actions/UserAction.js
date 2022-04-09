import {
    UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_FAIL, UPDATE_AVATAR_SUCCESS,
    GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_ALL_USER_FAIL,
    PROFILE_FAIL, PROFILE_REQUEST, PROFILE_SUCCESS, USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS, DELETE_USER_FAIL
} from '../Constant/UserConstant'
import axios from 'axios'
import { toast } from 'react-toastify'


// State : User Register
// Method: POST
// Access: Public
export const registerAction = (user) => async (dispatch) => {
    console.log(user)
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/register`, user, config)
        console.log(data)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        toast.success(data.message ? data.message : null, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
        })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.message ?
                error.response.data.message : error.message
        })
        toast.error(error.response && error.message ?
            error.response.data.message : error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
        })
    }

}





// State : User Login
// Method: POST
// Access: Public
export const loginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post(`http://localhost:5000/api/login`, { email, password }, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
        toast.success('Login Success', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.message ?
                error.response.data.message :
                error.message
        })
        toast.error(error.response && error.message ?
            error.response.data.message :
            error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
        })
    }

}



// State : User Logout
// Method: Offline LocalStorage
// Access: Any Person
export const logoutUser = () => async (dispatch) => {
    dispatch({
        type: USER_LOGOUT
    })
    toast.warning('Logout Success', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
    })
    localStorage.removeItem("userInfo")
}




//Use: User Profile
//Access: Protected
//Method: Get
export const userProfileAction = () => async (dispatch, state) => {

    const { userLogin: { userInfo } } = state()
    try {
        dispatch({ type: PROFILE_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get("http://localhost:5000/api/profile", config)
        dispatch({
            type: PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_FAIL,
            payload: error.response && error.message ?
                error.response.data.message : error.message
        })

        dispatch({
            type: USER_LOGOUT
        })
        toast.error('Login expire please login agin', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
        })
        localStorage.removeItem("userInfo")
        window.location = '/login'
    }

}


// State: Get All user
// Method: GET
// Access : Admin only
export const getAllUserAction = () => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState()

    try {
        dispatch({ type: GET_ALL_USER_REQUEST })
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get("http://localhost:5000/api/all_user", config)
        dispatch({
            type: GET_ALL_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_USER_FAIL,
            payload: error.response && error.message ?
                error.response.data.message : error.message
        })
        toast.error(error.response && error.message ?
            error.response.data.message : error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
        })
    }
}


//Delete 
//Method Delete
//Access Admin
export const deleteUserAction = (id) => async (dispatch, getState) => {

    const { userLogin: { userInfo } } = getState()
    try {
        dispatch({ type: DELETE_USER_REQUEST })
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`http://localhost:5000/api/delete/${id}`, config)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        })
        toast.success("Delete Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response && error.message ?
                error.response.data.message : error.message
        })
        toast.error(error.response && error.message ?
            error.response.data.message : error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
        })
    }
}

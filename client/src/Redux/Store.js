import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import { deleteUserReducer, getAllUserReducer, userLogin, userProfileReducer, userRegister } from './Reducer/UserReducer'

const reducer = combineReducers({
    userRegister: userRegister,
    userLogin: userLogin,
    userProfileInfo: userProfileReducer,
    getAllUser: getAllUserReducer,
    deleteUser: deleteUserReducer,
})
const userInfoStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
const initState = {
    userLogin: { userInfo: userInfoStorage }
}

const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(thunk)))
export default store
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../Redux/Actions/UserAction'
import { ToastContainer } from 'react-toastify'

function NavBars() {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userD = useSelector(x => x.userLogin)
    const { error, loading, userInfo } = userD
    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo])

    const handleLogout = () => {
        dispatch(logoutUser())
    }
    return (
        <div className="nav_bars">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">

                            {
                                userInfo ?
                                    null :
                                    <>
                                        <li className="nav-item">
                                            <Link className='nav-link' to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className='nav-link' to="/signUp">SignUp</Link>
                                        </li>
                                    </>
                            }

                            {
                                userInfo ?
                                    <>
                                        <li className="nav-item ">
                                            {
                                                userInfo.isAdmin ?
                                                    <Link className='nav-link' to="/admin">Admin</Link> :
                                                    <Link className='nav-link' to="/profile">Profile</Link>
                                            }
                                        </li>
                                        <li className="nav-item">
                                            <Link onClick={() => handleLogout()} className='nav-link' to="/">Logout</Link>
                                        </li>

                                    </>
                                    : null
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBars
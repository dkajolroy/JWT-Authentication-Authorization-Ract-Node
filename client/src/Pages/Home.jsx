import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Home() {

    const profileInfo = useSelector(x => x.userLogin)
    const { userInfo } = profileInfo
    const navigate = useNavigate()
    useEffect(() => {
        if (userInfo?.isAdmin) {
            navigate("/admin")
        } else if (!userInfo) {
            navigate("/login")
        } else {
            navigate("/profile")
        }
    }, [])

    return (
        <div style={{ height: "76vh" }}>
            <h2>Home</h2>
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
        </div>
    )
}

export default Home
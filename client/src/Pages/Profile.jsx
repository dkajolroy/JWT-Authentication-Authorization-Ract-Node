import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileAction } from '../Redux/Actions/UserAction'


function Profile() {

    const dispatch = useDispatch()
    const userD = useSelector(x => x.userProfileInfo)
    const userAll = useSelector(x => x.getAllUser)

    useEffect(() => {
        dispatch(userProfileAction())
    }, [dispatch])

    const { loading, profileInfo } = userD


    // Update or Edit Form
    const submitForm = (x) => {
        x.preventDefault()
    }

    // Phot Upload
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    //  Profile Image Update
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const setAvatar = (e) => {
        setImage(e)
        setPreview(URL.createObjectURL(e))
    }

    const handleAvatar = (e) => {
        e.preventDefault()
        console.log(image);
    }
    return (
        <div className='profile_page'>
            <div className="container col-lg-6 col-md-8">
                <div className="d-flex justify-content-between align-items-center profile_avatar_new">

                    <form encType="multipart/form-data" onSubmit={(e) => handleAvatar(e)}>
                        <input className='form-control mb-2' onChange={(e) => setAvatar(e.target.files[0])} type="file" name="avatar" />
                        {preview ?
                            <input type="submit" value="Update Photo" className='btn btn-success' />
                            : null}
                    </form>
                    {
                        loading ?
                            <div className="profile_avatar d-flex mx-auto rounded-circle bg-secondary" style={{ width: "150px", height: "150px" }}>
                                <p className="d-flex m-auto text-light align-items-center"> Loading...</p>
                            </div> :
                            <div className="profile_avatar d-flex mx-auto rounded-circle border" style={{ width: "150px", height: "150px", overflow: "hidden" }}>
                                {
                                    profileInfo.avatar ?
                                        <img src={profileInfo ? profileInfo.avatar : null} alt="avatar" className="img-fluid" /> :
                                        <div className="d-flex align-items-center justify-content-center text-light bg-secondary h100  w-100 rounded-circle">
                                            {
                                                preview ?
                                                    <img className='img-fluid' src={preview ? preview : null} alt="" />
                                                    : <span>Empty icon</span>
                                            }
                                        </div>
                                }
                            </div>

                    }
                </div>

                <div className="user_info">
                    <div className="row">
                        <div className="col-md-6">

                            {
                                loading ?
                                    <h3 className='text-center'>Loading....</h3> :
                                    profileInfo ?
                                        <>
                                            <h4 className='text-decoration-underline'>User Info:</h4>
                                            <h6 className='pb- text-capitalize mt-4'>Name: {profileInfo.name}</h6>
                                            <h6 >Email: {profileInfo.email}</h6>
                                            <h6 >Bio: {profileInfo.bio}</h6>
                                            <h6 >ID: {profileInfo._id}</h6>
                                        </>
                                        : null
                            }
                        </div>
                        <div className="col-md-6">
                            {
                                loading ?
                                    <h2 className="text-center">Loading.....</h2> :
                                    profileInfo ?
                                        <>
                                            <h4 className='text-decoration-underline'>Edit Info:</h4>
                                            <form onSubmit={(x) => submitForm(x)}>
                                                <input type="text" placeholder='Name' className="mb-2 form-control shadow-none py-1" />
                                                <input type="text" placeholder='Email' className="mb-2 form-control shadow-none py-1" />
                                                <input type="text" placeholder='Bio' className="mb-2 form-control shadow-none py-1" />
                                                <input type="text" placeholder='Password' className="mb-2 form-control shadow-none py-1" />
                                                <input type="file" placeholder='avatar' className="mb-2 form-control shadow-none py-1" />
                                                <button className='btn rounded-0 px-5 btn-outline-success shadow-none' type='submit'>Update</button>
                                            </form>
                                        </> : null
                            }
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile
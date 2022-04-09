
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, getAllUserAction, userProfileAction } from '../Redux/Actions/UserAction'

function Profile() {

    const dispatch = useDispatch()
    const userD = useSelector(x => x.userProfileInfo)
    const userAll = useSelector(x => x.getAllUser)
    const userDelete = useSelector(x => x.deleteUser)


    const { loading, profileInfo } = userD
    const { allUser } = userAll
    const { success } = userDelete

    useEffect(() => {
        dispatch(userProfileAction())
        dispatch(getAllUserAction())
    }, [dispatch, success])


    // Update or Edit Form
    const submitForm = (x) => {
        x.preventDefault()
    }

    //Delete User Operation
    const removeHandle = (id) => {
        dispatch(deleteUserAction(id))
    }


    return (
        <div className='profile_page '>
            <div className="container col-lg-6 col-md-8">

                <div className="d-flex align-items-center my-2">
                    {
                        loading ?
                            <p className="d-flex m-auto text-light align-items-center"> Loading...</p>
                            :
                            <>
                                <div style={{ height: "50px", width: "50px" }} className=" profile_avatar me-2 d-flex  rounded-circle " >
                                    {
                                        profileInfo.avatar ?
                                            <img src={profileInfo ? profileInfo.avatar : null} alt="avatar" className="img-fluid" /> :
                                            <span style={{ height: "50px", width: "50px" }} className="d-flex align-items-center text-light bg-secondary rounded-circle"></span>
                                    }
                                </div>
                                <h4 className='text-center'> Admin Dashboard</h4>
                            </>
                    }
                </div>

                {/* Admin Info */}
                <div className="user_info mt-4">
                    <div className="row">
                        <div className="col-md-6 ">

                            {
                                loading ?
                                    <h3 className='text-center'>Loading....</h3> :
                                    profileInfo ?
                                        <>
                                            <div className="border-bottom">
                                                <h6 className='pb- text-capitalize '>Name: {profileInfo.name}</h6>
                                                <h6 >Email: {profileInfo.email}</h6>
                                                <h6 >Bio: {profileInfo.bio}</h6>
                                            </div>

                                            <h6>Edit info:</h6>
                                            <form onSubmit={(x) => submitForm(x)}>
                                                <input type="text" placeholder='Name' className="mb-2 form-control shadow-none py-1" />
                                                <input type="text" placeholder='Bio' className="mb-2 form-control shadow-none py-1" />
                                                <input type="file" placeholder='avatar' className="mb-2 form-control shadow-none py-1" />
                                                <button className='btn rounded-0 px-5 btn-outline-success shadow-none' type='submit'>Update</button>
                                            </form>

                                        </>
                                        : null
                            }

                        </div>
                        <div className="col-md-6">
                            {
                                loading ?
                                    <h3 className='text-center '>Loading....</h3> :
                                    profileInfo ?
                                        <>
                                            <div className="update_email mt-3">
                                                <h6>Update Email</h6>
                                                <form onSubmit={(x) => submitForm(x)} className="d-flex">
                                                    <div className="input-group mb-3">
                                                        <input type="text" className="form-control shadow-none" placeholder="Enter Email to verify" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-outline-success rounded-0 shadow-none" type="button">Update Email</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="update_email ">
                                                <h6>Update Password</h6>
                                                <form onSubmit={(x) => submitForm(x)}>
                                                    <input type="text" placeholder='Type Old Password' className="mb-2 form-control shadow-none py-1" />
                                                    <input type="text" placeholder='Type New Password' className="mb-2 form-control shadow-none py-1" />
                                                    <button className='btn rounded-0 px-5 btn-outline-success shadow-none' type='submit'>Update Password</button>
                                                </form>
                                            </div>
                                        </> : null
                            }
                        </div>
                    </div>




                    {/* All User Operations */}
                </div>
                {
                    userAll.loading ?
                        <h3 className='text-center mt-5'>Processing all user....</h3> :
                        allUser ?
                            <div className="all_user mt-5">
                                <div className="main_bars row">
                                    <div className=" d-flex w-100 justify-content-between">
                                        <h5>Total User: {allUser.length}</h5>
                                    </div>
                                    <div className="col"></div>
                                </div>
                                <div className="row align-items-center border-bottom">
                                    <div className="col-1">
                                        Icon
                                    </div>
                                    <div className="col-2">
                                        Name
                                    </div>
                                    <div className="col-4 ">
                                        Email
                                    </div>
                                    <div className="col-2">Role</div>
                                    <div className="col-3 text-center">
                                        Operation
                                    </div>
                                </div>
                                {
                                    allUser.map(x => (
                                        <div className="user_item my-1" key={x._id}>
                                            <div className="row align-items-center">
                                                <div className="col-1">
                                                    {
                                                        x.avatar ?
                                                            <img src={x.avatar} alt="" className="img-fluid" />
                                                            : <span style={{ height: "32px" }} className="bg-secondary rounded-circle d-block"></span>
                                                    }
                                                </div>
                                                <div className="col-2">
                                                    <h6 className="m-0 text-capitalize">{x.name}</h6>
                                                </div>
                                                <div className="col-4">
                                                    <h6 className="m-0">{x.email}</h6>
                                                </div>
                                                <div className="col-2">{x.isAdmin ? "Admin" : "User"}</div>
                                                <div className="col-3 d-flex justify-content-between">
                                                    <button className="btn py-1 shadow-none btn-success">Edit</button>
                                                    <button onClick={() => removeHandle(x._id)} className="btn py-1 shadow-none btn-danger">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div> : null
                }
            </div>
        </div>
    )
}

export default Profile
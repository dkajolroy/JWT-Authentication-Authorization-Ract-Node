import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../Redux/Actions/UserAction';
import { useNavigate } from 'react-router-dom'

const SignupSchema = Yup.object().shape({
    name: Yup.string().min(3, "Invalid Name").required("Name is Empty"),
    avatar: Yup.string(),
    bio: Yup.string(),
    password: Yup.string()
        .min(4, 'Minimum 4 character Required')
        .required('Password Required'),
    cPassword: Yup.string().required("Re-Password Required").oneOf([Yup.ref("password")], "Dose't Match Password"),
    email: Yup.string().email('Invalid email').required('Email Required'),
});

function SignUp() {

    const initial = {
        password: '',
        cPassword: '',
        email: '',
        name: '',
        bio: '',
        avatar: ''
    }


    // POST On Redux  Axios Setup
    const dispatch = useDispatch()
    const userRegister = useSelector(x => x.userRegister)
    const { user } = userRegister


    const navigate = useNavigate()
    useEffect(() => {
        if (userRegister.user) {
            navigate("/login")
        }
    }, [user])


    const submitForm = (x) => {
        console.log(x);
        const { cPassword, bio, avatar, ...other } = x
        dispatch(registerAction(other))
    }
    return (
        <div  >
            <div className='bg-secondary px-5 pt-4 pb-5 rounded login container col-md-6 col-sm-8'>
                <div>
                    <h1 className='text-center text-light'>SignUp Hare</h1>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <Formik
                        initialValues={initial}
                        validationSchema={SignupSchema}
                        onSubmit={(x) => submitForm(x)
                        }
                    >
                        {({ errors, touched }) => (
                            <Form>

                                <div className="text-text d-flex p-0 m-0" style={{ height: "25px" }}>
                                    <span className="h5 me-2 text-light">Name:</span>
                                    <span className="text-warning">
                                        {errors.name && touched.name ? (
                                            <div>{errors.name}</div>
                                        ) : null}
                                    </span>
                                </div>
                                <Field className={`form-control mb-2 ${errors.name && touched.name ? "is-invalid" : null}`} name="name" placeholder="Enter Name" />

                                <div className="text-text d-flex p-0 m-0" style={{ height: "25px" }}>
                                    <span className="h5 me-2 text-light">Email:</span>
                                    <span className="text-warning">
                                        {errors.email && touched.email ? (
                                            <div>{errors.email}</div>
                                        ) : null}
                                    </span>
                                </div>
                                <Field className={`form-control mb-2 ${errors.email && touched.email ? "is-invalid" : null}`} name="email" placeholder="Enter Email" />

                                <div className="text-text d-flex p-0 m-0" style={{ height: "25px" }}>
                                    <span className="h5 me-2 text-light">Password:</span>
                                    <span className="text-warning">
                                        {errors.password && touched.password ? (
                                            <div>{errors.password}</div>
                                        ) : null}
                                    </span>
                                </div>
                                <Field className={`form-control mb-2 ${errors.password && touched.password ? "is-invalid" : null}`} name="password" placeholder="Enter Password" type="password" />

                                <div className="text-text d-flex p-0 m-0" style={{ height: "25px" }}>
                                    <span className="h5 me-2 text-light">Re-Password:</span>
                                    <span className="text-warning">
                                        {errors.cPassword && touched.cPassword ? (
                                            <div>{errors.cPassword}</div>
                                        ) : null}
                                    </span>
                                </div>
                                <Field className={`form-control mb-2 ${errors.cPassword && touched.cPassword ? "is-invalid" : null}`} name="cPassword" placeholder="Enter Re-Password" type="password" />

                                <button className='btn btn-outline-warning rounded-0 px-5' type="submit">Login</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default SignUp
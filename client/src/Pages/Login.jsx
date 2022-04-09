import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { loginAction } from '../Redux/Actions/UserAction';
import { ToastContainer, toast } from 'react-toastify'

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(4, 'Minimum 4 character Required')
        .required('Password Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
});

function Login() {

    const initial = {
        password: '',
        email: '',
    }

    const dispatch = useDispatch()
    const userD = useSelector(x => x.userLogin)
    const { loading } = userD


    // Submit Form Login User
    const submitForm = (x) => {
        dispatch(loginAction(x.email, x.password))
    }


    return (
        <div style={{ height: "76vh" }} >
            <div className='bg-secondary px-5 pt-4 pb-5 rounded login container col-md-6 col-sm-8'>
                <div>

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
                    {
                        loading ?
                            <div className="spinner-border text-warning bg-secondary position-absolute" style={{ width: '5rem', height: '5rem', top: "100px", left: "47%" }} role="status">
                                <span className="sr-only"></span>
                            </div> : null
                    }

                    <h1 className='text-center text-light'>Login Hare</h1>
                    <Formik
                        initialValues={initial}
                        validationSchema={SignupSchema}
                        onSubmit={(x) => submitForm(x)
                        }
                    >
                        {({ errors, touched }) => (
                            <Form>

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

                                <button className='btn btn-outline-warning rounded-0 px-5' type="submit">Login</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login
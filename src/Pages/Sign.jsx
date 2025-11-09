import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUSer } from "../Redux/appSlice";
import Swal from 'sweetalert2';
import * as yup from 'yup';

const Sign = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const SignInSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    })


    const handleSubmit = async (values) => {
        const auth = getAuth();
        try {
            const UserSign = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            )
            const user = UserSign.user;
            console.log(user);
            dispatch(
                setUSer({
                    userName: user.displayName,
                    email: user.email,
                })
            )
            Swal.fire({
                icon: 'success',
                title: 'account Login successfully',
                text: 'your account has been Login successfully',
                theme: 'dark'
            }).then(() => {
                navigate('/')
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error signing in',
                text: error.message,
                theme: 'dark'
            })
        }

    }

    return (
        <div className="min-h-60 max-h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 ">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center">Login In </h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={handleSubmit}
                >

                    {({ isSubmitting, touched, errors }) => (
                        <Form className="space-y-6">
                            <div className="form-group">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${touched.email && errors.email
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-400'
                                        }`}
                                    placeholder="you@example.com"
                                />
                                <ErrorMessage name="email" component="div" className="mt-2 text-sm font-medium text-red-600"></ErrorMessage>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${touched.password && errors.password
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-400'
                                        }`}
                                    placeholder="Minimum 8 characters"
                                />
                                <ErrorMessage name="password" component="div" className="mt-2 text-sm font-medium text-red-600"></ErrorMessage>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
                            >
                                {isSubmitting ? 'Signing In...' : 'Sign In'}
                            </button>
                            <p className="text-center text-gray-600 mt-4">
                                Don't have an account?{' '}
                                <Link to="/Register" className="text-blue-500 hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Sign
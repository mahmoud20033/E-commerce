import { updateProfile } from 'firebase/auth/cordova';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth/web-extension';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setUSer } from '../Redux/appSlice';
import * as yup from 'yup';
const Register = () => {

    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const RegisterSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm Password is required")
    })

    const handleRegister = async (values) => {
        const auth = getAuth();

        try {
            const User = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            )
            await updateProfile(auth.currentUser, {
                displayName: values.name
            })
            dispatch(
                setUSer({
                    userName: values.name,
                    email: values.email,
                })
            )
            Swal.fire({
                icon: 'success',
                title: 'account created successfully',
                text: 'your account has been created successfully',
                theme: 'dark'
            }).then(() => {
                Navigate('/Sign')
            })
            console.log(User)
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }

    }
    return (
        <div className="min-h-60 max-h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 ">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center">Create Account</h1>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleRegister}
                >

                    {({ isSubmitting, touched, errors }) => (
                        <Form className="space-y-6">
                            <div className="form-group">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${touched.name && errors.name
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-400'
                                        }`}
                                    placeholder="Enter your full name"
                                />
                                <ErrorMessage name="name" component="div" className="mt-2 text-sm font-medium text-red-600"></ErrorMessage>
                            </div>
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
                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                <Field
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${touched.confirmPassword && errors.confirmPassword
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-400'
                                        }`}
                                    placeholder="Confirm your password"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="mt-2 text-sm font-medium text-red-600"></ErrorMessage>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>
                        </Form>
                    )}

                </Formik>
            </div>
        </div>
    )
}

export default Register
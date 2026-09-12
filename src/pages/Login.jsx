import { Mail, User2Icon, Lock } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth, googleProvider } from '../configs/firebase.js'
import api from '../configs/api.js'
import toast from 'react-hot-toast'
import { login } from '../app/features/authSlice.js'

const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" width="20" height="20">
    <path fill="#EA4335" d="M24 9.5c3.7 0 6.2 1.6 7.6 2.9l5.6-5.2C34.6 4 29.9 2.5 24 2.5 14.7 2.5 6.9 7.9 3.1 15.6l6 4.6C11.3 13.8 17 9.5 24 9.5z" />
    <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.6c-.5 3.1-2.9 6-7.6 8l5.9 4.6C42.8 37.8 46.5 31.6 46.5 24.5z" />
    <path fill="#4A90E2" d="M9.1 28.2A14.7 14.7 0 0 1 8 24.5c0-1.7.3-3.3.8-4.7L3.1 15.2C1 19.2 0 23.7 0 28.5c0 4.8 1 9.3 3.1 13.3l6-4.6z" />
    <path fill="#FBBC05" d="M24 46.5c6 0 10.7-2 14.2-5.5l-6-4.6c-2 1.5-5.1 2.7-8.2 2.7-7 0-12.8-4.3-14.9-10.1l-6 4.6C6.9 40.6 14.7 46.5 24 46.5z" />
  </svg>
)

const syncAndEnter = async (dispatch, navigate, successMessage) => {
  const { data } = await api.post('/api/users/sync')
  dispatch(login({ user: data.user }))
  toast.success(successMessage)
  navigate('/app')
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get('state');
  const [state, setState] = React.useState(urlState || "login");
  const [submitting, setSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      if (state === "login") {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
      } else {
        const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        if (formData.name) {
          await updateProfile(cred.user, { displayName: formData.name })
        }
      }
      await syncAndEnter(dispatch, navigate, state === "login" ? "Signed in" : "Account created")
    } catch (error) {
      toast.error(firebaseErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error('Please enter your email to reset password.')
      return
    }
    try {
      await sendPasswordResetEmail(auth, formData.email, {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true,
      })
      toast.success('If that email exists, a reset link has been sent.')
    } catch (error) {
      toast.error(firebaseErrorMessage(error))
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      await syncAndEnter(dispatch, navigate, "Signed in with Google")
    } catch (error) {
      if (error?.code === 'auth/popup-closed-by-user') return
      toast.error(firebaseErrorMessage(error))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="sm:w-87.5 w-full text-center border border-gray-300/60 dark:border-gray-700 rounded-2xl px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        <h1 className="text-gray-900 dark:text-gray-100 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        {state !== "login" && (
          <div className="flex items-center mt-6 border dark:border-gray-600 h-12 rounded-full pl-6 gap-2">
            <User2Icon size={16} className="text-gray-500 dark:text-gray-400" />
            <input type="text" name="name" placeholder="Name"
              value={formData.name} onChange={handleChange} required
              className="flex-1 outline-none bg-transparent text-sm text-gray-900 dark:text-gray-100 border-none focus:ring-0" />
          </div>
        )}

        <div className="flex items-center mt-4 border dark:border-gray-600 h-12 rounded-full pl-6 gap-2">
          <Mail size={12} className="text-gray-500 dark:text-gray-400" />
          <input type="email" name="email" placeholder="Email"
            value={formData.email} onChange={handleChange} required
            className="flex-1 outline-none bg-transparent text-sm text-gray-900 dark:text-gray-100 border-none focus:ring-0" />
        </div>

        <div className="flex items-center mt-4 border dark:border-gray-600 h-12 rounded-full pl-6 gap-2">
          <Lock size={12} className="text-gray-500 dark:text-gray-400" />
          <input type="password" name="password" placeholder="Password"
            value={formData.password} onChange={handleChange} required
            minLength={6}
            className="flex-1 outline-none bg-transparent text-sm text-gray-900 dark:text-gray-100 border-none focus:ring-0" />
        </div>

        <div className="mt-4 text-left text-green-500">
          <button className="text-sm" type="button" onClick={handleForgotPassword}>
            Forgot password?
          </button>
        </div>

        <button type="submit" disabled={submitting} className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity disabled:opacity-60">
          {state === "login" ? "Login" : "Sign up"}
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="grow h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">OR</span>
          <div className="grow h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Google sign-in button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full h-11 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-3 hover:shadow-sm transition bg-white dark:bg-gray-800 dark:text-gray-200"
          >
            <GoogleIcon />
            <span className="text-sm">Continue with Google</span>
          </button>
        </div>


        <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 dark:text-gray-400 text-sm mt-3 mb-11 cursor-pointer">
          {state === "login" ? "Don't have an account?" : "Already have an account?"} <a className="text-green-500 hover:underline">click here</a>
        </p>
      </form>
    </div>
  )
}

const FIREBASE_ERROR_MESSAGES = {
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/user-not-found': 'Invalid email or password.',
  'auth/wrong-password': 'Invalid email or password.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
}

function firebaseErrorMessage(error) {
  return FIREBASE_ERROR_MESSAGES[error?.code] || error?.message || 'Something went wrong.'
}

export default Login


import { Mail, User2Icon, Lock } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../configs/api.js'
import toast from 'react-hot-toast'
import { login } from '../app/features/authSlice.js'


const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" width="20" height="20">
    <path fill="#EA4335" d="M24 9.5c3.7 0 6.2 1.6 7.6 2.9l5.6-5.2C34.6 4 29.9 2.5 24 2.5 14.7 2.5 6.9 7.9 3.1 15.6l6 4.6C11.3 13.8 17 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.6c-.5 3.1-2.9 6-7.6 8l5.9 4.6C42.8 37.8 46.5 31.6 46.5 24.5z"/>
    <path fill="#4A90E2" d="M9.1 28.2A14.7 14.7 0 0 1 8 24.5c0-1.7.3-3.3.8-4.7L3.1 15.2C1 19.2 0 23.7 0 28.5c0 4.8 1 9.3 3.1 13.3l6-4.6z"/>
    <path fill="#FBBC05" d="M24 46.5c6 0 10.7-2 14.2-5.5l-6-4.6c-2 1.5-5.1 2.7-8.2 2.7-7 0-12.8-4.3-14.9-10.1l-6 4.6C6.9 40.6 14.7 46.5 24 46.5z"/>
  </svg>
)

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get('state');
  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  // ========== FORM HANDLERS ==========
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const endpoint = state === "login" ? "login" : "register"
      const { data } = await api.post(`/api/users/${endpoint}`, formData)
      // expecting data to include token and user data
      const payload = data.token ? { token: data.token, user: data.user || data } : data;
      dispatch(login(payload))
      localStorage.setItem('token', payload.token)
      toast.success(data.message || 'Signed in')
      // redirect to dashboard/app
      navigate('/app')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
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
      const { data } = await api.post('/api/users/forgot-password', { email: formData.email })
      toast.success(data.message || 'Password reset email sent.')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to send reset email.')
    }
  }

  // ========== GOOGLE SIGN-IN ==========
  const API_BASE = import.meta.env.VITE_API_BASE;
  const FRONTEND_ORIGIN = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

  const handleGoogleSignIn = () => {
    if (!API_BASE) {
      toast.error("VITE_API_BASE missing in .env");
      return;
    }

    const oauthUrl = `${API_BASE}/api/auth/google`;

    const width = 600, height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const popup = window.open(
      oauthUrl,
      "googleSignIn",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      toast.error("Popup blocked");
      return;
    }

   
    const allowedOrigins = new Set([
      FRONTEND_ORIGIN,
      window.location.origin,
      (() => {
        try {
          return new URL(API_BASE).origin;
        // eslint-disable-next-line no-unused-vars
        } catch (e) {
          return null;
        }
      })()
    ].filter(Boolean));

    const messageListener = async (e) => {
      console.log('[Google] message received', e.origin, e.data);

      // Accept if origin is allowed AND message source is the popup (extra safety)
      if (!allowedOrigins.has(e.origin)) {
        console.warn("Ignored message from", e.origin);
        return;
      }
      // extra check to ensure event came from our opened popup window
      if (e.source && popup && e.source !== popup) {
        console.warn("Ignored message not from our popup");
        return;
      }

      const token = e.data && (e.data.token || e.data?.accessToken || null);
      if (!token) {
        console.warn('[Google] no token found in message data', e.data);
        return;
      }

      // success - cleanup
      window.removeEventListener("message", messageListener);
      // eslint-disable-next-line no-unused-vars
      try { popup.close(); } catch (err) { /* ignore */ }

      // save token, fetch profile and dispatch
      localStorage.setItem("token", token);

      try {
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const payload = { token, user: data.user || data };
        dispatch(login(payload));
        toast.success("Signed in with Google");
        navigate('/app'); // redirect to dashboard/app

      } catch (err) {
        console.error('[Google] failed to fetch profile', err);
        toast.error("Google signed in, but profile fetch failed. Please refresh.");
      }
    };

    window.addEventListener("message", messageListener, false);

    // timeout and popup-close watcher (safe checks)
    const timeout = setTimeout(() => {
      window.removeEventListener("message", messageListener);
      // eslint-disable-next-line no-unused-vars
      try { if (popup && !popup.closed) popup.close(); } catch (e) { /* ignore */ }
      toast.error("Google sign-in timed out. Please try again.");
    }, 2 * 60 * 1000);

    const closeCheck = setInterval(() => {
      try {
        
        if (!popup || popup.closed) {
          clearInterval(closeCheck);
          clearTimeout(timeout);
          window.removeEventListener("message", messageListener);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
       
        clearInterval(closeCheck);
      }
    }, 500);
  };

  // =================== RETURN UI ===================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        {state !== "login" && (
          <div className="flex items-center mt-6 border h-12 rounded-full pl-6 gap-2">
            <User2Icon size={16} />
            <input type="text" name="name" placeholder="Name"
              value={formData.name} onChange={handleChange} required />
          </div>
        )}

        <div className="flex items-center mt-4 border h-12 rounded-full pl-6 gap-2">
          <Mail size={12} />
          <input type="email" name="email" placeholder="Email"
            value={formData.email} onChange={handleChange} required />
        </div>

        <div className="flex items-center mt-4 border h-12 rounded-full pl-6 gap-2">
          <Lock size={12} />
          <input type="password" name="password" placeholder="Password"
            value={formData.password} onChange={handleChange} required />
        </div>

        <div className="mt-4 text-left text-green-500">
          <button className="text-sm" type="button" onClick={handleForgotPassword}>
            Forgot password?
          </button>
        </div>

        <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity">
  {state === "login" ? "Login" : "Sign up"}
</button>

{/* OR Divider */}
<div className="flex items-center my-4">
  <div className="grow h-px bg-gray-300"></div>
  <span className="px-3 text-gray-500 text-sm">OR</span>
  <div className="grow h-px bg-gray-300"></div>
</div>

{/* Google sign-in button */}
<div>
  <button
    type="button"
    onClick={handleGoogleSignIn}
    className="w-full h-11 rounded-full border border-gray-300 flex items-center justify-center gap-3 hover:shadow-sm transition"
  >
    <GoogleIcon />
    <span className="text-sm">Continue with Google</span>
  </button>
</div>


        <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-3 mb-11">
          {state === "login" ? "Don't have an account?" : "Already have an account?"} <a className="text-green-500 hover:underline">click here</a>
        </p>
      </form>
    </div>
  )
}

export default Login

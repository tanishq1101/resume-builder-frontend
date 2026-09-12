import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'
import { auth } from '../configs/firebase.js'
import toast from 'react-hot-toast'

const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const oobCode = searchParams.get('oobCode')
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [checking, setChecking] = useState(true)
    const [invalidLink, setInvalidLink] = useState(false)

    useEffect(() => {
        if (!oobCode) {
            setInvalidLink(true)
            setChecking(false)
            return
        }
        verifyPasswordResetCode(auth, oobCode)
            .catch(() => setInvalidLink(true))
            .finally(() => setChecking(false))
    }, [oobCode])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters.')
            return
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.')
            return
        }

        setLoading(true)
        try {
            await confirmPasswordReset(auth, oobCode, password)
            toast.success('Password reset successful!')
            setSuccess(true)
            setTimeout(() => navigate('/login'), 3000)
        } catch (error) {
            toast.error(error?.message || 'Failed to reset password. The link may have expired.')
        } finally {
            setLoading(false)
        }
    }

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors">
                <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (invalidLink) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors">
                <div className="text-center max-w-sm">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                    <h1 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">Invalid or expired link</h1>
                    <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
                        Please request a new password reset link from the login page.
                    </p>
                    <Link to="/login" className="mt-6 inline-block text-green-500 hover:underline text-sm font-medium">
                        Go to Login →
                    </Link>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors">
                <div className="text-center max-w-sm">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h1 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">Password Reset!</h1>
                    <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
                        Your password has been updated successfully. Redirecting to login…
                    </p>
                    <Link to="/login" className="mt-6 inline-block text-green-500 hover:underline text-sm font-medium">
                        Go to Login →
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm border border-gray-300/60 dark:border-gray-700 rounded-2xl px-8 py-10 bg-white dark:bg-gray-900 transition-colors"
            >
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Reset Password</h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm text-center">
                    Enter your new password below.
                </p>

                {/* New Password */}
                <div className="mt-8 relative">
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        New Password
                    </label>
                    <div className="flex items-center border dark:border-gray-600 h-12 rounded-full pl-4 pr-2 gap-2">
                        <Lock size={14} className="text-gray-400 flex-shrink-0" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="Min 6 characters"
                            className="flex-1 outline-none bg-transparent text-sm text-gray-900 dark:text-gray-100 border-none focus:ring-0"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            {showPassword ? <EyeOff size={14} className="text-gray-400" /> : <Eye size={14} className="text-gray-400" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Confirm Password
                    </label>
                    <div className="flex items-center border dark:border-gray-600 h-12 rounded-full pl-4 pr-4 gap-2">
                        <Lock size={14} className="text-gray-400 flex-shrink-0" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Repeat password"
                            className="flex-1 outline-none bg-transparent text-sm text-gray-900 dark:text-gray-100 border-none focus:ring-0"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 w-full h-11 rounded-full text-white bg-green-500 hover:bg-green-600 transition-all disabled:opacity-60 font-medium"
                >
                    {loading ? 'Resetting…' : 'Reset Password'}
                </button>

                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    <Link to="/login" className="text-green-500 hover:underline">Back to Login</Link>
                </p>
            </form>
        </div>
    )
}

export default ResetPassword

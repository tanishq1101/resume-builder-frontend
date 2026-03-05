import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import api from '../configs/api'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const OAuthCallback = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState(null)

    useEffect(() => {
        const token = searchParams.get('token')
        const err = searchParams.get('error')

        if (err) {
            setError('Authentication failed. Please try again.')
            toast.error('Google sign-in failed.')
            setTimeout(() => navigate('/login'), 2500)
            return
        }

        if (!token) {
            setError('No token received.')
            setTimeout(() => navigate('/login'), 2500)
            return
        }

        // Store token, fetch profile, and redirect
        const completeAuth = async () => {
            try {
                localStorage.setItem('token', token)
                const { data } = await api.get('/api/users/data', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                dispatch(login({ token, user: data.user }))
                toast.success('Signed in successfully!')
                navigate('/app')
            } catch (fetchErr) {
                console.error('OAuth callback fetch failed:', fetchErr)
                setError('Failed to complete sign-in. Redirecting…')
                toast.error('Sign-in failed. Please try again.')
                setTimeout(() => navigate('/login'), 2500)
            }
        }

        completeAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors">
            {error ? (
                <div className="text-center">
                    <p className="text-red-500 text-lg font-medium">{error}</p>
                    <p className="text-gray-400 text-sm mt-2">Redirecting to login…</p>
                </div>
            ) : (
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">Completing sign-in…</p>
                </div>
            )}
        </div>
    )
}

export default OAuthCallback

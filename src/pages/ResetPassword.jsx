import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Eye, EyeOff, LoaderCircleIcon, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import api, { setToken } from '../configs/api'
import { login } from '../app/features/authSlice'

const ResetPassword = () => {
  const { token } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }

    setSubmitting(true)
    try {
      const { data } = await api.post('/api/users/reset-password', { token, password })
      setToken(data.token)
      dispatch(login({ user: data.user }))
      toast.success('Password updated. You are now logged in.')
      navigate('/app', { replace: true })
    } catch (err) {
      const message = err?.response?.data?.message
        || (err?.request ? 'Cannot reach the server. Please try again in a moment.' : err.message)
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full pl-9 pr-10 py-2.5 text-sm'

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10 transition-colors duration-300'>
      <div className='w-full max-w-sm'>
        <Link to='/' className='flex justify-center mb-6'>
          <img src='/logo.svg' alt='logo' className='h-10 w-auto dark:invert' />
        </Link>

        <form onSubmit={handleSubmit} className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl p-6 sm:p-8 space-y-4'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold text-slate-900 dark:text-gray-100'>Choose a new password</h1>
            <p className='text-sm text-slate-500 dark:text-gray-400 mt-1'>This will log you out on all other devices</p>
          </div>

          <label className='block'>
            <span className='text-sm font-medium text-slate-700 dark:text-gray-300'>New password</span>
            <div className='relative mt-1'>
              <Lock className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none' />
              <input className={inputClass} type={showPassword ? 'text' : 'password'} autoComplete='new-password' autoFocus
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder='At least 8 characters'
                minLength={8} maxLength={72} required />
              <button type='button' onClick={() => setShowPassword(prev => !prev)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-200'
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
              </button>
            </div>
          </label>

          <label className='block'>
            <span className='text-sm font-medium text-slate-700 dark:text-gray-300'>Confirm new password</span>
            <div className='relative mt-1'>
              <Lock className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none' />
              <input className={inputClass} type={showPassword ? 'text' : 'password'} autoComplete='new-password'
                value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder='Repeat your password'
                maxLength={72} required />
            </div>
          </label>

          <button type='submit' disabled={submitting}
            className='w-full flex items-center justify-center gap-2 bg-(--brand-primary) hover:bg-(--brand-primary-dark) disabled:opacity-60 text-white py-2.5 rounded-lg text-sm font-medium transition-colors'>
            {submitting && <LoaderCircleIcon className='animate-spin size-4' />}
            {submitting ? 'Updating...' : 'Update password'}
          </button>

          <p className='text-center text-sm text-slate-500 dark:text-gray-400'>
            Link expired?{' '}
            <Link to='/forgot-password' className='text-(--brand-primary) dark:text-(--brand-primary-light) font-medium hover:underline'>
              Request a new one
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword

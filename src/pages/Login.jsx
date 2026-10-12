import React, { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AtSign, Eye, EyeOff, LoaderCircleIcon, Lock, Mail, User } from 'lucide-react'
import toast from 'react-hot-toast'
import api, { setToken } from '../configs/api'
import { login } from '../app/features/authSlice'

const USERNAME_RE = /^[a-zA-Z0-9_.]{3,30}$/

const Field = ({ icon, label, children }) => {
  const Icon = icon
  return (
  <label className='block'>
    <span className='text-sm font-medium text-slate-700 dark:text-gray-300'>{label}</span>
    <div className='relative mt-1'>
      <Icon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none' />
      {children}
    </div>
  </label>
  )
}

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const mode = searchParams.get('state') === 'register' ? 'register' : 'login'
  const isRegister = mode === 'register'

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', username: '', email: '', identifier: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to='/app' replace />
  }

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const switchMode = () => {
    setSearchParams(isRegister ? { state: 'login' } : { state: 'register' }, { replace: true })
    setForm(prev => ({ ...prev, password: '', confirm: '' }))
  }

  const validate = () => {
    if (!isRegister) return null
    if (!USERNAME_RE.test(form.username.trim())) {
      return 'Username must be 3-30 characters: letters, numbers, underscores or dots'
    }
    if (form.password.length < 8) return 'Password must be at least 8 characters'
    if (form.password !== form.confirm) return 'Passwords do not match'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const error = validate()
    if (error) {
      toast.error(error)
      return
    }

    setSubmitting(true)
    try {
      const payload = isRegister
        ? { name: form.name, username: form.username, email: form.email, password: form.password }
        : { identifier: form.identifier, password: form.password }

      const { data } = await api.post(`/api/users/${isRegister ? 'register' : 'login'}`, payload)

      setToken(data.token)
      dispatch(login({ user: data.user }))
      toast.success(isRegister ? 'Account created!' : `Welcome back, ${data.user.name}!`)
      navigate('/app', { replace: true })
    } catch (err) {
      const message = err?.response?.data?.message
        || (err?.request ? 'Cannot reach the server. Please try again in a moment.' : err.message)
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full pl-9 pr-3 py-2.5 text-sm'

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10 transition-colors duration-300'>
      <div className='w-full max-w-sm'>
        <Link to='/' className='flex justify-center mb-6'>
          <img src='/logo.svg' alt='logo' className='h-10 w-auto dark:invert' />
        </Link>

        <form onSubmit={handleSubmit} className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl p-6 sm:p-8 space-y-4'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold text-slate-900 dark:text-gray-100'>
              {isRegister ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className='text-sm text-slate-500 dark:text-gray-400 mt-1'>
              {isRegister ? 'Sign up to start building resumes' : 'Log in to continue to your dashboard'}
            </p>
          </div>

          {isRegister ? (
            <>
              <Field icon={User} label='Full name'>
                <input className={inputClass} type='text' autoComplete='name' value={form.name}
                  onChange={update('name')} placeholder='Jane Doe' maxLength={60} required />
              </Field>
              <Field icon={AtSign} label='Username'>
                <input className={inputClass} type='text' autoComplete='username' value={form.username}
                  onChange={update('username')} placeholder='jane_doe' maxLength={30} required />
              </Field>
              <Field icon={Mail} label='Email'>
                <input className={inputClass} type='email' autoComplete='email' value={form.email}
                  onChange={update('email')} placeholder='jane@example.com' required />
              </Field>
            </>
          ) : (
            <Field icon={User} label='Username or email'>
              <input className={inputClass} type='text' autoComplete='username' value={form.identifier}
                onChange={update('identifier')} placeholder='jane_doe or jane@example.com' required />
            </Field>
          )}

          <Field icon={Lock} label='Password'>
            <input className={`${inputClass} pr-10`} type={showPassword ? 'text' : 'password'}
              autoComplete={isRegister ? 'new-password' : 'current-password'} value={form.password}
              onChange={update('password')} placeholder={isRegister ? 'At least 8 characters' : 'Your password'}
              minLength={isRegister ? 8 : undefined} maxLength={72} required />
            <button type='button' onClick={() => setShowPassword(prev => !prev)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-200'
              aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
            </button>
          </Field>

          {isRegister && (
            <Field icon={Lock} label='Confirm password'>
              <input className={inputClass} type={showPassword ? 'text' : 'password'} autoComplete='new-password'
                value={form.confirm} onChange={update('confirm')} placeholder='Repeat your password' maxLength={72} required />
            </Field>
          )}

          <button type='submit' disabled={submitting}
            className='w-full flex items-center justify-center gap-2 bg-(--brand-primary) hover:bg-(--brand-primary-dark) disabled:opacity-60 text-white py-2.5 rounded-lg text-sm font-medium transition-colors'>
            {submitting && <LoaderCircleIcon className='animate-spin size-4' />}
            {submitting ? 'Please wait...' : isRegister ? 'Create account' : 'Log in'}
          </button>

          <p className='text-center text-sm text-slate-500 dark:text-gray-400'>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type='button' onClick={switchMode} className='text-(--brand-primary) dark:text-(--brand-primary-light) font-medium hover:underline'>
              {isRegister ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login

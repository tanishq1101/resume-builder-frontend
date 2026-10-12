import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, LoaderCircleIcon, Mail, MailCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../configs/api'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/api/users/forgot-password', { email })
      setSent(true)
    } catch (err) {
      const message = err?.response?.data?.message
        || (err?.request ? 'Cannot reach the server. Please try again in a moment.' : err.message)
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10 transition-colors duration-300'>
      <div className='w-full max-w-sm'>
        <Link to='/' className='flex justify-center mb-6'>
          <img src='/logo.svg' alt='logo' className='h-10 w-auto dark:invert' />
        </Link>

        <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl p-6 sm:p-8 space-y-4'>
          {sent ? (
            <div className='text-center space-y-3'>
              <MailCheck className='size-12 mx-auto text-(--brand-primary) dark:text-(--brand-primary-light)' />
              <h1 className='text-2xl font-semibold text-slate-900 dark:text-gray-100'>Check your email</h1>
              <p className='text-sm text-slate-500 dark:text-gray-400'>
                If an account exists for <span className='font-medium text-slate-700 dark:text-gray-200'>{email}</span>,
                we've sent a link to reset your password. It expires in 1 hour.
              </p>
              <p className='text-xs text-slate-400 dark:text-gray-500'>Don't see it? Check your spam folder.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='text-center'>
                <h1 className='text-2xl font-semibold text-slate-900 dark:text-gray-100'>Forgot password?</h1>
                <p className='text-sm text-slate-500 dark:text-gray-400 mt-1'>
                  Enter your account email and we'll send you a reset link
                </p>
              </div>

              <label className='block'>
                <span className='text-sm font-medium text-slate-700 dark:text-gray-300'>Email</span>
                <div className='relative mt-1'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none' />
                  <input className='w-full pl-9 pr-3 py-2.5 text-sm' type='email' autoComplete='email' autoFocus
                    value={email} onChange={(e) => setEmail(e.target.value)} placeholder='jane@example.com' required />
                </div>
              </label>

              <button type='submit' disabled={submitting}
                className='w-full flex items-center justify-center gap-2 bg-(--brand-primary) hover:bg-(--brand-primary-dark) disabled:opacity-60 text-white py-2.5 rounded-lg text-sm font-medium transition-colors'>
                {submitting && <LoaderCircleIcon className='animate-spin size-4' />}
                {submitting ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
          )}

          <Link to='/login?state=login' className='flex items-center justify-center gap-1 text-sm text-(--brand-primary) dark:text-(--brand-primary-light) hover:underline'>
            <ArrowLeftIcon className='size-4' /> Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

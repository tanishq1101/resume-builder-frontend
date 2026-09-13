import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-300">
      <SignIn
        withSignUp
        forceRedirectUrl="/app"
        appearance={{
          variables: {
            colorPrimary: '#22c55e',
          },
        }}
      />
    </div>
  )
}

export default Login

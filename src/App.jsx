import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ResumeBuilder from './pages/ResumeBuilder.jsx'
import Preview from './pages/Preview.jsx'
import { login, logout, setLoading } from './app/features/authSlice.js'
import Layout from './pages/Layout.jsx'
import { useDispatch } from 'react-redux'
import api, { setClerkTokenGetter } from './configs/api.js'
import { useAuth } from '@clerk/clerk-react'

import { Toaster } from 'react-hot-toast'

// Footer pages
import SupportPage from './pages/footer/SupportPage.jsx'
import PricingPage from './pages/footer/PricingPage.jsx'
import AffiliatePage from './pages/footer/AffiliatePage.jsx'
import CompanyPage from './pages/footer/CompanyPage.jsx'
import BlogsPage from './pages/footer/BlogsPage.jsx'
import CommunityPage from './pages/footer/CommunityPage.jsx'
import CareersPage from './pages/footer/CareersPage.jsx'
import AboutPage from './pages/footer/AboutPage.jsx'
import PrivacyPage from './pages/footer/PrivacyPage.jsx'
import TermsPage from './pages/footer/TermsPage.jsx'
import ContactPage from './pages/footer/ContactPage.jsx'

// Auth pages
import Login from './pages/Login.jsx'

const App = () => {

  const dispatch = useDispatch()
  const { isLoaded, isSignedIn, getToken } = useAuth()

  const wakeUpBackend = async () => {
    try {
      // Send a background request to the backend root to wake up the Render server
      await api.get('/');
      console.log("Backend server pinged and awake!");
    } catch (error) {
      console.log("Backend ping finished:", error.message);
    }
  }

  useEffect(() => {
    wakeUpBackend()
  }, [])

  useEffect(() => {
    // Give the axios instance a way to fetch a fresh Clerk session token per request.
    setClerkTokenGetter(getToken)
  }, [getToken])

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      dispatch(logout())
      dispatch(setLoading(false))
      return
    }

    (async () => {
      try {
        const { data } = await api.post('/api/users/sync')
        dispatch(login({ user: data.user }))
      } catch (error) {
        console.log("Failed to sync user profile:", error.message)
        dispatch(logout())
      } finally {
        dispatch(setLoading(false))
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Product */}
        <Route path='/support' element={<SupportPage />} />
        <Route path='/pricing' element={<PricingPage />} />
        <Route path='/affiliate' element={<AffiliatePage />} />

        {/* Resources */}
        <Route path='/company' element={<CompanyPage />} />
        <Route path='/blogs' element={<BlogsPage />} />
        <Route path='/community' element={<CommunityPage />} />
        <Route path='/careers' element={<CareersPage />} />
        <Route path='/about' element={<AboutPage />} />

        {/* Legal */}
        <Route path='/privacy' element={<PrivacyPage />} />
        <Route path='/terms' element={<TermsPage />} />

        {/* Contact */}
        <Route path='/contact' element={<ContactPage />} />

        {/* Auth */}
        <Route path='/login' element={<Login />} />

        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />


      </Routes>
    </>
  )
}

export default App

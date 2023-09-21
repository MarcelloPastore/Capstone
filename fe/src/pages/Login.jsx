import React from 'react'
import NavigationBar from '../components/NavigationBar'
import LoginSection from '../components/LoginSection'
import SignInSession from '../components/SignInSession'

const login = () => {
  return (
    <>
      <NavigationBar />
      <LoginSection />
      <SignInSession />
    </>
  )
}

export default login
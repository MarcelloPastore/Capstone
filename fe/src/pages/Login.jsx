import React from 'react'
import NavigationBar from '../components/NavigationBar'
import LoginSection from '../components/LoginSection'
import Footer from '../components/Footer'
import '../CSS/globalCss.css'

const login = () => {
  return (
    <>
      <NavigationBar />
      <div className='main'>
        <LoginSection />
      </div>
      <Footer/>
    </>
  )
}

export default login
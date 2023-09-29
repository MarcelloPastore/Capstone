import React from 'react'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import ReviewDetail from '../components/ReviewDetail'
const Success = () => {
  return (
    <>
      <NavigationBar />
      <div className='main'>
        <ReviewDetail />
      </div>
      <Footer />
    </>
  )
}

export default Success
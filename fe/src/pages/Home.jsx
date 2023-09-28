import React from 'react'
import NavigationBar from '../components/NavigationBar'
import RevPostsRelease from '../components/RevPostsRelease'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import '../CSS/globalCss.css';

const Home = () => {
  return (
    <>
      <NavigationBar />
      <div className='main'>
        <Hero />
        <RevPostsRelease />
      </div>
      <Footer />
    </>
  )
}

export default Home
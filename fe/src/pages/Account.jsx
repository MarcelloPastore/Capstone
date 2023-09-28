import React from 'react'
import NavigationBar from '../components/NavigationBar'
import AddPostModal from '../components/modals/AddPostModal'
import AuthorBio from '../components/AuthorBio'
import Footer from '../components/Footer'
import '../CSS/globalCss.css'

const Account = () => {
  return (
    <>
      <NavigationBar />
      <div className='main'>
        <AddPostModal />
        <AuthorBio />
      </div>
      <Footer  />
    </>
  )
}

export default Account
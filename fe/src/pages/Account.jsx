import React from 'react'
import NavigationBar from '../components/NavigationBar'
import AddPostModal from '../components/modals/AddPostModal'
import AuthorBio from '../components/AuthorBio'

const Account = () => {
  return (
    <>
      <NavigationBar />
      <div>
        <AddPostModal />
        <AuthorBio />
      </div>

    </>
  )
}

export default Account
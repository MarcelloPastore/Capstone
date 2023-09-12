import React from 'react'
import NavigationBar from '../components/NavigationBar'
import RevPostsRelease from '../components/RevPostsRelease'
import AddPostModal from '../components/modals/AddPostModal'

const Home = () => {
  return (
    <>
        <NavigationBar /> 
        <AddPostModal />
        <RevPostsRelease />   
    </>
  )
}

export default Home
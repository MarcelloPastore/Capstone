import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

// routes
import Home from './pages/Home'; 
import { getPosts, selectAllPosts, selectIsPostLoading } from './states/revPostStates';


//main
const App = () => {

  const dispatch = useDispatch();

  const myPosts = useSelector(selectAllPosts);
  const myPostsLoadingState = useSelector(selectIsPostLoading);

  console.log('redux', myPosts, myPostsLoadingState);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

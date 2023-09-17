import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

// routes
import Home from './pages/Home'; 
import { getPosts, selectAllPosts, selectIsPostLoading } from './states/revPostStates';
import Login from './pages/Login';
import ProtectedRoutes from './middleware/ProtectedRoutes';
import Account from './pages/Account';


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
        <Route path='/login' element={<Login />}/>

        <Route element={<ProtectedRoutes />}> 
          <Route path='/account' element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

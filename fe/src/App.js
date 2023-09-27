import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux';

// routes
import Home from './pages/Home'; 
import { getPosts } from './states/revPostStates';
import Login from './pages/Login';
import ProtectedRoutes from './middleware/ProtectedRoutes';
import Account from './pages/Account';
import Success from './pages/Success';
import Review from './pages/Review';

//main
const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/review' element={<Review />}/>
        <Route path='/login' element={<Login />}/>

        <Route element={<ProtectedRoutes />}> 
          <Route path='/account' element={<Account />} />
          <Route path='/success' element={<Success />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

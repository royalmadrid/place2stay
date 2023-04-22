// import React from 'react'
// import NavBar from './components/NavBar'
// import Login from './components/user/Login';
import Notification from './components/Notification';
import Loading from './components/Loading';
// import BottomNav from './components/BottomNav';
import Room from './components/rooms/Room';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/Home';


const App = () => {
  return (
      <>
        <Loading />
        <Notification />
        <BrowserRouter>
          <Routes>
            <Route path='dashboard/*' element={<Dashboard />}/>
            <Route path='*' element={<Home />}/>
          </Routes>
        </BrowserRouter>
        <Room />
        {/* <Loading />
        <Notification />
        <Login />
        <NavBar />
        <BottomNav />
        <Room /> */}
      </>
  )
};

export default App

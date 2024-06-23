import { useState } from 'react'
import { Route, Routes,Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from './components/ui/Header'
import './App.css'
import {useAuthStore} from './zustand/authSlice'
//import PrivateRoute from './components/PrivateRoute';
function App() {
 
  
  const {authUser} = useAuthStore();
  //console.log("appjs",authUser)

  
 // const authUser = true;
  
  return (
    <>
    {authUser && <Header />}
      <Routes>
      <Route path='/login' element={authUser ? <Navigate to='/' />: <LoginPage />} />
		{/* <Route path='/signup' element={authUser ? <Navigate to='/' />:<SignUpPage />} /> */}
        <Route path='/signup' element={<SignUpPage />} />


        <Route path='/' element={authUser ?  <HomePage/> :<Navigate to={"/login"}/>  } />
				
				<Route path='/transaction/:id' element={authUser? <TransactionPage /> : <Navigate to={'/login'}/>} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
    </>
  )
}

export default App

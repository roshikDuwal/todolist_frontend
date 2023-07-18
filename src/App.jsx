import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Header from './components/Header'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from "./pages/Register"
import { Toaster } from 'react-hot-toast'
import { UserProfile } from '../api/Users/getUser'
import { Context } from './main'



export const App = () => {

    const {setUser,setIsAuthenticated,setLoading}=useContext(Context)

    useEffect(()=>{
        setLoading(true)
        UserProfile().then((res)=>{
           setUser(res.data.users)
            setLoading(false)
            setIsAuthenticated(true)
        }).catch(()=>{
            setUser({})
            setLoading(false)
            setIsAuthenticated(false)
        })
    },[])




    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register/>} />
            </Routes>
            <Toaster/>
        </Router>
    )
}

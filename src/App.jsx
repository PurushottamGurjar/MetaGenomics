import React from 'react'
import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import Home from './Components/Home'
import NotFound from './Components/NotFound'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'



const App = () => {
  return (
    <>
    <NavBar/>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<NotFound />} />
      <Route path="/contact" element={<NotFound />} />
      <Route path="/benefits" element={<NotFound />} />
      <Route path="/platforms" element={<NotFound />} />
      <Route path="/resources" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>

    <Footer/>

    </>
  )
}

export default App

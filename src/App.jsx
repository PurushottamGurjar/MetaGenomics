import React from 'react'
import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import Home from './Components/Home'
import NotFound from './Components/NotFound'
import { Routes, Route } from 'react-router-dom'


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
    </Routes>

    <Footer/>

    </>
  )
}

export default App

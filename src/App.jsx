import React from 'react'
import { AuthProvider } from './context/AuthContext'
import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import Home from './Components/Home'
import NotFound from './Components/NotFound'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import ProtectedRoute from './Components/common/ProtectedRoute'
import ProtectedTesting from './Components/ProtectedTesting'



const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
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

          <Route element={<ProtectedRoute/>}>
            <Route path="/login-testing" element={<ProtectedTesting/>}/>
          </Route>

        </Routes>
        <Footer/>

      </AuthProvider>

    </BrowserRouter>

  )
}

export default App

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
import ProjectPage from "./pages/ProjectPage"
import AboutUs from './Components/AboutUs'
import Benefits from './Components/Benefits'



const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute/>}>
            <Route path="/login-testing" element={<ProtectedTesting/>}/>
            <Route path="/" element={<ProjectPage />} />
            <Route path="/platforms" element={<ProjectPage />} />
          </Route>

        </Routes>
        <Footer/>

      </AuthProvider>

    </BrowserRouter>

  )
}

export default App

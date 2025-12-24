import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import Genomic from '../assets/Genomics_Blue_image.png'


const Login = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login submitted:', formData)
    // Add your login logic here
  }

  return (
    
    <div className="login-wrapper">
      <div className="login-container">
        <div className="left-image-section">
          <img src={Genomic} alt="Genomic Analysis" className="login-image" />
        </div>

        <div className="right-login-section">
          <h1>Welcome Back</h1>
          
          <p className="login-description">
            Sign in to access your genomics data and continue your research.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-login">Login</button>
          </form>

          <div className="register-link"  onClick={()=>navigator('/register')}>
            Don't have an account? <a>Register here</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
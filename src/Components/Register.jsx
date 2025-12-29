import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import Genomic from '../assets/Genomics_Blue_image.png'
import { useAuth } from '../context/AuthContext';


const Register = () => {
  const {register}=useAuth();
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    try {
      await register(formData);
      navigator("/");
    } catch (err) {
      alert("Registration failed");
    }
    
  }

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="left-image-section">
          <img src={Genomic} alt="Genomic Analysis" className="register-image" />
        </div>

        <div className="right-register-section">
          <h1>Create Account</h1>
          

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input 
                type="text" 
                id="fullName"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-options">
              <label className="terms-agreement">
                <input type="checkbox" required />
                <span>I agree to the Terms & Conditions</span>
              </label>
            </div>

            <button type="submit" className="btn btn-register">Register</button>
          </form>

          <div className="login-link" onClick={()=>navigator('/login')}>
            Already have an account? <a>Login here</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
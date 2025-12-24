import React from 'react'
import { useNavigate } from 'react-router-dom';
import './home.css'
import Genomic from '../assets/Genomics_Blue_image.png'
import Login from './Login'

const Home = () => {
  const navigator = useNavigate();
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div>
            <img src={Genomic} alt="Genomic Analysis" className="genomic-image" />
        </div>

        <div className="right-section">
          <h1>Genomics Platform</h1>
          
          <p className="description">
            Genomics Platform is user-friendly centralized bioinformatics software 
            for RNA-Seq and proteomics data that allows you to store and 
            interactively visualize data from your experiments.
          </p>

          <ul className="features">
            <li>Scalable analysis of large genomic datasets</li>
            <li>High-precision variant identification</li>
            <li>Efficient analysis: up to 10x speed up</li>
            <li>AI-driven biological insights</li>
            <li>Cloud-enabled genomic workflows</li>
            <li>Secure and compliant data management</li>
          </ul>

          <div className="button-container">
            <button className="btn btn-primary" onClick={()=>navigator('/login')}>Login</button>
            <button className="btn btn-secondary" onClick={()=>navigator('/register')} >Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
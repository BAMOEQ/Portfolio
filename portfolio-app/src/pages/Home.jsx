import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <img src="/ProfilePic.jpg" className="profile-image" alt="BAMOEQ Profile" />
        <h1>Brandon A Morales</h1>
        <p className="tagline">Full Stack Developer & Tech Enthusiast</p>
        
        {/* Quick Links */}
        <div className="quick-links">
          <a href="https://github.com/bamoeq" target="_blank" rel="noopener noreferrer" className="github-link">
            View My GitHub
          </a>
          <a href=''></a>
          <a href="https://www.linkedin.com/in/brandonamorales/" rel="noopener noreferrer" className='linkedin-link' >View My LinkedIn</a>
          
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="nav-cards">
        <Link to="/projects" className="nav-card">
          <h3>🚀 Projects</h3>
          <p>Explore my latest work and applications</p>
        </Link>
        
        <Link to="/skills" className="nav-card">
          <h3>💻 Skills</h3>
          <p>Frontend • Backend • Cloud Technologies</p>
        </Link>
        
        <Link to="/experience" className="nav-card">
          <h3>📈 Experience</h3>
          <p>Work history and educational timeline</p>
        </Link>
        
        <Link to="/about" className="nav-card">
          <h3>🎵 About Me</h3>
          <p>Music • Sports • Shows I love</p>
        </Link>
      </section>
    </div>
  );
}

export default Home;
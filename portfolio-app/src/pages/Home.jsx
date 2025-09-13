import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import CSVReader from '../components/CSVReader';
import PasswordDashboard from '../components/PasswordDashboard';

function Home() {
  // Tab state for interactive tools
  const [activeTab, setActiveTab] = useState('csv');

  const interactiveProjects = [
    {
      id: 'csv',
      title: 'CSV Data Visualizer',
      icon: '📊',
      description: 'Upload CSV files and create interactive charts with multiple visualization options',
      component: CSVReader
    },
    {
      id: 'password',
      title: 'Password Security Dashboard',
      icon: '🔐',
      description: 'Analyze password strength, detect patterns, and check against data breaches',
      component: PasswordDashboard
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="profile-section">
          <div className="profile-left">
            <img
              src={`${process.env.PUBLIC_URL}/ProfilePic.jpg`}
              className="profile-image"
              alt="Brandon A Morales"
            />
            <div className="profile-links">
              <a
                href="https://github.com/bamoeq"
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link"
              >
                View My GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/brandonamorales/"
                rel="noopener noreferrer"
                className="profile-link"
              >
                View My LinkedIn
              </a>
            </div>
          </div>
          <div className="profile-info">
            <h1>Brandon A Morales</h1>
            <p className="tagline">Full Stack Developer & Tech Enthusiast</p>
            <p className="bio">
              I’m Brandon Morales, a Computer Science graduate with a passion for building full-stack web applications 
              and creating solutions that bridge data, design, and functionality. Skilled in Python and JavaScript, 
              I’ve developed interactive projects like an NBA Database App, a Face Emotion Detection tool, a Gym System CLI, 
              and a Resume Analyzer powered by FastAPI and Docker. Recently, I’ve been diving deeper into Cybersecurity and AWS, 
              expanding my expertise in cloud technologies and secure systems. Feel free to explore the mini projects below 
              to see how I bring ideas to life through code.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Projects Section with Centered Title and Subtitle */}
      <section className="Interactive-Projects">
        <h2 className="interactive-tools-title">🛠️ Interactive Tools</h2>
        <p className="interactive-tools-subtitle">
          Try these live simple projects built by me using React - no downloads required!
        </p>

        {/* Tab Navigation */}
        <div className="interactive-tabs">
          {interactiveProjects.map((project) => (
            <button
              key={project.id}
              className={`tab-button ${activeTab === project.id ? 'active' : ''}`}
              onClick={() => setActiveTab(project.id)}
            >
              <span className="tab-icon">{project.icon}</span>
              <span className="tab-title">{project.title}</span>
            </button>
          ))}
        </div>

        {/* Active Tool Display */}
        <div className="interactive-tool-container">
          {interactiveProjects.map((project) => (
            <div
              key={project.id}
              className={`tool-card ${activeTab === project.id ? 'active' : ''}`}
              style={{ display: activeTab === project.id ? 'block' : 'none' }}
            >
              <div className="tool-header">
                <div className="tool-title">
                  <span className="tool-icon">{project.icon}</span>
                  <h3>{project.title}</h3>
                </div>
                <p className="tool-description">{project.description}</p>
              </div>
              <div className="tool-content">
                <project.component />
              </div>
            </div>
          ))}
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
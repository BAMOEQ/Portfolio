import React, { useState } from 'react';
import '../styles/Projects.css';
import CSVReader from '../components/CSVReader';
import PasswordDashboard from '../components/PasswordDashboard';
import ProjectCarousel from '../components/ProjectCarousel';

function Projects() {
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

  const projects = [
  {
    id: 1,
    title: 'NBA Database App',
    description: 'Full-stack web app that tracks NBA player and team stats using the BallDontLie API. Built secure authentication with JWT and bcrypt, and displayed live stats dynamically with React and TypeScript.',
    image: `${process.env.PUBLIC_URL}/Projects/NBA-Search.mp4`,
    technologies: ['Flask', 'React', 'TypeScript', 'MongoDB', 'JWT', 'bcrypt'],
    liveLink: null,
    githubLink: 'https://github.com/BAMOEQ/NBA-Comparison-App',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Face Emotion Detection',
    description: 'Real-time facial emotion detection tool using a machine learning model and webcam input. Integrated MongoDB for user tracking and emotion analysis.',
    image: `${process.env.PUBLIC_URL}/Projects/Emotion-Detector-App.mp4`,
    technologies: ['Flask', 'Machine Learning', 'MongoDB'],
    liveLink: null,
    githubLink: 'https://github.com/BAMOEQ/Face-Emotion-Detection',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Gym System CLI',
    description: 'Command-line application simulating a gym management system with member and admin roles. Designed with object-oriented principles and UML diagrams to capture user stories.',
    image: [
      `${process.env.PUBLIC_URL}/Projects/AdminSession.png`,
      `${process.env.PUBLIC_URL}/Projects/MemberSession.png`
    ],
    technologies: ['Java', 'OOP', 'UML'],
    liveLink: null,
    githubLink: 'https://github.com/BAMOEQ/Gym-System-CLI',
    status: 'completed'
  },
  {
    id: 4,
    title: 'Resume Analyzer',
    description: 'Comprehensive web application that analyzes resumes against job market trends. Features resume parsing, skill detection, gap analysis, and personalized recommendations. Built with a microservice architecture and deployed via Docker and GitHub Actions to Digital Ocean.',
    image: `${process.env.PUBLIC_URL}/Projects/resume-analyzer.mp4`,
    technologies: ['FastAPI', 'Flask', 'MongoDB', 'Docker'],
    liveLink: null,
    githubLink: 'https://github.com/BAMOEQ/Resume-Analyzer',
    status: 'completed'
  },
  {
    id: 5,
    title: 'NFL Match Predictor',
    description: 'Machine learning project that predicts NFL game outcomes using team and player statistics. Data was cleaned, aggregated to team-level, and enriched with rolling averages and matchup features. Built predictive models with scikit-learn and evaluated with time-series cross-validation.',
    image: `${process.env.PUBLIC_URL}/Projects/nfl-match-predictor.mp4`,
    technologies: ['Python', 'Pandas', 'scikit-learn', 'Machine Learning'],
    liveLink: null,
    githubLink: 'https://github.com/BAMOEQ/NFL-Predictor',
    status: 'in-progress'
  }
];

  return (
    <div className="projects-container">
      {/* Split section: Interactive Tools (left) + Project Carousel (right).
          A 2-row grid keeps both content cards in the same row so their tops
          align, regardless of differing header/tab heights. */}
      <section className="projects-split">
        {/* Left header: title, subtitle, tabs */}
        <div className="tools-header">
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
        </div>

        {/* Left card: active tool display */}
        <div className="interactive-tool-container">
          {interactiveProjects.map((project) => (
            <div
              key={project.id}
              className={`tool-card ${activeTab === project.id ? 'active' : ''}`}
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

        {/* Right header: title, subtitle */}
        <div className="carousel-header">
          <h2 className="carousel-panel-title">💼 Portfolio Projects</h2>
          <p className="carousel-panel-subtitle">
            Full-stack applications and development projects
          </p>
        </div>

        {/* Right card: project carousel */}
        <ProjectCarousel projects={projects} />
      </section>

      <div className="projects-footer">
        <p>More projects coming soon!</p>
        <a
          href="https://github.com/bamoeq"
          target="_blank"
          rel="noopener noreferrer"
          className="github-profile-link"
        >
          View All Projects on GitHub →
        </a>
      </div>
    </div>
  );
}

export default Projects;

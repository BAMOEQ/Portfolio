import React from 'react';
import '../styles/Projects.css';

function Projects() {
  const projects = [
  {
    id: 1,
    title: 'NBA Database App',
    description: 'Full-stack web app that tracks NBA player and team stats using the BallDontLie API. Built secure authentication with JWT and bcrypt, and displayed live stats dynamically with React and TypeScript.',
    image: '/project-images/nba-database.jpg',
    technologies: ['Flask', 'React', 'TypeScript', 'MongoDB', 'JWT', 'bcrypt'],
    liveLink: 'https://github.com/BAMOEQ/NBA-Comparison-App',
    githubLink: 'https://github.com/BAMOEQ/NBA-Comparison-App',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Face Emotion Detection',
    description: 'Real-time facial emotion detection tool using a machine learning model and webcam input. Integrated MongoDB for user tracking and emotion analysis.',
    image: '/project-images/face-emotion.jpg',
    technologies: ['Flask', 'Machine Learning', 'MongoDB'],
    liveLink: null,
    githubLink: 'https://github.com/BAMOEQ/Face-Emotion-Detection', // replace with actual repo if available
    status: 'completed'
  },
  {
    id: 3,
    title: 'Gym System CLI',
    description: 'Command-line application simulating a gym management system with member and admin roles. Designed with object-oriented principles and UML diagrams to capture user stories.',
    image: '/project-images/gym-system.jpg',
    technologies: ['Java', 'OOP', 'UML'],
    liveLink: null,
    githubLink: 'https://github.com/BAMOEQ/Gym-System-CLI', // replace with actual repo if available
    status: 'completed'
  },
  {
    id: 4,
    title: 'Resume Analyzer',
    description: 'Comprehensive web application that analyzes resumes against job market trends. Features resume parsing, skill detection, gap analysis, and personalized recommendations. Built with a microservice architecture and deployed via Docker and GitHub Actions to Digital Ocean.',
    image: '/project-images/resume-analyzer.jpg',
    technologies: ['FastAPI', 'Flask', 'MongoDB', 'Docker'],
    liveLink: null, // update with real deployment link if available
    githubLink: 'https://github.com/BAMOEQ/Resume-Analyzer',
    status: 'completed'
  }
];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { text: 'Completed', class: 'status-completed' },
      'in-progress': { text: 'In Progress', class: 'status-progress' },
      planned: { text: 'Planned', class: 'status-planned' }
    };
    return statusConfig[status] || statusConfig.completed;
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>My Projects</h1>
        <p>A collection of projects showcasing my skills and creativity</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => {
          const statusInfo = getStatusBadge(project.status);
          
          return (
            <div key={project.id} className="project-card">
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="image-placeholder">
                    <span>🚀</span>
                    <p>Project Preview</p>
                  </div>
                )}
                <div className={`status-badge ${statusInfo.class}`}>
                  {statusInfo.text}
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link live-link"
                    >
                      🌐 Live Demo
                    </a>
                  )}
                  
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link github-link"
                    >
                      📂 View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
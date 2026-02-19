import React from 'react';
import '../styles/Projects.css';

function Projects() {
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
      {/* Regular Projects Section */}
      <div className="regular-projects-section">
        <div className="projects-header">
          <h1>💼 Portfolio Projects</h1>
          <p>Full-stack applications and development projects</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const statusInfo = getStatusBadge(project.status);

            // Handle image/video/array logic safely
            let isVideo = false;
            let imageSrc = null;

            if (Array.isArray(project.image)) {
              imageSrc = project.image[0];
              isVideo = typeof imageSrc === 'string' && imageSrc.match(/\.mp4$/i);
            } else if (typeof project.image === 'string') {
              imageSrc = project.image;
              isVideo = imageSrc.match(/\.mp4$/i);
            }

            return (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  {imageSrc ? (
                    isVideo ? (
                      <video controls width="100%" height="200" style={{objectFit: 'cover'}} poster="" preload="metadata">
                        <source src={imageSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={imageSrc} alt={project.title} />
                    )
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
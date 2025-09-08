import React from 'react';
import '../styles/Projects.css';

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Project Name 1',
      description: 'Brief description of what this project does and the problem it solves. Keep it concise but informative.',
      image: '/project-images/project1.jpg', // Add your project images to public/project-images/
      technologies: ['React', 'JavaScript', 'CSS'],
      liveLink: 'https://your-project-link.com',
      githubLink: 'https://github.com/yourusername/project1',
      status: 'completed' // 'completed', 'in-progress', 'planned'
    },
    {
      id: 2,
      title: 'Project Name 2',
      description: 'Another project description highlighting key features and technologies used.',
      image: '/project-images/project2.jpg',
      technologies: ['Node.js', 'Express', 'MongoDB'],
      liveLink: 'https://your-project-link2.com',
      githubLink: 'https://github.com/yourusername/project2',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Project Name 3',
      description: 'Third project showcasing different skills and technologies.',
      image: '/project-images/project3.jpg',
      technologies: ['Python', 'Django', 'PostgreSQL'],
      liveLink: null, // No live link available
      githubLink: 'https://github.com/yourusername/project3',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Project Name 4',
      description: 'Fourth project demonstrating versatility in different tech stacks.',
      image: null, // No image available - will show placeholder
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      liveLink: 'https://your-project-link4.com',
      githubLink: 'https://github.com/yourusername/project4',
      status: 'planned'
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
import React from 'react';
import '../styles/components/ProjectCard.css';

function ProjectCard({ title, description, image, technologies }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-badges">
        {technologies.map(tech => (
          <span key={tech} className="tech-badge">{tech}</span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;
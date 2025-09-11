import React, { useState } from 'react';
import '../styles/components/ProjectCard.css';


function ProjectCard({ title, description, image, media, technologies }) {
  const mediaList = media && media.length > 0 ? media : (image ? [{ type: 'image', src: image }] : []);
  const [current, setCurrent] = useState(0);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="project-card">
      {mediaList.length > 0 && (
        <div className="project-media-slideshow">
          {mediaList.length > 1 && (
            <button className="slide-arrow left" onClick={handlePrev} aria-label="Previous media">&#8592;</button>
          )}
          <div className="media-content">
            {mediaList[current].type === 'image' ? (
              <img src={mediaList[current].src} alt={title} />
            ) : mediaList[current].type === 'video' ? (
              <video width="100%" controls poster={mediaList.find(m => m.type === 'image')?.src || ''}>
                <source src={mediaList[current].src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
          {mediaList.length > 1 && (
            <button className="slide-arrow right" onClick={handleNext} aria-label="Next media">&#8594;</button>
          )}
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-badges">
        {technologies && technologies.map(tech => (
          <span key={tech} className="tech-badge">{tech}</span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;
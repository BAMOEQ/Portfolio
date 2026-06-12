import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  SiReact,
  SiTypescript,
  SiMongodb,
  SiFlask,
  SiFastapi,
  SiDocker,
  SiPython,
  SiPandas,
  SiScikitlearn,
  SiJsonwebtokens,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { FiTag } from 'react-icons/fi';
import '../styles/Projects.css';

// Maps a technology name to its brand logo + color. Anything not listed here
// falls back to a generic tag icon tinted with the brand color.
const TECH_ICONS = {
  React: { Icon: SiReact, color: '#61DAFB' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  MongoDB: { Icon: SiMongodb, color: '#47A248' },
  Flask: { Icon: SiFlask, color: '#E8E8E8' },
  FastAPI: { Icon: SiFastapi, color: '#05998B' },
  Docker: { Icon: SiDocker, color: '#2496ED' },
  Python: { Icon: SiPython, color: '#4B8BBE' },
  Pandas: { Icon: SiPandas, color: '#E70488' },
  'scikit-learn': { Icon: SiScikitlearn, color: '#F7931E' },
  Java: { Icon: FaJava, color: '#E76F00' },
  JWT: { Icon: SiJsonwebtokens, color: '#FB015B' },
};

function TechChip({ tech }) {
  const entry = TECH_ICONS[tech];
  const Icon = entry ? entry.Icon : FiTag;
  const color = entry ? entry.color : 'var(--brand)';
  return (
    <span className="tech-chip">
      <Icon className="tech-chip-icon" style={{ color }} aria-hidden="true" />
      {tech}
    </span>
  );
}

const getStatusBadge = (status) => {
  const statusConfig = {
    completed: { text: 'Completed', class: 'status-completed' },
    'in-progress': { text: 'In Progress', class: 'status-progress' },
    planned: { text: 'Planned', class: 'status-planned' },
  };
  return statusConfig[status] || statusConfig.completed;
};

function ProjectCarousel({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const containerRef = useRef(null);

  const count = projects.length;

  const goTo = useCallback(
    (index) => setCurrentIndex((index + count) % count),
    [count]
  );
  const next = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const prev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  // Keyboard navigation while the carousel is focused / hovered.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    node.addEventListener('keydown', handleKey);
    return () => node.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  const project = projects[currentIndex];
  const statusInfo = getStatusBadge(project.status);

  // Resolve media (supports string, array, image or .mp4 video).
  let imageSrc = null;
  if (Array.isArray(project.image)) {
    imageSrc = project.image[0];
  } else if (typeof project.image === 'string') {
    imageSrc = project.image;
  }
  const isVideo = typeof imageSrc === 'string' && /\.mp4$/i.test(imageSrc);

  return (
    <div
      className="project-carousel"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Portfolio projects carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-counter">
        💼 Portfolio · {currentIndex + 1} / {count}
      </div>

      <div className="carousel-card" key={project.id}>
        <div className="carousel-media">
          {imageSrc ? (
            isVideo ? (
              <video controls width="100%" preload="metadata">
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

        <h3 className="carousel-title">{project.title}</h3>
        <p className="carousel-description">{project.description}</p>

        <div className="carousel-technologies">
          {project.technologies.map((tech) => (
            <TechChip key={tech} tech={tech} />
          ))}
        </div>

        <div className="carousel-links">
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

      <div className="carousel-nav">
        <button
          className="carousel-arrow"
          onClick={prev}
          aria-label="Previous project"
        >
          ‹
        </button>
        <div className="carousel-dots">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="carousel-arrow"
          onClick={next}
          aria-label="Next project"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default ProjectCarousel;

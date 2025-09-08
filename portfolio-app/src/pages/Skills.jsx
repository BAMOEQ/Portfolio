import React from 'react';

function Skills() {
  const skillCategories = {
    frontend: ['React', 'JavaScript', 'HTML/CSS', 'TypeScript'],
    backend: ['Node.js', 'Python', 'Express', 'APIs'],
    cloud: ['AWS', 'Docker', 'CI/CD', 'Git']
  };

  return (
    <div className="skills-container">
      <h2>Technical Skills</h2>
      
      {Object.entries(skillCategories).map(([category, skills]) => (
        <div key={category} className="skill-category">
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <div className="skill-badges">
            {skills.map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skills;
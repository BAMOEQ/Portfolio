import React from 'react';
import '../styles/Experience.css';

function Experience() {
  const experiences = [
    {
      id: 1,
      type: 'work', // 'work' or 'education'
      title: 'Your Job Title',
      company: 'Company Name',
      location: 'City, State',
      startDate: 'Month Year',
      endDate: 'Month Year', // or 'Present'
      description: [
        'Key achievement or responsibility 1',
        'Key achievement or responsibility 2',
        'Key achievement or responsibility 3'
      ],
      technologies: ['Tech 1', 'Tech 2', 'Tech 3']
    },
    {
      id: 2,
      type: 'education',
      title: 'Degree Name',
      company: 'University Name',
      location: 'City, State',
      startDate: 'Month Year',
      endDate: 'Month Year',
      description: [
        'Relevant coursework or achievements',
        'GPA: X.XX (if you want to include)',
        'Notable projects or activities'
      ],
      technologies: ['Subject 1', 'Subject 2', 'Subject 3']
    },
    {
      id: 3,
      type: 'Education',
      title: 'Previous Job Title',
      company: 'Previous Company',
      location: 'City, State',
      startDate: 'Month Year',
      endDate: 'Month Year',
      description: [
        'Achievement 1',
        'Achievement 2',
        'Achievement 3'
      ],
      technologies: ['Tech 1', 'Tech 2']
    }
    // Add more experiences as needed
  ];

  return (
    <div className="experience-container">
      <div className="experience-header">
        <h1>Experience & Education</h1>
        <p>My professional journey and educational background</p>
      </div>

      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={exp.id} className={`timeline-item ${exp.type}`}>
            <div className="timeline-marker">
              <div className="timeline-icon">
                {exp.type === 'work' ? '💼' : '🎓'}
              </div>
            </div>
            
            <div className="timeline-content">
              <div className="timeline-card">
                <div className="card-header">
                  <h3 className="title">{exp.title}</h3>
                  <div className="company-info">
                    <h4 className="company">{exp.company}</h4>
                    <span className="location">{exp.location}</span>
                  </div>
                  <div className="date-range">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                
                <div className="card-body">
                  <ul className="description">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="technologies">
                      <span className="tech-label">Technologies:</span>
                      <div className="tech-tags">
                        {exp.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
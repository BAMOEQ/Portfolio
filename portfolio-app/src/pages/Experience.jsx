import React from 'react';
import '../styles/Experience.css';

function Experience() {
  const experiences = [
    {
      id: 3,
      type: 'education',
      title: 'Computer Science',
      company: 'New York University',
      logo: `${process.env.PUBLIC_URL}/Experience/NYU.png`,
      location: 'New York, NY',
      startDate: 'Sep 2021',
      endDate: 'May 2025',
      description: [
        'Relevant coursework: Discrete Mathematics, Operating Systems, Software Engineering, Data Structures, Algorithms, Applied Internet Technology, OOP, Linear Algebra, Computer Systems.',
        'Study Abroad at NYU Paris (Feb – Jun 2024): Focus on Data Management, French, and Film.',
        'Member of Puerto Rican Student Association; Communications Chair and Treasurer, boosting engagement by 50%.',
        'Active in Google Developers Group @ NYU, co-hosting technical workshops and events.'
      ],
      technologies: ['Algorithms', 'Python', 'C++', 'Flask', 'Node.js', 'MongoDB']
    },
    {
      id: 4,
      type: 'education',
      title: 'High School',
      company: 'The Laboratory School of Finance and Technology',
      logo: `${process.env.PUBLIC_URL}/Experience/223.png`,
      location: 'Bronx, NY',
      startDate: 'Sep 2017',
      endDate: 'Jun 2021',
      description: [
        'Completed AP coursework: Calculus AB, Computer Science A, Computer Science Principles, English Literature, Environmental Science, Physics.',
        'Active in Class Council, served as Communications Chair to advocate for student issues and organize events.'
      ],
      technologies: ['AP Calculus', 'AP Computer Science', 'AP Physics']
    },
    {
      id: 1,
      type: 'work',
      title: 'Coach',
      company: 'GNC',
      logo: `${process.env.PUBLIC_URL}/Experience/GNC.png`,
      location: 'New York, NY',
      startDate: 'Aug 2023',
      endDate: 'Jan 2024',
      description: [
        'Exceeded sales targets through strong product knowledge and customer engagement.',
        'Provided personalized recommendations to customers by staying up to date with health and wellness industry trends.'
      ],
      technologies: ['Sales', 'Customer Service', 'Product Knowledge']
    },
    {
      id: 2,
      type: 'work',
      title: 'Producer Intern',
      company: '92nd Street Y (YMCA)',
      logo: `${process.env.PUBLIC_URL}/Experience/92Y.png`,
      location: 'New York, NY',
      startDate: 'Sep 2019',
      endDate: 'Aug 2021',
      description: [
        'Assisted in managing tech operations, troubleshooting, and multimedia support for large-scale public events and internal initiatives.',
        'Led and coordinated a tech-driven arts event aimed at expanding access to digital tools for underrepresented communities.'
      ],
      technologies: ['Event Tech', 'Multimedia Support', 'Team Collaboration']
    }
  ];

  // Split experiences by type
  const educationExperiences = experiences.filter(exp => exp.type === 'education');
  const workExperiences = experiences.filter(exp => exp.type === 'work');

  return (
    <div className="experience-container">
      <div className="experience-header">
        <h1>Experience & Education</h1>
        <p>My professional journey and educational background</p>
      </div>

      <div className="experience-main-columns">
        {/* Education Left */}
        <div className="experience-column">
          <h2 className="section-title">🎓 Education</h2>
          <div className="timeline-cards">
            {educationExperiences.map((exp, idx) => (
              <div key={exp.id} className="timeline-card education">
                {exp.logo && (
                  <img src={exp.logo} alt={exp.company + ' logo'} className="company-logo" />
                )}
                <div className="card-header">
                  <h1 className="company">{exp.company}</h1>
                  <h3 className="title">{exp.title}</h3>
                  <span className="location">{exp.location}</span>
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
            ))}
          </div>
        </div>

        {/* Work Experience Right */}
        <div className="experience-column">
          <h2 className="section-title">💼 Work Experience</h2>
          <div className="timeline-cards">
            {workExperiences.map((exp, idx) => (
              <div key={exp.id} className="timeline-card work">
                {exp.logo && (
                  <img src={exp.logo} alt={exp.company + ' logo'} className="company-logo" />
                )}
                <div className="card-header">
                  <h1 className="company">{exp.company}</h1>
                  <h3 className="title">{exp.title}</h3>
                  <span className="location">{exp.location}</span>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
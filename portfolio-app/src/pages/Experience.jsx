import { useState } from 'react';
import '../styles/Experience.css';

function Experience() {
  const [activeTab, setActiveTab] = useState('work');

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
      id: 5,
      type: 'work',
      title: 'AI Quality Assurance Tester',
      company: 'Steddy Funds',
      logo: `${process.env.PUBLIC_URL}/Experience/Steddy-Logo.png`,
      location: 'New York City Metropolitan Area',
      startDate: 'Dec 2025',
      endDate: 'Present',
      description: [
        'Executed manual testing of AI features, tools, and workflows to identify bugs and edge cases.',
        'Documented test patterns and results to facilitate engineering troubleshooting and resolution.',
        'Evaluated model outputs for accuracy and reliability to expected behaviors to ensure product quality standards.'
      ],
      technologies: ['AI Testing', 'QA', 'Manual Testing', 'Bug Documentation']
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

  const educationExperiences = experiences.filter(exp => exp.type === 'education');
  const workExperiences = experiences.filter(exp => exp.type === 'work');
  const activeExperiences = activeTab === 'education' ? educationExperiences : workExperiences;

  return (
    <div className="experience-container">
      <div className="experience-header">
        <h1>Experience & Education</h1>
        <p>My professional journey and educational background</p>
      </div>

      <div className="tab-bar">
        <button
          className={`tab-button ${activeTab === 'work' ? 'active' : ''}`}
          onClick={() => setActiveTab('work')}
        >
          Work Experience
        </button>
        <button
          className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
      </div>

      <div className="tab-content">
        <div className="timeline-cards">
          {activeExperiences.map((exp) => (
            <div key={exp.id} className={`timeline-card ${exp.type}`}>
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
  );
}

export default Experience;

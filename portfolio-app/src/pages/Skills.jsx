import React,{useEffect} from 'react';
import '../styles/Skills.css';

function Skills() {
  const stats = [
    { number: '2+', label: 'Years Coding' },
    { number: '15+', label: 'Technologies' },
    { number: '20+', label: 'Projects Built' },
    { number: '100%', label: 'Passion Level' }
  ];

  const skillCards = [
    {
      key: 'frontend',
      title: 'Frontend',
      icon: '🎨',
      skills: [
        'React',
        'JavaScript',
        'TypeScript',
        'HTML & CSS',
        'Tailwind CSS'
      ]
    },
    {
      key: 'backend',
      title: 'Backend',
      icon: '⚙️',
      skills: [
        'Python',
        'Flask',
        'FastAPI',
        'Node.js',
        'Java'
      ]
    },
    {
      key: 'database',
      title: 'Database',
      icon: '🗄️',
      skills: [
        'MongoDB',
        'PostgreSQL',
        'MySQL',
        'Firebase'
      ]
    },
    {
      key: 'tools',
      title: 'Tools',
      icon: '🛠️',
      skills: [
        'Git & GitHub',
        'Docker',
        'AWS',
        'VS Code',
        'Postman'
      ]
    },
    {
      key: 'cyber',
      title: 'Cybersecurity',
      icon: '🛡️',
      skills: [
        'Pentesting',
        'Linux',
        'Red Team',
        'Blue Team',
        'Network Security'
      ]
    }
  ];

  useEffect(() => {
    if (window.GitHubCalendar) {
      window.GitHubCalendar(".calendar", "BAMOEQ", { responsive: true });
    }
  }, []);

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h1>My Skills</h1>
        <p>
          A comprehensive overview of my technical expertise and proficiency levels. 
          I'm constantly learning and expanding my skill set to stay current with industry trends.
        </p>
      </div>

      {/* Stats at the top */}
      <div className="skills-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Five skill cards side by side */}
      <div className="skills-cards-row">
        {skillCards.map(card => (
          <div key={card.key} className="skills-card">
            <div className="skills-card-header">
              <span className="skills-card-icon">{card.icon}</span>
              <span className="skills-card-title">{card.title}</span>
            </div>
            <div className="skills-card-list">
              {card.skills.map(skill => (
                <span key={skill} className="skills-pill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="github-calendar-section">
        <h2>GitHub Contributions</h2>
        <div className="calendar">
          Loading the data just for you.
        </div>
      </div>
    </div>
  );
}

export default Skills;
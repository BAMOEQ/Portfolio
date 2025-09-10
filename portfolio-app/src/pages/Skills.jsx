import React, { useState, useEffect } from 'react';
import '../styles/Skills.css';

function Skills() {
  const [animatedCards, setAnimatedCards] = useState(new Set());

  const skillsData = {
    frontend: {
      title: 'Frontend Development',
      icon: '🎨',
      description: 'Creating beautiful and interactive user interfaces',
      skills: [
        {
          name: 'React',
          level: 85,
          experience: 'advanced',
          icon: '⚛️',
          description: 'Building dynamic web applications with hooks and state management'
        },
        {
          name: 'JavaScript',
          level: 90,
          experience: 'advanced',
          icon: '🟨',
          description: 'ES6+, async/await, DOM manipulation, and modern JS features'
        },
        {
          name: 'TypeScript',
          level: 75,
          experience: 'intermediate',
          icon: '🔷',
          description: 'Type-safe JavaScript development and interface design'
        },
        {
          name: 'HTML & CSS',
          level: 95,
          experience: 'expert',
          icon: '🎯',
          description: 'Semantic HTML, responsive design, Flexbox, and Grid'
        },
        {
          name: 'Tailwind CSS',
          level: 80,
          experience: 'advanced',
          icon: '💨',
          description: 'Utility-first CSS framework for rapid UI development'
        }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: '⚙️',
      description: 'Building robust server-side applications and APIs',
      skills: [
        {
          name: 'Python',
          level: 90,
          experience: 'advanced',
          icon: '🐍',
          description: 'Data structures, algorithms, and web development'
        },
        {
          name: 'Flask',
          level: 85,
          experience: 'advanced',
          icon: '🌶️',
          description: 'Lightweight web framework for building REST APIs'
        },
        {
          name: 'FastAPI',
          level: 75,
          experience: 'intermediate',
          icon: '⚡',
          description: 'Modern, fast web framework for building APIs with Python'
        },
        {
          name: 'Node.js',
          level: 70,
          experience: 'intermediate',
          icon: '🟢',
          description: 'Server-side JavaScript and npm package management'
        },
        {
          name: 'Java',
          level: 80,
          experience: 'advanced',
          icon: '☕',
          description: 'Object-oriented programming and enterprise applications'
        }
      ]
    },
    database: {
      title: 'Database & Storage',
      icon: '🗄️',
      description: 'Managing and optimizing data storage solutions',
      skills: [
        {
          name: 'MongoDB',
          level: 85,
          experience: 'advanced',
          icon: '🍃',
          description: 'NoSQL database design, aggregation, and indexing'
        },
        {
          name: 'PostgreSQL',
          level: 75,
          experience: 'intermediate',
          icon: '🐘',
          description: 'Relational database design and SQL optimization'
        },
        {
          name: 'MySQL',
          level: 70,
          experience: 'intermediate',
          icon: '🐬',
          description: 'Database administration and query optimization'
        },
        {
          name: 'Firebase',
          level: 65,
          experience: 'intermediate',
          icon: '🔥',
          description: 'Real-time database and cloud storage solutions'
        }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      icon: '🛠️',
      description: 'Development tools and deployment platforms',
      skills: [
        {
          name: 'Git & GitHub',
          level: 90,
          experience: 'advanced',
          icon: '🐙',
          description: 'Version control, branching, and collaborative development'
        },
        {
          name: 'Docker',
          level: 70,
          experience: 'intermediate',
          icon: '🐳',
          description: 'Containerization and microservices deployment'
        },
        {
          name: 'AWS',
          level: 60,
          experience: 'beginner',
          icon: '☁️',
          description: 'Cloud services, EC2, S3, and serverless functions'
        },
        {
          name: 'VS Code',
          level: 95,
          experience: 'expert',
          icon: '💻',
          description: 'IDE mastery with extensions and debugging tools'
        },
        {
          name: 'Postman',
          level: 85,
          experience: 'advanced',
          icon: '📮',
          description: 'API testing, documentation, and automation'
        }
      ]
    }
  };

  const stats = [
    { number: '2+', label: 'Years Coding' },
    { number: '15+', label: 'Technologies' },
    { number: '20+', label: 'Projects Built' },
    { number: '100%', label: 'Passion Level' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillCard = entry.target;
            setAnimatedCards(prev => new Set([...prev, skillCard.id]));
          }
        });
      },
      { threshold: 0.5 }
    );

    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      card.id = `skill-card-${index}`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const getExperienceColor = (experience) => {
    const colors = {
      beginner: '#ff9f43',
      intermediate: '#10ac84',
      advanced: '#ee5a24',
      expert: '#5f27cd'
    };
    return colors[experience] || '#666';
  };

  const renderSkillCategory = (categoryKey, category) => (
    <div key={categoryKey} className={`skills-category ${categoryKey}-category`}>
      <div className="category-header">
        <h2 className="category-title">
          <span className="category-icon">{category.icon}</span>
          {category.title}
        </h2>
        <p className="category-description">{category.description}</p>
      </div>

      <div className="skills-grid">
        {category.skills.map((skill, index) => (
          <div 
            key={index} 
            className={`skill-card ${animatedCards.has(`skill-card-${Object.keys(skillsData).indexOf(categoryKey) * 10 + index}`) ? 'animate' : ''}`}
          >
            <div className="skill-icon">{skill.icon}</div>
            <h3 className="skill-name">{skill.name}</h3>
            
            <div className="skill-level">
              <div className="skill-level-text">
                <span>Proficiency</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    '--progress-width': `${skill.level}%`,
                    width: animatedCards.has(`skill-card-${Object.keys(skillsData).indexOf(categoryKey) * 10 + index}`) ? `${skill.level}%` : '0%'
                  }}
                ></div>
              </div>
            </div>

            <div 
              className={`experience-badge ${skill.experience}`}
              style={{ backgroundColor: getExperienceColor(skill.experience) }}
            >
              {skill.experience}
            </div>

            <p className="skill-description">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h1>My Skills</h1>
        <p>
          A comprehensive overview of my technical expertise and proficiency levels. 
          I'm constantly learning and expanding my skill set to stay current with industry trends.
        </p>
      </div>

      <div className="skills-content">
        {Object.entries(skillsData).map(([key, category]) => 
          renderSkillCategory(key, category)
        )}

        {/* Skills Statistics */}
        <div className="skills-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
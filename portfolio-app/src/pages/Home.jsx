import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import AnimatedBackground from '../components/AnimatedBackground';
import RotatingTagline from '../components/RotatingTagline';
import ScrollIndicator from '../components/ScrollIndicator';
import TechStack from '../components/TechStack';

// Taglines cycled through by the typewriter animation. Add or remove freely.
const TAGLINES = [
  'Full Stack Developer & Tech Enthusiast',
  'Python & JavaScript Developer',
  'Knicks Fan',
  'Building data-driven web apps',
  'Exploring AWS & Electronics'
];

// Career / education timeline shown beside the bio. Each entry renders a dot on
// the vertical line with the year, role, and (optional) organization.
// TODO: replace these placeholders with your real entries.
const TIMELINE = [
  { year: '2021-2022', role: 'Member', org: 'Tech Treks' },
  { year: '2024-2025', role: 'Member', org: 'Google Developer Group @ NYU' },
  { year: '2021-2025', role: 'Graduated, B.A Computer Science', org: 'New York University' },
  { year: '2025-2026', role: 'Junior Software Engineer', org: 'Steddy Funds' },
];

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <AnimatedBackground />
        <div className="profile-section">
          <img
            src={`${process.env.PUBLIC_URL}/ProfilePic.jpg`}
            className="profile-image"
            alt="Brandon A Morales"
          />
          <div className="name-row">
            <span className="name-line" aria-hidden="true" />
            <h1>Brandon A Morales</h1>
            <span className="name-line" aria-hidden="true" />
          </div>
          <RotatingTagline phrases={TAGLINES} />
          <div className="hero-socials">
            <a
              href="https://github.com/bamoeq"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/brandonamorales/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Bio Section */}
      <section id="bio" className="bio-section">
        <h2 className="bio-title">About Me</h2>
        <div className="bio-layout">
          <p className="bio">
            I’m Brandon Morales, a Computer Science graduate with a passion for building full-stack web applications
            and creating solutions that bridge data, design, and functionality. Skilled in Python and JavaScript,
            I’ve developed interactive projects like an NBA Database App, a Face Emotion Detection tool, a Gym System CLI,
            and a Resume Analyzer powered by FastAPI and Docker. Recently, I’ve been diving deeper into Cybersecurity and AWS,
            expanding my expertise in cloud technologies and secure systems. Feel free to explore the mini projects below
            to see how I bring ideas to life through code.
          </p>
          <ol className="timeline">
            {TIMELINE.map((item, index) => (
              <li className="timeline-item" key={`${item.year}-${index}`}>
                <span className="timeline-marker" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.42 0-8 2.69-8 6v1h16v-1c0-3.31-3.58-6-8-6z" />
                  </svg>
                </span>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <p className="timeline-role">
                    {item.role}
                    {item.org && (
                      <>
                        {' at '}
                        <span className="timeline-org">{item.org}</span>
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Technologies Section */}
      <TechStack />

      {/* Navigation Cards */}
      <section className="nav-cards">
        <Link to="/projects" className="nav-card">
          <h3>🚀 Projects</h3>
          <p>Explore my latest work and applications</p>
        </Link>
        <Link to="/experience" className="nav-card">
          <h3>📈 Experience</h3>
          <p>Work history and educational timeline</p>
        </Link>
        <Link to="/about" className="nav-card">
          <h3>🎵 About Me</h3>
          <p>Music • Sports • Shows I love</p>
        </Link>
      </section>
    </div>
  );
}

export default Home;
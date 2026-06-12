import React from 'react';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiPython,
  SiFlask,
  SiFastapi,
  SiNodedotjs,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiNpm,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import '../styles/TechStack.css';

// Technologies grouped by area, compiled from the projects in Projects.jsx and
// this portfolio's own stack. Each item carries its react-icons logo and brand
// color so the card can tint the logo to match the real technology.
const CATEGORIES = [
  {
    label: 'Frontend',
    items: [
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'HTML', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', Icon: SiCss, color: '#663399' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Python', Icon: SiPython, color: '#4B8BBE' },
      { name: 'Flask', Icon: SiFlask, color: '#FFFFFF' },
      { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
      { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Java', Icon: FaJava, color: '#E76F00' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#FFFFFF' },
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'VS Code', Icon: VscVscode, color: '#007ACC' },
      { name: 'NPM', Icon: SiNpm, color: '#CB3837' },
    ],
  },
];

function TechStack() {
  return (
    <section className="tech-stack" aria-labelledby="tech-stack-title">
      <h2 className="tech-stack-title" id="tech-stack-title">
        Technologies I Use
      </h2>

      {CATEGORIES.map((category) => (
        <div className="tech-stack-group" key={category.label}>
          <h3 className="tech-stack-category-label">{category.label}</h3>
          <div className="tech-stack-grid">
            {category.items.map(({ name, Icon, color }) => (
              <div className="tech-card" key={name}>
                <span className="tech-card-icon" style={{ color }}>
                  <Icon aria-hidden="true" />
                </span>
                <span className="tech-card-label">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default TechStack;

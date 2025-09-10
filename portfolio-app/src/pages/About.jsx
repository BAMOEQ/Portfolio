import React, { useState } from 'react';
import '../styles/About.css';

function About() {
  const [activeSection, setActiveSection] = useState(null);

  const interestCategories = [
    {
      id: 'music',
      title: 'Music',
      icon: '🎵',
      description: 'The soundtracks to my coding sessions',
      color: '#1db954',
      items: [
        {
          id: 1,
          title: 'Hip Hop',
          description: 'Classic and modern rap',
          image: '/about-images/hiphop.jpg',
          items: ['Kendrick Lamar', 'J. Cole', 'Drake']
        },
        {
          id: 2,
          title: 'R&B',
          description: 'Smooth and soulful vibes',
          image: '/about-images/rnb.jpg',
          items: ['The Weeknd', 'Frank Ocean', 'SZA']
        },
        {
          id: 3,
          title: 'Electronic',
          description: 'EDM and synthwave',
          image: '/about-images/electronic.jpg',
          items: ['Daft Punk', 'Calvin Harris', 'Skrillex']
        }
      ]
    },
    {
      id: 'sports',
      title: 'Sports',
      icon: '⚽',
      description: 'Teams that keep me on the edge of my seat',
      color: '#ff6b6b',
      items: [
        {
          id: 1,
          title: 'New York Knicks',
          description: 'NBA Basketball',
          image: '/Interests-Skills/Knicks.png',
          league: 'NBA',
          sport: 'Basketball'
        },
        {
          id: 2,
          title: 'New York Giants',
          description: 'NFL Football',
          image: '/Interests-Skills/Giants.png',
          league: 'NFL',
          sport: 'Football'
        },
        {
          id: 3,
          title: 'New York Yankees',
          description: 'MLB Baseball',
          image: '/Interests-Skills/Yankees.png',
          league: 'MLB',
          sport: 'Baseball'
        }
      ]
    },
    {
      id: 'shows',
      title: 'TV Shows',
      icon: '📺',
      description: 'Binge-worthy series that fuel my creativity',
      color: '#2ecc71',
      items: [
        {
          id: 1,
          title: 'Rick and Morty',
          description: 'Sci-fi animated comedy',
          image: '/Interests-Skills/Rick-and-Morty.png',
          genre: 'Animation/Sci-Fi',
          status: 'Ongoing'
        },
        {
          id: 2,
          title: 'Breaking Bad',
          description: 'Crime drama masterpiece',
          image: '/Interests-Skills/breaking-bad.png',
          genre: 'Crime/Drama',
          status: 'Completed'
        },
        {
          id: 3,
          title: 'The Office',
          description: 'Workplace comedy',
          image: '/Interests-Skills/the-office.png',
          genre: 'Comedy',
          status: 'Completed'
        }
      ]
    }
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveSection(activeSection === categoryId ? null : categoryId);
  };

  const renderCategoryItems = (category) => {
    return (
      <div className="category-items">
        <div className="items-grid">
          {category.items.map((item) => (
            <div key={item.id} className={`item-card ${category.id}-item`}>
              <div className="item-image">
                <img src={item.image} alt={item.title} />
                {category.id === 'music' && (
                  <div className="item-overlay">
                    <span className="play-icon">▶️</span>
                  </div>
                )}
                {category.id === 'sports' && item.league && (
                  <div className="league-badge">{item.league}</div>
                )}
                {category.id === 'shows' && item.status && (
                  <div className="status-badge">{item.status}</div>
                )}
              </div>
              <div className="item-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                {category.id === 'music' && (
                  <div className="artists">
                    {item.items.map((artist, index) => (
                      <span key={index} className="artist-tag">{artist}</span>
                    ))}
                  </div>
                )}
                {category.id === 'sports' && (
                  <span className="sport-tag" style={{ backgroundColor: category.color }}>
                    {item.sport}
                  </span>
                )}
                {category.id === 'shows' && (
                  <span className="genre-tag" style={{ backgroundColor: category.color }}>
                    {item.genre}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Me</h1>
        <p>Get to know my interests, passions, and what makes me tick</p>
      </div>

      <div className="interests-selector">
        {/* Sports Section - First */}
        <div className="interest-category">
          <div 
            className={`category-box ${activeSection === 'sports' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('sports')}
            style={{ '--category-color': '#ff6b6b' }}
          >
            <div className="category-icon">⚽</div>
            <h2>Sports</h2>
            <p>Teams that keep me on the edge of my seat</p>
            <div className="expand-indicator">
              {activeSection === 'sports' ? '▼' : '▶'}
            </div>
          </div>
          {activeSection === 'sports' && (
            <div className="category-content">
              {renderCategoryItems(interestCategories[1])}
            </div>
          )}
        </div>

        {/* TV Shows Section - Second */}
        <div className="interest-category">
          <div 
            className={`category-box ${activeSection === 'shows' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('shows')}
            style={{ '--category-color': '#2ecc71' }}
          >
            <div className="category-icon">📺</div>
            <h2>TV Shows</h2>
            <p>Binge-worthy series that fuel my creativity</p>
            <div className="expand-indicator">
              {activeSection === 'shows' ? '▼' : '▶'}
            </div>
          </div>
          {activeSection === 'shows' && (
            <div className="category-content">
              {renderCategoryItems(interestCategories[2])}
            </div>
          )}
        </div>

        {/* Music Section - Third */}
        <div className="interest-category">
          <div 
            className={`category-box ${activeSection === 'music' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('music')}
            style={{ '--category-color': '#1db954' }}
          >
            <div className="category-icon">🎵</div>
            <h2>Music</h2>
            <p>The soundtracks to my coding sessions</p>
            <div className="expand-indicator">
              {activeSection === 'music' ? '▼' : '▶'}
            </div>
          </div>
          {activeSection === 'music' && (
            <div className="category-content">
              {renderCategoryItems(interestCategories[0])}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
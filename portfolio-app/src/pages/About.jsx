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
          title: 'The Big Punisher(Capital Punishment)',
          description: 'Classic rap album',
          image: `${process.env.PUBLIC_URL}/Interests-Skills/Big-Punn.png`,
          "favorite-songs": ['Punish Me(feat Miss Jones)', 'Twinz(feat Fat Joe)', 'I\'m Not A Player']
        },
        {
          id: 2,
          title: 'Drake(Take Care)',
          description: 'Classic RnB and Hip-Hop',
          image: `${process.env.PUBLIC_URL}/Interests-Skills/Drake.png`,
          "favorite-songs": ['Look what you\'ve done', 'Headlines', 'HYDR(feat Lil Wayne)']
        },
        {
          id: 3,
          title: 'NBA YoungBoy',
          description: 'Rap ',
          image: `${process.env.PUBLIC_URL}/Interests-Skills/NBA-YoungBoy.png`,
          "favorite-songs": ['Right Foot Creep','All In', 'Off Season']
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
          image: `${process.env.PUBLIC_URL}/Interests-Skills/Knicks.png`,
          league: 'NBA',
          sport: 'Basketball'
        },
        {
          id: 2,
          title: 'New York Giants',
          description: 'NFL Football',
          image: `${process.env.PUBLIC_URL}/Interests-Skills/Giants.png`,
          league: 'NFL',
          sport: 'Football'
        },
        {
          id: 3,
          title: 'New York Yankees',
          description: 'MLB Baseball',
          image: `${process.env.PUBLIC_URL}/Interests-Skills/Yankees.png`,
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
          image: `${process.env.PUBLIC_URL}/Interests-Skills/Rick-and-Morty.png`,
          genre: 'Animation/Sci-Fi',
          status: 'Ongoing'
        },
        {
          id: 2,
          title: 'Breaking Bad',
          description: 'Crime drama masterpiece',
          image: `${process.env.PUBLIC_URL}/Interests-Skills/Breaking-Bad.png`,
          genre: 'Crime/Drama',
          status: 'Completed'
        },
        {
          id: 3,
          title: 'The Office',
          description: 'Workplace comedy',
          image: `${process.env.PUBLIC_URL}/Interests-Skills/The-Office.png`,
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
                  <div className="favorite-songs">
                    {item["favorite-songs"].map((song, index) => (
                      <span key={index} className="song-tag">{song}</span>
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
            <div className="category-icon">🏀</div>
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
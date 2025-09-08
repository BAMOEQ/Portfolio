import React from 'react';

function About() {
  return (
    <div className="about-container">
      <h2>About Me</h2>
      
      <section className="interests">
        <div className="interest-category">
          <h3>🎵 Music</h3>
          <p>Genres I love, favorite artists, maybe Spotify playlists</p>
        </div>
        
        <div className="interest-category">
          <h3>⚽ Sports</h3>
          <p>Teams I follow, sports I play</p>
        </div>
        
        <div className="interest-category">
          <h3>📺 Favorite Shows</h3>
          <p>Current binges, all-time favorites</p>
        </div>
      </section>
    </div>
  );
}

export default About;
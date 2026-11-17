import React from 'react';
import { Twitter, Linkedin, ExternalLink } from 'lucide-react';

const SpeakerCard = ({ speaker }) => {
  return (
    <div className="speaker-card">
      <div className="speaker-image-wrapper">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="speaker-img"
          loading="lazy"
        />
        <div className="speaker-overlay-socials">
          {speaker.social?.twitter && (
            <a 
              href={speaker.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="speaker-social-btn"
              aria-label={`${speaker.name} Twitter`}
            >
              <Twitter size={15} />
            </a>
          )}
          {speaker.social?.linkedin && (
            <a 
              href={speaker.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="speaker-social-btn"
              aria-label={`${speaker.name} LinkedIn`}
            >
              <Linkedin size={15} />
            </a>
          )}
        </div>
      </div>
      <div className="speaker-info">
        <h4 className="speaker-name">{speaker.name}</h4>
        <p className="speaker-role">{speaker.role}</p>
        <p className="speaker-company">{speaker.company}</p>
        {speaker.bio && (
          <p className="speaker-bio">{speaker.bio}</p>
        )}
      </div>
    </div>
  );
};

export default SpeakerCard;

import React from 'react'
import '../Styles/CulturalImages.css'
import intro from "../Assets/intro_vid.mp4"

function CulturalContent() {
  return (
    <div className="digital-story-telling">
      <div className="video-container">
        <video
          src={intro}
          autoPlay
          loop
          muted
        />
        <button className="overlay-btn">VIEW MORE CLIPS &gt;</button>
      </div>
    </div>
  )
}

export default CulturalContent;

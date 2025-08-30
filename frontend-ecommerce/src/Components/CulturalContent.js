import React from "react";
import "../Styles/CulturalContent.css";
import intro from "../Assets/intro_vid.mp4";
import { useNavigate } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
import image1 from "../Assets/image1.jpg";
import image2 from "../Assets/image2.jpg";
import image3 from "../Assets/image3.jpg";

function CulturalContent() {
  const navigate = useNavigate();

  const handleViewMoreVideos = () => {
    navigate("/cultural-videos");
  };

  const handleViewMoreImages = () => {
    navigate("/cultural-images");
  };

  return (
    
    <div className="digital-story-telling">
      {/* Introduction Video Section */}
      <div className="video-container">
        <video src={intro} autoPlay loop muted />
        <button className="overlay-btn" onClick={handleViewMoreVideos}>
          VIEW MORE CLIPS <LuChevronRight size={28} />
        </button>
      </div>

      {/* Featured Images Section */}
      <div className="image-container">
        <p>Featured Images</p>
        <div className="featured-grid">
          <div className="big-img">
            <img src={image1} alt="Featured 1" />
          </div>
          <div className="small-imgs">
            <img src={image2} alt="Featured 2" />
            <img src={image3} alt="Featured 3" />
          </div>
        </div>
        <div>
            <button className="more-images-btn" onClick={handleViewMoreImages}>
              VIEW MORE IMAGES <LuChevronRight size={28} />
            </button>
          </div>
      </div>
    </div>
  );
}

export default CulturalContent;

import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function MainFeaturedPost(props) {
  const { images } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div style={{  }}>
        <ul style={{ margin: 0 }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div style={{ width: '30px', color: 'white', border: '1px white solid',}}>
        {i + 1}
      </div>
    ),
  };

  return (
    
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} style={{ height: '600px' }}>
            <img 
              src={image.src} 
              alt={image.alt} 
              style={{ 
                width: '100%', 
                height: '600px', 
                objectFit: 'cover' 
              }} 
            />
          </div>
        ))}
      </Slider>
  
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right: '10px', zIndex: 2,}}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,  left: '10px', zIndex: 2 }}
      onClick={onClick}
    />
  );
}

MainFeaturedPost.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MainFeaturedPost;

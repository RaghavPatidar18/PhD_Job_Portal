import React from 'react';
import Slider from "react-slick";
import './css/DetailsContainer.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DetailsContainer2() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000 // set the time between each slide transition to 3 seconds (3000 milliseconds)
  };

  return (
    <>
      <div className='carousel-div'>
        <Slider {...settings}>
          <div>
            <img src='https://www.icas.com/__data/assets/image/0005/533993/varieties/banner-950px.jpg' alt='carousel image 1' />
          </div>
          <div>
            <img src='https://media.licdn.com/dms/image/D5612AQFG2bcxXPj_mg/article-cover_image-shrink_423_752/0/1664975241479?e=1684972800&v=beta&t=l9mwVup6LIzvpGRNHhBuBoN6pzAs_WHxAcK8O8jIlf4' alt='carousel image 2' />
          </div>
          <div>
            <img src='https://globisinsights.com/wp-content/uploads/2022/08/How-to-Find-Your-Dream-Job-scaled.jpg' alt='carousel image 3' />
          </div>
        </Slider>
      </div>
      <div className="details-container">
        <h3>Whether you're just starting your career or looking for your next challenge, we're here to help you find your dream job.</h3>
      </div>
      
    </>
  );
}

export default DetailsContainer2;
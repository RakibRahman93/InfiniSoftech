import React from "react";

const FormVideo = () => {
  return (
    <div className="col-lg-12 col-xl-12 d-flex align-items-center">
      <div className="w-100 wow fadeInLeft" data-wow-delay="0.7s">
        <div className="position-relativ">
          <iframe
            width="1200"
            height="500"
            src="https://www.youtube.com/embed/viFaDMFAlLo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-100"
          ></iframe>
          {/* Decorative Element */}
          <div
            className="decoration-5 d-none d-sm-block"
            data-rellax-y=""
            data-rellax-speed="-0.7"
            data-rellax-percentage="0.5"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FormVideo;

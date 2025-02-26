"use client";
import Form from "@/components/headers/components/Form";
import Popup from "@/components/headers/components/popup";
import { reviews } from "@/data/features";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ModalVideo from "react-modal-video";
export default function Hero1() {
  const [isOpen, setOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  return (
    <>
      {/* End Background Shape */}
      <div className="container position-relative d-flex align-items-center pt-140 pt-sm-120 ">
        {/* Home Section Content */}
        <div className="home-content text-start">
          <div className="row" style={{ justifyContent: "space-between" }}>
            {/* Home Section Text */}
            <div className="col-md-10 offset-md-1  offset-lg-1 col-xl-10 d-flex align-items-center mb-md-60 mb-sm-30">
              <div className="w-100 text-center">
                <h1 className="hs-title-10 mb-30">
                  <span
                    className="wow charsAnimIn fadeInUp"
                    data-splitting="chars"
                  >
                    <span style={{ fontWeight: "bold", color: "#333" }}>
                      Transforming Ideas Into{" "}
                      <span className="mark-decoration-3-wrap color-secondary-1-white">
                        Impactful
                        {/* <b
                        className=" mark-decoration-3 wow scalexIn"
                        data-wow-delay="1.1s"
                      /> */}
                      </span>{" "}
                    </span>{" "}
                    <span
                      className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white"
                      style={{
                        background:
                          "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold",
                      }}
                    >
                      Digital Solutions{" "}
                      {/* <Image
                        // style={{marginTop:"3.7rem"}}
                        src="/assets/images/demo-fancy/hero/3D Shape/Diamond Slim.svg"
                         width={80}
                        height={0}
                        alt="Image Description"
                       /> */}
                    </span>
                  </span>
                </h1>
                <p
                  style={{ justifySelf: "center" }}
                  className="col-lg-8 section-descr mb-40 wow fadeInUp"
                  data-wow-delay="0.6s"
                  data-wow-duration="1.2s"
                  data-wow-offset={0}
                >
                  Your trusted partner in creating professional websites, mobile
                  apps, and prototypes for a tech-driven world.
                </p>
                <div
                  className="local-scroll wow fadeInUp wch-unset"
                  data-wow-delay="0.7s"
                  data-wow-duration="1.2s"
                >
                  <Link
                    href={"/case-studies"}
                    className="btn btn-mod btn-color btn-border-c btn-white-c btn-large btn-round mb-xs-10 lightbox mfp-iframe"
                    data-btn-animate="y"
                    style={{
                      borderRadius: "50px",
                      // height: "2.7rem",
                      minWidth: "14rem",
                      background:
                        "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                      border: "none",
                      color: "white", // Ensures text remains visible
                      fontSize: "14px",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      cursor: "pointer",
                    }}
                  >
                    <span className="btn-animate-y">
                      <span className="btn-animate-y-1">
                        {/* <i
                          className="icon-play size-13 me-1"
                          aria-hidden="true"
                        ></i>{" "} */}
                        Case Studies
                      </span>
                      <span className="btn-animate-y-2" aria-hidden="true">
                        {/* <i
                          className="icon-play size-13 me-1"
                          aria-hidden="true"
                        ></i>{" "} */}
                        Case Studies
                      </span>
                    </span>
                  </Link>{" "}
                  <a
                    style={{
                      borderRadius: "50px",
                      padding: "14px 32px",
                      minHeight: "2.6rem",
                      minWidth: "14rem",
                      fontSize: "14px",
                      fontWeight: "bold",
                      // textTransform: "uppercase",
                      // background: "transparent",
                      border: "3px solid",
                      borderColor: "#D95B8B",
                      color: "#E75778", // Sets default text color
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() => setOpen(true)}
                    //href="https://infinisoftech.setmore.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-mod btn-border-c btn-large btn-round  me-1 mb-xs-10"
                  >
                    {/* <span>Contact Us</span> */}
                    <span className="btn-animate-y">
                      <span className="btn-animate-y-1">
                        <i
                          className="icon-play size-13 me-1"
                          aria-hidden="true"
                        ></i>{" "}
                        Watch Video
                      </span>
                      <span className="btn-animate-y-2" aria-hidden="true">
                        <i
                          className="icon-play size-13 me-1"
                          aria-hidden="true"
                        ></i>{" "}
                        Watch Video
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            {/* add reviews section start */}
            <div className="container text-center my-4">
              {/* Profile Images with Overlapping */}
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ position: "relative" }}
              >
                {reviews.map((user, index) => (
                  <div
                    key={user.id}
                    className="rounded-circle overflow-hidden position-relative"
                    style={{
                      width: 60,
                      height: 60,
                      border: "1px solid #D9D9D9",
                      marginRight: "-15px", // Overlap effect
                      // zIndex: reviews.length - index, // Stacking order
                      borderRadius: "50%",
                      backgroundColor: "#fff", // Ensures circular appearance
                    }}
                  >
                    <Image
                      src={user.img}
                      alt={user.name}
                      width={60}
                      height={60}
                      className="img-fluid rounded-circle"
                    />
                  </div>
                ))}
              </div>

              {/* Yellow Stars */}
              <div className="mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#FFD700", fontSize: "24px" }}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            {/* add reviews section end */}

            {/* <div className="col-lg-6 col-xl-6 d-flex align-items-center">
              <div className="w-100 wow fadeInLeft" data-wow-delay="0.7s">
                <div className="position-relative mt-40 mb-20">
                  <iframe
                    width="800"
                    height="500"
                    src="https://www.youtube.com/embed/viFaDMFAlLo"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-100"
                  ></iframe>
                  <div
                    className="decoration-5 d-none d-sm-block"
                    data-rellax-y=""
                    data-rellax-speed="-0.7"
                    data-rellax-percentage="0.5"
                  >
                  </div>
                </div>
              </div>
            </div> */}
            {/* Mobile images section */}
            <div
              className="mob-hide w-100 wow fadeInLeft"
              data-wow-delay="0.7s"
            >
              <div className="position-relative">
                <div className="row ">
                  <div className="col-md-12 col-sm-4 mb-xs-50 d-flex flex-wrap justify-content-center padding-top-lg">
                    <div className="pad-top-lg">
                      <Image
                        // style={{marginTop:"3.7rem"}}
                        src="/assets/images/demo-fancy/mobile2.png"
                        width={280}
                        height={358}
                        alt="Image Description"
                      />
                    </div>
                    <div className="">
                      <Image
                        src="/assets/images/demo-fancy/mobile1.png"
                        width={280}
                        height={358}
                        alt="Image Description"
                      />
                    </div>
                    <div className="pad-top-lg mt-xs-0 ">
                      <Image
                        src="/assets/images/demo-fancy/mobile3.png"
                        width={280}
                        height={358}
                        alt="Image Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="decoration-5 d-none d-sm-block"
                data-rellax-y=""
                data-rellax-speed="-0.7"
                data-rellax-percentage="0.5"
              ></div>
            </div>
            {/* End Image */}
            {/* Start of tech stack */}
            <div
              className="mob-hide w-100 wow fadeInLeft p-50"
              data-wow-delay="0.7s"
            >
              <div className="position-relative mt-20 ">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-sm-4 d-flex flex-wrap justify-content-space-between p-xs-50">
                    <div className="" style={{ alignContent: "center" }}>
                      <Image
                        style={{}}
                        src="/assets/images/demo-fancy/techstack/nextjs.png"
                        width={130}
                        height={180}
                        alt="Image Description"
                      />
                    </div>
                    <div className="" style={{ alignContent: "center" }}>
                      <Image
                        src="/assets/images/demo-fancy/techstack/reactjs.png"
                        width={80}
                        height={90}
                        alt="Image Description"
                      />
                    </div>
                    <div className="">
                      <Image
                        style={{}}
                        src="/assets/images/demo-fancy/techstack/node.png"
                        width={180}
                        height={180}
                        alt="Image Description"
                      />
                    </div>
                    <div className="" style={{ alignContent: "center" }}>
                      <Image
                        style={{}}
                        src="/assets/images/demo-fancy/techstack/wordpress.png"
                        width={70}
                        height={100}
                        alt="Image Description"
                      />
                    </div>
                    <div className="" style={{ alignContent: "center" }}>
                      <Image
                        style={{}}
                        src="/assets/images/demo-fancy/techstack/figma.png"
                        width={130}
                        height={150}
                        alt="Image Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="decoration-5 d-none d-sm-block"
                data-rellax-y=""
                data-rellax-speed="-0.7"
                data-rellax-percentage="0.5"
              ></div>
            </div>
            {/* End of tech stack */}
          </div>
        </div>
        {/* End Home Section Content */}
        {/* Scroll Down */}

        {/* End Scroll Down */}
      </div>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="viFaDMFAlLo"
        onClose={() => setOpen(false)}
      />
      {/* Popup */}
      <Popup isPopupVisible={isPopupVisible} onClose={togglePopup}>
        <Form togglePopup={togglePopup} />
      </Popup>
    </>
  );
}

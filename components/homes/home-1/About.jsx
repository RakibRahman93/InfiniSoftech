"use client";
import Image from "next/image";

export default function About() {
  return (
    <div className="row wow fadeInUp" data-wow-delay="0.5s">
      <div className="col-lg-6 mb-md-60">
        <div className="position-relative">
          {/* Image */}
          <div className="position-relative overflow-hidden">
            <Image
              width={660}
              height={539}
              src="/assets/images/demo-fancy/about-us.jpg"
              className="image-fullwidth relative"
              alt="Image Description"
            />
          </div>
          {/* End Image */}
          {/* Decorative Waves */}
          <div
            className="decoration-1 d-none d-sm-block"
            data-rellax-y=""
            data-rellax-speed={1}
            data-rellax-percentage="0.1"
          >
            <Image
              width="159"
              height="74"
              src="/assets/images/decoration-1.svg"
              className="svg-shape"
              alt=""
            />
          </div>
          {/* End Decorative Waves */}
        </div>
      </div>
      <div className="col-lg-6 col-xl-5 offset-xl-1">
        <h4 className="h5">Our Mission</h4>
        <p className="text-gray">
        Our mission at InfiniSoft Technology is to empower businesses by delivering innovative, reliable, and tailored digital solutions. We strive to turn visions into reality, creating impactful websites, mobile apps, and user experiences that drive growth and success.
        </p>
        <h4 className="h5">Our Vision</h4>
        <p className="text-gray">
        At InfiniSoft Technology, our vision is to enhance lives and businesses by delivering user-focused digital solutions that solve real-world challenges, drive innovation, and build lasting connections.
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | InfiniSoft",
  description: "Oops! The page you’re looking for isn’t here.",
};
export default function MainAboutPage1() {
  return (
    <section
      className="home-section bg-gradient-custom light-content d-flex align-items-center justify-content-center text-center"
      style={{
        background: "linear-gradient(135deg, #a253e6 0%, #ff70a6 100%)",
        minHeight: "100vh",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
      id="home"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="hs-wrap">
              <h1
                className="display-1 fw-bold text-white mb-4 wow fadeInUp"
                data-wow-delay=".1s"
              >
                404
              </h1>
              <h2
                className="h4 text-white mb-4 wow fadeInUp"
                data-wow-delay=".2s"
              >
                Oops! The page you're looking for doesn’t exist.
              </h2>
              <p className="text-light mb-4 wow fadeInUp" data-wow-delay=".25s">
                It might have been moved or deleted. Don’t worry, you can go
                back to the homepage.
              </p>
              <div className="wow fadeInUp" data-wow-delay=".3s">
                <Link
                  href={`/`}
                  className="btn btn-gradient-custom text-white px-4 py-2 rounded-pill"
                  style={{
                    background:
                      "linear-gradient(135deg, #a253e6 0%, #ff70a6 100%)",
                    border: "none",
                  }}
                >
                  <i className="mi-arrow-left size-20 align-middle me-2" />
                  Back To Home Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

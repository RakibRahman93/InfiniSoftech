import AnimatedText from "@/components/common/AnimatedText";
import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import FooterTop from "@/components/homes/home-6/FooterTop";
import { fancyMultipage } from "@/data/menu";
import { siteBlogCards } from "@/data/siteBlogCards";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "BLOG",
  description:
    "Thoughts, product insights, and practical growth advice from the InfiniSoft team.",
};

const topics = ["Strategy", "Design", "Growth"];

export default function FancyBlogPage() {
  return (
    <div className="theme-fancy">
      <div className="page" id="top">
        <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
          <Header6 links={fancyMultipage} />
        </nav>

        <main id="main">
          <section className="page-section bg-gradient-gray-light-1 bg-scroll overflow-hidden">
            <div className="bg-shape-1 wow fadeIn">
              <Image
                width={1443}
                height={844}
                src="/assets/images/demo-fancy/bg-shape-1.svg"
                alt=""
              />
            </div>

            <div className="container position-relative pt-10 pt-sm-40 text-center">
              <div className="row">
                <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                  <h1 className="hs-title-10 mb-10">
                    <span className="wow charsAnimIn" data-splitting="chars">
                      <AnimatedText text="Latest" />
                      <span className="mark-decoration-3-wrap">
                        <AnimatedText text="Insights" />
                        <b
                          className="mark-decoration-3 wow scalexIn"
                          data-wow-delay="0.5s"
                        ></b>
                      </span>
                    </span>
                  </h1>

                  <p
                    className="section-descr mb-0 wow fadeIn"
                    data-wow-delay="0.2s"
                  >
                    Ideas, lessons, and practical updates from the team building
                    digital products every day.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="page-section" id="blog">
            <div className="container position-relative">
              <div className="row mb-60 mb-sm-40">
                <div className="col-lg-8">
                  <h2 className="section-caption-fancy mb-20 mb-xs-10">
                    Fresh Articles
                  </h2>
                  <h3 className="section-title mb-0">
                    Explore the latest thinking from InfiniSoft.
                  </h3>
                </div>
              </div>

              <div className="row mt-n30">
                {siteBlogCards.map((post, index) => (
                  <article
                    key={post.id}
                    className="post-prev col-md-6 col-lg-4 mt-30 wow fadeInUp"
                    data-wow-delay={post.delay}
                  >
                    <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                      <div className={styles.card}>
                        <div className={styles.cardImageWrap}>
                          <Image
                            fill
                            sizes="(max-width: 991px) 100vw, 33vw"
                            src={post.imgSrc}
                            alt={post.imgAlt}
                            className={styles.cardImage}
                          />
                        </div>

                        <div className={styles.cardBody}>
                          <div className={styles.topMeta}>
                            <div className={styles.category}>
                              {topics[index % topics.length]}
                            </div>
                            <div className={styles.readTime}>{post.readTime}</div>
                          </div>

                          <div className={styles.contextTag}>{post.contextTag}</div>

                          <h4 className={styles.title}>{post.title}</h4>
                          <p className={styles.takeaway}>{post.takeaway}</p>
                          <p className={styles.text}>{post.text}</p>

                          <div className={styles.meta}>
                            <div className={styles.author}>
                              <Image
                                className={`${styles.authorImage} ${
                                  post.useLogoAvatar ? styles.authorLogo : ""
                                }`}
                                width={post.useLogoAvatar ? 60 : 40}
                                height={post.useLogoAvatar ? 60 : 40}
                                src={
                                  post.useLogoAvatar
                                    ? "/assets/images/logo.svg"
                                    : post.authorImgSrc
                                }
                                alt={
                                  post.useLogoAvatar
                                    ? "InfiniSoft Technology"
                                    : post.authorImgAlt
                                }
                              />
                              <span>{post.author}</span>
                            </div>
                            <div>
                              <span>{post.date}</span>
                            </div>
                          </div>

                          <div className={styles.bottomCue}>
                            <span className={styles.typeBadge}>{post.type}</span>
                            <span className={styles.readCue}>
                              Read article <i className="mi-arrow-right size-16" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="page-section pt-0">
            <div className="container position-relative">
              <div className="row text-center wow fadeInUp">
                <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                  <p className="section-descr mb-40 mb-sm-30">
                    Want updates tailored to your business goals? Let&apos;s talk
                    through your next website, app, or growth initiative.
                  </p>
                  <Link
                    href="/contact"
                    className="btn btn-mod btn-large btn-color btn-round btn-hover-anim"
                  >
                    <span>Book a free strategy call</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <FooterTop />
        <footer
          className="footer bg-dark-1 light-content py-5"
          style={{
            background: "linear-gradient(220deg, #621ABE 0%, #051D55 50%)",
          }}
        >
          <Footer6 />
        </footer>
      </div>
    </div>
  );
}

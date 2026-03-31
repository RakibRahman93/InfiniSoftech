import AnimatedText from "@/components/common/AnimatedText";
import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import FooterTop from "@/components/homes/home-6/FooterTop";
import { getBlogDetail, getNextBlogDetail } from "@/data/blogDetails";
import { fancyMultipage } from "@/data/menu";
import { siteBlogCards } from "@/data/siteBlogCards";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadingProgress from "./ReadingProgress";

export function generateStaticParams() {
  return siteBlogCards.map((post) => ({ id: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getBlogDetail(params.id);

  if (!post) {
    return {
      title: "Blog",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogDetailsPage({ params }) {
  const post = getBlogDetail(params.id);
  const nextPost = getNextBlogDetail(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="theme-fancy">
      <ReadingProgress />
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

            <div className="container position-relative pt-10 pt-sm-40">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <Link
                    href="/blog"
                    className={`link-hover-anim d-inline-flex align-items-center ${styles.backLink}`}
                    data-link-animate="y"
                  >
                    <i className="mi-arrow-left size-20 me-2" />
                    Back to blog
                  </Link>

                  <div className={`${styles.heroCard} wow fadeInUp`}>
                    <div className={styles.pill}>{post.category}</div>
                    <h1 className={styles.title}>
                      <AnimatedText text={post.title} />
                    </h1>
                    <p className={styles.intro}>{post.intro}</p>

                    <div className={styles.meta}>
                      <div className={styles.author}>
                        <Image
                          className={`${styles.authorImage} ${styles.authorLogo}`}
                          width={60}
                          height={60}
                          src={post.authorImage}
                          alt={post.author}
                        />
                        <div>
                          <div className={styles.authorName}>{post.author}</div>
                          <div className={styles.authorRole}>{post.authorRole}</div>
                        </div>
                      </div>
                      <div className={styles.metaSide}>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="page-section pt-0">
            <div className="container position-relative">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className={`${styles.imageWrap} wow fadeInUp`}>
                    <Image
                      width={1200}
                      height={760}
                      src={post.image}
                      alt={post.title}
                      className={styles.image}
                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <article className={`${styles.article} wow fadeInUp`}>
                    <p className={styles.lead}>{post.excerpt}</p>

                    {post.quote ? (
                      <blockquote className={styles.quote}>{post.quote}</blockquote>
                    ) : null}

                    <div className={styles.utilityRow}>
                      <nav className={styles.sectionNav} aria-label="Article sections">
                        {post.sections.map((section, index) => (
                          <a
                            key={section.heading}
                            href={`#section-${index + 1}`}
                            className={styles.sectionNavLink}
                          >
                            {section.heading}
                          </a>
                        ))}
                      </nav>

                      <div className={styles.takeaway}>
                        <span className={styles.takeawayLabel}>Key takeaway</span>
                        <p>
                          Strong websites do more than look polished. They reduce
                          friction, clarify value, and make the next step feel easy.
                        </p>
                      </div>
                    </div>

                    {post.sections.map((section, index) => (
                      <section
                        key={section.heading}
                        id={`section-${index + 1}`}
                        className={styles.section}
                      >
                        <h2>{section.heading}</h2>
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {section.bullets?.length ? (
                          <ul>
                            {section.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        ) : null}
                      </section>
                    ))}

                    <div className={styles.cta}>
                      <p>
                        Want a website or product experience that feels this
                        intentional?
                      </p>
                      <PopupWrapper
                        buttonText="Book A Free Strategy Call"
                        className={styles.ctaButtonWrap}
                        minWidth="0"
                        padding="14px 28px"
                      />
                    </div>

                    {nextPost ? (
                      <div className={styles.nextArticle}>
                        <span className={styles.nextArticleLabel}>
                          Continue reading
                        </span>
                        <h3>{nextPost.title}</h3>
                        <p>{nextPost.excerpt}</p>
                        <Link
                          href={`/blog/${nextPost.slug}`}
                          className="link-hover-anim"
                          data-link-animate="y"
                        >
                          Next article <i className="mi-arrow-right size-24" />
                        </Link>
                      </div>
                    ) : null}
                  </article>
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

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel, CarouselItem } from "@/components/Carousel";
import { FeedItem } from "@/components/FeedItem";
import { SEO } from "@/components/SEO";
import flowLinesVertical from "@/assets/flow-lines-vertical.svg";

// Featured content - Energy, Education, Policy
const featuredProjects = [
  {
    id: "1",
    title: "Campus Energy Automation",
    description:
      "AI-driven system to flag overconsumption across heating, grid power, and solar on college campuses. Combines metered hardware with localized logic.",
    date: "2025-03-15",
    tags: ["Energy", "AI", "Hardware Integration"],
    coverImage: flowLinesVertical,
    readingTime: 6,
    type: "project" as const,
  },
  {
    id: "2",
    title: "Academic Matchmaking Platform",
    description:
      "Decentralized platform connecting academic departments with aligned students for credit-based, hands-on project work.",
    date: "2025-02-10",
    tags: ["Education", "Platform", "Student-Powered"],
    readingTime: 5,
    type: "project" as const,
  },
  {
    id: "1",
    title: "Policy Strategy for University Innovation",
    description:
      "Advancing legislation in Pennsylvania to support decentralized, student-driven impact at universities.",
    date: "2025-04-01",
    tags: ["Policy", "Advocacy", "Higher Ed"],
    readingTime: 4,
    type: "journal" as const,
  },
];

const benefits = [
  {
    title: "Speed to Value",
    description: "From concept to working prototype in weeks, not months.",
  },
  {
    title: "Security First",
    description: "Privacy-by-design and compliance-ready practices built in.",
  },
  {
    title: "Tailored Solutions",
    description: "Co-built with stakeholders to fit real-world constraints.",
  },
  {
    title: "Scalable Architecture",
    description: "Built to expand seamlessly across teams and systems.",
  },
];

const sections = [
  {
    title: "Projects",
    description:
      "Energy systems, academic platforms, and compliance-first architectures built for local constraints.",
    path: "/projects",
  },
  {
    title: "Idea Dumps",
    description:
      "Raw concepts exploring decentralized solutions, policy frameworks, and student innovation.",
    path: "/idea-dumps",
  },
  {
    title: "Journal",
    description:
      "Reflections on bridging hardware, policy, and education through strategic systems work.",
    path: "/journal",
  },
  {
    title: "Resume",
    description:
      "Professional experience in energy, manufacturing, and education consulting.",
    path: "/resume",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Index = () => {
  return (
    <>
      <SEO />
      <div className="bg-background">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-title"
          className="container mx-auto max-w-6xl px-8 py-20 md:py-32 text-center"
        >
          <motion.div {...fadeInUp}>
            <h1
              id="hero-title"
              className="text-4xl md:text-6xl font-serif font-bold mb-6"
            >
              Build systems that work—faster, safer, smarter.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Designing secure, scalable solutions at the intersection of
              energy, education, and policy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition-opacity"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 font-medium hover:bg-muted transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section
          aria-labelledby="benefits-title"
          className="container mx-auto max-w-6xl px-8 py-16 border-t border-border"
        >
          <motion.div {...fadeInUp}>
            <h2
              id="benefits-title"
              className="text-2xl md:text-3xl font-serif font-bold mb-8"
            >
              Why this approach works
            </h2>
          </motion.div>
          <motion.ul
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {benefits.map((benefit) => (
              <motion.li
                key={benefit.title}
                variants={fadeInUp}
                className="rounded-lg border border-border p-6 hover:border-primary/20 hover:bg-muted/50 transition-all"
              >
                <h3 className="font-serif font-semibold text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        {/* Featured Content Carousel */}
        <section
          aria-labelledby="featured-title"
          className="container mx-auto px-8 py-16 max-w-6xl border-t border-border"
        >
          <h2
            id="featured-title"
            className="text-2xl md:text-3xl font-serif font-bold mb-8"
          >
            Featured Work
          </h2>
          <Carousel>
            {featuredProjects.map((item) => (
              <CarouselItem key={`${item.type}-${item.id}`}>
                <FeedItem
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  path={`/${item.type === "project" ? "projects" : "journal"}/${item.id}`}
                  tags={item.tags}
                  coverImage={item.coverImage}
                  readingTime={item.readingTime}
                />
              </CarouselItem>
            ))}
          </Carousel>
        </section>

        {/* Sections Grid */}
        <section
          aria-labelledby="explore-title"
          className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 max-w-6xl border-t border-border"
        >
          <h2 id="explore-title" className="sr-only">
            Explore sections
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {sections.map((section) => (
              <motion.div key={section.path} variants={fadeInUp}>
                <Link
                  to={section.path}
                  className="group relative block border border-border rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 hover:bg-muted/50 hover:border-primary/20 transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2 sm:mb-3 md:mb-4 group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3">
                    {section.description}
                  </p>
                  <div className="mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm uppercase tracking-widest font-medium text-primary opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    Explore
                    <span
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.section
          aria-labelledby="cta-title"
          className="container mx-auto max-w-6xl px-8 py-16 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 id="cta-title" className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Ready to collaborate?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Whether you have a project in mind or just want to connect, I'd love
            to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Get in Touch
          </Link>
        </motion.section>
      </div>
    </>
  );
};

export default Index;

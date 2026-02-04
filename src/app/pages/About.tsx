import React, { useEffect, useState } from "react";
import { Button, Typography, Row, Col, Flex, ConfigProvider, theme, Tag } from "antd";
import {
  FaFileAlt,
  FaCode,
  FaTools,
  FaCog,
  FaDatabase,
  FaQuoteLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { darkTheme, colors } from "../antd-theme";

const { Title, Text } = Typography;

// Motion components
const MotionDiv = motion.div;
const MotionSpan = motion.span;

// Tech stack data with logos
const techStacks = {
  languages: [
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "C/C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  ],
  frameworks: [
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Laravel", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/laravel.svg" },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
    { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
    { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  ],
  devops: [
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg" },
    { name: "GCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Xcode", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg" },
  ],
  libraries: [
    { name: "Matplotlib", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
    { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "Pygame", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "SwiftUI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
    { name: "Inertia", logo: "https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/inertia.svg" },
    { name: "p5.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/p5js/p5js-original.svg" },
  ],
};

// Continuous Streaming Logo Component
const LogoStream = ({
  items,
  direction = "left",
  speed = 60,
}: {
  items: any[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const tripleItems = [...items, ...items, ...items];
  const itemWidth = 90 + 24;
  const totalWidth = items.length * itemWidth;

  return (
    <div style={{ overflow: 'hidden', position: 'relative', height: '80px', width: '100%', padding: '10px 0' }}>
      <MotionDiv
        animate={{ x: direction === "left" ? [-totalWidth, 0] : [totalWidth, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          position: 'absolute',
          top: '10px',
          left: direction === "left" ? "0" : `-${totalWidth}px`,
          whiteSpace: 'nowrap',
          width: `${totalWidth * 3}px`
        }}
      >
        {tripleItems.map((item, index) => (
          <MotionDiv
            key={`${item.name}-${index}`}
            style={{ textAlign: 'center', minWidth: '90px', flex: 'none' }}
            whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 5px rgba(100, 255, 218, 0.6))" }}
            transition={{ duration: 0.2 }}
          >
            <img src={item.logo} alt={item.name} style={{ width: '35px', height: '35px', margin: '0 auto 8px' }} />
            <Text style={{ fontSize: '12px', color: '#a0aec0', fontWeight: 500 }}>{item.name}</Text>
          </MotionDiv>
        ))}
      </MotionDiv>
    </div>
  );
};

// Continuous Streaming Text Component
const TextStream = ({
  items,
  direction = "left",
  speed = 40,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const tripleItems = [...items, ...items, ...items];
  const itemWidth = 180 + 32;
  const totalWidth = items.length * itemWidth;

  return (
    <div style={{ overflow: 'hidden', position: 'relative', height: '60px', width: '100%' }}>
      <MotionDiv
        animate={{ x: direction === "left" ? [-totalWidth, 0] : [totalWidth, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          position: 'absolute',
          top: 0,
          left: direction === "left" ? "0" : `-${totalWidth}px`,
          whiteSpace: 'nowrap',
          width: `${totalWidth * 3}px`,
          overflow: 'visible'
        }}
      >
        {tripleItems.map((item, index) => (
          <MotionDiv
            key={`${item}-${index}`}
            style={{ textAlign: 'center', minWidth: '180px', flex: 'none' }}
            whileHover={{ scale: 1.05, textShadow: "0 0 20px rgba(100, 255, 218, 0.8)" }}
            transition={{ duration: 0.3 }}
          >
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #64ffda, #a259f7, #ff6b6b)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {item}
            </span>
          </MotionDiv>
        ))}
      </MotionDiv>
    </div>
  );
};

// Enhanced Bio Header
const BioHeader = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  const roleSkills = [
    "Entrepreneur", "Software Engineer", "Leader", "Full Stack",
    "Mobile Development", "Databases", "System Design", "Media Production",
  ];

  useEffect(() => {
    const emojiTimer = setTimeout(() => setShowEmoji(true), 1500);
    const taglineTimer = setTimeout(() => setShowTagline(true), 2500);
    return () => {
      clearTimeout(emojiTimer);
      clearTimeout(taglineTimer);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginBottom: 64, position: 'relative' }}>
      {/* Animated Background Particles */}
      <div style={{ position: 'absolute', top: '-50px', left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        {[...Array(15)].map((_, i) => (
          <MotionDiv
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: 'rgba(100, 255, 218, 0.3)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Main Greeting */}
      <Flex justify="flex-start" align="center" gap={16} wrap="wrap" style={{ marginBottom: 24 }}>
        <MotionDiv>
          {"Hi,".split("").map((letter, i) => (
            <MotionSpan
              key={i}
              style={{ fontSize: '3rem', fontWeight: 'bold', color: '#e2e8f0', display: 'inline-block' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              {letter}
            </MotionSpan>
          ))}
        </MotionDiv>

        <AnimatePresence>
          {showEmoji && (
            <MotionSpan
              style={{ fontSize: '2.5rem' }}
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: [0, 20, -10, 15, 0] }}
              transition={{ duration: 0.8, rotate: { duration: 1.5, repeat: Infinity, repeatDelay: 3 } }}
            >
              👋
            </MotionSpan>
          )}
        </AnimatePresence>

        <MotionDiv>
          {"I'm".split("").map((letter, i) => (
            <MotionSpan
              key={i}
              style={{ fontSize: '3rem', fontWeight: 'bold', color: '#e2e8f0', display: 'inline-block' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 3) * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              {letter}
            </MotionSpan>
          ))}
        </MotionDiv>

        <MotionDiv
          style={{ position: 'relative' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "backOut" }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <span style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #64ffda, #a259f7, #ff6b6b)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            lineHeight: 1,
            position: 'absolute',
            top: '-31px'
          }}>
            Javier
          </span>
        </MotionDiv>
      </Flex>

      <AnimatePresence>
        {showTagline && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ marginBottom: 16 }}
          >
            <TextStream items={roleSkills} direction="left" speed={20} />
          </MotionDiv>
        )}
      </AnimatePresence>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <Text style={{ fontSize: '1rem', color: '#718096', maxWidth: '600px', margin: '0 auto', display: 'block' }}>
          Building innovative digital solutions with purpose
        </Text>
      </MotionDiv>
    </div>
  );
};

const About = () => {
  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section id="about" style={{ padding: '64px 16px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <BioHeader />

          <Row gutter={48}>
            <Col xs={24} lg={12}>
              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Flex vertical gap={24}>
                  <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
                    <Text style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#a0aec0', display: 'block' }}>
                      Welcome to my page! I am an entrepreneur & software engineer
                      with expertise in building innovative digital solutions. I
                      combine technical skills with product development to create
                      solutions for real-world problems.
                    </Text>
                  </MotionDiv>

                  <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
                    <Text style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#a0aec0', display: 'block' }}>
                      With experience in both startups and established companies, I
                      have developed a keen eye for identifying opportunities and
                      turning them into successful ventures. My technical background
                      allows me to understand the complexities of development, while
                      my entrepreneurial mindset helps me see the bigger picture.
                    </Text>
                  </MotionDiv>

                  <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
                    <Text style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#a0aec0', display: 'block' }}>
                      I am constantly learning and exploring new technologies to
                      stay ahead of the curve. When I am not building and realising
                      ideas, you will find me playing floorball, traveling, or
                      trying something new and exciting.
                    </Text>
                  </MotionDiv>

                  <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}>
                    <Flex align="center" gap={16}>
                      <a href="/resume.pdf" target="_blank" style={{ textDecoration: 'none' }}>
                        <Button type="primary" size="large" style={{ backgroundColor: colors.cyan.primary, borderColor: colors.cyan.primary }}>
                          <FaFileAlt style={{ marginRight: 8 }} />
                          Resume
                        </Button>
                      </a>
                      <a href="/testimonials.pdf" target="_blank" style={{ textDecoration: 'none' }}>
                        <Button type="primary" size="large" style={{ backgroundColor: colors.teal.primary, borderColor: colors.teal.primary }}>
                          <FaQuoteLeft style={{ marginRight: 8 }} />
                          Testimonials
                        </Button>
                      </a>
                    </Flex>
                  </MotionDiv>
                </Flex>
              </MotionDiv>
            </Col>

            <Col xs={24} lg={12}>
              <MotionDiv
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  padding: 32,
                  borderRadius: 16,
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
                }}
              >
                <Flex vertical gap={32}>
                  {/* Languages */}
                  <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
                    <Flex align="center" gap={8} style={{ marginBottom: 16 }}>
                      <FaCode style={{ color: '#64ffda', fontSize: 24 }} />
                      <Title level={4} style={{ margin: 0, color: '#64ffda' }}>Languages</Title>
                    </Flex>
                    <LogoStream items={techStacks.languages} direction="left" speed={30} />
                  </MotionDiv>

                  {/* Frameworks */}
                  <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
                    <Flex align="center" gap={8} style={{ marginBottom: 16 }}>
                      <FaTools style={{ color: '#a259f7', fontSize: 24 }} />
                      <Title level={4} style={{ margin: 0, color: '#a259f7' }}>Frameworks</Title>
                    </Flex>
                    <LogoStream items={techStacks.frameworks} direction="right" speed={25} />
                  </MotionDiv>

                  {/* DevOps Tools */}
                  <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.8 }}>
                    <Flex align="center" gap={8} style={{ marginBottom: 16 }}>
                      <FaDatabase style={{ color: '#ff6b6b', fontSize: 24 }} />
                      <Title level={4} style={{ margin: 0, color: '#ff6b6b' }}>DevOps Tools</Title>
                    </Flex>
                    <LogoStream items={techStacks.devops} direction="left" speed={35} />
                  </MotionDiv>

                  {/* Libraries */}
                  <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
                    <Flex align="center" gap={8} style={{ marginBottom: 16 }}>
                      <FaCog style={{ color: '#ffd700', fontSize: 24 }} />
                      <Title level={4} style={{ margin: 0, color: '#ffd700' }}>Libraries</Title>
                    </Flex>
                    <LogoStream items={techStacks.libraries} direction="right" speed={28} />
                  </MotionDiv>
                </Flex>
              </MotionDiv>
            </Col>
          </Row>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default About;

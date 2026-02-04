import React from "react";
import { Typography, Flex, Tag, ConfigProvider, theme } from "antd";
import { FaExternalLinkAlt } from "react-icons/fa";
import { darkTheme } from "../antd-theme";

const { Title, Text, Link } = Typography;

const experiences = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "IBM",
    period: "Sep 2025 - Dec 2025",
    description:
      "IBM is a global technology and innovation company that offers a wide range of products and services, including cloud computing, artificial intelligence, and enterprise solutions. As a Full Stack Developer Intern at IBM, I am involved in developing and maintaining web applications, collaborating with cross-functional teams to design scalable solutions, and utilizing modern frameworks and technologies to enhance user experiences.",
    technologies: ["React", "Java", "Spring Boot", "AWS"],
    photoUrl: "/images/ibm.png",
    link: "https://www.ibm.com/",
    linktext: "Website",
  },
  {
    id: 2,
    title: "Full Stack Software Engineering Intern",
    company: "CloudJoi",
    period: "May 2025 - Aug 2025",
    description:
      "Under the NUS Overseas College Malaysia program, CloudJoi is the largest ticketing platform for performing arts in Malaysia dedicated to making shows accessible for all.",
    technologies: ["JavaScript", "PHP", "React", "Laravel"],
    photoUrl: "/images/cloudjoi-logo.png",
    link: "https://www.linkedin.com/company/cloudjoi/",
    linktext: "Linkedin",
  },
  {
    id: 3,
    title: "Teaching Assistant for CS1010X: Programming Methodology",
    company: "NUS School Of Computing",
    period: "Jan 2025 - Jun 2025",
    description:
      "Given sole responsibility of rebuilding lesson materials and assignment files. Updated deprecated content from Python 3.7 to 3.13, improving GUI and translating code from Cocos to Pygame, utilising GIMPS to rectify faulty sRGB profiles, removing problematic metadata. 2D Runes Contest Head IC.",
    technologies: ["Python", "Pygame", "Cocos", "GIMPS", "PIM"],
    photoUrl: "/images/soc-logo.png",
    link: "https://nusmods.com/courses/CS1010X/programming-methodology",
    linktext: "Module",
  },
  {
    id: 4,
    title:
      "Teaching Assistant for SWS3001: Solving Real World Problems with Computational Thinking",
    company: "NUS School Of Computing",
    period: "May 2024 - July 2024",
    description:
      "SWS3001 is a course under the NUS School of Computing Summer Workshop, an annual program designed for undergraduate students in fields like Computer Science. It is a project-based, hands-on course aimed at equipping participants with knowledge on how to solve problems computationally. Mentored a class of 20+ Y3 International students, conducted tutorials and graded projects and presentations.",
    technologies: ["Teaching", "Graphs", "Computational Intelligence"],
    photoUrl: "/images/soc-logo.png",
    link: "https://sws.comp.nus.edu.sg/Solving-with-CT.html",
    linktext: "Module",
  },
  {
    id: 5,
    title: "Software Engineering Intern",
    company: "Strive Math (YC S21)",
    period: "Jan 2024 - Jun 2024",
    description:
      "Worked with YC S21-backed, Forbes 30 Under 30 Asia 2024-recognised EdTech startup. Developed interactive simulations with p5.js illustrating Grade 8 math concepts for 10k students. Leveraged TinaCMS to integrate content management with modern development practices. Developed modular and reusable codebases for educational games, incorporating OOP, FP, event-driven programming, and real-time user interaction handling. Designed and executed structured Python programming workshops across multiple international schools",
    technologies: [
      "Python",
      "JavaScript",
      "p5",
      "Game Development",
      "Startup Development",
      "OOP",
      "CMS",
      "FP",
    ],
    photoUrl: "/images/strive-logo.png",
    link: "https://www.linkedin.com/company/strivemath",
    linktext: "LinkedIn",
  },
  {
    id: 7,
    title: "AI Researcher",
    company: "A*Star Institute for Infocomm Research",
    period: "Nov 2020 - Jan 2021",
    description:
      "Research attachment at Singapore's leading research organisation to enhance PCR result detection Extracted and analysed datasets via Matplotlib, NumPy, & pandas, and used EMA to determine sigmoidal curves from plot points and establish thresholds. Produced numerous algorithms with 100% detection accuracy, tested with evaluation datasets.",
    technologies: [
      "Python",
      "matplotlib",
      "numPy",
      "pandas",
      "Jupyter Notebook",
      "Artificial Intelligence Models",
    ],
    photoUrl: "/images/astar-logo.png",
    link: "https://docs.google.com/document/d/1U8SppCYAukq6ENivelJUjRhaeYUOyQ706bFg3vP2BOA/edit?usp=sharing",
    linktext: "Report",
  },
];

const Experience = () => {
  const cardBg = "rgba(255,255,255,0.1)";

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section id="experience" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 32px' }}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: 16 }}>
            Experience
          </Title>
          <Text style={{ fontSize: '1.125rem', textAlign: 'center', display: 'block', marginBottom: 48 }}>
            My Technical Roles
          </Text>

          <Flex vertical gap={32}>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  background: cardBg,
                  backdropFilter: 'blur(10px)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  flexDirection: 'row',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Flex
                  vertical
                  align="center"
                  justify="center"
                  style={{
                    padding: 24,
                    background: 'rgba(0,0,0,0.1)',
                    borderRight: '1px solid rgba(255,255,255,0.2)',
                    minWidth: 200,
                    textAlign: 'center'
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      marginBottom: 16,
                      borderRadius: '50%',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={exp.photoUrl}
                      alt={`${exp.company} logo`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <Title level={4} style={{ margin: 0 }}>{exp.company}</Title>
                  <Text style={{ color: '#a0aec0' }}>{exp.period}</Text>
                </Flex>

                <div style={{ padding: 24, flex: 1 }}>
                  <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
                    <Title level={4} style={{ margin: 0 }}>{exp.title}</Title>
                    {exp.link && (
                      <Link
                        href={exp.link}
                        target="_blank"
                        style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: 8 }}
                      >
                        {exp.linktext || "Visit"} <FaExternalLinkAlt />
                      </Link>
                    )}
                  </Flex>
                  <Text style={{ marginBottom: 16, display: 'block' }}>{exp.description}</Text>

                  <Flex gap={8} wrap="wrap">
                    {exp.technologies.map((tech) => (
                      <Tag key={tech} color="blue" style={{ borderRadius: 16, padding: '4px 12px' }}>
                        {tech}
                      </Tag>
                    ))}
                  </Flex>
                </div>
              </div>
            ))}
          </Flex>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Experience;

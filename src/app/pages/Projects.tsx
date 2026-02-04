import React from 'react';
import { Typography, Row, Col, Tag, Flex, ConfigProvider, theme } from 'antd';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';

const { Title, Text, Link } = Typography;

const lokodeDescription = "Scan the QR code to instantly lock yourself out of all your distracting apps, helping you focus. Unlock by scanning back, or let the timer run out.";

const projects = [
  {
    id: 1,
    title: "Lokode (iOS Scan to Focus App In Beta)",
    description: lokodeDescription,
    technologies: ["Swift", "TypeScript", "Next.js", "Supabase", "OAuth"],
    demoLink: "https://lokode.chimera.sg",
    githubLink: "#",
    image: "/images/lokode-banner.png"
  },
  {
    id: 2,
    title: "DrawMyRoute | GPS Art Generator",
    description: "AI-powered GPS Art Generator. Generate, preview, and export routes as GPX files for any shape, image, or prompt. Hackathon Winner.",
    technologies: ["TypeScript", "Next.js", "FastAPI", "OSRM", "Gemini"],
    demoLink: "https://drawmyroute.org",
    githubLink: "https://github.com/javierlimt6/drawmyroute",
    image: "/images/dmr-banner.png"
  },
  {
    id: 3,
    title: "CloudJoi Knowledgebase",
    description: "Collaborative project to transform internal knowledge into an AI-powered RAG chatbot.",
    technologies: ["TypeScript", "Next.js", "Laravel", "Pinecone", "AWS"],
    demoLink: "https://knowledgebase.cloudjoi.com",
    githubLink: "#",
    image: "/images/knowledgebase.png"
  },
  {
    id: 4,
    title: "2048 AI Solver",
    description: "An AI-powered solver for the popular 2048 game using expectimax algorithm.",
    technologies: ["Python", "Pygame", "AI/ML"],
    demoLink: "#",
    githubLink: "https://github.com/javierlimt6/2048-AI",
    image: "https://placehold.co/600x400/1f1f23/ffffff?text=2048+AI"
  },
  {
    id: 5,
    title: "Chimera",
    description: "A community platform for event organization and group activities.",
    technologies: ["React", "TypeScript", "Supabase", "Vercel"],
    demoLink: "chimeraapp.net",
    githubLink: "https://github.com/javierlimt6/chimera-gathering-grove",
    image: "/images/chimera-banner.png"
  },
  {
    id: 6,
    title: "HalloweenBot",
    description: "A fun Discord bot for Halloween-themed events and activities.",
    technologies: ["React", "Supabase", "TypeScript"],
    demoLink: "#",
    githubLink: "https://github.com/javierlimt6/chimera-gathering-grove",
    image: "/images/portfolio-banner.png"
  },
  {
    id: 8,
    title: "NYSecure | code4.ny",
    description: "Security-focused application developed for the code4.ny hackathon.",
    technologies: ["Python", "JavaScript", "Airtable", "Flask"],
    demoLink: "#",
    githubLink: "https://github.com/javierlimt6/NYSecure",
    image: "https://placehold.co/600x400/1f1f23/ffffff?text=NYSecure"
  },
];

const Projects = () => {
  const cardBg = "rgba(255,255,255,0.08)";
  const cardBorder = "rgba(255,255,255,0.12)";

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section id="projects" style={{ padding: '80px 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: 16 }}>
            🚀 Featured Projects
          </Title>
          <Text style={{ fontSize: '1.125rem', textAlign: 'center', display: 'block', marginBottom: 48, color: '#a0aec0' }}>
            A selection of my recent work and side projects
          </Text>

          <Row gutter={[24, 24]}>
            {projects.map((project) => (
              <Col xs={24} md={12} lg={8} key={project.id}>
                <div
                  style={{
                    background: cardBg,
                    backdropFilter: 'blur(20px)',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: `1px solid ${cardBorder}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Project Image */}
                  <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Project Content */}
                  <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Title level={4} style={{ marginBottom: 8 }}>{project.title}</Title>
                    <Text style={{ color: '#a0aec0', marginBottom: 16, flex: 1 }}>{project.description}</Text>

                    {/* Technologies */}
                    <Flex gap={8} wrap="wrap" style={{ marginBottom: 16 }}>
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Tag key={tech} color="purple" style={{ borderRadius: 12, fontSize: 11 }}>
                          {tech}
                        </Tag>
                      ))}
                    </Flex>

                    {/* Links */}
                    <Flex gap={16}>
                      {project.demoLink && project.demoLink !== "#" && (
                        <Link
                          href={project.demoLink}
                          target="_blank"
                          style={{ color: '#64ffda', display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          Live Demo <FaArrowRight size={12} />
                        </Link>
                      )}
                      {project.githubLink && project.githubLink !== "#" && (
                        <Link
                          href={project.githubLink}
                          target="_blank"
                          style={{ color: '#a0aec0', display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <FaGithub /> Code
                        </Link>
                      )}
                    </Flex>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Projects;
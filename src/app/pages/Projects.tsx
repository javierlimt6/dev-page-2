import React from 'react';
import { Typography, Row, Col, Tag, Flex, ConfigProvider, theme } from 'antd';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';
import siteData from '../../data/siteData.json';

const { Title, Text, Link } = Typography;

const projects = siteData.projects;

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
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: `1px solid ${cardBorder}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 188, 212, 0.15), 0 4px 12px rgba(0,0,0,0.3)';
                    e.currentTarget.style.borderColor = 'rgba(0, 188, 212, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = cardBorder;
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
                  <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                          See It <FaArrowRight size={12} />
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
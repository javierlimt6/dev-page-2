import React from "react";
import { Typography, Flex, Tag, ConfigProvider, theme } from "antd";
import { FaExternalLinkAlt } from "react-icons/fa";
import { darkTheme } from "../antd-theme";
import siteData from "../../data/siteData.json";

const { Title, Text, Link } = Typography;

const experiences = siteData.experience;

const Experience = () => {
  const cardBg = "rgba(255,255,255,0.08)";
  const cardBorder = "rgba(255,255,255,0.12)";

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

          <Flex vertical gap={24}>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  background: cardBg,
                  backdropFilter: 'blur(20px)',
                  borderRadius: 16,
                  border: `1px solid ${cardBorder}`,
                  padding: 24,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.15), 0 4px 12px rgba(0,0,0,0.3)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = cardBorder;
                }}
              >
                {/* Header: Logo + Company + Period + Link */}
                <Flex align="center" gap={16} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      overflow: 'hidden',
                      background: '#ffffff',
                      padding: 4,
                      flexShrink: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={exp.photoUrl}
                      alt={`${exp.company} logo`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <Flex vertical gap={2} style={{ flex: 1 }}>
                    <Flex justify="space-between" align="center">
                      <Title level={4} style={{ margin: 0, fontSize: 16 }}>{exp.company}</Title>
                      {exp.link && (
                        <Link
                          href={exp.link}
                          target="_blank"
                          style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, flexShrink: 0 }}
                        >
                          {exp.linktext || "Visit"} <FaExternalLinkAlt size={11} />
                        </Link>
                      )}
                    </Flex>
                    <Text style={{ color: '#a0aec0', fontSize: 13 }}>{exp.period}</Text>
                  </Flex>
                </Flex>

                {/* Title */}
                <Title level={5} style={{ margin: '0 0 8px 0', color: '#e2e8f0' }}>{exp.title}</Title>

                {/* Description */}
                <Text style={{ color: '#a0aec0', display: 'block', marginBottom: 16, lineHeight: 1.6, fontSize: 14 }}>
                  {exp.description}
                </Text>

                {/* Technologies */}
                <Flex gap={8} wrap="wrap">
                  {exp.technologies.map((tech) => (
                    <Tag key={tech} color="blue" style={{ borderRadius: 16, padding: '2px 10px', fontSize: 12 }}>
                      {tech}
                    </Tag>
                  ))}
                </Flex>
              </div>
            ))}
          </Flex>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Experience;

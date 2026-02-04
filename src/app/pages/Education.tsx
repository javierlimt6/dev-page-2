import React from 'react';
import { Typography, Row, Col, Tag, Flex, ConfigProvider, theme } from 'antd';
import { FaGraduationCap, FaCode, FaUsers, FaTrophy } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';

const { Title, Text } = Typography;

const educationDetails = [
  {
    id: "degree",
    title: "Bachelor of Computer Science",
    institution: "National University of Singapore",
    period: "2024 onwards",
    icon: FaGraduationCap,
    color: "#3b82f6",
    description: "Pursuing a comprehensive degree in Computer Science with focus on software engineering, algorithms, and system design."
  },
  {
    id: "coursework",
    title: "Core Coursework",
    items: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Database Systems",
      "Computer Organisation",
      "Artificial Intelligence",
      "Programming Methodology"
    ],
    icon: FaCode,
    color: "#22c55e"
  },
  {
    id: "activities",
    title: "Academic Activities",
    items: [
      "Notion Campus Leader",
      "2x NUS SoC Teaching Assistant for Computer Science Modules",
      "Software Engineering Lead @ RC4 CSC Tech",
      "Avid Hackathon Participant",
      "Winter School @ Korea University"
    ],
    icon: FaUsers,
    color: "#a855f7"
  },
  {
    id: "achievements",
    title: "Academic Achievements",
    items: [
      "Recipient of Kwan Im Thong Hood Cho Temple Scholarship Award",
      "First Class Honours",
      "Testimonials from >5 NUS Professors"
    ],
    icon: FaTrophy,
    color: "#f97316"
  }
];

const Education = () => {
  const cardBg = "rgba(255, 255, 255, 0.08)";
  const cardBorder = "rgba(255, 255, 255, 0.12)";

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section id="education" style={{ padding: '64px 16px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Flex vertical gap={32}>
            {/* Header */}
            <Flex vertical align="center" gap={16}>
              <Title level={2} style={{ 
                background: 'linear-gradient(to right, #3b82f6, #a855f7)', 
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                🎓 Education
              </Title>
              <Text style={{ fontSize: '1.125rem', color: '#a0aec0', maxWidth: 600, textAlign: 'center' }}>
                My academic journey at one of Asia&apos;s leading universities
              </Text>
            </Flex>

            {/* Main Education Card */}
            <div
              style={{
                background: cardBg,
                backdropFilter: 'blur(20px)',
                padding: 32,
                borderRadius: 12,
                border: `1px solid ${cardBorder}`,
                transition: 'all 0.3s ease',
              }}
            >
              <Flex vertical gap={24}>
                <Flex align="center" gap={16}>
                  <FaGraduationCap style={{ color: '#3b82f6', fontSize: 40 }} />
                  <Flex vertical gap={4}>
                    <Title level={3} style={{ margin: 0, color: '#3b82f6' }}>
                      Bachelor of Computer Science
                    </Title>
                    <Text style={{ fontSize: '1.125rem', color: '#a0aec0', fontWeight: 600 }}>
                      National University of Singapore
                    </Text>
                    <Tag color="blue">Since 2024</Tag>
                  </Flex>
                </Flex>
                
                <Text style={{ color: '#a0aec0', textAlign: 'center', lineHeight: 1.6 }}>
                  Pursuing a comprehensive degree in Computer Science with focus on software engineering, 
                  algorithms, and system design.
                </Text>
              </Flex>
            </div>

            {/* Education Details Grid */}
            <Row gutter={[24, 24]}>
              {educationDetails.slice(1).map((detail) => {
                const IconComponent = detail.icon;
                return (
                  <Col xs={24} md={12} lg={8} key={detail.id}>
                    <div
                      style={{
                        background: cardBg,
                        backdropFilter: 'blur(20px)',
                        padding: 24,
                        borderRadius: 12,
                        border: `1px solid ${cardBorder}`,
                        height: '100%',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Flex vertical gap={16}>
                        <Flex align="center" gap={12}>
                          <IconComponent style={{ color: detail.color, fontSize: 24 }} />
                          <Title level={4} style={{ margin: 0, color: detail.color }}>
                            {detail.title}
                          </Title>
                        </Flex>
                        
                        <Flex vertical gap={8}>
                          {detail.items?.map((item, index) => (
                            <Text key={index} style={{ color: '#a0aec0', fontSize: 14, lineHeight: 1.5 }}>
                              • {item}
                            </Text>
                          ))}
                        </Flex>
                      </Flex>
                    </div>
                  </Col>
                );
              })}
            </Row>

            {/* NUS Highlight */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                backdropFilter: 'blur(20px)',
                padding: 24,
                borderRadius: 12,
                border: `1px solid ${cardBorder}`,
                textAlign: 'center',
              }}
            >
              <Flex vertical gap={12}>
                <Title level={3} style={{ margin: 0, color: 'white' }}>
                  Why NUS?
                </Title>
                <Text style={{ color: '#a0aec0', lineHeight: 1.6 }}>
                  Ranked #1 in Asia and #8 globally on the QS Rankings, NUS provides world-class education, 
                  cutting-edge research opportunities, and a vibrant tech ecosystem in Singapore.
                </Text>
              </Flex>
            </div>
          </Flex>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Education;
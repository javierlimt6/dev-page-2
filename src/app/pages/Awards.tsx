import React from 'react';
import { Typography, Row, Col, Flex, ConfigProvider, theme } from 'antd';
import { FaAward } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';

const { Title, Text } = Typography;

const awards = [
  {
    id: 1,
    title: "Hackathon Enthusiast",
    subtitle: "Various Hackathons & Competitions",
    description: "Hack & Roll 2025, Hack 4 Good 2024, SAFMC 2021: Finalist Team, Cyberthon 2021: Commendation Award (9th Team Placing)"
  },
  {
    id: 2,
    title: "Serial Olympiad Medallist",
    subtitle: "Participating since 2016",
    description: "International Olympiads: IJMO 2018 (Bronze) SIMOC 2017 (Bronze, Rank 26) National Olympiads: 2x Distinctions, 2x Silver, 1x Bronze, 1x Credit"
  }
];

const Awards = () => {
  const cardBg = "rgba(255,255,255,0.1)";

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section 
        id="awards" 
        style={{ 
          padding: '80px 0', 
          position: 'relative',
          background: 'linear-gradient(to right, #1e3a5f, #3b1a5a)'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(9, 9, 9, 0.3)',
            backdropFilter: 'blur(10px)'
          }}
        />
        
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 32px' }}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: 16, color: 'white' }}>Activities</Title>
          <Text style={{ fontSize: '1.125rem', textAlign: 'center', display: 'block', marginBottom: 48, color: '#a0aec0' }}>My Extracurriculars</Text>
          
          <Row gutter={[32, 32]}>
            {awards.map((award) => (
              <Col xs={24} md={12} key={award.id}>
                <Flex 
                  align="flex-start"
                  gap={16}
                  style={{
                    background: cardBg,
                    padding: 24,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.2)',
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
                  <FaAward style={{ color: '#3b82f6', fontSize: 32, flexShrink: 0 }} />
                  <Flex vertical gap={4}>
                    <Title level={4} style={{ margin: 0, color: 'white' }}>{award.title}</Title>
                    <Text style={{ fontSize: 14, color: '#718096' }}>{award.subtitle}</Text>
                    <Text style={{ color: '#a0aec0' }}>{award.description}</Text>
                  </Flex>
                </Flex>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Awards;
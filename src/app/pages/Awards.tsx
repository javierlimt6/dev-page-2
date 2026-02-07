import React from 'react';
import { Typography, Row, Col, Flex, ConfigProvider, theme } from 'antd';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';

const { Title, Text } = Typography;

const awards = [
  {
    id: 1,
    icon: FaTrophy,
    accentColor: '#00bcd4',
    accentGlow: 'rgba(0, 188, 212, 0.15)',
    title: "Hackathon Enthusiast",
    subtitle: "Various Hackathons & Competitions",
    achievements: [
      "Hack & Roll 2025",
      "Hack 4 Good 2024",
      "SAFMC 2021 — Finalist Team",
      "Cyberthon 2021 — Commendation Award (9th)",
    ]
  },
  {
    id: 2,
    icon: FaMedal,
    accentColor: '#a259f7',
    accentGlow: 'rgba(162, 89, 247, 0.15)',
    title: "Serial Olympiad Medallist",
    subtitle: "Participating since 2016",
    achievements: [
      "IJMO 2018 — Bronze Medal",
      "SIMOC 2017 — Bronze Medal (Rank 26)",
      "National Olympiads — 2× Distinction",
      "National Olympiads — 2× Silver",
      "National Olympiads — 1× Bronze, 1× Credit",
    ]
  }
];

const Awards = () => {
  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section 
        id="awards" 
        style={{ 
          padding: '48px 0', 
          position: 'relative',
          background: 'linear-gradient(135deg, #1e3a5f, #3b1a5a)',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
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
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 32px', width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 4, color: 'white' }}>Activities</Title>
          <Text style={{ fontSize: '1rem', textAlign: 'center', display: 'block', marginBottom: 40, color: '#a0aec0' }}>My Extracurriculars</Text>
          
          <Row gutter={[24, 24]}>
            {awards.map((award) => {
              const IconComponent = award.icon;
              return (
                <Col xs={24} md={12} key={award.id}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      padding: 28,
                      borderRadius: 16,
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                      cursor: 'default',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = `0 12px 40px ${award.accentGlow}, 0 4px 12px rgba(0,0,0,0.3)`;
                      e.currentTarget.style.borderColor = `${award.accentColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    {/* Icon */}
                    <div style={{ 
                      marginBottom: 20,
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: award.accentGlow,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <IconComponent style={{ color: award.accentColor, fontSize: 28 }} />
                    </div>
                    
                    {/* Title & subtitle */}
                    <Title level={4} style={{ margin: 0, marginBottom: 2, color: 'white', fontSize: 18 }}>
                      {award.title}
                    </Title>
                    <Text style={{ fontSize: 13, color: award.accentColor, marginBottom: 16, display: 'block' }}>
                      {award.subtitle}
                    </Text>
                    
                    {/* Achievement bullets */}
                    <Flex vertical gap={8} style={{ flex: 1 }}>
                      {award.achievements.map((item, i) => (
                        <Flex key={i} align="flex-start" gap={10}>
                          <span style={{ 
                            color: award.accentColor, 
                            fontSize: 8, 
                            marginTop: 6,
                            flexShrink: 0,
                          }}>●</span>
                          <Text style={{ color: '#c8d0db', fontSize: 14, lineHeight: '1.5' }}>
                            {item}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Awards;
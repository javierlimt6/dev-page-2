import React from 'react';
import { Typography, Row, Col, ConfigProvider, theme } from 'antd';
import Image from 'next/image';
import { darkTheme } from '../antd-theme';

const { Title, Text } = Typography;

const lifeCategories = [
  {
    id: "floorball",
    title: "Floorball",
    description: "I play floorball, and have been participating in local leagues and tournaments since 2020.",
    image: "/images/flb.jpg"
  },
  {
    id: "travel",
    title: "Travelling",
    description: "An avid traveler! Visited over 20 countries, spent 6 months in the past 2 years overseas, always seeking new cultures and experiences",
    image: "/images/travel.png"
  },
  {
    id: "new-stuff",
    title: "Trying New Things",
    description: "Constantly exploring new hobbies, skills, and experiences to broaden my horizons and perspective!",
    image: "/images/guitar.png"
  }
];

const Life = () => {
  const cardBg = "rgba(255,255,255,0.1)";

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section id="life" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>Personal Life</Title>
          <Text style={{ fontSize: '1.125rem', textAlign: 'center', display: 'block', marginBottom: 48 }}>i attempt touching grass</Text>
          
          <Row gutter={[32, 32]}>
            {lifeCategories.map((category) => (
              <Col xs={24} md={8} key={category.id}>
                <div 
                  style={{
                    background: cardBg,
                    backdropFilter: 'blur(10px)',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    height: '100%'
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
                  <div style={{ height: 224, overflow: 'hidden', position: 'relative' }}>
                    <Image 
                      src={category.image} 
                      alt={category.title} 
                      fill
                      style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                    />
                  </div>
                  
                  <div style={{ padding: 24 }}>
                    <Title level={4} style={{ marginBottom: 12, color: 'white' }}>{category.title}</Title>
                    <Text style={{ color: '#a0aec0' }}>{category.description}</Text>
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

export default Life;
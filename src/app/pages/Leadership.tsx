import React from 'react';
import { Typography, Row, Col, Flex, ConfigProvider, theme } from 'antd';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';
import siteData from '../../data/siteData.json';
import { iconMap } from '../../data/iconMap';

const { Title, Text, Link } = Typography;

const leadershipItems = siteData.activities.map((item) => ({
  ...item,
  icon: iconMap[item.iconName] || iconMap.FaCode,
}));

const Leadership = () => {
  const cardBg = "rgba(255,255,255,0.1)";

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section id="leadership" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: 16 }}>Activities</Title>
          <Text style={{ fontSize: '1.125rem', textAlign: 'center', display: 'block', marginBottom: 48 }}>Putting my skills to impact the world</Text>
          
          <Row gutter={[32, 32]}>
            {leadershipItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Col xs={24} md={12} key={item.id}>
                  <div 
                    style={{
                      background: cardBg,
                      backdropFilter: 'blur(10px)',
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.2)',
                      padding: 24,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      height: '100%',
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
                    <Flex align="flex-start" gap={16}>
                      <Flex 
                        align="center" 
                        justify="center"
                        style={{ 
                          background: '#3b82f6', 
                          padding: 12, 
                          borderRadius: 8, 
                          color: 'white',
                          flexShrink: 0
                        }}
                      >
                        <IconComponent size={32} />
                      </Flex>
                      <div style={{ flex: 1 }}>
                        <Flex justify="space-between" align="flex-start" style={{ marginBottom: 8 }}>
                          <Title level={4} style={{ margin: 0 }}>{item.title}</Title>
                          {item.link && (
                            <Link 
                              href={item.link} 
                              target="_blank"
                              style={{ 
                                color: '#3b82f6', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 4,
                                fontSize: 14 
                              }}
                            >
                              {item.linktext || "Visit"} <FaExternalLinkAlt />
                            </Link>
                          )}
                        </Flex>
                        <Text style={{ color: '#a0aec0' }}>{item.description}</Text>
                      </div>
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

export default Leadership;
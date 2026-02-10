import React from 'react';
import { Typography, Row, Col, Flex, ConfigProvider, theme } from 'antd';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';
import siteData from '../../data/siteData.json';
import { iconMap } from '../../data/iconMap';

const { Title, Text, Link } = Typography;

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  link?: string;
  linktext?: string;
};

const categories = [
  { key: 'leadership' as const, label: 'Leadership', color: '#3b82f6', accentGlow: 'rgba(59, 130, 246, 0.15)' },
  { key: 'competitions' as const, label: 'Competitions', color: '#f59e0b', accentGlow: 'rgba(245, 158, 11, 0.15)' },
  { key: 'others' as const, label: 'Others', color: '#8b5cf6', accentGlow: 'rgba(139, 92, 246, 0.15)' },
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
          
          {categories.map((cat) => {
            const items = (siteData.activities[cat.key] as ActivityItem[]).map((item) => ({
              ...item,
              icon: iconMap[item.iconName] || iconMap.FaCode,
            }));

            return (
              <div key={cat.key} style={{ marginBottom: 32 }}>
                <Flex align="center" gap={10} style={{ marginBottom: 16 }}>
                  <div style={{ 
                    width: 3, 
                    height: 20, 
                    borderRadius: 2, 
                    background: cat.color 
                  }} />
                  <Title level={4} style={{ margin: 0, color: cat.color, fontSize: 16 }}>{cat.label}</Title>
                </Flex>
                
                <Row gutter={[16, 16]}>
                  {items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Col xs={24} md={12} key={item.id}>
                        <div
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            padding: 20,
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                            cursor: 'default',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = `0 8px 30px ${cat.accentGlow}`;
                            e.currentTarget.style.borderColor = `${cat.color}40`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                          }}
                        >
                          <Flex align="flex-start" gap={14}>
                            <div style={{ 
                              width: 44,
                              height: 44,
                              borderRadius: 10,
                              background: cat.accentGlow,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}>
                              <IconComponent style={{ color: cat.color, fontSize: 22 }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <Flex justify="space-between" align="flex-start" gap={8}>
                                <Title level={5} style={{ margin: 0, marginBottom: 4, color: 'white', fontSize: 15 }}>
                                  {item.title}
                                </Title>
                                {item.link && (
                                  <Link 
                                    href={item.link} 
                                    target="_blank"
                                    style={{ color: cat.color, fontSize: 12, flexShrink: 0 }}
                                  >
                                    <FaExternalLinkAlt />
                                  </Link>
                                )}
                              </Flex>
                              <Text style={{ color: '#c8d0db', fontSize: 13, lineHeight: '1.5' }}>
                                {item.description}
                              </Text>
                            </div>
                          </Flex>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            );
          })}
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Awards;
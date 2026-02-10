import React from 'react';
import { Typography, Row, Col, Tag, Flex, ConfigProvider, theme } from 'antd';
import { FaGraduationCap, FaGlobe } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';
import Image from 'next/image';
import siteData from '../../data/siteData.json';
import { iconMap } from '../../data/iconMap';

const { Title, Text } = Typography;

const { main: nusData, details: detailCards, otherInstitutions: otherUniversities } = siteData.education;

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
            </Flex>

            {/* Main NUS Card */}
            <div
              style={{
                background: cardBg,
                backdropFilter: 'blur(20px)',
                padding: 32,
                borderRadius: 16,
                border: `1px solid ${cardBorder}`,
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
              <Flex vertical gap={20}>
                <Flex align="center" gap={16}>
                  <Image
                    src={nusData.logo}
                    alt={nusData.university}
                    width={56}
                    height={56}
                    style={{ borderRadius: 8, objectFit: 'contain' }}
                  />
                  <Flex vertical gap={4}>
                    <Title level={3} style={{ margin: 0, color: '#3b82f6' }}>
                      {nusData.degree}
                    </Title>
                    <Text style={{ fontSize: '1.125rem', color: '#a0aec0', fontWeight: 600 }}>
                      {nusData.university}
                    </Text>
                    <Tag color="blue" style={{ width: 'fit-content' }}>{nusData.period}</Tag>
                  </Flex>
                </Flex>
                
                <Text style={{ color: '#a0aec0', lineHeight: 1.6 }}>
                  {nusData.description}
                </Text>
              </Flex>
            </div>

            {/* Education Details Grid */}
            <Row gutter={[24, 24]}>
              {detailCards.map((detail) => {
                const IconComponent = iconMap[detail.iconName] || iconMap.FaCode;
                return (
                  <Col xs={24} md={12} key={detail.id}>
                    <div
                      style={{
                        background: cardBg,
                        backdropFilter: 'blur(20px)',
                        padding: 28,
                        borderRadius: 16,
                        border: `1px solid ${cardBorder}`,
                        height: '100%',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = `0 12px 40px ${detail.color}20, 0 4px 12px rgba(0,0,0,0.3)`;
                        e.currentTarget.style.borderColor = `${detail.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = cardBorder;
                      }}
                    >
                      <Flex vertical gap={16}>
                        <Flex align="center" gap={14}>
                          <div style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: `${detail.color}18`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}>
                            <IconComponent style={{ color: detail.color, fontSize: 20 }} />
                          </div>
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

            {/* Other Universities */}
            <Flex vertical gap={8}>
              <Flex align="center" gap={8} style={{ marginBottom: 8 }}>
                <FaGlobe style={{ color: '#64ffda', fontSize: 18 }} />
                <Title level={4} style={{ margin: 0, color: '#64ffda' }}>
                  Other Education
                </Title>
              </Flex>
              <Row gutter={[24, 24]}>
                {otherUniversities.map((uni) => (
                  <Col xs={24} md={12} key={uni.id}>
                    <div
                      style={{
                        background: cardBg,
                        backdropFilter: 'blur(20px)',
                        padding: 24,
                        borderRadius: 16,
                        border: `1px solid ${cardBorder}`,
                        height: '100%',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = `0 12px 40px ${uni.color}20, 0 4px 12px rgba(0,0,0,0.3)`;
                        e.currentTarget.style.borderColor = `${uni.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = cardBorder;
                      }}
                    >
                      <Flex align="flex-start" gap={16}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={uni.logo}
                          alt={uni.name}
                          style={{ 
                            width: 48, 
                            height: 48, 
                            borderRadius: 8, 
                            objectFit: 'contain',
                            flexShrink: 0,
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            padding: 4
                          }}
                        />
                        <Flex vertical gap={4}>
                          <Title level={5} style={{ margin: 0, color: 'white' }}>
                            {uni.name}
                          </Title>
                          <Text style={{ color: uni.color, fontSize: 13, fontWeight: 500, whiteSpace: 'pre-line' }}>
                            {uni.program}
                          </Text>
                          <Tag style={{ width: 'fit-content', fontSize: 11 }}>{uni.period}</Tag>
                          <Text style={{ color: '#a0aec0', fontSize: 13, marginTop: 4 }}>
                            {uni.description}
                          </Text>
                        </Flex>
                      </Flex>
                    </div>
                  </Col>
                ))}
              </Row>
            </Flex>
          </Flex>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Education;
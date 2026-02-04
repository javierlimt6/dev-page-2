import React from 'react';
import { Typography, Row, Col, Flex, ConfigProvider, theme } from 'antd';
import { darkTheme, colors } from '../antd-theme';

const { Title, Text, Link } = Typography;

const Startup = () => {
  const cardBg = "rgba(255, 255, 255, 0.08)";
  const cardBorder = "rgba(255, 255, 255, 0.12)";
  const textSecondary = "#a0aec0";
  const textMuted = "#718096";

  const cardStyle = {
    background: cardBg,
    backdropFilter: 'blur(20px)',
    padding: '32px',
    borderRadius: 16,
    border: `1px solid ${cardBorder}`,
    transition: 'all 0.3s ease',
  };

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section id="startup" style={{ padding: '64px 16px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Flex vertical gap={32}>
            {/* Header */}
            <Flex vertical gap={16} style={{ textAlign: 'center' }}>
              <Title level={1} style={{ color: textSecondary, margin: 0 }}>
                🐉 Chimera: work in progress
              </Title>
              <Text style={{ fontSize: '1.125rem', color: textSecondary, fontStyle: 'italic', maxWidth: 900, margin: '0 auto' }}>
                Empowering the next generation to take charge of their digital lives, Chimera is on a mission to transform how young people engage with technology—moving them from passive consumers to confident creators and leaders.
              </Text>
            </Flex>

            {/* Mission Section */}
            <div style={cardStyle}>
              <Flex vertical gap={16}>
                <Title level={3} style={{ color: '#3b82f6', margin: 0 }}>
                  Our Mission
                </Title>
                <Text style={{ fontSize: '1rem', lineHeight: 1.7, color: textSecondary }}>
                  <strong>Democratizing access to meaningful digital routines and entrepreneurial tools for youth.</strong>{' '}
                  We believe every young person deserves the power to shape their digital habits and launch their ideas into the world.
                </Text>
              </Flex>
            </div>

            {/* Where We Are Now */}
            <Flex vertical gap={24}>
              <Flex vertical gap={12} style={{ textAlign: 'center' }}>
                <Title level={2} style={{ color: '#f97316', margin: 0 }}>
                  Where We Are Now
                </Title>
                <Text style={{ color: textMuted }}>
                  We are actively developing and refining two flagship platforms, each designed to address a critical aspect of youth digital empowerment:
                </Text>
              </Flex>

              <Row gutter={[32, 32]}>
                {/* Lokode Card */}
                <Col xs={24} md={12}>
                  <div style={{ ...cardStyle, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Flex vertical gap={16} style={{ height: '100%' }}>
                      <Flex vertical gap={4}>
                        <Title level={3} style={{ color: colors.cyan.light, margin: 0 }}>
                          Lokode
                        </Title>
                        <Text style={{ color: textMuted, fontStyle: 'italic' }}>
                          Redefining Digital Focus for Students and Young Professionals
                        </Text>
                      </Flex>
                      
                      <Text style={{ fontSize: 14, lineHeight: 1.6, color: textSecondary }}>
                        Lokode is a transformative app-locking solution that empowers users to take control of their digital habits—no NFC hardware required. By scanning a QR code in shared spaces like libraries or classrooms, users can instantly lock distracting apps on their phones, fostering accountability and focus in a community-driven way.
                      </Text>

                      <Link 
                        href="https://lokode.chimera.sg" 
                        target="_blank"
                        style={{ color: colors.cyan.light, fontWeight: 'bold', fontSize: 14, marginTop: 'auto' }}
                      >
                        Learn more about Lokode →
                      </Link>
                    </Flex>
                  </div>
                </Col>

                {/* BlazeUp Card */}
                <Col xs={24} md={12}>
                  <div style={{ ...cardStyle, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Flex vertical gap={16} style={{ height: '100%' }}>
                      <Flex vertical gap={4}>
                        <Title level={3} style={{ color: '#f97316', margin: 0 }}>
                          ⚡ BlazeUp
                        </Title>
                        <Text style={{ color: textMuted, fontStyle: 'italic' }}>
                          The Last Morning Routine App You Will Need
                        </Text>
                      </Flex>
                      
                      <Text style={{ fontSize: 14, lineHeight: 1.6, color: textSecondary }}>
                        BlazeUp is a mobile-first productivity platform built for Gen Z and Millennials in fast-paced environments. It is meticulously designed to help users establish consistent, effective morning routines by overcoming digital distractions, leveraging social accountability, and gamifying habit formation.
                      </Text>

                      <Link 
                        href="https://chimeraapp.net" 
                        target="_blank"
                        style={{ color: '#f97316', fontWeight: 'bold', fontSize: 14, marginTop: 'auto' }}
                      >
                        Discover BlazeUp →
                      </Link>
                    </Flex>
                  </div>
                </Col>
              </Row>
            </Flex>

            {/* Why Youth-Focused Section */}
            <div style={cardStyle}>
              <Flex vertical gap={16}>
                <Title level={3} style={{ color: '#a855f7', margin: 0 }}>
                  Why Youth-Focused Tech Solutions?
                </Title>
                <Text style={{ fontSize: '1rem', lineHeight: 1.7, color: textSecondary }}>
                  Three-quarters of people aged 15-24 are active internet users, yet the gap between digital engagement and meaningful empowerment remains wide. Lokode and BlazeUp are designed to bridge this gap—helping youth build healthy digital routines and become creators, not just consumers.
                </Text>
              </Flex>
            </div>

            {/* Vision Section */}
            <div style={cardStyle}>
              <Flex vertical gap={16}>
                <Title level={3} style={{ color: '#22c55e', margin: 0 }}>
                  Our Vision
                </Title>
                <Text style={{ fontSize: '1rem', lineHeight: 1.7, color: textSecondary }}>
                  We are committed to driving solutions to solve real problems people face.
                </Text>
              </Flex>
            </div>

            {/* Call to Action */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              backdropFilter: 'blur(20px)',
              padding: 32,
              borderRadius: 16,
              border: '1px solid rgba(59, 130, 246, 0.3)',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
              <Flex vertical gap={16}>
                <Title level={2} style={{ color: '#3b82f6', margin: 0 }}>
                  Ready to Join the Movement?
                </Title>
                <Flex vertical gap={8}>
                  <Text style={{ color: textSecondary }}>
                    <strong>If this sounds interesting</strong>—Contact me on LinkedIn/Email
                  </Text>
                  <Text style={{ color: textSecondary }}>
                    <strong>Join Chimera.</strong>
                  </Text>
                  <Text style={{ color: textSecondary }}>
                    <strong>Be part of a new generation</strong> of digital creators.
                  </Text>
                </Flex>
                <Text style={{ fontSize: 14, color: textMuted, fontStyle: 'italic', paddingTop: 8 }}>
                  Building the future of youth digital empowerment—one routine, one idea, one empowered user at a time.
                </Text>
              </Flex>
            </div>
          </Flex>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Startup;
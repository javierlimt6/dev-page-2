import React from 'react';
import { Typography, Row, Col, Flex, ConfigProvider, theme } from 'antd';
import { FaMedal, FaLaptopCode, FaChartLine, FaHandshake, FaExternalLinkAlt } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';

const { Title, Text, Link } = Typography;

const leadershipItems = [
  {
    id: "rc4-entre",
    title: "President @ RC4 Entrepreneurship Club",
    description: "Promoting entrepreneurship in Resident College 4. Organised events like the Startup Carnival, connecting RC4 residents with startups based in NUS, and a Pitching Clinic where over 40 participants gained valuable insights on crafting compelling pitches, capturing investor interest, and scaling big ideas. 🚀🌱",
    icon: FaChartLine,
    link: "https://www.linkedin.com/company/rc4-entre/",
  },
  {
    id: "rc4-pitch",
    title: "Top 4 @ RC4 Pitching Competition",
    description: "Selected as one of the top 4 teams in the RC4 Pitching Competition, presenting an innovative startup idea to a panel of industry judges. Demonstrated strong communication, teamwork, and entrepreneurial skills while competing against talented peers from across the college.",
    icon: FaMedal,
  },
  {
    id: "csc-swe",
    title: "Building a Startup",
    description: "Mentored by Professors from NUS, UM, supported by RC4, NOC, NES. (see Startup?)",
    icon: FaLaptopCode,
  },
  {
    id: "startup-nes",
    title: "Startup Member at NUS Entrepreneurship Society",
    description: "Engages in a vibrant entrepreneurial community, leveraging mentorship, exclusive events, and resources to develop and scale Chimera. 💪🏼",
    icon: FaHandshake,
    link: "https://www.linkedin.com/posts/nusentresoc_nus-entrepreneurship-societys-nes-partnerships-activity-7299824429650382850-F90N?utm_source=share&utm_medium=member_desktop&rcm=ACoAADvJz1ABqDtwMiYc8SS8kXGVbDXhzvviY_A",
    linktext: "Details"
  }
];

const Leadership = () => {
  const cardBg = "rgba(255,255,255,0.1)";

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section id="leadership" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: 16 }}>Entrepreneurial Activities</Title>
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
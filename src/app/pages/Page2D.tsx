import React from 'react';
import { Typography, Flex, Divider, ConfigProvider, theme } from 'antd';
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import { darkTheme } from '../antd-theme';

const { Title, Text, Link } = Typography;

// Data
const projects = [
  { title: 'Lokode', description: 'iOS app to lock distracting apps via QR code', link: 'https://lokode.chimera.sg' },
  { title: 'DrawMyRoute', description: 'AI-powered GPS Art Generator', link: 'https://drawmyroute.org' },
  { title: 'CloudJoi KB', description: 'AI-powered RAG chatbot for knowledge management', link: 'https://knowledgebase.cloudjoi.com' },
  { title: 'Chimera', description: 'Community platform for events and activities', link: 'https://chimeraapp.net' },
];

const experience = [
  { company: 'IBM', role: 'Full Stack Developer Intern', period: 'Sep 2025 - Dec 2025', logo: '/images/ibm.png' },
  { company: 'CloudJoi', role: 'Full Stack SWE Intern', period: 'May 2025 - Aug 2025', logo: '/images/cloudjoi-logo.png' },
  { company: 'NUS SoC', role: 'Teaching Assistant', period: '2024 - 2025', logo: '/images/soc-logo.png' },
  { company: 'Strive Math', role: 'Software Engineering Intern', period: 'Jan 2024 - Jun 2024', logo: '/images/strive-logo.png' },
];

const education = [
  { institution: 'National University of Singapore', degree: 'B.Comp in Computer Science', period: '2024 - Present' },
];

const activities = [
  { title: 'RC4 Entrepreneurship Club', role: 'President' },
  { title: 'NUS Entrepreneurship Society', role: 'Startup Member' },
  { title: 'RC4 Pitching Competition', role: 'Top 4' },
];

const Page2D = () => {
  const sectionStyle = { marginBottom: 48 };
  const labelStyle = { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.4)', 
    textTransform: 'uppercase' as const, 
    letterSpacing: 2, 
    marginBottom: 16 
  };

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0a0a0a',
        padding: '64px 32px',
        maxWidth: 700,
        margin: '0 auto'
      }}>
        {/* Header / About */}
        <div style={sectionStyle}>
          <div style={{ 
            width: 100, 
            height: 100, 
            borderRadius: '50%', 
            overflow: 'hidden', 
            marginBottom: 24,
            border: '2px solid rgba(255,255,255,0.1)'
          }}>
            <Image 
              src="/image.png" 
              alt="Javier Lim" 
              width={100} 
              height={100} 
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          <Title level={1} style={{ margin: 0, marginBottom: 16, color: '#e2e8f0', fontWeight: 600 }}>
            Javier Lim
          </Title>
          
          <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 24, lineHeight: 1.6 }}>
            I&apos;m an entrepreneur & software engineer in Singapore, currently building{' '}
            <Link href="https://lokode.chimera.sg" target="_blank" style={{ color: '#64ffda', textDecoration: 'underline' }}>
              Lokode
            </Link>
            {' '}and studying at NUS.
          </Text>
          
          <Flex gap={20}>
            <Link href="https://github.com/javierlimt6" target="_blank" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <FaGithub size={20} />
            </Link>
            <Link href="https://linkedin.com/in/javierlimjuyi" target="_blank" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <FaLinkedin size={20} />
            </Link>
            <Link href="mailto:javier.lim@u.nus.edu" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <FaEnvelope size={20} />
            </Link>
          </Flex>
        </div>

        <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '32px 0' }} />

        {/* Projects */}
        <div style={sectionStyle}>
          <Text style={labelStyle}>Projects</Text>
          <Flex vertical gap={16}>
            {projects.map((project) => (
              <Link 
                key={project.title} 
                href={project.link} 
                target="_blank"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Flex align="center" gap={8}>
                  <Text style={{ color: '#e2e8f0', fontWeight: 500 }}>{project.title}</Text>
                  <FaExternalLinkAlt size={10} style={{ color: 'rgba(255,255,255,0.3)' }} />
                  <Text style={{ color: 'rgba(255,255,255,0.5)' }}>{project.description}</Text>
                </Flex>
              </Link>
            ))}
          </Flex>
        </div>

        <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '32px 0' }} />

        {/* Experience */}
        <div style={sectionStyle}>
          <Text style={labelStyle}>Work</Text>
          <Flex vertical gap={20}>
            {experience.map((exp) => (
              <Flex key={exp.company} align="center" gap={16}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 8, 
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image src={exp.logo} alt={exp.company} width={32} height={32} style={{ objectFit: 'contain' }} />
                </div>
                <Flex vertical style={{ flex: 1 }}>
                  <Flex justify="space-between" align="center">
                    <Text style={{ color: '#e2e8f0', fontWeight: 500 }}>{exp.company}</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{exp.period}</Text>
                  </Flex>
                  <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{exp.role}</Text>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </div>

        <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '32px 0' }} />

        {/* Education */}
        <div style={sectionStyle}>
          <Text style={labelStyle}>Education</Text>
          <Flex vertical gap={16}>
            {education.map((edu) => (
              <Flex key={edu.institution} justify="space-between" align="center">
                <Flex vertical>
                  <Text style={{ color: '#e2e8f0', fontWeight: 500 }}>{edu.institution}</Text>
                  <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{edu.degree}</Text>
                </Flex>
                <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{edu.period}</Text>
              </Flex>
            ))}
          </Flex>
        </div>

        <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '32px 0' }} />

        {/* Activities */}
        <div style={sectionStyle}>
          <Text style={labelStyle}>Activities</Text>
          <Flex vertical gap={12}>
            {activities.map((activity) => (
              <Flex key={activity.title} justify="space-between" align="center">
                <Text style={{ color: '#e2e8f0', fontWeight: 500 }}>{activity.title}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{activity.role}</Text>
              </Flex>
            ))}
          </Flex>
        </div>

        {/* Footer */}
        <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '32px 0' }} />
        <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
          © {new Date().getFullYear()} Javier Lim
        </Text>
      </div>
    </ConfigProvider>
  );
};

export default Page2D;

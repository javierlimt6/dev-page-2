import React from 'react';
import { Typography, Flex, Collapse, ConfigProvider, theme } from 'antd';
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import { darkTheme } from '../antd-theme';
import siteData from '../../data/siteData.json';

const { Title, Text, Link } = Typography;

// Pull data from centralized JSON
const projects = siteData.projects.map(p => ({
  title: p.title.split('|')[0].split('(')[0].trim(),
  description: p.description,
  link: p.demoLink && p.demoLink !== '#' ? p.demoLink : p.githubLink,
}));

const experience = siteData.experience.map(exp => ({
  company: exp.company,
  role: exp.title,
  period: exp.period,
  logo: exp.photoUrl,
}));

const education = [
  {
    institution: siteData.education.main.university,
    degree: siteData.education.main.degree,
    period: siteData.education.main.period,
  },
  ...siteData.education.otherInstitutions.map(inst => ({
    institution: inst.name,
    degree: inst.program,
    period: inst.period,
  })),
];

const profile = siteData.profile;

const activityCategories = [
  { label: 'Leadership', items: siteData.activities.leadership },
  { label: 'Competitions', items: siteData.activities.competitions },
  { label: 'Others', items: siteData.activities.others },
];

const Page2D = () => {
  const labelStyle: React.CSSProperties = { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.4)', 
    textTransform: 'uppercase', 
    letterSpacing: 2, 
  };

  const collapseStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
  };

  const panelStyle = {
    header: { padding: '16px 0', color: 'rgba(255,255,255,0.4)' },
    body: { padding: '0 0 16px 0', border: 'none' },
  };

  const collapseItems = [
    {
      key: 'work',
      label: <span style={labelStyle}>Work</span>,
      children: (
        <Flex vertical gap={20}>
          {experience.map((exp) => (
            <Flex key={`${exp.company}-${exp.period}`} align="center" gap={16}>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 8, 
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Image src={exp.logo} alt={exp.company} width={32} height={32} style={{ objectFit: 'contain' }} />
              </div>
              <Flex vertical style={{ flex: 1, minWidth: 0 }}>
                <Flex justify="space-between" align="center" gap={8}>
                  <Text style={{ color: '#e2e8f0', fontWeight: 500, whiteSpace: 'nowrap' }}>{exp.company}</Text>
                  <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, whiteSpace: 'nowrap', flexShrink: 0 }}>{exp.period}</Text>
                </Flex>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{exp.role}</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      ),
    },
    {
      key: 'projects',
      label: <span style={labelStyle}>Projects</span>,
      children: (
        <Flex vertical gap={12}>
          {projects.map((project) => (
            <Link 
              key={project.title} 
              href={project.link} 
              target="_blank"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Flex align="baseline" gap={8} style={{ flexWrap: 'nowrap' }}>
                <Text style={{ color: '#e2e8f0', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>{project.title}</Text>
                {project.link && <FaExternalLinkAlt size={10} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />}
                <Text style={{ color: 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.description}</Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      ),
    },
    {
      key: 'education',
      label: <span style={labelStyle}>Education</span>,
      children: (
        <Flex vertical gap={16}>
          {education.map((edu) => (
            <Flex key={edu.institution} justify="space-between" align="center" gap={8}>
              <Flex vertical style={{ minWidth: 0 }}>
                <Text style={{ color: '#e2e8f0', fontWeight: 500 }}>{edu.institution}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{edu.degree}</Text>
              </Flex>
              <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, whiteSpace: 'nowrap', flexShrink: 0 }}>{edu.period}</Text>
            </Flex>
          ))}
        </Flex>
      ),
    },
    {
      key: 'activities',
      label: <span style={labelStyle}>Activities</span>,
      children: (
        <Flex vertical gap={24}>
          {activityCategories.map((cat) => (
            <div key={cat.label}>
              <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, display: 'block' }}>
                {cat.label}
              </Text>
              <Flex vertical gap={8}>
                {cat.items.map((item) => (
                  <Text key={item.id} style={{ color: '#e2e8f0', fontWeight: 400, fontSize: 14 }}>
                    {item.title}
                  </Text>
                ))}
              </Flex>
            </div>
          ))}
        </Flex>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ 
      ...darkTheme, 
      algorithm: theme.darkAlgorithm,
      components: {
        Collapse: {
          headerBg: 'transparent',
          contentBg: 'transparent',
          headerPadding: '16px 0',
          contentPadding: '0 0 16px 0',
          colorBorder: 'rgba(255,255,255,0.1)',
        }
      }
    }}>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0a0a0a',
        padding: '64px 32px',
        maxWidth: 700,
        margin: '0 auto'
      }}>
        {/* Header / About */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ 
            width: 100, 
            height: 100, 
            borderRadius: '50%', 
            overflow: 'hidden', 
            marginBottom: 24,
            border: '2px solid rgba(255,255,255,0.1)'
          }}>
            <Image 
              src={profile.photo}
              alt={profile.fullName}
              width={100} 
              height={100} 
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          <Title level={1} style={{ margin: 0, marginBottom: 16, color: '#e2e8f0', fontWeight: 600 }}>
            {profile.fullName}
          </Title>
          
          <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 24, lineHeight: 1.6 }}>
            {siteData.about.bio[0]}
          </Text>
          
          <Flex gap={20}>
            <Link href={profile.socials.github} target="_blank" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <FaGithub size={20} />
            </Link>
            <Link href={profile.socials.linkedin} target="_blank" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <FaLinkedin size={20} />
            </Link>
            <Link href={`mailto:${profile.email}`} style={{ color: 'rgba(255,255,255,0.5)' }}>
              <FaEnvelope size={20} />
            </Link>
          </Flex>
        </div>

        <Collapse 
          defaultActiveKey={['work', 'projects', 'education', 'activities']}
          ghost
          items={collapseItems}
          style={collapseStyle}
        />

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 32, paddingTop: 24 }}>
          <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
            © {new Date().getFullYear()} {profile.fullName}
          </Text>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Page2D;

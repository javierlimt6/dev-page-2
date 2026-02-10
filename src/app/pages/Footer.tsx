import React from 'react';
import { Typography, Flex, ConfigProvider, theme } from 'antd';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';
import siteData from '../../data/siteData.json';

const { Text, Link } = Typography;

const profile = siteData.profile;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <footer style={{ padding: '32px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Flex 
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={16}
        >
          <Flex vertical gap={4}>
            <Text style={{ color: '#718096' }}>
              © {currentYear} {profile.fullName}. All rights reserved.
            </Text>
            <Text style={{ color: '#4a5568', fontSize: 11 }}>
              3D Models:{' '}
              <Link href="https://poly.pizza/m/2AeF-fuFHNu" target="_blank" style={{ color: '#4a5568' }}>
                &quot;Little Private Beach&quot; by Carson Lam
              </Link>,{' '}
              <Link href="https://poly.pizza/m/3oFfQCSsUmQ" target="_blank" style={{ color: '#4a5568' }}>
                &quot;Keyboard&quot; by Poly by Google
              </Link>{' '}
              <Link href="https://creativecommons.org/licenses/by/3.0/" target="_blank" style={{ color: '#4a5568' }}>
                [CC-BY]
              </Link>
            </Text>
          </Flex>
          
          <Flex gap={24}>
            <Link 
              href={profile.socials.linkedin}
              target="_blank"
              style={{ color: '#718096', transition: 'color 0.2s' }}
            >
              <FaLinkedin size={20} />
            </Link>
            <Link 
              href={profile.socials.github}
              target="_blank"
              style={{ color: '#718096', transition: 'color 0.2s' }}
            >
              <FaGithub size={20} />
            </Link>
          </Flex>
        </Flex>
      </footer>
    </ConfigProvider>
  );
};

export default Footer;
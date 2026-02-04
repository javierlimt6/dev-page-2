import React from 'react';
import { Typography, Flex, ConfigProvider, theme } from 'antd';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';

const { Text, Link } = Typography;

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
          <Text style={{ color: '#718096' }}>
            © {currentYear} Javier Lim Jun Yi. All rights reserved.
          </Text>
          
          <Flex gap={24}>
            <Link 
              href="https://linkedin.com/in/javierlimjuyi"
              target="_blank"
              style={{ color: '#718096', transition: 'color 0.2s' }}
            >
              <FaLinkedin size={20} />
            </Link>
            <Link 
              href="https://github.com/javierlimt6"
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
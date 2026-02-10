import React from 'react';
import { Typography, ConfigProvider, theme } from 'antd';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';
import siteData from '../../data/siteData.json';

const { Title, Text } = Typography;

const MotionDiv = motion.div;

const { name } = siteData.about;
const { tagline } = siteData.profile;

const Name: React.FC = () => {
  const textColor = '#718096';
  const linkColor = '#a0aec0';

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '112px 16px', textAlign: 'center' }}>
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Title
            level={1}
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              marginBottom: 24,
              fontFamily: 'serif'
            }}
          >
            Hello! I am{' '}
            <span 
              style={{ 
                background: 'linear-gradient(to right, #3b82f6, #a855f7)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {name}
            </span>
          </Title>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Text
            style={{
              fontSize: '1.5rem',
              color: textColor,
              maxWidth: 800,
              margin: '0 auto 48px',
              display: 'block'
            }}
          >
            {tagline}
          </Text>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="#about"
            style={{
              color: linkColor,
              transition: 'color 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none'
            }}
          >
            Explore My Work
            <MotionDiv
              style={{ display: 'inline-block' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaArrowDown size={24} />
            </MotionDiv>
          </a>
        </MotionDiv>
      </div>
    </ConfigProvider>
  );
};

export default Name;
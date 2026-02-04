import React from 'react';
import { Typography, Flex, ConfigProvider, theme } from 'antd';
import { FaArrowDown } from 'react-icons/fa';
import Photo from './Photo';
import { darkTheme } from '../antd-theme';

const { Title, Text, Link } = Typography;

const Hero = () => {
  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section 
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 100%)',
            opacity: 0.8,
            zIndex: 0
          }}
        />
        
        <div 
          style={{
            maxWidth: '1200px',
            padding: '0 16px',
            zIndex: 10,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <div style={{ marginTop: 64 }}>
            <Photo />
          </div>
          
          <Title 
            level={1}
            style={{
              marginBottom: 24,
              fontFamily: 'Inter, sans-serif',
              fontSize: '3rem'
            }}
          >
            Hello! I am Javier.
          </Title>
          <Title 
            level={1}
            style={{
              marginBottom: 24,
              fontFamily: 'Inter, sans-serif',
              fontSize: '3rem'
            }}
          >
            Developer.
            <span style={{
              background: 'linear-gradient(to right, #3b82f6, #a855f7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {' '}Entrepreneur.
            </span>
            {' '}Innovator.
          </Title>
          <Text 
            style={{
              fontSize: '1.5rem',
              color: '#718096',
              maxWidth: 800,
              margin: '0 auto 48px'
            }}
          >
            I like to code stuff to solve real problems.
          </Text>
          
          <div>
            <Link 
              href="#about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: '#a0aec0',
                transition: 'color 0.3s'
              }}
            >
              See my page
              <FaArrowDown size={20} />
            </Link>
          </div>
        </div>

        {/* Background gradient elements */}
        <div 
          style={{
            position: 'absolute',
            top: 80,
            left: 40,
            width: 288,
            height: 288,
            borderRadius: '50%',
            background: '#3b82f6',
            opacity: 0.2,
            filter: 'blur(60px)'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: 80,
            right: 40,
            width: 384,
            height: 384,
            borderRadius: '50%',
            background: '#a855f7',
            opacity: 0.1,
            filter: 'blur(60px)'
          }}
        />
      </section>
    </ConfigProvider>
  );
};

export default Hero;

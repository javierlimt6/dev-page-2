import React, { useState } from 'react';
import { Button, Flex, Typography, ConfigProvider, theme } from 'antd';
import { FaGithub, FaFileAlt, FaQuoteLeft, FaLinkedin, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import About from './About';
import { darkTheme, colors } from '../antd-theme';

const { Title } = Typography;

interface HeaderProps {
  persona: string;
  onPersonaChange: (persona: string) => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
  showChat: boolean;
  onChatToggle: () => void;
}

const MotionDiv = motion.div;

const Header: React.FC<HeaderProps> = ({
  persona,
  onPersonaChange,
  voiceEnabled,
  onVoiceToggle,
  showChat,
  onChatToggle
}) => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <header 
        style={{
          width: '100%',
          padding: '16px 0',
          position: 'fixed',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px' }}>
          <Flex align="center" justify="space-between" wrap="wrap" gap={16} style={{ height: '35px' }}>
            {/* Name link that opens About modal */}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setShowAboutModal(true);
              }}
              style={{ textDecoration: 'none' }}
            >
              <Title 
                level={3}
                style={{
                  margin: 0,
                  color: colors.cyan.light,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
              >
                Javier Lim Jun Yi
              </Title>
            </a>
            
            {/* Persona buttons */}
            <Flex align="center" gap={16} wrap="wrap">
              <Flex gap={8} wrap="wrap">
                <Button
                  size="small"
                  type={persona === 'developer' ? 'primary' : 'default'}
                  style={{
                    backgroundColor: persona === 'developer' ? colors.purple.primary : 'transparent',
                    borderColor: colors.purple.primary,
                    color: persona === 'developer' ? 'white' : colors.purple.primary
                  }}
                  onClick={() => onPersonaChange('developer')}
                >
                  Computer Science
                </Button>
                <Button
                  size="small"
                  type={persona === 'entrepreneur' ? 'primary' : 'default'}
                  style={{
                    backgroundColor: persona === 'entrepreneur' ? colors.orange.primary : 'transparent',
                    borderColor: colors.orange.primary,
                    color: persona === 'entrepreneur' ? 'white' : colors.orange.primary
                  }}
                  onClick={() => onPersonaChange('entrepreneur')}
                >
                  Entrepreneurship
                </Button>
                <Button
                  size="small"
                  type={persona === 'video-creator' ? 'primary' : 'default'}
                  style={{
                    backgroundColor: persona === 'video-creator' ? colors.green.primary : 'transparent',
                    borderColor: colors.green.primary,
                    color: persona === 'video-creator' ? 'white' : colors.green.primary
                  }}
                  onClick={() => onPersonaChange('video-creator')}
                >
                  Hobbies & Others
                </Button>
              </Flex>
            </Flex>

            {/* Social links */}
            <Flex gap={12} style={{ display: 'none' }} className="md-show">
              <a href="/resume.pdf" target="_blank" style={{ textDecoration: 'none' }}>
                <Button 
                  type="primary"
                  style={{
                    backgroundColor: colors.cyan.primary,
                    borderColor: colors.cyan.primary,
                    color: 'white'
                  }}
                >
                  <FaFileAlt style={{ marginRight: 8 }} />
                  Resume
                </Button>
              </a>
              <a href="/testimonials.pdf" target="_blank" style={{ textDecoration: 'none' }}>
                <Button 
                  type="primary"
                  style={{
                    backgroundColor: colors.teal.primary,
                    borderColor: colors.teal.primary,
                    color: 'white'
                  }}
                >
                  <FaQuoteLeft style={{ marginRight: 8 }} />
                  Testimonials
                </Button>
              </a>
              <a 
                href="https://linkedin.com/in/jav-lim" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#a0aec0', transition: 'color 0.2s' }}
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://github.com/javierlimt6" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#a0aec0', transition: 'color 0.2s' }}
              >
                <FaGithub size={20} />
              </a>
            </Flex>
          </Flex>
        </div>
      </header>

      {/* About Modal */}
      {showAboutModal && (
        <MotionDiv
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAboutModal(false)}
        >
          <MotionDiv
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '32px',
              overflow: 'auto'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Flex justify="flex-end" style={{ marginBottom: 16 }}>
              <Button
                type="text"
                size="small"
                onClick={() => setShowAboutModal(false)}
                style={{ color: 'white' }}
                icon={<FaTimes />}
              />
            </Flex>

            {/* About content */}
            <About />
          </MotionDiv>
        </MotionDiv>
      )}
    </ConfigProvider>
  );
};

export default Header;

import React, { useState } from 'react';
import { Button, Typography, Flex, Divider, ConfigProvider, theme } from 'antd';
import { 
  FaGithub, 
  FaFileAlt, 
  FaQuoteLeft, 
  FaLinkedin, 
  FaCode, 
  FaBriefcase, 
  FaGamepad,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import About from './About';
import { darkTheme, colors } from '../antd-theme';

const { Title, Text } = Typography;

interface SidebarProps {
  persona: string;
  onPersonaChange: (persona: string) => void;
}

const MotionDiv = motion.div;

const Sidebar: React.FC<SidebarProps> = ({
  persona,
  onPersonaChange,
}) => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? 60 : 240;

  const menuItems = [
    { 
      key: 'developer', 
      label: 'Computer Science', 
      icon: FaCode, 
      color: colors.purple.primary,
      disabled: false 
    },
    { 
      key: 'entrepreneur', 
      label: 'Entrepreneurship', 
      icon: FaBriefcase, 
      color: colors.orange.primary,
      disabled: true  // Disabled for now
    },
    { 
      key: 'video-creator', 
      label: 'Hobbies & Others', 
      icon: FaGamepad, 
      color: colors.green.primary,
      disabled: true  // Disabled for now
    },
  ];

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: sidebarWidth,
          backgroundColor: 'rgba(15, 15, 20, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <Flex 
          align="center" 
          justify={isCollapsed ? 'center' : 'space-between'} 
          style={{ padding: isCollapsed ? '16px 8px' : '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          {!isCollapsed && (
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setShowAboutModal(true);
              }}
              style={{ textDecoration: 'none' }}
            >
              <Title 
                level={5}
                style={{
                  margin: 0,
                  color: colors.cyan.light,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Javier Lim
              </Title>
            </a>
          )}
          <Button
            type="text"
            size="small"
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {isCollapsed ? <FaBars /> : <FaTimes size={12} />}
          </Button>
        </Flex>

        {/* Navigation */}
        <Flex vertical style={{ padding: '16px 8px', flex: 1 }}>
          {!isCollapsed && (
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8, paddingLeft: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
              Personas
            </Text>
          )}
          
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = persona === item.key;
            
            return (
              <Button
                key={item.key}
                type="text"
                disabled={item.disabled}
                onClick={() => !item.disabled && onPersonaChange(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  gap: 12,
                  padding: isCollapsed ? '12px' : '12px 16px',
                  marginBottom: 4,
                  borderRadius: 8,
                  backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderLeft: isActive ? `3px solid ${item.color}` : '3px solid transparent',
                  opacity: item.disabled ? 0.4 : 1,
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  height: 'auto',
                  width: '100%'
                }}
              >
                <IconComponent 
                  style={{ 
                    color: isActive ? item.color : 'rgba(255,255,255,0.6)', 
                    fontSize: 18,
                    flexShrink: 0
                  }} 
                />
                {!isCollapsed && (
                  <Text style={{ 
                    color: isActive ? 'white' : 'rgba(255,255,255,0.7)', 
                    fontSize: 14,
                    whiteSpace: 'nowrap'
                  }}>
                    {item.label}
                    {item.disabled && <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginLeft: 4 }}>(soon)</Text>}
                  </Text>
                )}
              </Button>
            );
          })}
        </Flex>

        {/* Footer Links */}
        <Flex 
          vertical 
          gap={8} 
          style={{ 
            padding: isCollapsed ? '16px 8px' : '16px', 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
          }}
        >
          {!isCollapsed ? (
            <>
              <a href="/resume.pdf" target="_blank" style={{ textDecoration: 'none' }}>
                <Button 
                  type="text"
                  block
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 8,
                    color: 'rgba(255,255,255,0.7)'
                  }}
                >
                  <FaFileAlt /> Resume
                </Button>
              </a>
              <a href="/testimonials.pdf" target="_blank" style={{ textDecoration: 'none' }}>
                <Button 
                  type="text"
                  block
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 8,
                    color: 'rgba(255,255,255,0.7)'
                  }}
                >
                  <FaQuoteLeft /> Testimonials
                </Button>
              </a>
              <Divider style={{ margin: '8px 0', borderColor: 'rgba(255,255,255,0.1)' }} />
              <Flex gap={16} justify="center">
                <a href="https://linkedin.com/in/jav-lim" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <FaLinkedin size={18} />
                </a>
                <a href="https://github.com/javierlimt6" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <FaGithub size={18} />
                </a>
              </Flex>
            </>
          ) : (
            <Flex vertical align="center" gap={12}>
              <a href="/resume.pdf" target="_blank" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <FaFileAlt size={16} />
              </a>
              <a href="https://linkedin.com/in/jav-lim" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <FaLinkedin size={16} />
              </a>
              <a href="https://github.com/javierlimt6" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <FaGithub size={16} />
              </a>
            </Flex>
          )}
        </Flex>
      </div>

      {/* About Modal */}
      <AnimatePresence>
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
              <Flex justify="flex-end" style={{ marginBottom: 16 }}>
                <Button
                  type="text"
                  size="small"
                  onClick={() => setShowAboutModal(false)}
                  style={{ color: 'white' }}
                  icon={<FaTimes />}
                />
              </Flex>
              <About />
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </ConfigProvider>
  );
};

export default Sidebar;

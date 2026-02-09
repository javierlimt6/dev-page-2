import React, { useState } from 'react';
import { Button, Typography, Flex, Divider, ConfigProvider, theme, Switch } from 'antd';
import { 
  FaGithub, 
  FaFileAlt, 
  FaQuoteLeft, 
  FaLinkedin, 
  FaCode, 
  FaBriefcase, 
  FaGamepad,
  FaBars,
  FaTimes,
  FaCube,
  FaSquare,
  FaRocket
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import About from './About';
import { darkTheme, colors } from '../antd-theme';

const { Title, Text, Link } = Typography;

interface SidebarProps {
  persona: string;
  onPersonaChange: (persona: string) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  viewMode: '2d' | '3d';
  onViewModeChange: (mode: '2d' | '3d') => void;
}

const MotionDiv = motion.div;

const Sidebar: React.FC<SidebarProps> = ({
  persona,
  onPersonaChange,
  collapsed,
  onCollapsedChange,
  viewMode,
  onViewModeChange,
}) => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  const sidebarWidth = collapsed ? 60 : 190;

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          height: 'auto',
          maxHeight: 'calc(100vh - 32px)',
          width: sidebarWidth,
          backgroundColor: 'rgba(15, 15, 20, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 12,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <Flex 
          align="center" 
          style={{ padding: '12px 8px', height: 48 }}
        >
          <div style={{ width: 44, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            <Button
              type="text"
              size="small"
              onClick={() => onCollapsedChange(!collapsed)}
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {collapsed ? <FaBars /> : <FaTimes size={12} />}
            </Button>
          </div>
          <div style={{ 
            overflow: 'hidden', 
            opacity: collapsed ? 0 : 1, 
            transition: 'opacity 0.2s ease',
            whiteSpace: 'nowrap'
          }}>
            <Link 
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
                javier&apos;s website
              </Title>
            </Link>
          </div>
        </Flex>

        {/* 2D/3D Toggle */}
        <Flex 
          vertical
          gap={4}
          style={{ padding: '0 8px 8px', width: '100%' }}
        >
          <Button
            type="text"
            size="small"
            onClick={() => onViewModeChange('2d')}
            style={{
              flex: 1,
              padding: '10px 8px',
              backgroundColor: viewMode === '2d' ? 'rgba(100, 255, 218, 0.15)' : 'rgba(255,255,255,0.05)',
              border: viewMode === '2d' ? '1px solid #64ffda' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: viewMode === '2d' ? '#64ffda' : 'rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <FaSquare size={12} />
            {!collapsed && <Text style={{ fontSize: 13, color: 'inherit' }}>2D</Text>}
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => onViewModeChange('3d')}
            style={{
              flex: 1,
              padding: '10px 8px',
              backgroundColor: viewMode === '3d' ? 'rgba(162, 89, 247, 0.15)' : 'rgba(255,255,255,0.05)',
              border: viewMode === '3d' ? '1px solid #a259f7' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: viewMode === '3d' ? '#a259f7' : 'rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <FaCube size={12} />
            {!collapsed && <Text style={{ fontSize: 13, color: 'inherit' }}>3D</Text>}
          </Button>
        </Flex>

        {/* Footer Links */}
        <Flex 
          vertical 
          gap={2} 
          style={{ padding: '8px' }}
        >
          {[
            { href: 'https://path.javlim.dev', icon: <FaRocket size={16} />, label: 'My Roadmap' },
            { href: '/resume.pdf', icon: <FaFileAlt size={16} />, label: 'Resume' },
            { href: '/testimonials.pdf', icon: <FaQuoteLeft size={16} />, label: 'Testimonials' },
            { type: 'divider' as const },
            { href: 'https://linkedin.com/in/jav-lim', icon: <FaLinkedin size={16} />, label: 'LinkedIn' },
            { href: 'https://github.com/javierlimt6', icon: <FaGithub size={16} />, label: 'GitHub' },
            { href: 'https://leetcode.com/u/rel1sh/', icon: <SiLeetcode size={16} />, label: 'LeetCode' },
          ].map((item, index) => (
            item.type === 'divider' ? (
              <div key={`divider-${index}`} style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '4px 0' }} />
            ) :
            <Link key={item.label} href={item.href} target="_blank" style={{ textDecoration: 'none' }}>
              <Flex 
                align="center" 
                style={{ 
                  padding: '8px 0',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
              >
                <div style={{ width: 44, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ 
                  overflow: 'hidden', 
                  opacity: collapsed ? 0 : 1, 
                  transition: 'opacity 0.2s ease',
                  whiteSpace: 'nowrap'
                }}>
                  <Text style={{ fontSize: 13, color: 'inherit' }}>{item.label}</Text>
                </div>
              </Flex>
            </Link>
          ))}
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

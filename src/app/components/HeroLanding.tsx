import React from 'react';
import { Typography, Flex, ConfigProvider, theme } from 'antd';
import { FaSquare, FaCube } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { darkTheme } from '../antd-theme';
import siteData from '../../data/siteData.json';

const { Title, Text } = Typography;
const MotionDiv = motion.div;

interface HeroLandingProps {
  visible: boolean;
  onSelect: (mode: '2d' | '3d') => void;
}

const HeroLanding: React.FC<HeroLandingProps> = ({ visible, onSelect }) => {
  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <AnimatePresence>
        {visible && (
          <MotionDiv
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Subtle animated background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 30% 50%, rgba(100, 255, 218, 0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(162, 89, 247, 0.04) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 40,
                padding: '0 24px',
                maxWidth: 520,
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Name & tagline */}
              <div>
                <Title
                  level={1}
                  style={{
                    margin: 0,
                    color: '#e2e8f0',
                    fontWeight: 700,
                    fontSize: 42,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {siteData.profile.fullName}
                </Title>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: 16,
                    display: 'block',
                    marginTop: 8,
                  }}
                >
                  {siteData.profile.tagline}
                </Text>
              </div>

              {/* Mode selection */}
              <Flex vertical gap={16} style={{ width: '100%' }}>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                  }}
                >
                  Choose your experience
                </Text>

                <Flex gap={16} style={{ width: '100%' }}>
                  {/* 2D Option */}
                  <MotionDiv
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('2d')}
                    style={{
                      flex: 1,
                      padding: '28px 20px',
                      borderRadius: 14,
                      border: '1px solid rgba(100, 255, 218, 0.2)',
                      background: 'rgba(100, 255, 218, 0.04)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 12,
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  >
                    <FaSquare size={28} color="#64ffda" />
                    <div>
                      <Text style={{ color: '#64ffda', fontWeight: 600, fontSize: 18, display: 'block' }}>
                        2D
                      </Text>
                      <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, display: 'block', marginTop: 4 }}>
                        Recommended for mobile
                      </Text>
                    </div>
                  </MotionDiv>

                  {/* 3D Option */}
                  <MotionDiv
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('3d')}
                    style={{
                      flex: 1,
                      padding: '28px 20px',
                      borderRadius: 14,
                      border: '1px solid rgba(162, 89, 247, 0.2)',
                      background: 'rgba(162, 89, 247, 0.04)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 12,
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  >
                    <FaCube size={28} color="#a259f7" />
                    <div>
                      <Text style={{ color: '#a259f7', fontWeight: 600, fontSize: 18, display: 'block' }}>
                        3D
                      </Text>
                      <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, display: 'block', marginTop: 4 }}>
                        Three.js Interactive scene
                      </Text>
                    </div>
                  </MotionDiv>
                </Flex>
              </Flex>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </ConfigProvider>
  );
};

export default HeroLanding;

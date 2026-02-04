import React from 'react';
import { Flex, ConfigProvider, theme } from 'antd';
import { motion } from 'framer-motion';
import { darkTheme } from '../antd-theme';

const MotionImg = motion.img;

const Photo = () => {
  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <Flex justify="center" align="center" style={{ height: '50vh' }}>
        <MotionImg
          src="/image.png"
          alt="Javier Lim's Photo"
          style={{
            borderRadius: '50%',
            width: 300,
            height: 300,
            objectFit: 'cover',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </Flex>
    </ConfigProvider>
  );
};

export default Photo;

import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionImage = motion(Image);

const Photo = () => {
  return (
    <Flex justify="center" align="center" h="50vh">
      <MotionImage
        src="/image.png" // Using the available image from the public folder
        alt="Javier Lim's Photo"
        borderRadius="full"
        boxSize="300px"
        objectFit="cover"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        boxShadow="lg"
      />
    </Flex>
  );
};

export default Photo;

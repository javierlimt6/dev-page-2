import React from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
  Icon,
  Container,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const MotionDiv = motion.div;

const Name: React.FC = () => {
  // Use static colors instead of useColorModeValue
  const textColor = 'gray.400';
  const linkColor = 'gray.300';
  const linkHoverColor = 'white';

  return (
    <Container maxW="3xl" centerContent py={{ base: 16, md: 28 }} textAlign="center">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Heading
          as="h1"
          fontSize={{ base: '5xl', md: '7xl' }}
          fontWeight="bold"
          mb={6}
          fontFamily="serif"
        >
          Hello! I am{' '}
          <Text 
            as="span" 
            bgGradient="linear(to-r, blue.400, purple.500)" 
            bgClip="text"
          >
            Javier
          </Text>
        </Heading>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          color={textColor}
          maxW="3xl"
          mx="auto"
          mb={12}
        >
          Crafting exceptional digital experiences and building innovative solutions to real-world problems.
        </Text>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Link
          href="#about"
          color={linkColor}
          _hover={{ color: linkHoverColor, textDecoration: 'none' }}
          transition="color 0.2s"
          display="inline-flex"
          alignItems="center"
          gap={2}
        >
          Explore My Work
          <MotionDiv
            style={{ display: 'inline-block' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Icon as={FaArrowDown} w={6} h={6} />
          </MotionDiv>
        </Link>
      </MotionDiv>
    </Container>
  );
};

export default Name;
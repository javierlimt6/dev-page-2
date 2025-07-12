import React from 'react';
import { Box, Container, Heading, Text, Link, Icon, VStack } from '@chakra-ui/react';
import { FaArrowDown } from 'react-icons/fa';
import Photo from './Photo';

const Hero = () => {
  return (
    <Box 
      as="section" 
      height="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      position="relative" 
      overflow="hidden"
    >
      <Box 
        position="absolute" 
        inset={0} 
        bg="radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 100%)" 
        opacity={0.8} 
        zIndex={0} 
      />
      <Container 
        maxW="7xl" 
        px={4} 
        zIndex={10} 
        textAlign="center" 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        height="full"
      >
        <Box mt={16}>
          <Photo />
        </Box>
        
        <Heading 
          as="h1" 
          size="4xl" 
          mb={6} 
          fontFamily="Inter, sans-serif"
        >
          Hello! I am Javier.
        </Heading>
        <Heading 
          as="h1" 
          size="4xl" 
          mb={6} 
          fontFamily="Inter, sans-serif"

        >
          Developer.
          <Box as="span" bgGradient="linear(to-r, blue.400, purple.400)" bgClip="text">
            {' '}Entrepreneur.
          </Box>
          {' '}Innovator.
        </Heading>
        <Text 
          fontSize={{ base: 'xl', md: '2xl' }} 
          color="gray.400" 
          maxW="3xl" 
          mx="auto" 
          mb={12}
        >
          I like to code stuff to solve real problems.
        </Text>
        
        <Box>
          <Link 
            href="#about" 
            display="inline-flex" 
            alignItems="center" 
            gap={2} 
            color="gray.300" 
            _hover={{ color: 'white' }} 
            transition="colors 0.3s"
          >
            See my page
            <Icon as={FaArrowDown} boxSize={5} />
          </Link>
        </Box>
      </Container>

      {/* Background gradient elements */}
      <Box 
        position="absolute" 
        top={20} 
        left={10} 
        w={72} 
        h={72} 
        borderRadius="full" 
        bg="blue.400" 
        opacity={0.2} 
        filter="blur(60px)" 
      />
      <Box 
        position="absolute" 
        bottom={20} 
        right={10} 
        w={96} 
        h={96} 
        borderRadius="full" 
        bg="purple.400" 
        opacity={0.1} 
        filter="blur(60px)" 
      />
    </Box>
  );
};

export default Hero;

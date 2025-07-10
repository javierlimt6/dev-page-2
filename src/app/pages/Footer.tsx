import React from 'react';
import {
  Box,
  Flex,
  Link,
  Icon,
  Text,
  HStack,
  VisuallyHidden
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box as="footer" py={8} borderTop="1px solid" borderColor="whiteAlpha.200">
      <Flex 
        maxW="container.xl" 
        mx="auto" 
        px={4} 
        direction={{ base: 'column', md: 'row' }} 
        justify="space-between" 
        align="center"
      >
        <Text color="gray.500" mb={{ base: 4, md: 0 }}>
          © {currentYear} Javier Lim Jun Yi. All rights reserved.
        </Text>
        
        <HStack spacing={6}>
          <Link 
            href="https://linkedin.com/in/javierlimjuyi" 
            isExternal
            color="gray.500"
            _hover={{ color: 'white' }}
            transition="color 0.2s"
          >
            <Icon as={FaLinkedin} boxSize={5} />
            <VisuallyHidden>LinkedIn</VisuallyHidden>
          </Link>
          <Link 
            href="https://github.com/javierlimt6" 
            isExternal
            color="gray.500"
            _hover={{ color: 'white' }}
            transition="color 0.2s"
          >
            <Icon as={FaGithub} boxSize={5} />
            <VisuallyHidden>GitHub</VisuallyHidden>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
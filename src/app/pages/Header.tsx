
import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Flex, 
  Heading, 
  HStack, 
  Link, 
  Text,
  Icon,
  VisuallyHidden
} from '@chakra-ui/react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Header = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box 
      as="header" 
      w="full" 
      py={6} 
      position="fixed" 
      top={0} 
      zIndex={50} 
      backdropFilter="blur(12px)" 
      bg="rgba(0, 0, 0, 0.8)" 
      borderBottom="1px solid rgba(255, 255, 255, 0.1)"
    >
      <Container maxW="7xl">
        <Flex align="center" justify="space-between">
          <Link href="#" textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <Heading 
              as="h1" 
              size="lg" 
              bgGradient="linear(to-r, blue.400, purple.400)"
              bgClip="text"
            >
              Javier Lim Jun Yi
            </Heading>
          </Link>
          
          <Flex align="center" gap={8}>
            <HStack gap={6} display={{ base: 'none', md: 'flex' }}>
              <Link href="#about" color="gray.300" _hover={{ color: 'white' }} transition="colors 0.2s">
                About
              </Link>
              <Link href="#experience" color="gray.300" _hover={{ color: 'white' }} transition="colors 0.2s">
                Experience
              </Link>
              <Link href="#projects" color="gray.300" _hover={{ color: 'white' }} transition="colors 0.2s">
                Projects
              </Link>
              <Link href="#leadership" color="gray.300" _hover={{ color: 'white' }} transition="colors 0.2s">
                Leadership
              </Link>
              <Link href="#awards" color="gray.300" _hover={{ color: 'white' }} transition="colors 0.2s">
                Awards
              </Link>
              <Link href="#life" color="gray.300" _hover={{ color: 'white' }} transition="colors 0.2s">
                Life
              </Link>
            </HStack>
            
            <HStack gap={4}>
              <Link 
                href="https://linkedin.com/in/jav-lim" 
                target="_blank" 
                rel="noopener noreferrer" 
                color="gray.300" 
                _hover={{ color: 'white' }} 
                transition="colors 0.2s"
              >
                <Icon as={FaLinkedin} boxSize={5} />
                <VisuallyHidden>LinkedIn</VisuallyHidden>
              </Link>
              <Link 
                href="https://github.com/javierlimt6" 
                target="_blank" 
                rel="noopener noreferrer" 
                color="gray.300" 
                _hover={{ color: 'white' }} 
                transition="colors 0.2s"
              >
                <Icon as={FaGithub} boxSize={5} />
                <VisuallyHidden>GitHub</VisuallyHidden>
              </Link>
              
              <Button 
                onClick={scrollToContact} 
                variant="outline" 
                colorScheme="blue"
                ml={4}
              >
                Contact Me
              </Button>
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;

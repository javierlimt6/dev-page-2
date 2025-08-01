import React, { useState } from 'react';
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
  VisuallyHidden,
  ChakraProvider, createSystem, defaultConfig
} from '@chakra-ui/react';
import { FaGithub, FaFileAlt, FaQuoteLeft, FaLinkedin, FaComments, FaTimes, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import About from './About';

interface HeaderProps {
  persona: string;
  onPersonaChange: (persona: string) => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
  showChat: boolean;
  onChatToggle: () => void;
}

const system = createSystem(defaultConfig);
const MotionBox = motion(Box);

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
    <ChakraProvider value={system}>
      <Box 
        as="header" 
        w="full" 
        py={4} 
        position="fixed" 
        top={0} 
        zIndex={50} 
        backdropFilter="blur(10px)" 
        bg="rgba(0, 0, 0, 0.8)" 
        borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      >
        <Container maxW="10xl">
          <Flex align="center" justify="space-between" wrap="wrap" gap={4} h="35px">
            {/* Name link that opens About modal */}
            <Link 
              href="#" 
              textDecoration="none" 
              colorPalette="teal"
              _hover={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                setShowAboutModal(true);
              }}
            >
              <Heading 
                fontWeight="bold"
                size="2xl" 
                colorPalette="cyan"
                _hover={{ color: 'cyan.300' }}
                transition="color 0.2s"
              >
                Javier Lim Jun Yi
              </Heading>
            </Link>
            
            {/* Rest of your existing header content */}
            <Flex align="center" gap={4} wrap="wrap">
              {/* Persona buttons */}
              <HStack gap={2} wrap="wrap">
                <Button
                  size="sm"
                  variant={persona === 'developer' ? 'solid' : 'outline'}
                  colorPalette="purple"
                  onClick={() => onPersonaChange('developer')}
                >
                  Computer Science
                </Button>
                <Button
                  size="sm"
                  variant={persona === 'entrepreneur' ? 'solid' : 'outline'}
                  colorPalette="orange"
                  onClick={() => onPersonaChange('entrepreneur')}
                >
                  Entrepreneurship
                </Button>
                <Button
                  size="sm"
                  variant={persona === 'video-creator' ? 'solid' : 'outline'}
                  colorPalette="green"
                  onClick={() => onPersonaChange('video-creator')}
                >
                  Hobbies & Others
                </Button>
              </HStack>
            </Flex>

            {/* Social links */}
            <HStack gap={3} display={{ base: 'none', md: 'flex' }}>
              <Link href="/resume.pdf" target="_blank" _hover={{ textDecoration: 'none' }}>
                <Button 
                  variant="solid" 
                  size="md"
                  colorPalette="cyan"
                  color="white"
                >
                  <Icon as={FaFileAlt} mr={2} />
                  Resume
                </Button>
              </Link>
              <Link href="/testimonials.pdf" target="_blank" _hover={{ textDecoration: 'none' }}>
                <Button 
                  variant="solid" 
                  size="md"
                  color="white"
                  colorPalette="teal"
                  transition="all 0.3s ease"
                >
                  <Icon as={FaQuoteLeft} mr={2} />
                  Testimonials
                </Button>
              </Link>
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
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* About Modal */}
      {showAboutModal && (
        <MotionBox
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.8)"
          backdropFilter="blur(10px)"
          zIndex={2000}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAboutModal(false)}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <MotionBox
            maxW="90vw"
            maxH="90vh"
            w="full"
            bg="rgba(0, 0, 0, 0.9)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="xl"
            p={8}
            overflow="auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Flex justify="flex-end" mb={4}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAboutModal(false)}
                color="white"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
              >
                <Icon as={FaTimes} />
              </Button>
            </Flex>

            {/* About content */}
            <About />
          </MotionBox>
        </MotionBox>
      )}
    </ChakraProvider>
  );
};

export default Header;

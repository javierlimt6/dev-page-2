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
  VisuallyHidden,
  ChakraProvider, createSystem, defaultConfig
} from '@chakra-ui/react';
import { FaGithub, FaInstagram, FaLinkedin, FaComments, FaTimes, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

interface HeaderProps {
  persona: string;
  onPersonaChange: (persona: string) => void;
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
  showChat: boolean;
  onChatToggle: () => void;
}

const system = createSystem(defaultConfig);

const Header: React.FC<HeaderProps> = ({
  persona,
  onPersonaChange,
  voiceEnabled,
  onVoiceToggle,
  showChat,
  onChatToggle
}) => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <Link colorPalette='teal' href="#" textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Heading 
                fontWeight="bold"
                size="2xl" 
                colorPalette='cyan'
              >
                Javier Lim Jun Yi
              </Heading>
            </Link>
            
            <Flex align="center" gap={4} wrap="wrap">
              {/* Persona Switching Buttons */}
              <HStack gap={2} wrap="wrap">
                <Button
                  size="sm"
                  variant={persona === 'developer' ? 'solid' : 'outline'}
                  colorScheme="blue"
                  onClick={() => onPersonaChange('developer')}
                >
                  Computer Science
                </Button>
                <Button
                  size="sm"
                  variant={persona === 'entrepreneur' ? 'solid' : 'outline'}
                  colorScheme="orange"
                  onClick={() => onPersonaChange('entrepreneur')}
                >
                  Entrepreneurship
                </Button>
                <Button
                  size="sm"
                  variant={persona === 'video-creator' ? 'solid' : 'outline'}
                  colorScheme="purple"
                  onClick={() => onPersonaChange('video-creator')}
                >
                  Hobbies & Others
                </Button>
              </HStack>

              {/* Voice and Chat Controls */}
              <HStack gap={2}>
                <Button
                  size="sm"
                  variant={voiceEnabled ? 'solid' : 'outline'}
                  colorScheme="green"
                  onClick={onVoiceToggle}
                  leftIcon={<Icon as={voiceEnabled ? FaMicrophone : FaMicrophoneSlash} />}
                >
                  Voice {voiceEnabled ? 'On' : 'Off'}
                </Button>
                
                <Button
                  size="sm"
                  variant={showChat ? 'solid' : 'outline'}
                  colorScheme="cyan"
                  onClick={onChatToggle}
                  leftIcon={<Icon as={showChat ? FaTimes : FaComments} />}
                >
                  {showChat ? 'Close Chat' : 'Open Chat'}
                </Button>
              </HStack>
              
              {/* Social Links */}
              <HStack gap={3} display={{ base: 'none', md: 'flex' }}>
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
                  size="sm"
                >
                  Contact Me
                </Button>
              </HStack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default Header;

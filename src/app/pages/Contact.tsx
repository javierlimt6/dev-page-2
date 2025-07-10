import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Input, 
  Textarea, 
  Heading, 
  Text, 
  Grid, 
  GridItem, 
  Container, 
  VStack, 
  HStack, 
  Link,
  Icon
} from '@chakra-ui/react';
import { FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box as="section" id="contact" py={16} px={4} bg="rgba(255, 255, 255, 0.05)">
      <Container maxW="5xl">
        <VStack gap={8}>
          <Heading as="h2" size="2xl" textAlign="center">
            Contact Me
          </Heading>
          <Text fontSize="lg" textAlign="center" color="gray.400">
            Let's chat 😊
          </Text>
          
          <Box 
            w="full"
            bg="rgba(255, 255, 255, 0.1)" 
            backdropFilter="blur(10px)" 
            p={8} 
            borderRadius="xl"
            border="1px solid rgba(255, 255, 255, 0.2)"
          >
            <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={8}>
              <GridItem>
                <VStack align="start" gap={6}>
                  <HStack gap={3}>
                    <Icon as={FaEnvelope} color="blue.400" boxSize={6} />
                    <Heading as="h3" size="lg">
                      Get in Touch
                    </Heading>
                  </HStack>
                  <Text mb={4}>
                    Interested in working together or have a question? Send me a message and I'll get back to you as soon as possible.
                  </Text>
                  <Text color="gray.400">
                    Alternatively, you can contact me directly at{' '}
                    <Link href="mailto:javier.lim@u.nus.edu" color="blue.400" _hover={{ textDecoration: 'underline' }}>
                      javier.lim@u.nus.edu
                    </Link>
                  </Text>
                </VStack>
              </GridItem>
              
              <GridItem>
                <form onSubmit={handleSubmit}>
                  <VStack gap={6}>
                    <Input
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      bg="rgba(255, 255, 255, 0.1)"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      _placeholder={{ color: 'gray.400' }}
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      bg="rgba(255, 255, 255, 0.1)"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      _placeholder={{ color: 'gray.400' }}
                    />
                    <Textarea
                      placeholder="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      bg="rgba(255, 255, 255, 0.1)"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      _placeholder={{ color: 'gray.400' }}
                      resize="none"
                    />
                    <Button 
                      type="submit" 
                      loading={isSubmitting}
                      colorScheme="blue"
                      size="lg"
                      w="full"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </VStack>
                </form>
              </GridItem>
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact;

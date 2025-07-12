import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Link, 
  VStack, 
  HStack,
  Grid,
  GridItem,
  List,
  ListItem,
} from '@chakra-ui/react';
import { FaRocket, FaLock, FaFire, FaUsers, FaGamepad, FaBrain, FaCheckCircle, FaLightbulb, FaHeart, FaCheck } from 'react-icons/fa';

const Startup = () => {
  const cardBg = "rgba(255, 255, 255, 0.08)";
  const cardBorder = "rgba(255, 255, 255, 0.12)";
  const textSecondary = "gray.300";
  const textMuted = "gray.400";

  return (
    <Box as="section" id="startup" py={16} px={4}>
      <Container maxW="6xl">
        <VStack gap={8} align="stretch">
          {/* Header */}
          <VStack gap={4} textAlign="center">
            <Heading as="h1" size="4xl" color={textSecondary}>
              🐉 Chimera: work in progress
            </Heading>
            <Text fontSize="lg" color={textSecondary} maxW="4xl" fontStyle="italic">
              Empowering the next generation to take charge of their digital lives, Chimera is on a mission to transform how young people engage with technology—moving them from passive consumers to confident creators and leaders.
            </Text>
          </VStack>


          {/* Mission Section */}
          <Box
            bg={cardBg}
            backdropFilter="blur(20px)"
            p={{ base: 6, md: 8 }}
            borderRadius="2xl"
            border={`1px solid ${cardBorder}`}
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
          >
            <VStack gap={4} align="stretch">
              <HStack gap={3}>
                <Heading as="h2" size="lg" color="blue.400">
                  Our Mission
                </Heading>
              </HStack>
              <Text fontSize="md" lineHeight="1.7" color={textSecondary}>
                <Text as="span" fontWeight="bold">
                  Democratizing access to meaningful digital routines and entrepreneurial tools for youth.
                </Text>{' '}
                We believe every young person deserves the power to shape their digital habits and launch their ideas into the world.
              </Text>
            </VStack>
          </Box>

          {/* Where We Are Now */}
          <VStack gap={6} align="stretch">
            <VStack gap={3}>
              <Heading as="h2" size="xl" color="orange.400">
                Where We Are Now
              </Heading>
              <Text color={textMuted} textAlign="center">
                We are actively developing and refining two flagship platforms, each designed to address a critical aspect of youth digital empowerment:
              </Text>
            </VStack>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
              {/* Lokode Card */}
              <GridItem>
                <Box 
                  bg={cardBg}
                  backdropFilter="blur(20px)"
                  p={{ base: 6, md: 8 }}
                  borderRadius="2xl"
                  border={`1px solid ${cardBorder}`}
                  h="full"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    borderColor: "rgba(255, 255, 255, 0.2)"
                  }}
                >
                  <VStack gap={4} align="stretch" h="full">
                    <HStack gap={3}>
                      <VStack align="start" gap={1}>
                        <Heading as="h3" size="lg" color="cyan.400">
                          Lokode
                        </Heading>
                        <Text fontSize="md" color={textMuted} fontStyle="italic">
                          Redefining Digital Focus for Students and Young Professionals
                        </Text>
                      </VStack>
                    </HStack>
                    
                    <Text fontSize="sm" lineHeight="1.6" color={textSecondary}>
                      Lokode is a transformative app-locking solution that empowers users to take control of their digital habits—no NFC hardware required. By scanning a QR code in shared spaces like libraries or classrooms, users can instantly lock distracting apps on their phones, fostering accountability and focus in a community-driven way.
                    </Text>

                    {/* <VStack gap={2} align="stretch">
                      <Text fontWeight="bold" fontSize="sm" color="cyan.300">
                        Key Features:
                      </Text>
                      <List.Root gap={1}>
                        <ListItem fontSize="sm" color={textSecondary}>
                          QR code-based app locking
                        </ListItem>
                        <ListItem fontSize="sm" color={textSecondary}>
                          Works on any smartphone
                        </ListItem>
                        <ListItem fontSize="sm" color={textSecondary}>
                          Perfect for group study
                        </ListItem>
                        <ListItem fontSize="sm" color={textSecondary}>
                          Simple, privacy-first
                        </ListItem>
                      </List.Root>
                    </VStack> */}

                    <Link 
                      href="https://lokode.chimera.sg" 
                      color="cyan.400" 
                      _hover={{ color: "cyan.300" }}
                      fontWeight="bold"
                      fontSize="sm"
                      mt="auto"
                    >
                      Learn more about Lokode →
                    </Link>
                  </VStack>
                </Box>
              </GridItem>

              {/* BlazeUp Card */}
              <GridItem>
                <Box 
                  bg={cardBg}
                  backdropFilter="blur(20px)"
                  p={{ base: 6, md: 8 }}
                  borderRadius="2xl"
                  border={`1px solid ${cardBorder}`}
                  h="full"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    borderColor: "rgba(255, 255, 255, 0.2)"
                  }}
                >
                  <VStack gap={4} align="stretch" h="full">
                    <HStack gap={3}>
                      <VStack align="start" gap={1}>
                        <Heading as="h3" size="lg" color="orange.400">
                          ⚡ BlazeUp
                        </Heading>
                        <Text fontSize="md" color={textMuted} fontStyle="italic">
                          The Last Morning Routine App You Will Need
                        </Text>
                      </VStack>
                    </HStack>
                    
                    <Text fontSize="sm" lineHeight="1.6" color={textSecondary}>
                      BlazeUp is a mobile-first productivity platform built for Gen Z and Millennials in fast-paced environments. It is meticulously designed to help users establish consistent, effective morning routines by overcoming digital distractions, leveraging social accountability, and gamifying habit formation.
                    </Text>

                    {/* <VStack gap={2} align="stretch">
                      <Text fontWeight="bold" fontSize="sm" color="orange.300">
                        Key Features:
                      </Text>
                      <List.Root gap={1}>
                        <ListItem fontSize="sm" color={textSecondary}>
                          AI-Powered Routine Intelligence
                        </ListItem>
                        <ListItem fontSize="sm" color={textSecondary}>
                          Enforced Distraction Blocking
                        </ListItem>
                        <ListItem fontSize="sm" color={textSecondary}>
                          Social Accountability
                        </ListItem>
                        <ListItem fontSize="sm" color={textSecondary}>
                          Gamified Habit Formation
                        </ListItem>
                      </List.Root>
                    </VStack> */}

                    <Link 
                      href="https://chimeraapp.net" 
                      color="orange.400" 
                      _hover={{ color: "orange.300" }}
                      fontWeight="bold"
                      fontSize="sm"
                      mt="auto"
                    >
                      Discover BlazeUp →
                    </Link>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </VStack>

          {/* Why Youth-Focused Section */}
          <Box
            bg={cardBg}
            backdropFilter="blur(20px)"
            p={{ base: 6, md: 8 }}
            borderRadius="2xl"
            border={`1px solid ${cardBorder}`}
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
          >
            <VStack gap={4} align="stretch">
              <HStack gap={3}>
                <Heading as="h2" size="lg" color="purple.400">
                  Why Youth-Focused Tech Solutions?
                </Heading>
              </HStack>
              <Text fontSize="md" lineHeight="1.7" color={textSecondary}>
                Three-quarters of people aged 15-24 are active internet users, yet the gap between digital engagement and meaningful empowerment remains wide. Lokode and BlazeUp are designed to bridge this gap—helping youth build healthy digital routines and become creators, not just consumers.
              </Text>
            </VStack>
          </Box>

          {/* Vision Section */}
          <Box
            bg={cardBg}
            backdropFilter="blur(20px)"
            p={{ base: 6, md: 8 }}
            borderRadius="2xl"
            border={`1px solid ${cardBorder}`}
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
          >
            <VStack gap={4} align="stretch">
              <HStack gap={3}>
                <Heading as="h2" size="lg" color="green.400">
                  Our Vision
                </Heading>
              </HStack>
              <Text fontSize="md" lineHeight="1.7" color={textSecondary}>
                We are committed to driving solutions to solve real problems people face.
              </Text>
            </VStack>
          </Box>

          {/* Call to Action */}
          <Box 
            bg="rgba(59, 130, 246, 0.1)"
            backdropFilter="blur(20px)"
            p={{ base: 6, md: 8 }}
            borderRadius="2xl"
            border="1px solid rgba(59, 130, 246, 0.3)"
            textAlign="center"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
              borderColor: "rgba(59, 130, 246, 0.5)"
            }}
          >
            <VStack gap={4}>
              <Heading as="h2" size="xl" color="blue.400">
                Ready to Join the Movement?
              </Heading>
              <VStack gap={2}>
                <Text fontSize="md" color={textSecondary}>
                  <Text as="span" fontWeight="bold">If this sounds interesting</Text>—Contact me on LinkedIn/Email
                </Text>
                <Text fontSize="md" color={textSecondary}>
                  <Text as="span" fontWeight="bold">Join Chimera.</Text>
                </Text>
                <Text fontSize="md" color={textSecondary}>
                  <Text as="span" fontWeight="bold">Be part of a new generation</Text> of digital creators.
                </Text>
              </VStack>
              <Text fontSize="sm" color={textMuted} fontStyle="italic" pt={2}>
                Building the future of youth digital empowerment—one routine, one idea, one empowered user at a time.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Startup;
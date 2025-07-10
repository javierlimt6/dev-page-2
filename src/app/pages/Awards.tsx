import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  Icon,
  Flex,
  VStack
} from '@chakra-ui/react';
import { FaAward } from 'react-icons/fa';

const awards = [
    {
        id: 1,
        title: "Hackathon Enthusiast",
        subtitle: "Various Hackathons & Competitions",
        description: "Hack & Roll 2025, Hack 4 Good 2024, SAFMC 2021: Finalist Team, Cyberthon 2021: Commendation Award (9th Team Placing)"
      },
      {
        id: 2,
        title: "Pitching Competitions",
        subtitle: "RC4 Pitching Competition",
        description: "Pitched Chimera to various judges, including a Stanford professor from Silicon Valley for a $10,000 grant funded by NUS Enterprise"
      },
      {
        id: 3,
        title: "Serial Olympiad Medallist",
        subtitle: "Participating since 2016",
        description: "International Olympiads: IJMO 2018 (Bronze) SIMOC 2017 (Bronze, Rank 26) National Olympiads: 2x Distinctions, 2x Silver, 1x Bronze, 1x Credit"
      },
      {
        id: 4,
        title: "Sportsperson",
        subtitle: "Floorball",
        description: "Participated in national SFA Divisions 2 & 4 2022-2023, Inter-Faculty Games 2024 Gold, Inter-College Games 2025 Bronze"
      },
      {
        id: 5,
        title: "Sweaty Gamer",
        subtitle: "Tech Innovators",
        description: "Inter-College Games 2025: Super Smash Bros Ultimate (Gold), Foosball (Gold), FIFA Captain (Bronze), resident video game tryhard"
      }
];

const Awards = () => {
  const cardBg = "rgba(255,255,255,0.1)";

  return (
    <Box as="section" id="awards" py={20} position="relative" bgGradient="linear(to-r, blue.900, purple.900)">
      <Box 
        position="absolute" 
        inset="0" 
        bg="rgba(255,255,255,0.3)" 
        backdropFilter="blur(10px)" 
      />
      
      <Box maxW="5xl" mx="auto" position="relative" zIndex={1} px={{ base: 4, md: 8 }}>
        <Heading as="h2" size="2xl" textAlign="center" mb={4} color="white">Awards</Heading>
        <Text fontSize="lg" textAlign="center" mb={12} color="gray.300">I chase shiny stuffs (Do not take this section too seriously)</Text>
        
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
          {awards.map((award) => (
            <Flex 
              key={award.id} 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              border="1px solid rgba(255,255,255,0.2)"
              align="start"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              transition="transform 0.2s, box-shadow 0.2s"
            >
              <Icon as={FaAward} color="blue.400" boxSize={8} mr={4} flexShrink={0} />
              <VStack align="start" gap={1}>
                <Heading as="h3" size="md" color="white">{award.title}</Heading>
                <Text fontSize="sm" color="gray.400">{award.subtitle}</Text>
                <Text color="gray.300">{award.description}</Text>
              </VStack>
            </Flex>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Awards;
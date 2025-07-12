import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Container,
  Grid,
  Badge
} from '@chakra-ui/react';
import { FaGraduationCap, FaCode, FaBook, FaUsers, FaTrophy } from 'react-icons/fa';

const educationDetails = [
  {
    id: "degree",
    title: "Bachelor of Computer Science",
    institution: "National University of Singapore",
    period: "2024 onwards",
    icon: FaGraduationCap,
    color: "blue.400",
    description: "Pursuing a comprehensive degree in Computer Science with focus on software engineering, algorithms, and system design."
  },
  {
    id: "coursework",
    title: "Core Coursework",
    items: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Database Systems",
      "Computer Organisation",
      "Artificial Intelligence",
      "Programming Methodology"
    ],
    icon: FaCode,
    color: "green.400"
  },
  {
    id: "activities",
    title: "Academic Activities",
    items: [
      "2x NUS SoC Teaching Assistant for Programming Modules",
      "Software Engineering Lead @ RC4 CSC Tech",
      "Avid Hackathon Participant",
      "Winter School @ Korea University"
    ],
    icon: FaUsers,
    color: "purple.400"
  },
  {
    id: "achievements",
    title: "Academic Achievements",
    items: [
      "First Class Honours",
      "Testimonials from >5 NUS Professors"
    ],
    icon: FaTrophy,
    color: "orange.400"
  }
];

const Education = () => {
  const cardBg = "rgba(255, 255, 255, 0.08)";
  const cardBorder = "rgba(255, 255, 255, 0.12)";

  return (
    <Box as="section" id="education" py={16} px={4}>
      <Container maxW="6xl">
        <VStack gap={8}>
          {/* Header */}
          <VStack gap={4} textAlign="center">
            <Heading as="h2" size="2xl" bgGradient="linear(to-r, blue.400, purple.400)" bgClip="text">
              🎓 Education
            </Heading>
            <Text fontSize="lg" color="gray.300" maxW="2xl">
              My academic journey at one of Asias leading universities
            </Text>
          </VStack>

          {/* Main Education Card */}
          <Box
            bg={cardBg}
            backdropFilter="blur(20px)"
            p={8}
            borderRadius="xl"
            border={`1px solid ${cardBorder}`}
            w="full"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
          >
            <VStack gap={6}>
              <HStack gap={4} align="center">
                <Icon as={FaGraduationCap} color="blue.400" boxSize={10} />
                <VStack align="start" gap={1}>
                  <Heading as="h3" size="xl" color="blue.400">
                    Bachelor of Computer Science
                  </Heading>
                  <Text fontSize="lg" color="gray.300" fontWeight="semibold">
                    National University of Singapore
                  </Text>
                  <Badge colorScheme="blue" size="md">
                    Since 2024
                  </Badge>
                </VStack>
              </HStack>
              
              <Text color="gray.300" fontSize="md" textAlign="center" lineHeight="1.6">
                Pursuing a comprehensive degree in Computer Science with focus on software engineering, 
                algorithms, and system design.
              </Text>
            </VStack>
          </Box>

          {/* Education Details Grid */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} w="full">
            {educationDetails.slice(1).map((detail) => (
              <Box
                key={detail.id}
                bg={cardBg}
                backdropFilter="blur(20px)"
                p={6}
                borderRadius="xl"
                border={`1px solid ${cardBorder}`}
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
              >
                <VStack gap={4} align="start">
                  <HStack gap={3}>
                    <Icon as={detail.icon} color={detail.color} boxSize={6} />
                    <Heading as="h3" size="md" color={detail.color}>
                      {detail.title}
                    </Heading>
                  </HStack>
                  
                  <VStack gap={2} align="start" w="full">
                    {detail.items?.map((item, index) => (
                      <Text key={index} color="gray.300" fontSize="sm" lineHeight="1.5">
                        • {item}
                      </Text>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            ))}
          </Grid>

          {/* NUS Highlight */}
          <Box
            bg="linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
            backdropFilter="blur(20px)"
            p={6}
            borderRadius="xl"
            border={`1px solid ${cardBorder}`}
            w="full"
            textAlign="center"
          >
            <VStack gap={3}>
              <Heading as="h2" size="lg" color="white">
                Why NUS?
              </Heading>
              <Text color="gray.300" fontSize="md" lineHeight="1.6">
                Ranked #1 in Asia and #8 globally on the QS Rankings, NUS provides world-class education, 
                cutting-edge research opportunities, and a vibrant tech ecosystem in Singapore.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Education;
import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  Card,
  CardBody,
  Flex,
  Link,
  Icon,
  HStack
} from '@chakra-ui/react';
import { FaMedal, FaLaptopCode, FaChartLine, FaHandshake, FaExternalLinkAlt } from 'react-icons/fa';

const leadershipItems = [
  {
    id: "floorball-ig-head",
    title: "Head of RC4Floorball",
    description: "Provides leadership for the floorball team, organising training sessions, fostering teamwork, and strategising for competitions. Organised a workshop introducing 30+ residents to pick up the sport. Won 2nd Runner-Up at Inter-College Games 2025 🏆",
    icon: FaMedal,
  },
  {
    id: "csc-swe",
    title: "Lead Software Engineer of RC4 CSCTech",
    description: "Leads software development projects, manages team tasks, and ensures the delivery of high-quality technical solutions in the RC. Now actively involved in 2 projects 💻",
    icon: FaLaptopCode,
  },
  {
    id: "rc4-entre",
    title: "Financial Executive for RC4 Entrepreneurship Club",
    description: "Promoting entrepreneurship in Resident College 4. Organised events like the Startup Carnival, connecting RC4 residents with startups based in NUS, and a Pitching Clinic where over 40 participants gained valuable insights on crafting compelling pitches, capturing investor interest, and scaling big ideas. 🚀🌱",
    icon: FaChartLine,
    link: "https://www.linkedin.com/company/rc4-entre/",
  },
  {
    id: "startup-nes",
    title: "Startup Member at NUS Entrepreneurship Society",
    description: "Engages in a vibrant entrepreneurial community, leveraging mentorship, exclusive events, and resources to develop and scale Chimera. 💪🏼",
    icon: FaHandshake,
    link: "https://www.linkedin.com/posts/nusentresoc_nus-entrepreneurship-societys-nes-partnerships-activity-7299824429650382850-F90N?utm_source=share&utm_medium=member_desktop&rcm=ACoAADvJz1ABqDtwMiYc8SS8kXGVbDXhzvviY_A",
    linktext: "Details"
  }
];

const Leadership = () => {
  const cardBg = "rgba(255,255,255,0.1)";

  return (
    <Box as="section" id="leadership" py={20}>
      <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }}>
        <Heading as="h2" size="2xl" textAlign="center" mb={4}>Leadership & Activities</Heading>
        <Text fontSize="lg" textAlign="center" mb={12}>Things I am passionate about</Text>
        
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
          {leadershipItems.map((item) => (
            <Box 
              key={item.id} 
              bg={cardBg} 
              backdropFilter="blur(10px)" 
              borderRadius="xl" 
              overflow="hidden" 
              border="1px solid rgba(255,255,255,0.2)"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              transition="transform 0.2s, box-shadow 0.2s"
              p={6}
            >
              <HStack align="start" gap={4}>
                <Flex bg="blue.500" p={3} borderRadius="lg" color="white">
                  <Icon as={item.icon} boxSize={8} />
                </Flex>
                <Box flex="1">
                  <Flex justify="space-between" align="start" mb={2}>
                    <Heading as="h3" size="md">{item.title}</Heading>
                    {item.link && (
                      <Link 
                        href={item.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        color="blue.400" 
                        _hover={{ color: "blue.300" }}
                        display="flex"
                        alignItems="center"
                        gap={1}
                        fontSize="sm"
                      >
                        {item.linktext || "Visit"} <Icon as={FaExternalLinkAlt} />
                      </Link>
                    )}
                  </Flex>
                  <Text color="gray.400">{item.description}</Text>
                </Box>
              </HStack>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Leadership;
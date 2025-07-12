
import React from 'react';
import { 
  Box, 
  Button, 
  Text, 
  Heading, 
  Grid, 
  GridItem, 
  Stack, 
  Flex, 
  Badge, 
  Link,
  Container,
  Icon
} from '@chakra-ui/react';
import { FaFileAlt } from 'react-icons/fa';

const About = () => {
  return (
    <Box as="section" id="about" py={16} px={4}>
      <Container maxW="6xl">
        <Heading as="h2" size="2xl" textAlign="center" mb={12}>
          About Me
        </Heading>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={12}>
          <GridItem>
            <Stack gap={6}>
              <Text fontSize="lg">
                Welcome to my page! I am an entrepreneur & software engineer with expertise in building innovative digital solutions. 
                I combine technical skills with product development to create solutions for real-world problems.
              </Text>
              <Text fontSize="lg">
                With experience in both startups and established companies, I have developed a keen eye for identifying opportunities
                and turning them into successful ventures. My technical background allows me to understand the complexities of
                development, while my entrepreneurial mindset helps me see the bigger picture.
              </Text>
              <Text fontSize="lg">
                I am constantly learning and exploring new technologies to stay ahead of the curve. When I am not 
                building and realising ideas, you will find me playing floorball, traveling, or trying something new and exciting.
              </Text>

              <Box>
                <Flex align="center" gap={4}>
                  <Link href="/resume.pdf" target="_blank" _hover={{ textDecoration: 'none' }}>
                    <Button 
                      variant="solid" 
                      size="lg"
                      colorPalette="blue"
                      color="white"
                    >
                      <Icon as={FaFileAlt} mr={2} />
                      Resume
                    </Button>
                  </Link>
                </Flex>
              </Box>
            </Stack>
          </GridItem>
          
          <GridItem>
            <Box 
              bg="rgba(255, 255, 255, 0.1)" 
              backdropFilter="blur(10px)" 
              p={8} 
              borderRadius="xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
            >
              <Heading as="h3" size="lg" mb={6}>
                Skills & Expertise
              </Heading>
              
              <Stack gap={6}>
                <Box>
                  <Stack gap={3}>
                    <Box>
                      <Text fontWeight="medium">
                        Bachelors in Computer Science
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        National University of Singapore, 2024-2028
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        Second Major in Data Analytics, First Class Honours
                      </Text>
                    </Box>
                  </Stack>
                </Box>

                <Box>
                  <Heading as="h4" size="md" mb={3}>
                    Languages
                  </Heading>
                  <Flex wrap="wrap" gap={2}>
                    {["Python", "JavaScript", "TypeScript", "Java", "C/C++", "MIPS/ASM", "HTML/CSS", "SQL", "PHP"].map((skill) => (
                      <Badge key={skill} colorScheme="blue" px={3} py={1} borderRadius="full">
                        {skill}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
                
                <Box>
                  <Heading as="h4" size="md" mb={3}>
                    Technical Skills
                  </Heading>
                  <Flex wrap="wrap" gap={2}>
                    {[ "Flask", "React", "React Native", 
                    "Django", "Express.js", "Laravel",
                    "GCP", "Git", "Docker",
                    "MongoDB", "PostgreSQL", "Supabase",
                    "Matplotlib", "NumPy", "pandas", 
                    "Pygame", "Cocos", "PIM", 
                    "FASTApi", "Axios"
                  ].map((skill) => (
                      <Badge key={skill} colorScheme="green" px={3} py={1} borderRadius="full">
                        {skill}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              </Stack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;

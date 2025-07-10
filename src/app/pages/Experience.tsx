import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  Link,
  Image,
  Badge,
  Icon,
  Stack,
  VStack,
  HStack
} from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const experiences = [
  {
    id: 1,
    title: "Co-Founder",
    company: "Chimera",
    period: "Jan 2025 - Present",
    description: "Co-founded a productivity app startup to empowers youths to be consistent in their morning routine. Led product development, technology stack decisions, and managing a team of developers. Participated in RC4 Pitching Competition (awaiting results) and applying for accelerator programs like BLK71 and VIP@SoC.",
    technologies: ["React Native", "Django", "TypeScript", "Python", "React", "Supabase"],
    photoUrl: "/images/chimera-logo.png",
    link: "https://chimeraapp.net",
    linktext: "Landing Page"
  },
  {
    id: 2,
    title: "Incoming Full Stack Software Engineering Intern",
    company: "CloudJoi",
    period: "May 2025 - Aug 2025",
    description: "Under the NUS Overseas College Malaysia program, CloudJoi is the largest ticketing platform for performing arts in Malaysia dedicated to making shows accessible for all.",
    technologies: ["JavaScript", "PHP", "React", "Laravel"],
    photoUrl: "/images/cloudjoi-logo.png",
    link: "https://www.linkedin.com/company/cloudjoi/",
    linktext: "Linkedin"
  },
  {
    id: 3,
    title: "Teaching Assistant for CS1010X: Programming Methodology",
    company: "NUS School Of Computing",
    period: "Jan 2025 - Present",
    description: "Given sole responsibility of rebuilding lesson materials and assignment files. Updated deprecated content from Python 3.7 to 3.13, improving GUI and translating code from Cocos to Pygame, utilising GIMPS to rectify faulty sRGB profiles, removing problematic metadata. 2D Runes Contest Head IC.",
    technologies: ["Python", "Pygame", "Cocos", "GIMPS", "PIM"],
    photoUrl: "/images/soc-logo.png",
    link: "https://nusmods.com/courses/CS1010X/programming-methodology",
    linktext: "Module"
  },
  {
    id: 4,
    title: "Teaching Assistant for SWS3001: Solving Real World Problems with Computational Thinking",
    company: "NUS School Of Computing",
    period: "May 2024 - July 2024",
    description: "SWS3001 is a course under the NUS School of Computing Summer Workshop, an annual program designed for undergraduate students in fields like Computer Science. It is a project-based, hands-on course aimed at equipping participants with knowledge on how to solve problems computationally. Mentored a class of 20+ Y3 International students, conducted tutorials and graded projects and presentations.",
    technologies: ["Teaching", "Graphs", "Computational Intelligence"],
    photoUrl: "/images/soc-logo.png",
    link: "https://sws.comp.nus.edu.sg/Solving-with-CT.html",
    linktext: "Module"
  },
  {
    id: 5,
    title: "Software Engineering Intern",
    company: "Strive Math (YC S21)",
    period: "Jan 2024 - Jun 2024",
    description: "Worked with YC S21-backed, Forbes 30 Under 30 Asia 2024-recognised EdTech startup. Developed interactive simulations with p5.js illustrating Grade 8 math concepts for 10k students. Leveraged TinaCMS to integrate content management with modern development practices. Developed modular and reusable codebases for educational games, incorporating OOP, FP, event-driven programming, and real-time user interaction handling. Designed and executed structured Python programming workshops across multiple international schools",
    technologies: ["Python", "JavaScript", "p5", "Game Development", "Startup Development", "OOP", "CMS", "FP"],
    photoUrl: "/images/strive-logo.png",
    link: "https://www.linkedin.com/company/strivemath",
    linktext: "LinkedIn"
  },
  {
    id: 6,
    title: "Content Creation Intern",
    company: "Indigo Education Group",
    period: "Jan 2022 - Mar 2022",
    description: "Produced engaging creative content for social media platforms, successfully garnering over 150,000+ views. Edited and produced educational videos explaining complex chemistry topics in a clear and concise manner. Enhanced professional video editing skills through hands-on experience with advanced editing tools and techniques.",
    technologies: ["Video Editing", "Content Creation", "Premiere Pro", "TikTok"],
    photoUrl: "/images/indigo-logo.png",
    link: "https://www.youtube.com/watch?v=xSIMkIcUG88",
    linktext: "Video"
  },
  {
    id: 7,
    title: "AI Researcher",
    company: "A*Star Institute for Infocomm Research",
    period: "Nov 2020 - Jan 2021",
    description: "Research attachment at Singapore’s leading research organisation to enhance PCR result detection Extracted and analysed datasets via Matplotlib, NumPy, & pandas, and used EMA to determine sigmoidal curves from plot points and establish thresholds. Produced numerous algorithms with 100% detection accuracy, tested with evaluation datasets.",
    technologies: ["Python", "matplotlib", "numPy", "pandas", "Jupyter Notebook", "Artificial Intelligence Models"],
    photoUrl: "/images/astar-logo.png",
    link: "https://docs.google.com/document/d/1U8SppCYAukq6ENivelJUjRhaeYUOyQ706bFg3vP2BOA/edit?usp=sharing",
    linktext: "Report"
  }
];

const Experience = () => {
  const cardBg = "rgba(255,255,255,0.1)";

  return (
    <Box as="section" id="experience" py={20}>
      <Box maxW="5xl" mx="auto" px={{ base: 4, md: 8 }}>
        <Heading as="h2" size="2xl" textAlign="center" mb={4}>Experience</Heading>
        <Text fontSize="lg" textAlign="center" mb={12}>My Professional Journey.</Text>
        
        <Stack gap={8}>
          {experiences.map((exp) => (
            <Box 
              key={exp.id} 
              bg={cardBg} 
              backdropFilter="blur(10px)" 
              borderRadius="xl" 
              overflow="hidden" 
              border="1px solid rgba(255,255,255,0.2)"
              direction={{ base: 'column', md: 'row' }}
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              transition="transform 0.2s, box-shadow 0.2s"
              display="flex"
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Flex 
                p={6} 
                bg="rgba(0,0,0,0.1)" 
                justify="center" 
                align="center" 
                textAlign="center" 
                borderRight={{ md: "1px solid rgba(255,255,255,0.2)" }}
                w={{ base: 'full', md: '200px', lg: '250px' }}
              >
                <VStack>
                  <Box boxSize="80px" mb={4} borderRadius="full" overflow="hidden">
                    <Image 
                      src={exp.photoUrl} 
                      alt={`${exp.company} logo`} 
                      objectFit="cover"
                      boxSize="100%"
                    />
                  </Box>
                  <Heading as="h3" size="md">{exp.company}</Heading>
                  <Text color="gray.400">{exp.period}</Text>
                </VStack>
              </Flex>
              
              <Box p={6}>
                <Flex justify="space-between" align="center" mb={3}>
                  <Heading as="h3" size="lg">{exp.title}</Heading>
                  {exp.link && (
                    <Link 
                      href={exp.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      color="blue.400" 
                      _hover={{ color: "blue.300" }}
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      {exp.linktext || "Visit"} <Icon as={FaExternalLinkAlt} />
                    </Link>
                  )}
                </Flex>
                <Text mb={4}>{exp.description}</Text>
                
                <HStack gap={2} wrap="wrap">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} colorScheme="blue" px={3} py={1} borderRadius="full">
                      {tech}
                    </Badge>
                  ))}
                </HStack>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Experience;
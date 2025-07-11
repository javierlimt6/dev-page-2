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
  HStack
} from '@chakra-ui/react';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import { knowledgeBase } from '../../services/knowledge';

const lokodeDescription = "After trying popular focus apps like Brick and Bloom, I was shocked by how much they charge just to help you not use your phone—how can you pay so much money just to stay off your device? That frustration led me to build Lokode, the first 100% free iOS app that uses QR code locking to maximise your focus, with no paywalls or subscriptions. Lokode lets users instantly lock and unlock their devices using advanced QR code generation and scanning, leveraging CoreImage and ScreenTime APIs for seamless operation. I built secure Google OAuth authentication via Supabase, with customisation options and an emergency unlock feature for user management. Real-time interactive analytics dashboards help users track their focus duration and productivity, while a responsive Next.js landing page drives engagement and iOS App Store promotion. Lokode is redefining digital wellbeing by proving you shouldn’t have to pay to stay focused."
const justDidDescription = "Inspired by Laura Vanderkam’s TED talk on the 168 hours study method, I realised this approach deserved a digital upgrade. So I built JustDid—a Chrome extension that lets you log productivity in short intervals, with all data stored locally for complete privacy. JustDid features a customisable focus timer, automatic context capture from your browsing history and searches, and GenAI-powered suggestions to help you work smarter. With easy export options (JSON, CSV, PDF) and a sleek React UI, JustDid brings the 168 hours method into the digital age for anyone who wants actionable, private productivity insights."
const knowledgeBaseDescription = "CloudJoi Knowledgebase is a dashboard helpdesk platform built 0→1 on Next.js and deployed via Vercel, supporting over 200 clients through a single, unified interface. Designed for fast, efficient client support, it centralises ticket management, knowledge articles, and client communications, making it easy for teams to resolve issues and share information at scale. With real-time analytics, a powerful search experience, and seamless multi-tenancy, CloudJoi Knowledgebase delivers a modern, reliable solution for growing client operations."

const projects = [
    {
        id: 1,
        title: "Lokode (iOS Scan to Focus App In Beta)",
        description: lokodeDescription,
        technologies: ["Swift", "TypeScript", "Next.js", "Supabase", "OAuth"],
        demoLink: "https://lokode.chimera.sg",
        githubLink: "#",
        image: "/images/lokode.png"
      },
      {
        id: 2,
        title: "JustDid (Productivity Chrome Extension)",
        description: justDidDescription,
        technologies: [
          "TypeScript",
          "React",
          "Vite",
          "Chrome Extension",
          "ManifestV3",
          "Tailwind CSS",
          "Chakra UI",
          "WebExtLLM",
          "GenAI",
          "Local Storage",
          "Custom APIs"
        ],
        demoLink: "#",
        githubLink: "https://github.com/javierlimt6/just-did-react",
        image: "/images/justdid.png"
      },
      {
        id: 3,
        title: "CloudJoi Knowledgebase",
        description: knowledgeBaseDescription,
        technologies: ["React", "Python", "FASTApi", "TypeScript", "Minimax", "Alpha-Beta Pruning", "Artifical Intelligence"],
        demoLink: "https://knowledgebase.cloudjoi.com",
        githubLink: "#",
        image: "/images/knowledgebase.png"
      },
      {
        id: 4,
        title: "2048 AI Solver",
        description: "Developed an intelligent AI solving the 2048 puzzle game using minimax algorithm with alpha-beta pruning. Implemented strategic heuristics including positional weighting, clustering penalties, and empty cell analysis. Created a depth-limited search algorithm balancing computational efficiency with strategic planning. Built a full-stack application with Python/FastAPI backend and React frontend connected via Axios to visualise the AI's decision-making process in real-time. The system achieves high scores, reaching the 2048 tile at >90% rate.",
        technologies: ["React", "Python", "FASTApi", "TypeScript", "Minimax", "Alpha-Beta Pruning", "Artifical Intelligence"],
        demoLink: "#",
        githubLink: "https://github.com/javierlimt6/2048solver",
        image: "/images/2048solver-logo.png"
      },
      {
        id: 5,
        title: "Chimera Landing Page",
        description: "React + Vite website to showcase Chimera and collect email addresses from interested beta testers. Hosted with Vercel + Supabase database",
        technologies: ["React", "TypeScript", "Supabase", "Vercel"],
        demoLink: "chimeraapp.net",
        githubLink: "https://github.com/javierlimt6/chimera-gathering-grove",
        image: "/images/chimera-banner.png"
      },
      {
        id: 6,
        title: "HalloweenBot",
        description: "Collaborating with various Residential Colleges to develop the HalloweenBot, a CRUD queue management system for Halloween-themed events across NUS RCs, impacting over 3000 students. Utilising PostgresSQL database for hosting & Python RESTful backend.",
        technologies: ["Python", "Telegram", "SQL", "PostgresSQL", "OOP"],
        demoLink: "#",
        githubLink: "#",
        image: "https://placehold.co/600x400/1f1f23/ffffff?text=Halloween+Bot"
      },
      {
        id: 7,
        title: "Personal Portfolio Website v1",
        description: "My previous portfolio website. Hosted with React Frontend, using Supabase to collect email addresses.",
        technologies: ["React", "Supabase", "TypeScript"],
        demoLink: "#",
        githubLink: "https://github.com/javierlimt6/chimera-gathering-grove",
        image: "/images/portfolio-banner.png"
      },
      {
        id: 8,
        title: "NYSecure | code4.ny",
        description: "The protocol for attendance taking in NYJC during a crisis was through filling up Google forms. Threats that trigger lockdowns in schools are real, and the protocol’s flaws could cause casualties in crucial moments. Convicted to change this, I gathered like-minded Computing classmates and initiated code4.ny, a project to code a web app to gather attendance during a crisis. The development process was not in our curriculum, thus we encountered issues surrounding UI plans, implementations, and database structures. Persevering through these setbacks was extremely challenging, but through it, we found new ways to adapt to new territories. Made an MVP application with a local database to present to our vice-principal.",
        technologies: ["Python", "JavaScript", "Airtable", "Flask"],
        demoLink: "#",
        githubLink: "https://github.com/javierlimt6/NYSecure",
        image: "https://placehold.co/600x400/1f1f23/ffffff?text=NYSecure"
      },
];

const Projects = () => {
  const cardBg = "rgba(255,255,255,0.1)";

  return (
    <Box as="section" id="projects" py={20}>
      <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }}>
        <Heading as="h2" size="2xl" textAlign="center" mb={4}>Projects</Heading>
        <Text fontSize="lg" textAlign="center" mb={12}>The itches I am scratching!</Text>
        
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
          {projects.map((project) => (
            <Box 
              key={project.id} 
              bg={cardBg} 
              backdropFilter="blur(10px)" 
              borderRadius="xl" 
              overflow="hidden" 
              border="1px solid rgba(255,255,255,0.2)"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              transition="transform 0.2s, box-shadow 0.2s"
            >
              <Box h="200px" overflow="hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  objectFit="cover"
                  w="full"
                  h="full"
                  transition="transform 0.5s"
                  _hover={{ transform: 'scale(1.10)' }}
                />
              </Box>
              
              <Box p={6}>
                <Heading as="h3" size="lg" mb={3}>{project.title}</Heading>
                <Text mb={4} color="gray.400" lineHeight="1.6">{project.description}</Text>
                
                <HStack gap={2} wrap="wrap" mb={4}>
                  {project.technologies.map((tech) => (
                    <Badge key={tech} colorScheme="blue" px={3} py={1} borderRadius="full">
                      {tech}
                    </Badge>
                  ))}
                </HStack>
              </Box>
              
              <Box px={6} pb={6} pt={0}>
                <HStack gap={4}>
                  {project.demoLink !== "#" && (
                    <Link 
                      href={project.demoLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      color="blue.400" 
                      _hover={{ textDecoration: 'underline' }}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      Check it out! <Icon as={FaArrowRight} />
                    </Link>
                  )}
                  {project.githubLink !== "#" && (
                    <Link 
                      href={project.githubLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      color="blue.400" 
                      _hover={{ textDecoration: 'underline' }}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      GitHub <Icon as={FaGithub} />
                    </Link>
                  )}
                </HStack>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Projects;
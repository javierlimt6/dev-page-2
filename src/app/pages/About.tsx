import React, { useEffect, useState } from 'react';
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
  Icon,
  Image,
  HStack
} from '@chakra-ui/react';
import { FaFileAlt, FaCode, FaTools, FaCog, FaDatabase } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionFlex = motion(Flex);

// Tech stack data with logos
const techStacks = {
  languages: [
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "C/C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
  ],
  frameworks: [
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Laravel", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/laravel.svg" },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
    { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
    { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
  ],
  devops: [
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg" },
    { name: "GCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Xcode", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg" }
  ],
  libraries: [
    { name: "Matplotlib", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
    { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "Pygame", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "SwiftUI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
    { name: "Inertia", logo: "https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/inertia.svg" },
    { name: "p5.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/p5js/p5js-original.svg" }
  ]
};

// Continuous Streaming Logo Component with Seamless Loop
const LogoStream = ({ items, direction = "left", speed = 60 }: { 
  items: any[], 
  direction?: "left" | "right",
  speed?: number 
}) => {
  // Triple the items to ensure seamless looping
  const tripleItems = [...items, ...items, ...items];
  
  // Calculate the width needed for one complete set of items
  const itemWidth = 90 + 24; // 90px minW + 24px gap (6 * 4px)
  const totalWidth = items.length * itemWidth;
  
  return (
    <Box overflow="hidden" position="relative" h="70px" w="100%">
      <MotionFlex
        animate={{ 
          x: direction === "left" 
            ? [-totalWidth, 0] 
            : [totalWidth, 0]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
        align="center"
        gap={6}
        position="absolute"
        top="0"
        left={direction === "left" ? "0" : `-${totalWidth}px`}
        whiteSpace="nowrap"
        w={`${totalWidth * 3}px`}
      >
        {tripleItems.map((item, index) => (
          <MotionBox
            key={`${item.name}-${index}`}
            textAlign="center"
            minW="90px"
            flex="none"
            whileHover={{ 
              scale: 1.1,
              filter: "drop-shadow(0 0 20px rgba(100, 255, 218, 0.6))"
            }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={item.logo}
              alt={item.name}
              boxSize="45px"
              mx="auto"
              mb={2}
              filter="drop-shadow(0 0 8px rgba(100, 255, 218, 0.3))"
            />
            <Text fontSize="xs" color="gray.300" fontWeight="medium">
              {item.name}
            </Text>
          </MotionBox>
        ))}
      </MotionFlex>
    </Box>
  );
};

// Continuous Streaming Text Component
const TextStream = ({ items, direction = "left", speed = 40 }: { 
  items: string[], 
  direction?: "left" | "right",
  speed?: number 
}) => {
  // Triple the items to ensure seamless looping
  const tripleItems = [...items, ...items, ...items];
  
  // Calculate the width needed for one complete set of items
  const itemWidth = 180 + 32; // Estimated width per item + gap
  const totalWidth = items.length * itemWidth;
  
  return (
    <Box overflow="hidden" position="relative" h="60px" w="100%">
      <MotionFlex
        animate={{ 
          x: direction === "left" 
            ? [-totalWidth, 0] 
            : [totalWidth, 0]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
        align="center"
        gap={8}
        position="absolute"
        top="0"
        left={direction === "left" ? "0" : `-${totalWidth}px`}
        whiteSpace="nowrap"
        w={`${totalWidth * 3}px`}
      >
        {tripleItems.map((item, index) => (
          <MotionBox
            key={`${item}-${index}`}
            textAlign="center"
            minW="180px"
            flex="none"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 20px rgba(100, 255, 218, 0.8)"
            }}
            transition={{ duration: 0.3 }}
          >
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              fontWeight="bold"
              color="gray.200"
              textShadow="0 0 10px rgba(100, 255, 218, 0.3)"
              background="linear-gradient(45deg, #64ffda, #a259f7, #ff6b6b)"
              backgroundClip="text"
              WebkitTextFillColor="transparent"
            >
              {item}
            </Text>
          </MotionBox>
        ))}
      </MotionFlex>
    </Box>
  );
};

// Enhanced Bio Header with "Hi, I'm Javier" Effect
const BioHeader = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  // Role/skill stream data
  const roleSkills = [
    "Entrepreneur",
    "Software Engineer", 
    "Leader",
    "Full Stack",
    "Mobile Development",
    "Databases",
    "System Design",
    "Media Production"
  ];

  useEffect(() => {
    const emojiTimer = setTimeout(() => setShowEmoji(true), 1500);
    const taglineTimer = setTimeout(() => setShowTagline(true), 2500);

    return () => {
      clearTimeout(emojiTimer);
      clearTimeout(taglineTimer);
    };
  }, []);

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    })
  };

  const nameAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.8, duration: 0.8, ease: "backOut" }
    }
  };

  return (
    <Box textAlign="center" mb={16} position="relative">
      {/* Animated Background Particles */}
      <Box position="absolute" top="-50px" left="0" right="0" bottom="0" zIndex={-1}>
        {[...Array(15)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            w="4px"
            h="4px"
            bg="rgba(100, 255, 218, 0.3)"
            borderRadius="full"
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </Box>

      {/* Main Greeting */}
      <MotionFlex
        justify="left"
        align="center"
        gap={4}
        mb={6}
        wrap="wrap"
      >
        {/* "Hi," with typing effect */}
        <MotionBox>
          {"Hi,".split("").map((letter, i) => (
            <MotionText
              key={i}
              as="span"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="bold"
              color="gray.200"
              custom={i}
              initial="hidden"
              animate="visible"
              display="inline-block"
            >
              {letter}
            </MotionText>
          ))}
        </MotionBox>

        {/* Waving Hand Emoji */}
        <AnimatePresence>
          {showEmoji && (
            <MotionText
              fontSize={{ base: "3xl", md: "5xl" }}
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ 
                opacity: 1, 
                rotate: [0, 20, -10, 15, 0],
              }}
              transition={{ 
                duration: 0.8,
                rotate: { duration: 1.5, repeat: Infinity, repeatDelay: 3 }
              }}
            >
              👋
            </MotionText>
          )}
        </AnimatePresence>

        {/* "I'm" */}
        <MotionBox>
          {"I'm".split("").map((letter, i) => (
            <MotionText
              key={i}
              as="span"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="bold"
              color="gray.200"
              custom={i + 3}
              initial="hidden"
              animate="visible"
              display="inline-block"
            >
              {letter}
            </MotionText>
          ))}
        </MotionBox>

        {/* "Javier" with special highlight */}
        <MotionBox
          initial="hidden"
          animate="visible"
          position="relative"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          <MotionText
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color="gray.200"
            textShadow="0 0 10px rgba(100, 255, 218, 0.3)"
            background="linear-gradient(45deg, #64ffda, #a259f7, #ff6b6b)"
            backgroundClip="text"
            WebkitTextFillColor="transparent"
            display="inline-block"
            lineHeight="1"
            position="absolute"
            top="-31px"
          >
            Javier
          </MotionText>
          
          {/* Animated underline */}
          {/* <MotionBox
            position="absolute"
            bottom="15px"
            left="0"
            right="0"
            h="4px"
            bg="linear-gradient(45deg, #64ffda, #a259f7, #ff6b6b)"
            borderRadius="full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          />
           */}
          {/* Glow effect */}
          <MotionBox
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgGradient="linear(45deg, #64ffda, #a259f7, #ff6b6b)"
            opacity={0}
            borderRadius="lg"
            filter="blur(20px)"
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
            zIndex={-1}
          />
        </MotionBox>
      </MotionFlex>

      {/* Streaming Role/Skills Text */}
      <AnimatePresence>
        {showTagline && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            mb={4}
          >
            <TextStream items={roleSkills} direction="left" speed={20} />
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Subtitle with typing effect */}
      <MotionText
        fontSize={{ base: "md", md: "lg" }}
        color="gray.500"
        maxW="600px"
        mx="auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        Building innovative digital solutions with cutting-edge technology
      </MotionText>
    </Box>
  );
};

const About = () => {
  return (
    <Box as="section" id="about" py={16} px={4} minH="100vh">
      <Container maxW="7xl">
        <BioHeader />
        
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12}>
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Stack gap={6}>
                <MotionText
                  fontSize="xl"
                  lineHeight="1.8"
                  color="gray.300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Welcome to my page! I am an entrepreneur & software engineer with expertise in building innovative digital solutions. 
                  I combine technical skills with product development to create solutions for real-world problems.
                </MotionText>
                
                <MotionText
                  fontSize="xl"
                  lineHeight="1.8"
                  color="gray.300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  With experience in both startups and established companies, I have developed a keen eye for identifying opportunities
                  and turning them into successful ventures. My technical background allows me to understand the complexities of
                  development, while my entrepreneurial mindset helps me see the bigger picture.
                </MotionText>
                
                <MotionText
                  fontSize="xl"
                  lineHeight="1.8"
                  color="gray.300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  I am constantly learning and exploring new technologies to stay ahead of the curve. When I am not 
                  building and realising ideas, you will find me playing floorball, traveling, or trying something new and exciting.
                </MotionText>

                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  <Link href="/resume.pdf" target="_blank" _hover={{ textDecoration: 'none' }}>
                    <Button 
                      variant="solid" 
                      size="lg"
                      color="white"
                      colorPalette="blue"
                      transition="all 0.3s ease"
                    >
                      <Icon as={FaFileAlt} mr={2} />
                      Resume
                    </Button>
                  </Link>
                </MotionBox>
              </Stack>
            </MotionBox>
          </GridItem>
          
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              bg="rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(20px)"
              p={8}
              borderRadius="2xl"
              border="1px solid rgba(255, 255, 255, 0.12)"
              boxShadow="0 25px 50px rgba(0, 0, 0, 0.25)"
            >
              <Stack gap={8}>
                {/* Languages */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <HStack mb={4}>
                    <Icon as={FaCode} color="#64ffda" boxSize={6} />
                    <Heading as="h3" size="lg" color="#64ffda">
                      Languages
                    </Heading>
                  </HStack>
                  <LogoStream items={techStacks.languages} direction="left" speed={30} />
                </MotionBox>

                {/* Frameworks */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <HStack mb={4}>
                    <Icon as={FaTools} color="#a259f7" boxSize={6} />
                    <Heading as="h3" size="lg" color="#a259f7">
                      Frameworks
                    </Heading>
                  </HStack>
                  <LogoStream items={techStacks.frameworks} direction="right" speed={25} />
                </MotionBox>

                {/* DevOps Tools */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                >
                  <HStack mb={4}>
                    <Icon as={FaDatabase} color="#ff6b6b" boxSize={6} />
                    <Heading as="h3" size="lg" color="#ff6b6b">
                      DevOps Tools
                    </Heading>
                  </HStack>
                  <LogoStream items={techStacks.devops} direction="left" speed={35} />
                </MotionBox>

                {/* Libraries */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <HStack mb={4}>
                    <Icon as={FaCog} color="#ffd700" boxSize={6} />
                    <Heading as="h3" size="lg" color="#ffd700">
                      Libraries
                    </Heading>
                  </HStack>
                  <LogoStream items={techStacks.libraries} direction="right" speed={28} />
                </MotionBox>
              </Stack>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;

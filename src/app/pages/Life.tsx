import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  Card,
  CardBody,
} from '@chakra-ui/react';
import Image from 'next/image';

const lifeCategories = [
  {
    id: "floorball",
    title: "Floorball",
    description: "I play floorball, and have been participating in local leagues and tournaments since 2020.",
    image: "/images/flb.jpg"
  },
  {
    id: "travel",
    title: "Travelling",
    description: "An avid traveler! Visited over 20 countries, spent 6 months in the past 2 years overseas, always seeking new cultures and experiences",
    image: "/images/travel.png"
  },
  {
    id: "new-stuff",
    title: "Trying New Things",
    description: "Constantly exploring new hobbies, skills, and experiences to broaden my horizons and perspective!",
    image: "/images/guitar.png"
  }
];

const Life = () => {
  const cardBg = "rgba(255,255,255,0.1)";

  return (
    <Box as="section" id="life" py={20}>
      <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }}>
        <Heading as="h2" size="2xl" textAlign="center" mb={4}>Personal Life</Heading>
        <Text fontSize="lg" textAlign="center" mb={12}>i attempt touching grass</Text>
        
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
          {lifeCategories.map((category) => (
            <Card.Root 
              key={category.id} 
              bg={cardBg} 
              backdropFilter="blur(10px)" 
              borderRadius="xl" 
              overflow="hidden" 
              border="1px solid rgba(255,255,255,0.2)"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              transition="transform 0.2s, box-shadow 0.2s"
            >
              <Box h="224px" overflow="hidden" position="relative">
                <Image 
                  src={category.image} 
                  alt={category.title} 
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.5s'
                  }}
                />
              </Box>
              
              <CardBody p={6}>
                <Heading as="h3" size="lg" mb={3} color="white">{category.title}</Heading>
                <Text color="gray.400">{category.description}</Text>
              </CardBody>
            </Card.Root>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Life;
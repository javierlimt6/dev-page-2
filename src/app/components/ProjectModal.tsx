import { createPortal } from 'react-dom';
import Image from 'next/image';
import React from 'react';
import { Box, Button, ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';

// Import page components
import About from '../pages/About';
import Awards from '../pages/Awards';
import Leadership from '../pages/Leadership';
import Life from '../pages/Life';
import Experience from '../pages/Experience';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import Hero from '../pages/Hero';
import Name from '../pages/Name';
import Photo from '../pages/Photo';
import AboutEntre from '../pages/AboutEntre';
import Startup from '../pages/Startup';
import Education from '../pages/Education'

interface ProjectModalProps {
  title: string;
  description: string;
  imageUrl?: string;
  onClose: () => void;
  project?: {
    id: string;
    componentType?: string; // New field to specify which component to render
    [key: string]: any;
  };
  themeColors?: {
    one: string;
    two: string;
    three: string;
  };
  link?: string;
}

export default function ProjectModal({
  title,
  description,
  imageUrl,
  onClose,
  project,
  themeColors,
  link
}: ProjectModalProps) {
  
  // Create a theme system for the modal
  const system = createSystem(defaultConfig);
  
  // Function to render the appropriate component based on project type
  const renderComponent = () => {
    if (!project?.componentType) {
      // Default modal content if no component type specified
      return (
        <div style={{ padding: '20px', color: 'white' }}>
          <h2 style={{ 
            color: themeColors?.one || '#64ffda',
            marginBottom: '15px',
            fontSize: '1.8rem'
          }}>
            {title}
          </h2>
          {imageUrl && (
            <div style={{ marginBottom: '15px', textAlign: 'center' }}>
              <Image 
                src={imageUrl} 
                alt={title} 
                width={500} 
                height={300} 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  borderRadius: '10px',
                  border: `2px solid ${themeColors?.two || '#a259f7'}`
                }} 
              />
            </div>
            )}
            {link && (
            <div style={{ marginBottom: '15px', textAlign: 'center' }}>
              <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: themeColors?.one || '#64ffda',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '10px 20px',
                border: `2px solid ${themeColors?.one || '#64ffda'}`,
                borderRadius: '8px',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = themeColors?.one || '#64ffda';
                e.currentTarget.style.color = '#000';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.color = themeColors?.one || '#64ffda';
              }}
              >
              View
              </a>
            </div>
            )}
          <p style={{ 
            lineHeight: '1.6',
            fontSize: '1.1rem',
            color: '#f0f0f0'
          }}>
            {description}
          </p>
        </div>
      );
    }

    // Render specific page component based on componentType
    switch (project.componentType.toLowerCase()) {
      case 'education':
        return <Education />;
      case 'about':
        return <About />;
      case 'about_entre':
        return <AboutEntre />;
      case 'startup':
        return <Startup />;
      case 'awards':
        return <Awards />;
      case 'leadership':
        return <Leadership />;
      case 'life':
        return <Life />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      case 'hero':
        return <Hero />;
      case 'name':
        return <Name />;
      case 'photo':
        return <Photo />;
      default:
        return (
          <div style={{ padding: '20px', color: 'white' }}>
            <h2>Component not found: {project.componentType}</h2>
            <p>Available components: About, Awards, Leadership, Life, Experience, Projects, Contact, Hero, Name, Photo</p>
          </div>
        );
    }
  };

  return createPortal(
    <ChakraProvider value={system}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)',
        }}
        onClick={onClose} // Close when clicking backdrop
      >
        <div
          style={{
            background: project?.componentType 
              ? 'rgba(0, 0, 0, 0.95)' // Dark background for full components
              : `linear-gradient(135deg, ${themeColors?.one || '#64ffda'}20, ${themeColors?.two || '#a259f7'}20)`,
            backdropFilter: 'blur(15px)',
            border: project?.componentType 
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : `2px solid ${themeColors?.one || '#64ffda'}`,
            borderRadius: '15px',
            maxWidth: project?.componentType ? '95vw' : '600px',
            maxHeight: project?.componentType ? '95vh' : '80vh',
            width: project?.componentType ? '95vw' : 'auto',
            height: project?.componentType ? '95vh' : 'auto',
            position: 'relative',
            boxShadow: project?.componentType 
              ? '0 0 50px rgba(0, 0, 0, 0.8)'
              : `0 0 30px ${themeColors?.one || '#64ffda'}40`,
            overflow: 'auto',
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Close Button */}
          <Box
            position="absolute"
            top={4}
            right={4}
            zIndex={1001}
          >
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              color={themeColors?.two || 'white'}
              _hover={{ 
                bg: 'rgba(255, 255, 255, 0.1)',
                color: themeColors?.one || 'white'
              }}
              p={2}
              minW="auto"
              h="auto"
            >
              <FaTimes size={20} />
            </Button>
          </Box>

          {/* Render Component or Default Content */}
          {renderComponent()}
        </div>
      </div>
    </ChakraProvider>,
    document.body
  );
}

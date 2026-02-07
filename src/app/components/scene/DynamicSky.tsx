import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Sky, Stars, useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { Vector3, MathUtils, Color, TextureLoader } from 'three';
import { FORCE_SUNSET } from './config';

export function DynamicSky() {
  const { scene } = useThree();
  
  const [sunPosition, setSunPosition] = useState<[number, number, number]>([0, 1, 0]);
  const [overrideHour, setOverrideHour] = useState<number | null>(null);
  const [skyParams, setSkyParams] = useState({
    rayleigh: 5,
    turbidity: 4,
    mieCoefficient: 0.0005,
    isNight: false,
    lightColor: "#ffffffff"
  });
  
  // Listen for time override events from the UI
  useEffect(() => {
    const handleTimeOverride = (e: CustomEvent) => {
      setOverrideHour(e.detail.hour);
    };
    
    window.addEventListener('timeOverride', handleTimeOverride as EventListener);
    return () => window.removeEventListener('timeOverride', handleTimeOverride as EventListener);
  }, []);
  
  // Update sky based on time (real or override)
  useEffect(() => {
    const updateSkyForTime = (hours: number) => {
      // Force sunset mode if config is enabled
      if (FORCE_SUNSET) {
        hours = 18; // 7pm - peak sunset
      }
      
      const timeOfDay = hours / 24;
      const sunAngle = (timeOfDay - 0.25) * Math.PI * 2;
      // Clamp elevation for flatter intensity curve
      let elevation = Math.max(-20, Math.min(60, Math.sin(sunAngle) * 90));
      
      const isNightTime = elevation < -5;
      if (isNightTime) {
        elevation = -90;
      }
      
      const azimuth = (timeOfDay * 360 - 90) % 360;
      const normalizedElevation = Math.max(0, elevation) / 90;
      
      let rayleigh: number;
      let turbidity: number;
      let mieCoefficient: number;
      let lightColor: string;
      
      // Use hours directly for stretched transitions
      const isMorningTransition = hours >= 6 && hours < 12;     // 6am - 12pm
      const isEveningTransition = hours >= 12 && hours < 20;    // 12pm - 8pm
      
      if (isNightTime) {
        // Night
        rayleigh = 0.01;
        turbidity = 0.01;
        mieCoefficient = 0.0001;
        lightColor = "#3a5a7a"; // Cool moonlight
        
      } else if (isMorningTransition) {
        // STRETCHED SUNRISE: 6am - 12pm (6 hour transition)
        // Slowed 3x: what was at 8am now appears at 12pm
        const morningProgress = (hours - 6) / 6; // 0 at 6am, 1 at 12pm
        
        rayleigh = 0.5 + morningProgress * 2.7;    // 0.5 → 3.2
        turbidity = 15 - morningProgress * 4.8;    // 15 → 10.2
        mieCoefficient = 0.02 - morningProgress * 0.006;
        
        // Warm golden → light yellow over the morning
        const warmOrange = new Color(0xffaa60);
        const lightYellow = new Color(0xffd080);
        lightColor = '#' + warmOrange.clone().lerp(lightYellow, morningProgress).getHexString();
        
      } else if (isEveningTransition) {
        // STRETCHED EVENING: 12pm - 8pm (8 hour transition)
        const eveningProgress = (hours - 12) / 8; // 0 at 12pm, 1 at 8pm
        
        // Start where morning ends (3.2, 10.2) → sunset (0.5, 15)
        rayleigh = 3.2 - eveningProgress * 2.7;    // 3.2 → 0.5
        turbidity = 10.2 + eveningProgress * 4.8;  // 10.2 → 15
        mieCoefficient = 0.014 + eveningProgress * 0.006;
        
        // Light yellow → warm golden as sun sets
        const lightYellow = new Color(0xffd080);
        const warmOrange = new Color(0xffaa60);
        lightColor = '#' + lightYellow.clone().lerp(warmOrange, eveningProgress).getHexString();
      } else {
        // Fallback (shouldn't hit but needed for type safety)
        rayleigh = 0.5;
        turbidity = 15;
        mieCoefficient = 0.02;
        lightColor = "#ffaa60";
      }
      
      const phi = MathUtils.degToRad(90 - elevation);
      const theta = MathUtils.degToRad(azimuth);
      
      const sunVec = new Vector3();
      sunVec.setFromSphericalCoords(1, phi, theta);
      
      if (isNightTime) {
        scene.background = new Color(0x01121c);
      } else {
        scene.background = null;
      }
      
      setSunPosition([sunVec.x, sunVec.y, sunVec.z]);
      setSkyParams({ 
        rayleigh, 
        turbidity, 
        mieCoefficient, 
        isNight: isNightTime,
        lightColor
      });
    };
    
    // Use override or real time
    if (overrideHour !== null) {
      updateSkyForTime(overrideHour);
    } else {
      const now = new Date();
      const hours = now.getHours() + now.getMinutes() / 60;
      updateSkyForTime(hours);
    }
    
    // Only set interval if not overriding
    if (overrideHour === null) {
      const interval = setInterval(() => {
        const now = new Date();
        const hours = now.getHours() + now.getMinutes() / 60;
        updateSkyForTime(hours);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [scene, overrideHour]);
  
  return (
    <>
      {!skyParams.isNight && (
        <Sky
          distance={450000}
          sunPosition={sunPosition}
          mieCoefficient={skyParams.mieCoefficient}
          mieDirectionalG={0.7}
          rayleigh={skyParams.rayleigh}
          turbidity={skyParams.turbidity}
        />
      )}
      
      {skyParams.isNight && (
        <Stars
          radius={300}
          depth={50}
          count={5000}
          factor={3}
          saturation={0}
          fade
          speed={1}
        />
      )}
      
      {/* Dynamic light color based on time */}
      <directionalLight
        position={sunPosition}
        intensity={
          skyParams.isNight 
            ? 0.15
            : 0.3 + Math.max(0, sunPosition[1]) * 0.6
        }
        color={skyParams.lightColor}
        castShadow
      />
      
      <ambientLight 
        intensity={skyParams.isNight ? 0.15 : 0.4}
        color={skyParams.isNight ? "#0a0a20" : "#e8f0ff"}
      />
    </>
  );
}

// Beach environment model
// Attribution (CC-BY License - required):
// "Little Private Beach" by Carson Lam [CC-BY] (https://creativecommons.org/licenses/by/3.0/)
// via Poly Pizza (https://poly.pizza/m/2AeF-fuFHNu)
export function Beach() {
  const { scene } = useGLTF('/beach.glb');
  
  return (
    <primitive 
      object={scene} 
      position={[-20, 8, 15]}  // Behind and below laptop
      scale={250}                // Adjust size as needed
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

// Keep the old SkyboxSphere as a fallback option
export function SkyboxSphere() {
  const skyTexture = useLoader(TextureLoader, '/panoramic-tech.png');
  
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial 
        map={skyTexture} 
        side={2}
      />
    </mesh>
  );
}

# 3D Interactive Portfolio - Javier Lim

A cutting-edge 3D portfolio website showcasing software engineering, entrepreneurship, and creative projects through immersive Three.js experiences.

## 🌟 Features

### 🎭 Multi-Persona Experience
- **Developer Scene**: Cyberpunk-themed environment showcasing technical projects
- **Entrepreneur Scene**: Silicon Valley business environment highlighting startups
- **Video Creator Scene**: Beach paradise setting for creative content

### 🎮 Interactive 3D Elements
- **Enhanced Previews**: Hover shows detailed project information
- **Knowledge Integration**: Clicking objects adds project data to AI knowledge base
- **Theme-Aware**: UI adapts to persona color schemes
- **Mobile Optimized**: Performance-optimized for all devices

### 📱 Modern Tech Stack
- **Next.js 15**: Latest React framework with App Router
- **React Three Fiber**: 3D graphics with declarative React components
- **Chakra UI v3**: Modern component library for responsive design
- **TypeScript**: Type-safe development experience
- **WebLLM**: Local AI processing without server dependencies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/javierlimt6/dev-page-2.git
cd dev-page-2

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

### Build for Production

```bash
# Build the application
npm run build
npm run start

# or
yarn build
yarn start
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # 3D scenes and UI components
│   │   ├── DeveloperScene.tsx
│   │   ├── EntrepreneurScene.tsx
│   │   ├── VideoCreatorScene.tsx
│   │   ├── InteractiveObject.tsx
│   │   └── ProjectModal.tsx
│   ├── pages/              # Page components for modal content
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   └── Startup.tsx
│   ├── ai/                 # AI integration components
│   │   ├── AIChat.tsx
│   │   ├── KnowledgeBase.ts
│   │   └── WebLLMService.ts
│   └── layout.tsx          # Root layout
├── public/                 # Static assets
│   ├── images/
│   ├── models/
│   └── textures/
└── types/                  # TypeScript definitions
```

## 🎯 Key Projects Showcased

### 💻 Technical Projects
- **Lokode**: iOS app for focus management with QR code scanning
- **JustDid**: Chrome extension for productivity tracking
- **CloudJoi Knowledgebase**: Client support dashboard platform
- **Chimera**: Youth digital empowerment platform

### 🏢 Entrepreneurial Ventures
- **BlazeUp**: AI-powered morning routine app for Gen Z
- **Lokode**: QR-based app blocker for students
- **RC4 Entrepreneurship Club**: President role promoting startup culture

### 🎓 Academic Achievements
- **NUS Computer Science**: Bachelor's degree (2024-2028)
- **First Class Honours**: Academic excellence
- **Teaching Assistant**: Programming modules at NUS
- **Research Experience**: AI/ML lab participation

## 🛠️ Technical Implementation

### 3D Scene Architecture
```tsx
// Each scene follows this pattern
function SceneName() {
  return (
    <>
      <Lighting />
      <Environment />
      <InteractiveObjects />
      <Animations />
    </>
  );
}
```

### AI Integration
```tsx
// Local AI processing
const aiService = new WebLLMService();
const response = await aiService.generateResponse(prompt, context);
```

### Component System
```tsx
// Reusable interactive objects
<InteractiveObject
  position={[x, y, z]}
  project={projectData}
  onProjectActivate={handleActivate}
  themeColors={colors}
/>
```

## 🎨 Customization

### Adding New Scenes
1. Create new scene component in `components/`
2. Add routing logic in main layout
3. Define interactive objects and animations
4. Update theme colors and lighting

### Modifying AI Responses
1. Update knowledge base in `ai/KnowledgeBase.ts`
2. Customize prompts in `ai/WebLLMService.ts`
3. Add new persona contexts

### Styling Changes
1. Update Chakra UI theme in `layout.tsx`
2. Modify 3D materials and colors
3. Adjust responsive breakpoints

## 🚀 Deployment

javlim.dev is served by Cloudflare Pages (project `dev-page-2`), which builds
every push to `main`. The site is a static export (`output: "export"` in
`next.config.ts`), so the Pages build settings are:

- Framework preset: Next.js (Static HTML Export)
- Build command: `npx next build`
- Build output directory: `out`

Redirects go in `public/_redirects`, not `next.config.ts`.

```bash
# Build static files into out/
npm run build

# Preview the build the way Cloudflare Pages serves it
npx wrangler pages dev out
```

## 📊 Performance Optimization

### Mobile Optimization
- Reduced particle counts on mobile devices
- Optimized texture sizes and quality
- Simplified geometry for low-end devices

### Loading Performance
- Lazy loading for 3D models
- Progressive enhancement for AI features
- Efficient asset bundling

## 🔮 Future Enhancements

- [ ] File upload for additional knowledge sources
- [ ] Advanced semantic search with embeddings
- [ ] Multi-language support
- [ ] Export/import knowledge base functionality
- [ ] VR/AR support for immersive experiences
- [ ] Real-time collaboration features

## 📧 Contact

**Javier Lim Jun Yi**
- Email: javier@chimeraapp.net
- LinkedIn: [linkedin.com/in/jav-lim](https://linkedin.com/in/jav-lim)
- Website: [javier.chimeraapp.net](https://javier.chimeraapp.net)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- 3D graphics powered by [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- AI integration using [WebLLM](https://webllm.mlc.ai/)
- UI components from [Chakra UI](https://chakra-ui.com/)
- Inspiration from modern portfolio designs and 3D web experiences

---

*This portfolio represents the intersection of technology, creativity, and entrepreneurship. Explore the 3D worlds to discover my journey in software engineering and startup building.*
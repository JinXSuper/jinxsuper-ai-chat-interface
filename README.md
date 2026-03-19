# JinXSuper AI Chat Interface 🚀

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://jinxsuper-ai-chat-refined.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-blue?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)

JinXSuper AI Chat Interface is a state-of-the-art, high-performance, and visually stunning Multi-Modal AI interface. Inspired by modern design systems like Vercel's v0, it features a pitch-black minimalist aesthetic, fluid glassmorphism, and hardware-accelerated animations.

## ✨ Core Features

- **Fluid Glass UI**: Hardware-accelerated translucency using `backdrop-filter`.
- **Specular Shine & Luminous Hover**: Real-time lighting effects for a premium feel.
- **Multi-Modal Input**: Support for text, voice (Web Speech API), and file uploads with real-time previews.
- **Geist Design System**: Full integration with Geist Sans and Geist Mono for professional typography.
- **Responsive Sidebar**: Spring-animated collapse on desktop and intelligent overlay on mobile.
- **Interactive Content**: 
  - GFM Markdown & LaTeX Math rendering.
  - Interactive charts via `Recharts`.
  - Advanced Code Blocks with syntax highlighting and copy-to-clipboard.
- **Claude-Style AI Responses**: Minimalist, content-focused message flow.

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|---------------|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs) ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-0055FF?style=flat-square&logo=framer) |
| **State Management** | ![Zustand](https://img.shields.io/badge/Zustand-4.x-FFD700?style=flat-square) |
| **UI Components** | ![Radix UI](https://img.shields.io/badge/Radix%20UI-Latest-000000?style=flat-square) ![base-ui](https://img.shields.io/badge/base--ui-Latest-0078D4?style=flat-square) |
| **Icons & Assets** | ![Lucide React](https://img.shields.io/badge/Lucide%20React-Latest-F7971E?style=flat-square) |

</div>

## 🚀 Getting Started

### Prerequisites

<div align="left">

- **Node.js** `≥ 18.x` ([Download](https://nodejs.org))
- **npm** `≥ 9.x` or **pnpm** `≥ 8.x` ([Download pnpm](https://pnpm.io))
- **Git** for version control

</div>

### Installation

<div align="center">

#### Step 1: Clone Repository
```bash
git clone https://github.com:JinXSuper/jinxsuper-ai-chat-interface.git
cd jinxsuper-ai-chat-interface
```

#### Step 2: Install Dependencies
```bash
npm install
# or
pnpm install
```

#### Step 3: Development Mode
```bash
npm run dev
# Opens on http://localhost:3000
```

#### Step 4: Build for Production
```bash
npm run build
npm start
```

</div>

### 🔧 Configuration

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# AI Model Configuration
NEXT_PUBLIC_MODEL=claude-3-sonnet

# Feature Flags
NEXT_PUBLIC_ENABLE_VOICE=true
NEXT_PUBLIC_ENABLE_FILE_UPLOAD=true
```

### 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint checks |
| `npm run type-check` | TypeScript type checking |
| `npm run format` | Format code with Prettier |

## ✨ Features Deep Dive

<table>
<tr>
<td width="50%">

### 💎 UI/UX Excellence
- **Glassmorphism Design** with `backdrop-filter`
- **Specular Lighting Effects** for depth
- **Smooth Animations** via Framer Motion
- **Dark Mode Optimized** pitch-black aesthetic
- **Responsive Design** mobile-first approach

</td>
<td width="50%">

### 🤖 AI Integration
- **Multi-Modal Input** (text, voice, files)
- **Real-time Streaming** responses
- **Markdown Rendering** with syntax highlighting
- **Code Execution** environment ready
- **File Upload** with preview support

</td>
</tr>
<tr>
<td>

### ⚡ Performance
- **Server Components** for faster rendering
- **Code Splitting** automatic via Next.js
- **Image Optimization** with next/image
- **CSS-in-JS** with Tailwind v4
- **Hardware Acceleration** GPU-optimized animations

</td>
<td>

### 🎨 Developer Experience
- **TypeScript** for type safety
- **Zustand** lightweight state management
- **Radix UI** headless components
- **Hot Module Reload** instant updates
- **ESLint & Prettier** code formatting

</td>
</tr>
</table>

## 🌐 Deployment

### Vercel (Recommended)

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JinXSuper/jinxsuper-ai-chat-interface)

</div>

**One-Click Deployment:**
1. Click the button above
2. Connect GitHub account
3. Vercel auto-deploys on every push

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t jinxsuper-chat .
docker run -p 3000:3000 jinxsuper-chat
```

### Manual Deployment

```bash
# Build
npm run build

# Start production server
npm start
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation
- Use conventional commits
- Ensure no console warnings/errors

## 📊 Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Score | 90+ | ✅ |
| Core Web Vitals | All Green | ✅ |
| Bundle Size | < 200KB | ✅ |
| First Paint | < 1s | ✅ |
| Time to Interactive | < 2s | ✅ |

## 🐛 Troubleshooting

### Common Issues

**Issue: Port 3000 already in use**
```bash
npm run dev -- -p 3001
```

**Issue: Node modules corrupted**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue: TypeScript errors**
```bash
npm run type-check -- --noEmit
```

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Migration Guide](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand Store Management](https://github.com/pmndrs/zustand)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 📞 Support & Contact

<div align="center">

| Platform | Link |
|----------|------|
| **GitHub Issues** | [Report Bug](https://github.com/JinXSuper/jinxsuper-ai-chat-interface/issues) |
| **Twitter** | [@JinXSuper](https://twitter.com/JinXSuper) |
| **Email** | contact@jinxsuper.dev |

</div>

## 📄 License

<div align="center">

Open-source project hosted by [JinXSuper](https://github.com/JinXSuper).

Distributed under the **MIT License**. See [LICENSE](./LICENSE) file for more information.

---

### 🌟 Show Your Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🔗 Sharing with others
- 🐛 Contributing or reporting issues
- 💬 Providing feedback

</div>

---

<div align="center">

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![Powered by React](https://img.shields.io/badge/Powered%20by-React-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>
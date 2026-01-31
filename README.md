# 🎟️ GOPASS - Premium Event Management Platform

<div align="center">

![GOPASS Banner](./src/assets/Gopass.png)

**A next-generation event discovery and management platform with stunning animations and premium UI/UX**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14.2-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Three.js](https://img.shields.io/badge/Three.js-0.182.0-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](#) • [Documentation](#features) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎨 Design Philosophy](#-design-philosophy)
- [🚀 Tech Stack](#-tech-stack)
- [📦 Installation](#-installation)
- [💻 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🎭 Animations & Effects](#-animations--effects)
- [🔐 Authentication](#-authentication)
- [📱 Responsive Design](#-responsive-design)
- [🛠️ Development](#-development)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎯 Core Features
- **📅 Event Discovery**: Browse and discover college events including hackathons, workshops, cultural fests, and more
- **🎫 Digital Passes**: Generate and manage digital event passes
- **👤 User Authentication**: Secure signup/login with premium transition animations
- **🔍 Smart Search**: Advanced filtering and search capabilities
- **📊 Event Management**: Create, update, and track events

### 🎨 Premium UI/UX
- **Cinematic Landing Page**: Scroll-driven animations with GSAP
- **3D Hero Background**: Interactive Three.js particle system
- **Fanned Card Showcase**: Dynamic card deck with magnetic hover effects
- **Smooth Transitions**: Premium page transitions with Framer Motion
- **Glassmorphism**: Modern glass effects and gradients
- **Micro-interactions**: Delightful hover and click animations

### 🎬 Advanced Animations
- **GSAP ScrollTrigger**: Parallax and scroll-driven effects
- **Framer Motion**: Page transitions and component animations
- **Lenis Smooth Scroll**: Buttery smooth scrolling experience
- **3D Interactions**: Three.js powered visual effects
- **Magnetic Elements**: Interactive cursor-following elements

---

## 🎨 Design Philosophy

GOPASS is built with a **premium-first** approach, focusing on:

1. **Visual Excellence**: No generic colors or basic layouts - every element is carefully crafted
2. **Dynamic Interactions**: Micro-animations that enhance user engagement
3. **Modern Aesthetics**: Glassmorphism, gradients, and contemporary design patterns
4. **Seamless Experience**: Smooth transitions and loading states
5. **Attention to Detail**: Every pixel matters

---

## 🚀 Tech Stack

### Frontend Framework
- **React 19.2.0** - Latest React with concurrent features
- **Vite 7.2.4** - Lightning-fast build tool and dev server

### Animation Libraries
- **GSAP 3.14.2** - Professional-grade animation platform
- **Framer Motion 12.26.2** - Production-ready motion library
- **Lenis 1.3.17** - Smooth scroll implementation

### 3D Graphics
- **Three.js 0.182.0** - WebGL 3D library
- **@react-three/fiber 9.5.0** - React renderer for Three.js
- **@react-three/drei 10.7.7** - Useful helpers for R3F

### Styling
- **TailwindCSS 3.4.19** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS transformations
- **Autoprefixer 10.4.23** - Vendor prefix automation

### UI Components
- **Lucide React 0.562.0** - Beautiful icon library
- **Class Variance Authority** - Component variants
- **Swiper 12.0.3** - Modern slider component

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/Aman-Bahuguna/GOPASS.git
cd GOPASS
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

---

## 💻 Usage

### Development Commands

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Environment Setup

Create a `.env` file in the root directory (if needed for backend integration):

```env
VITE_API_URL=your_api_url
VITE_APP_NAME=GOPASS
```

---

## 📁 Project Structure

```
GOPASS/
├── public/
│   ├── events/              # Event images
│   │   ├── hackathon.png
│   │   ├── workshop.png
│   │   ├── cultural_fest.png
│   │   └── ...
│   └── vite.svg
├── src/
│   ├── assets/              # Static assets
│   │   ├── Gopass.png
│   │   └── ...
│   ├── components/
│   │   ├── blocks/          # Page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ShowcaseSection.jsx
│   │   │   ├── FeaturedSection.jsx
│   │   │   ├── ConnectSection.jsx
│   │   │   ├── VisionSection.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── DeckSection.jsx
│   │   │   └── Footer.jsx
│   │   ├── canvas/          # 3D components
│   │   │   └── HeroBackground.jsx
│   │   └── ui/              # UI components
│   │       └── Navbar.jsx
│   ├── pages/               # Page components
│   │   ├── LandingPage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── docs/                    # Documentation
│   ├── ANIMATIONS_GUIDE.md
│   ├── AUTH_README.md
│   ├── BROWSER_NAVIGATION_GUIDE.md
│   ├── PREMIUM_TRANSITION.md
│   └── TASKS_COMPLETED.md
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎭 Animations & Effects

### Landing Page Animations

#### Hero Section
- **3D Particle Background**: Interactive Three.js particle system
- **Fanned Card Deck**: 7 cards with precision rotation and scale
- **Parallax Effects**: Multi-layer depth scrolling
- **Text Reveal**: GSAP SplitText with stagger

#### Scroll Animations
- **ShowcaseSection**: Horizontal card stack with rotation
- **FeaturedSection**: Fade-in with scale transformation
- **ConnectSection**: Card flip animations
- **VisionSection**: Progress-based reveals

#### Footer Animations
- **Logo Reveal**: Smooth fade-in
- **Staggered Links**: Sequential appearance
- **Magnetic Social Icons**: Cursor-following effect
- **Floating Orbs**: Continuous animation
- **Wave Effect**: SVG path animation

### Authentication Animations
- **Premium Transitions**: Minimal, sleek page switching
- **Input Focus**: Smooth border and label animations
- **Button Hovers**: Scale and glow effects
- **Form Validation**: Real-time feedback animations

For detailed animation documentation, see [ANIMATIONS_GUIDE.md](./ANIMATIONS_GUIDE.md)

---

## 🔐 Authentication

GOPASS features a premium authentication system with:

- **Smart Form Switching**: Toggle between Login/Signup
- **Real-time Validation**: Instant feedback on inputs
- **Secure Password Handling**: Best practices implemented
- **Social Login Ready**: Prepared for OAuth integration
- **Remember Me**: Session persistence
- **Forgot Password**: Password recovery flow

See [AUTH_README.md](./AUTH_README.md) for implementation details.

---

## 📱 Responsive Design

Fully responsive across all devices:

- **Desktop** (1920px+): Full animations and effects
- **Laptop** (1280px - 1919px): Optimized layouts
- **Tablet** (768px - 1279px): Touch-friendly interactions
- **Mobile** (320px - 767px): Simplified animations

### Breakpoints (Tailwind)
```javascript
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X large devices
```

---

## 🛠️ Development

### Code Style
- ESLint configuration included
- React hooks linting enabled
- Consistent formatting with Prettier (recommended)

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance
- Code splitting with Vite
- Lazy loading for routes
- Optimized images
- GSAP performance best practices

---

## 📚 Documentation

Additional documentation available:

- **[ANIMATIONS_GUIDE.md](./ANIMATIONS_GUIDE.md)** - Comprehensive animation implementation guide
- **[AUTH_README.md](./AUTH_README.md)** - Authentication system documentation
- **[BROWSER_NAVIGATION_GUIDE.md](./BROWSER_NAVIGATION_GUIDE.md)** - Navigation patterns
- **[PREMIUM_TRANSITION.md](./PREMIUM_TRANSITION.md)** - Transition effect details
- **[TASKS_COMPLETED.md](./TASKS_COMPLETED.md)** - Development progress tracker

---

## 🎯 Roadmap

- [ ] Backend API integration
- [ ] Database setup (MongoDB/PostgreSQL)
- [ ] Payment gateway integration
- [ ] QR code generation for passes
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] PWA support
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add documentation for new features
- Test thoroughly before submitting

---

## 👨‍💻 Author

**Aman Bahuguna**

- GitHub: [@Aman-Bahuguna](https://github.com/Aman-Bahuguna)
- Repository: [GOPASS](https://github.com/Aman-Bahuguna/GOPASS)

---

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/) - For amazing animation capabilities
- [Three.js](https://threejs.org/) - For 3D graphics
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - For React-Three integration
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first styling
- [Lucide Icons](https://lucide.dev/) - For beautiful icons

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For support, questions, or feedback:
- Open an issue on GitHub
- Contact via email: [your-email@example.com]

---

<div align="center">

**Made with ❤️ and ☕ by Aman Bahuguna**

⭐ Star this repository if you found it helpful!

[Back to Top](#-gopass---premium-event-management-platform)

</div>

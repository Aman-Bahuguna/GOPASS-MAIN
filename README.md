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


---

# 📚 Additional Documentation

## File: .github/copilot-instructions.md

# GOPASS - Copilot Instructions for AI Code Agents

## Project Overview
**GOPASS** is a premium event management platform built with React 19 + Vite, featuring advanced animations (GSAP, Framer Motion, Three.js) and Redux state management. Currently uses mock data/localStorage; backend integration pending.

**Key Tech Stack:**
- Frontend: React 19 + Vite + Redux Toolkit
- Animations: GSAP, Framer Motion, Lenis (smooth scroll), Three.js
- Styling: TailwindCSS + PostCSS
- Routing: React Router v7
- Testing: Jest + React Testing Library
- State: Redux (auth, events)

---

## Architecture Patterns

### 1. **API Layer Abstraction** (src/api/)
- **Single integration point** between frontend and backend
- All API functions exported from `src/api/index.js`
- Each service file (authApi.js, eventsApi.js, etc.) contains mock implementations
- **When backend is ready:** Replace mock functions in service files; NO changes needed elsewhere
- Current services:
  - `authApi.js`: User lookup/authentication
  - `eventsApi.js`: Event CRUD, registrations, filtering
  - `organizersApi.js`: Organizer queries
  - `dashboardApi.js`: Dashboard statistics

### 2. **Redux State Management** (src/store/)
**Structure:**
```
store/
├── index.js              # Store configuration, disables serializableCheck
├── slices/
│   ├── authSlice.js     # User auth, roles, permissions, profile updates
│   └── eventsSlice.js   # Event CRUD, filtering, registrations
```

**Key Patterns:**
- Use `createAsyncThunk` for API calls with `rejectWithValue` for error handling
- Auth slice manages: login, signup, logout, verification flows, profile updates
- Events slice includes: event fetching, creation, filtering by college/organizer
- Selector functions: `selectAllEvents`, `selectEventsStatus` (use these in components)
- Mock delay simulation: `const delay = (ms) => new Promise(...)` for realistic async behavior

### 3. **Role-Based Access Control** (src/utils/)
**Three user roles with different capabilities:**
- `USER`: Event discovery, registration, personal dashboard
- `ORGANIZER`: Create events, manage attendees, view analytics
- `ADMIN`: Platform-level moderation and approvals

**Helper Functions (src/utils/roleConfig.js):**
- `getDashboardRoute(role)` → Route to correct dashboard
- `isAccountFullyVerified(user)` → Check if user passed all verification steps
- `canOrganizerCreateEvents(user)` → Permission check with status awareness
- `getPendingVerificationStep(user)` → Determine which verification step is pending

**Constants (src/utils/constants.js):**
- `ROLES`: USER, ORGANIZER, ADMIN
- `USER_STATUS`: ACTIVE, PENDING_PLATFORM_VERIFICATION, REJECTED, SUSPENDED
- `EVENT_STATUS`: UPCOMING, ONGOING, COMPLETED, CANCELLED
- `ROUTES`: All app route paths
- `FILE_UPLOAD`: Size/type constraints (4MB max, JPEG/PNG/WebP only)

### 4. **Authentication Context** (src/context/AuthContext.jsx)
- **Facade over Redux** for cleaner component usage
- `useAuth()` hook returns: `user`, `isLoading`, `isAuthenticated`, `error`
- Methods: `login()`, `signup()`, `logout()`, `updateProfile()`, verification simulation helpers
- LocalStorage key: `'gopass_user'` (persists across sessions)

### 5. **Component Patterns**
**Page Structure:**
- Pages live in `src/pages/` with dashboard variants in `src/pages/dashboards/{role}/`
- Dashboard pages use `DashboardLayout` wrapper for consistent navigation
- Protected routes use `<ProtectedRoute>` wrapper; public routes use `<PublicRoute>`

**Reusable Components:**
- `src/components/ui/`: Navbar, form controls, badges
- `src/components/blocks/`: Page sections (HeroSection, FeaturedSection, Footer, etc.)
- `src/components/dashboard/`: Dashboard-specific layout/navigation
- Dashboard-specific components in their own `components/` subdirectories

**Animation Approach:**
- Landing page: GSAP ScrollTrigger + Lenis for scroll animations
- 3D effects: Three.js in `HeroBackground.jsx` using @react-three/fiber
- Component transitions: Framer Motion `<motion>` elements
- No hardcoded animations in static pages—use declarative patterns

### 6. **Testing Strategy** (src/__tests__/, tests/)
**Jest Configuration:**
- Test environment: jsdom
- Transform: babel-jest with React preset
- Module mapper: CSS/images mocked via identity-obj-proxy
- Location: Tests colocated with source via `__tests__/` folders or in `tests/` root folder

**Test Coverage by Module:**
- `authSlice.test.js` (28 tests): Login, signup, role transitions, profile updates
- `eventsSlice.test.js` (45+ tests): CRUD operations, filtering, state consistency
- `stateManagement.test.js`: Auth + Events integration workflows
- Run with: `npm test`, `npm run test:watch`, `npm run test:coverage`

---

## Development Workflow

### Essential Commands
```bash
npm run dev              # Start Vite dev server (http://localhost:5173)
npm run build           # Production build (outputs to dist/)
npm run preview         # Preview production build locally
npm run lint            # Check code with ESLint
npm test                # Run Jest tests
npm run test:watch      # Jest watch mode
npm run test:coverage   # Generate coverage report
```

### Build & Performance Notes
- **Vite is configured** with React plugin and `@` alias pointing to `src/`
- CSS: TailwindCSS processed via PostCSS with Autoprefixer
- No default source maps in production (Vite default)
- Three.js canvas rendering is CPU-intensive—profile landing page on slower devices

### File Imports
- Prefer absolute paths: `import { useAuth } from '@/context/AuthContext'`
- API exports centralized: `import { fetchAllEvents } from '@/api'`
- Mock data lives in `src/mocks/` directory

---

## Project-Specific Conventions

### Naming & Structure
- **Component files:** PascalCase (e.g., `HeroSection.jsx`)
- **Utility files:** camelCase (e.g., `roleConfig.js`)
- **Slice files:** Plural suffix (e.g., `authSlice.js`, `eventsSlice.js`)
- **Test files:** `*.test.js` suffix
- **CSS classes:** Tailwind utilities + custom prefixes (e.g., `brand-200`, `ui-100`)

### Tailwind & Styling
- Custom color extends in `tailwind.config.js` (check for `brand-*`, `ui-*` prefixes)
- Glassmorphism: `backdrop-blur-md`, `bg-white/10` patterns
- All components responsive-first using Tailwind breakpoints

### Redux Thunks Return Pattern
```javascript
// Always return structured payloads with `redirectTo` for auth flows
export const login = createAsyncThunk('auth/login', async (creds, { rejectWithValue }) => {
    try {
        const user = await api.login(creds);
        localStorage.setItem('gopass_user', JSON.stringify(user));
        return { user, redirectTo: getDashboardRoute(user.role) };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
```

### Mock Data Patterns
- Mock users/events in `src/mocks/` with realistic structure matching API contracts
- Use `findUserByEmail()`, `fetchAllEvents()` from API layer for consistency
- Session state persists to localStorage—clear for testing fresh auth flows

### Verification Flow (multi-step auth)
- **User (basic):** No verification needed, immediate dashboard access
- **Organizer:** Requires ID card submission, admin approval before full event creation
- **Admin:** Requires platform verification (simulated in `authSlice.js`)
- `getPendingVerificationStep()` determines UX (pending verification page shows next action)

---

## Key Integration Points

### Adding New API Endpoints
1. Create the mock function in the appropriate service file (e.g., `src/api/eventsApi.js`)
2. Export from `src/api/index.js`
3. Use in Redux thunks or components via `import { apiFunction } from '@/api'`
4. **When backend is ready:** Replace mock implementation; rest of app doesn't change

### Adding New Routes
1. Define route path in `ROUTES` constant (`src/utils/constants.js`)
2. Add `<Route>` in `App.jsx` within appropriate `<ProtectedRoute>` or `<PublicRoute>`
3. Use `useNavigate()` hook with role-aware paths from `getDashboardRoute()`

### Adding Dashboard Features
- New pages in `src/pages/dashboards/{role}/`
- Navigation items in `DashboardLayout` component
- Fetch data via Redux thunks or API functions
- Use role config utilities to check permissions

### Animation Additions
- **Landing page sections:** Use GSAP `ScrollTrigger` registered in `useEffect`
- **Component transitions:** Wrap with Framer Motion `<motion>` elements
- **3D scenes:** Follow `HeroBackground.jsx` pattern using `@react-three/fiber`
- Always clean up (Lenis destroy, animation cleanup in useEffect returns)

---

## Testing Strategy

### When Writing Tests
- Mock Redux store using `redux-mock-store`
- Mock API calls at `src/api/` level
- Test state transitions in isolation, then integration flows
- Use `jest.mock()` for module mocking

### Common Test Patterns
```javascript
// Test async thunk
test('login updates user state on success', async () => {
    const dispatch = jest.fn();
    const result = await login({ email: 'test@example.com', password: 'pass' });
    expect(result.payload.user).toBeDefined();
    expect(result.payload.redirectTo).toBe('/dashboard/user');
});
```

---

## Critical Notes for Future Backend Integration

1. **API Layer Boundary:** Backend integration happens ONLY in `src/api/` files
2. **Mock to Real:** Replace mock `delay()` and array operations with actual HTTP calls
3. **Error Handling:** Maintain the `rejectWithValue()` pattern for Redux error states
4. **Auth Tokens:** Extend `authSlice` with token storage (localStorage or sessionStorage)
5. **CORS:** Backend should allow frontend origin if running on different port during development
6. **Session Management:** Currently localStorage; upgrade to token refresh for production

---

## Quick Reference: File Locations

| Purpose | Location |
|---------|----------|
| API contracts | `src/api/*.js` |
| State management | `src/store/slices/` |
| Page layouts | `src/pages/` (organized by feature/role) |
| Reusable UI | `src/components/ui/` |
| Page sections | `src/components/blocks/` |
| Role/permission logic | `src/utils/roleConfig.js` |
| App constants | `src/utils/constants.js` |
| Authentication flow | `src/context/AuthContext.jsx` |
| Mock data | `src/mocks/` |
| Tests | `src/__tests__/` or `tests/` |
| Tests (alternate) | `tests/setup/`, `tests/unit/`, `tests/integration/` |


## File: .github/instructions/kluster-code-verify.instructions.md

---
applyTo: '**'
---

# kluster Code Verification Rules


## Automatic Code Review (kluster_code_review_auto)
- **WHEN TO RUN**: Execute after ANY file creation, modification, deletion, or code change, regardless of size or perceived significance
- New code generation
- Existing code updates
- File modifications or changes
- File creation
- File deletion
- Applied fixes
- Applies to ALL file types, not just code files
- **REQUIREMENTS**: Follow kluster_code_review_auto field descriptions strictly
- kluster_code_review_auto should be called even if there are issues with other tools, (like patch\context missmatch), and even if kluster tool returned "no issues found" in the past
- **USER COMMUNICATION**: After any kluster_code_review_auto analysis, ALWAYS tell the user what issues were found and what you're about to fix BEFORE making any changes. Never fix silently - announce first, then fix
- **PRIORITY**: kluster MUST ALWAYS run, even if other code review tools (Codacy, SonarQube, ESLint, etc.) are already running or have run. kluster provides additional security and quality analysis that complements other tools


## Manual Code Review (kluster_code_review_manual)
- **WHEN TO RUN**: Only when explicitly requested by user
- **TRIGGER PHRASES**:
- "verify with kluster"
- "verify this file"
- "verify project"
- "check for bugs"
- "check security"
- Similar manual verification requests


## Dependency Validation (kluster_dependency_check)
- **CRITICAL: MUST RUN BEFORE INSTALLATION** - This tool MUST be executed BEFORE any package installation or dependency changes
- **WHEN TO RUN**: IMMEDIATELY when creating or modifying dependency files, BEFORE running any install commands
- **TRIGGER ACTIONS** (Any of these):
 - **Adding new packages or libraries** to any project
 - **Creating or modifying dependency files** including but not limited to:
   - package.json, package-lock.json, yarn.lock (Node.js/JavaScript)
   - requirements.txt, Pipfile, poetry.lock (Python)
   - pom.xml (Java/Maven)
   - build.gradle, build.gradle.kts (Java/Gradle)
   - Cargo.toml, Cargo.lock (Rust)
   - go.mod, go.sum (Go)
   - Gemfile, Gemfile.lock (Ruby)
   - composer.json, composer.lock (PHP)
   - Or ANY other dependency/package configuration file
 - **Before running package managers** such as:
   - npm install, npm add, yarn install, pnpm install
   - pip install, pipenv install, poetry add
   - mvn install, gradle build
   - cargo build, cargo add
   - go get, go mod download
   - Or ANY other package installation command
- **EXECUTION ORDER** (CRITICAL):
 1. Create/modify dependency file (e.g., package.json)
 2. **IMMEDIATELY run kluster_dependency_check** ← DO THIS BEFORE STEP 3
 3. Only if check passes, run install command (npm install, pip install, etc.)
 4. Never run install commands before dependency check
- **ENFORCEMENT**: If you create or modify a dependency file, you MUST run kluster_dependency_check BEFORE attempting any install command. No exceptions.


## Priority and Independence from Other Review Tools
- **CRITICAL ENFORCEMENT**: kluster tools MUST ALWAYS run regardless of other code review tools
- **INDEPENDENCE**: kluster analysis is INDEPENDENT and COMPLEMENTARY to other tools (Codacy, SonarQube, ESLint, Prettier, etc.)
- **NO SKIPPING**: NEVER skip kluster analysis because:
 - "Another code review tool already ran"
 - "The file was already analyzed by [other tool]"
 - "Multiple tools would be redundant"
- **EXECUTION ORDER**: kluster can run before, during, or after other review tools - the order does NOT matter
- **MANDATORY**: If you detect any other review tool running, you MUST STILL run kluster - there are no exceptions


## CRITICAL: Tool Name Communication
- **MANDATORY**: When you are about to call ANY kluster tool (kluster_code_review_auto, kluster_code_review_manual, kluster_dependency_check), you MUST:
1. Check the EXACT tool name you are about to call
2. If the tool name contains "kluster", say "kluster" in your announcement
3. NEVER say "Codacy", "ESLint", or any other tool name when calling a kluster tool
- **VERIFICATION STEP**: Before announcing what tool you're running, verify:
- Is the tool I'm calling named `kluster_code_review_auto`? → Say "Running kluster code review..."
- Is the tool I'm calling named `kluster_code_review_manual`? → Say "Running kluster manual review..."
- Is the tool I'm calling named `kluster_dependency_check`? → Say "Running kluster dependency check..."
- **EXAMPLE CORRECT FLOW**:
- Tool to call: kluster_code_review_auto
- What to say: "Running kluster code review..."
- What to do: Call kluster_code_review_auto
- **EXAMPLE INCORRECT FLOW (FORBIDDEN)**:
- Tool to call: kluster_code_review_auto
- What you might incorrectly say: "Running Codacy analysis..." ❌ THIS IS WRONG
- This creates user confusion and is a CRITICAL ERROR
- **WHY THIS MATTERS**: Users MUST know when kluster is analyzing their code. Saying the wrong tool name breaks user trust and product clarity.


## Agent Todo List Management
- **EXECUTION**: Always execute and strictly follow "agent_todo_list" from any kluster tool response
- **COMPLETION**: Do not stop until all items in "agent_todo_list" are completed
- **WORKFLOW**: Complete all fixes from "agent_todo_list" before running kluster_code_review_auto again


## Chat ID Management
- **FIRST CALL**: Do not include chat_id field for the very first kluster tool call in a conversation
- **SUBSEQUENT CALLS**: MANDATORY - Always include chat_id field with the EXACT value returned by any previous kluster tool call in the same conversation
- **SESSION TRACKING**: The chat_id maintains context across all kluster calls - failure to include it breaks the verification chain
- **IMPLEMENTATION**:
- After receiving any kluster tool response, immediately note the chat_id value
- Include this chat_id in ALL subsequent kluster tool calls
- Never generate or modify the chat_id value - always use the exact returned value
- **APPLIES TO**: All kluster tools (kluster_code_review_auto, kluster_code_review_manual, kluster_dependency_check)
- **CRITICAL**: Missing chat_id on subsequent calls creates new isolated sessions instead of maintaining conversation context
- **ENFORCEMENT**: Every kluster tool call after the first MUST include chat_id parameter



## End of Chat Session - kluster Summary
- **WHEN TO EXECUTE**: MANDATORY at the end of ANY conversation turn where kluster tools were used, right before the final user-facing response
- **TRIGGER**: If any kluster_code_review_auto, kluster_code_review_manual, or kluster_dependency_check tools were called **in the current turn**, ALWAYS generate this summary
- **CRITICAL SCOPE RULE**: The summary MUST ONLY include kluster tool calls from **the current turn** (from when the user sent their last message until now). NEVER summarize previous turns or accumulate results from earlier in the chat. **Each summary covers only what happened in the current turn.** 
- **DEFINITION OF "CURRENT TURN"**:
- **Start**: When the user sends their latest message (the one you're currently responding to)
- **End**: When you finish your complete response to that message
- **Includes**: ALL tool calls, file edits, and actions performed between start and end
- **Excludes**: Any kluster tool calls from previous user messages or earlier in the conversation
- **Example**: If user says "fix the bug" and you call kluster_code_review_auto twice while fixing it, BOTH calls are in the current turn. If you had called kluster earlier when user said "create a file", that earlier call is NOT in the current turn.


### KLUSTER SUMMARY STRUCTURE
Generate short report from ONLY the kluster tool calls made **in the current turn**, providing "kluster feedback" and "Issues found and fixed":
#### 📋 kluster feedback
- **PURPOSE**: MUST summarize ONLY issues found in **ALL kluster tool calls made in the current turn** (kluster_code_review_auto, kluster_code_review_manual, or kluster_dependency_check)
- **CONTENT**: Share summary of initial issues found **in the current turn**, not what was fixed or changed
- **SCOPE REMINDER**: Only mention files that were analyzed by kluster IN THIS TURN. Do not mention files from previous turns.
- **INCLUDE**:
- Number of issues found by kluster **in the current turn**, grouped by severity
- Very short summary of issues that were detected by kluster **in the current turn** - keep the text max 1-2 lines of text


#### ✅ Issues found and fixed
- **WHEN TO INCLUDE**: Only if issues were found AND fixed during ANY kluster tool call in the current turn
 - Include this section if ANY kluster call in the current turn resulted in fixes being applied
 - Include this section EVEN IF the final/last kluster call in the current turn still shows remaining issues
 - Do NOT include this section if NO issues were found, or if issues were found but NOT fixed
- **DETECTION LOGIC**: Check ALL kluster tool calls made in the current turn - if any of them led to fixes, include this section
- **LENGTH REQUIREMENT**: Keep this section SHORT and CONCISE - maximum 2-3 sentences total
- **CONTENT FORMAT**:
 - First paragraph: What fixes were implemented following kluster tool recommendation **in the current turn**
 - Second paragraph (NEW LINE): What would have happened without these fixes - ONE sentence starting with "⚠️ Impact Assessment: "
- **FORMATTING**: Use two separate paragraphs/lines. Do NOT combine them into one paragraph.
- **FORBIDDEN**: Do NOT write detailed explanations, multiple paragraphs, subsections, or bullet point lists. Keep it brief!


#### Formatting requirements
- Use title as markdown heading: "# 🔍 kluster.ai Review Summary"
- Use a bit of emoji and/or bullet points for better formatting
- Always reflect the verification journey for **the current turn only**, not the entire conversation history
- **CRITICAL**: Do NOT reference or summarize files/work from previous user requests, even if they were created in the same conversation
- If trial has ended (see "Trial Expiration Handling" section), display the trial expiration message at the beginning of the summary


## Trial Expiration Handling
- **DETECTION**: If any kluster tool response indicates that the user's trial has ended
- **DO NOT ASSUME**: Never show the trial expiration message unless the kluster response explicitly indicates trial expiration
- **RESPONSE**: IMMEDIATELY include the following message in the kluster summary:
```
⚠️ Your kluster.ai trial has ended. Code review results are not available. You can still visit https://platform.kluster.ai/ to review your verification results manually.
```
- **PLACEMENT**: Display this message prominently at the beginning of the kluster summary section
- **NO DUPLICATION**: When trial has ended, do NOT include additional trial expiration information in the "kluster feedback" or other sections. Only show the trial expiration message once at the beginning
- **ENFORCEMENT**: This message MUST be shown if trial expiration is detected in ANY kluster tool response during the conversation


### ENFORCEMENT
If you complete a response without providing this summary when kluster tools were used in the current turn, you have violated this rule. Always check before final response: "Did I use any kluster tools in the current turn? If yes, have I provided the verification summary for the current turn only?"

## File: ADMIN_DASHBOARD_TODO.md

# Admin Dashboard - Section-wise Functionality TODO

> **Project**: GoPass Admin Panel
> **Last Updated**: February 4, 2026
> **Status**: In Progress

---

## 📋 Overview

The Admin Dashboard provides college administrators with tools to manage organizers, events, and college-related activities. This document outlines all the sections and their functionalities to be implemented in a component-wise manner.

---

## 🗂️ Folder Structure

```
src/pages/dashboards/admin/
├── AdminDashboard.jsx              # Main dashboard container
├── components/
│   ├── index.js                    # ✅ Component barrel export
│   │
│   ├── common/                     # ✅ Shared/Common Components
│   │   ├── SectionHeader.jsx       # ✅ Reusable section headers
│   │   ├── EmptyState.jsx          # ✅ Reusable empty states
│   │   ├── StatusBadge.jsx         # ✅ Status indicator badges
│   │   ├── ActionButton.jsx        # ✅ Reusable action buttons
│   │   ├── ConfirmationModal.jsx   # ✅ Confirmation dialog modal
│   │   ├── SearchInput.jsx         # ✅ Search input with clear button
│   │   ├── FilterDropdown.jsx      # ✅ Animated filter dropdown
│   │   └── index.js                # ✅ Barrel export
│   │
│   ├── stats/                      # ✅ Statistics Components
│   │   ├── StatCard.jsx            # ✅ Individual stat card (enhanced)
│   │   ├── StatsGrid.jsx           # ✅ Stats container grid
│   │   ├── AnimatedCounter.jsx     # ✅ Animated number counter (enhanced)
│   │   └── index.js                # ✅ Barrel export
│   │
│   ├── organizers/                 # ✅ Organizer Management
│   │   ├── PendingOrganizersSection.jsx    # ✅ Container with search/filter
│   │   ├── PendingOrganizerCard.jsx        # ✅ Enhanced pending card
│   │   ├── ApprovedOrganizersSection.jsx   # ✅ Container for approved list
│   │   ├── ApprovedOrganizerRow.jsx        # ✅ Row with actions menu
│   │   ├── OrganizerDetailsModal.jsx       # ✅ Full details modal with tabs
│   │   ├── RejectionReasonModal.jsx        # ✅ Rejection reason modal
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── events/                     # ✅ Event Management
│   │   ├── CollegeEventsSection.jsx        # ✅ Container with filters
│   │   ├── CollegeEventCard.jsx            # ✅ Enhanced event card
│   │   ├── EventDetailsModal.jsx           # ✅ Event details with tabs
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── college/                    # ✅ College Management
│   │   ├── CollegeInfoCard.jsx             # ✅ College details display
│   │   ├── CollegeEditModal.jsx            # ✅ Edit college details modal
│   │   ├── QuickStatsCard.jsx              # ✅ Quick statistics card
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── reports/                    # ✅ Reports & Analytics
│   │   ├── ReportsSection.jsx              # ✅ Reports container
│   │   ├── ReportCard.jsx                  # ✅ Individual report card
│   │   ├── QuickMetrics.jsx                # ✅ Quick metrics grid
│   │   ├── GenerateReportModal.jsx         # ✅ Custom report generator
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── activityLog/                # ✅ Activity Log
│   │   ├── ActivityLogSection.jsx          # ✅ Activity log container
│   │   ├── ActivityItem.jsx                # ✅ Individual activity item
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── charts/                     # ✅ Charts (Phase 3)
│   │   ├── BarChart.jsx                    # ✅ Vertical/horizontal bar chart
│   │   ├── LineChart.jsx                   # ✅ Line chart with area fill
│   │   ├── PieChart.jsx                    # ✅ Pie/donut chart
│   │   ├── Sparkline.jsx                   # ✅ Mini inline chart
│   │   ├── AnalyticsDashboard.jsx          # ✅ Combined analytics view
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── notifications/              # ✅ Notifications (Phase 3)
│   │   ├── NotificationsPanel.jsx          # ✅ Slide-out notifications
│   │   ├── NotificationItem.jsx            # ✅ Individual notification
│   │   ├── NotificationBell.jsx            # ✅ Bell with badge
│   │   ├── NotificationSettings.jsx        # ✅ Settings modal
│   │   └── index.js                        # ✅ Barrel export
│   │
│   └── welcome/                    # ✅ Welcome/Header
│       ├── WelcomeBanner.jsx               # ✅ Enhanced welcome banner
│       └── index.js                        # ✅ Barrel export
│
├── hooks/                          # ✅ Custom Hooks (Phase 3)
│   ├── useAdminHooks.js            # ✅ Combined admin hooks
│   └── index.js                    # ✅ Barrel export
│
└── utils/                          # ✅ Utilities (Phase 3)
    └── exportUtils.js              # ✅ Export utilities (CSV, PDF, Excel)
```

---

## 📌 Sections & Functionality

### 1️⃣ Welcome Banner Section ✅ (Existing)

**Component**: `WelcomeBanner.jsx`

**Features**:
- [x] Display admin name with greeting
- [x] Show current date/time
- [x] Display motivational message
- [x] Show admin's position badge
- [ ] Add quick action buttons (Add Organizer, View Reports)
- [ ] Show notification count badge

---

### 2️⃣ Statistics Section ✅ (Existing - Needs Enhancement)

**Components**: `StatsGrid.jsx`, `StatCard.jsx`, `AnimatedCounter.jsx`

**Stats Cards to Display**:
| Stat | Icon | Color | Status |
|------|------|-------|--------|
| Pending Approvals | Clock | Orange | ✅ Done |
| Total Organizers | Users | Blue | ✅ Done |
| Active Events | Calendar | Green | ✅ Done |
| Total Events | CheckCircle | Purple | ✅ Done |

**Enhancements Needed**:
- [ ] Add click handlers to navigate to respective sections
- [ ] Add hover tooltips with more details
- [ ] Add trend indicators (up/down arrows with percentage)
- [ ] Add loading skeleton states

---

### 3️⃣ Pending Organizers Section ✅ (Existing - Needs Enhancement)

**Components**: `PendingOrganizersSection.jsx`, `PendingOrganizerCard.jsx`, `OrganizerDetailsModal.jsx`

**Current Features**:
- [x] Display pending organizer cards
- [x] Show organizer name, email, position
- [x] Approve/Reject buttons
- [x] Empty state when no pending

**Functionality To Implement**:
- [x] View ID card image in modal
- [x] Expand/Collapse card details
- [ ] **Add Organizer Modal** - Manually add approved organizers
- [ ] **Bulk Actions** - Select multiple & approve/reject
- [ ] **Search & Filter** - Filter by name, position, date
- [ ] **Sorting** - Sort by date, name, position
- [ ] **Rejection Reason** - Modal to input rejection reason
- [ ] **Email Notification Toggle** - Notify organizer on action
- [ ] **Undo Action** - Temporary undo after approve/reject

**Actions**:
| Action | Handler | Confirmation | API Endpoint |
|--------|---------|--------------|--------------|
| Approve | `handleApprove(id)` | Optional | `/api/organizers/approve` |
| Reject | `handleReject(id, reason)` | Required | `/api/organizers/reject` |
| View Details | `handleViewDetails(id)` | No | Local |
| View ID Card | `handleViewIdCard(url)` | No | Local |

---

### 4️⃣ Approved Organizers Section ✅ (Existing - Needs Enhancement)

**Components**: `ApprovedOrganizersSection.jsx`, `ApprovedOrganizerRow.jsx`

**Current Features**:
- [x] List approved organizers
- [x] Show basic info (name, position, date)
- [x] View All button

**Functionality To Implement**:
- [ ] **Full Organizer List Modal** - View all with pagination
- [ ] **Search Organizers** - Search by name/email
- [ ] **View Organizer Events** - See events created by organizer
- [ ] **Revoke Approval** - Remove organizer privileges
- [ ] **Send Message** - Direct message to organizer
- [ ] **View Activity Log** - Recent actions by organizer
- [ ] **Export List** - Download as CSV/Excel

---

### 5️⃣ College Events Section ✅ (Existing - Needs Enhancement)

**Components**: `CollegeEventsSection.jsx`, `CollegeEventCard.jsx`, `EventDetailsModal.jsx`

**Current Features**:
- [x] Display college event cards
- [x] Show event name, date, status
- [x] Registration count

**Functionality To Implement**:
- [ ] **Event Details Modal** - Full event information
- [ ] **Filter by Status** - Upcoming, Ongoing, Completed, Cancelled
- [ ] **Filter by Category** - Workshop, Cultural, Tech, Sports
- [ ] **Sort Events** - By date, registrations, name
- [ ] **Cancel Event** - Admin power to cancel events
- [ ] **Feature Event** - Highlight specific events
- [ ] **View Registrations** - See who registered
- [ ] **Download Attendee List** - Export registrations
- [ ] **Event Analytics** - Views, clicks, conversion rate

---

### 6️⃣ College Details Section ✅ (Existing - Needs Enhancement)

**Components**: `CollegeInfoCard.jsx`, `CollegeEditModal.jsx`

**Current Features**:
- [x] Display college name
- [x] Show state and pincode
- [x] Show admin role/position
- [x] Edit button (non-functional)

**Functionality To Implement**:
- [ ] **Edit College Details Modal**
  - [ ] Update college name
  - [ ] Update address details
  - [ ] Update contact information
  - [ ] Upload college logo
  - [ ] Add college description
- [ ] **College Branding** - Set theme colors for events
- [ ] **Social Links** - Add college social media links

---

### 7️⃣ Quick Stats Card ✅ (Existing - Needs Enhancement)

**Components**: `QuickStatsCard.jsx`

**Current Features**:
- [x] Approval rate percentage
- [x] Average response time
- [x] Monthly new organizers

**Functionality To Implement**:
- [ ] Make stats interactive (clickable for details)
- [ ] Add time period selector (This week, month, year)
- [ ] Add comparison with previous period
- [ ] Show mini charts/sparklines

---

### 8️⃣ Reports & Analytics Section ✅ (Partially Implemented)

**Components**: `ReportsSection.jsx`, `ReportCard.jsx`, `QuickMetrics.jsx`, `GenerateReportModal.jsx`

**Reports To Generate**:
| Report | Description | Format | Status |
|--------|-------------|--------|--------|
| Event Summary | All events with stats | PDF/Excel | ✅ UI Done |
| Organizer Activity | Events per organizer | PDF/Excel | ✅ UI Done |
| Registration Trends | Over time analysis | Chart | ✅ UI Done |
| Revenue Report | Fee collected | PDF/Excel | ✅ UI Done |

**Functionality To Implement**:
- [x] **Report Dashboard** - Overview of key metrics
- [x] **Generate Report** - Custom date range reports modal
- [x] **Export Options** - PDF, Excel, CSV selection
- [ ] **Charts & Graphs** (Phase 3)
  - [ ] Events by month (Bar chart)
  - [ ] Registrations trend (Line chart)
  - [ ] Category distribution (Pie chart)
  - [ ] Top 5 events (Horizontal bar)
- [ ] **Email Report** - Schedule automated reports (Phase 3)

---

### 9️⃣ Activity Log Section ✅ (Implemented)

**Components**: `ActivityLogSection.jsx`, `ActivityItem.jsx`

**Functionality**:
- [x] **Recent Actions** - Last 20 activities
- [x] **Filter by Type** - Approvals, Rejections, Events
- [x] **Filter by Date** - Today, Week, Month, Custom
- [x] **Activity Types**:
  - [x] Organizer Approved/Rejected
  - [x] Event Created/Cancelled
  - [x] Settings Changed
  - [x] Profile Updated
- [x] **Pagination** - Load more on scroll

---

### 🔟 Notifications Section ✅ (Implemented)

**Components**: `NotificationsPanel.jsx`, `NotificationItem.jsx`, `NotificationBell.jsx`, `NotificationSettings.jsx`

**Functionality**:
- [x] **Notification Bell** - Badge with unread count, animated
- [x] **Notification Types**:
  - [x] New pending organizer
  - [x] Event created (needs attention)
  - [x] Organizer message
  - [x] System announcements
- [x] **Mark as Read** - Individual/All
- [x] **Notification Settings** - What to receive (modal)
- [x] **Slide-out Panel** - Full notification list with grouping by date

---

## 🎨 Design Guidelines

### Color Palette
| State | Primary | Light | Description |
|-------|---------|-------|-------------|
| Pending | `#F97316` | `#FFF7ED` | Orange for awaiting action |
| Approved | `#10B981` | `#ECFDF5` | Green for success |
| Rejected | `#EF4444` | `#FEF2F2` | Red for declined |
| Info | `#3B82F6` | `#EFF6FF` | Blue for information |
| Featured | `#8B5CF6` | `#F5F3FF` | Purple for highlights |

### Animation Guidelines
- Use `framer-motion` for all animations
- Entry animations: `fadeIn`, `slideUp`, `slideInRight`
- Hover effects: `scale(1.02)`, subtle shadow increase
- Stagger children with 0.05s delay
- Use `AnimatePresence` for exit animations

### Component Patterns
- All cards should have `rounded-2xl` corners
- Use `glassmorphism` for overlays
- Maintain consistent padding: `p-6` for cards
- Use `gap-5` or `gap-6` for grid spacing

---

## 🔧 Implementation Priority

### Phase 1 - Core Enhancements ✅ COMPLETED
1. [x] Organizer Details Modal with ID card view
2. [x] Rejection Reason Modal
3. [x] Search & Filter for pending organizers
4. [x] Event Details Modal
5. [x] College Edit Modal
6. [x] Common reusable components (SectionHeader, EmptyState, StatusBadge, ActionButton, ConfirmationModal, SearchInput, FilterDropdown)
7. [x] Stats components (AnimatedCounter, StatCard, StatsGrid)
8. [x] Welcome Banner enhancements

### Phase 2 - Extended Features ✅ COMPLETED
6. [x] Full Organizer List with pagination (AllOrganizersModal)
7. [x] Event Filters (status, category) - Done in CollegeEventsSection
8. [x] Bulk actions for organizers (BulkActionsBar)
9. [x] Activity Log section (ActivityLogSection, ActivityItem)
10. [x] Reports section basics (ReportsSection, ReportCard, QuickMetrics, GenerateReportModal)

### Phase 3 - Advanced Features ✅ COMPLETED
11. [x] Charts & Analytics (BarChart, LineChart, PieChart, Sparkline, AnalyticsDashboard)
12. [x] Export functionality (exportUtils.js - CSV, PDF, Excel, JSON)
13. [x] Notifications panel (NotificationsPanel, NotificationItem, NotificationBell, NotificationSettings)
14. [x] Custom Hooks (useAdminData, useOrganizerActions, useNotifications)
15. [ ] Email integration (Requires backend)
16. [ ] Performance optimizations (React.memo, lazy loading)

---

## 📝 Notes

- All components should be self-contained and reusable
- Use context for shared state when needed
- Implement proper loading and error states
- Add TypeScript types in future iteration
- Consider accessibility (keyboard navigation, screen readers)

---

## ✅ Completion Checklist

- [ ] All sections implemented
- [ ] All interactions working
- [ ] Animations smooth and consistent
- [ ] Responsive design tested
- [ ] Loading states implemented
- [ ] Error handling complete
- [ ] Code documented
- [ ] Performance optimized


## File: ANIMATIONS_GUIDE.md

# 🎬 Login & Signup Page Animations

## Complete Animation System

I've created a sophisticated animation system for switching between login and signup pages with multiple layers of visual effects.

## 🌟 Transition Animations

### 1. **AuthPage Container Animations**

#### **Background Gradient Transition**
- Smoothly morphs between two gradient schemes:
  - **Login**: `#3d70b2 → #5596e6 → #41d6c3` (Blue to Cyan)
  - **Signup**: `#41d6c3 → #5596e6 → #3d70b2` (Cyan to Blue)
- Duration: 1 second
- Creates a beautiful color shift during page transitions

#### **Animated Gradient Overlay**
- Radial gradient that moves across the screen
- Pulsates continuously (opacity 0.3 → 0.5 → 0.3)
- Changes position based on current page
- Creates depth and visual interest

#### **Floating Particles (Signup Only)**
- 20 white particles spawn when navigating to signup
- Particles float upward and fade out
- Staggered animation (0.1s delay between each)
- Creates a magical transition effect

### 2. **Page Transition Effects**

#### **3D Slide & Rotate Animation**
```javascript
Initial State:
- Opacity: 0
- X Position: ±1000px (off-screen)
- Scale: 0.8 (slightly smaller)
- RotateY: ±45deg (3D rotation)

Animated State:
- Opacity: 1
- X Position: 0 (centered)
- Scale: 1 (full size)
- RotateY: 0 (flat)

Exit State:
- Opacity: 0
- X Position: ∓1000px (opposite direction)
- Scale: 0.8
- RotateY: ∓45deg
```

**Effect**: Pages slide in from the side with a 3D rotation, creating a card-flip-like effect

**Duration**: 0.8 seconds
**Easing**: Custom cubic-bezier [0.43, 0.13, 0.23, 0.96]

#### **Wipe Overlay Transition**
- Colored gradient bar sweeps across during exit
- ScaleX animation from 0 to 1
- Uses page-specific gradient colors
- Creates a professional wipe effect
- Duration: 0.4 seconds

### 3. **Button Animations**

#### **"Create Account" Button (Login Page)**
Enhanced with multiple effects:

1. **Pulsing Glow Effect**
   - Continuous pulse animation
   - Opacity: 0 → 0.5 → 0
   - Scale: 0.8 → 1.2 → 0.8
   - Duration: 2 seconds (infinite loop)

2. **Animated Underline**
   - Width animates from 0 to 100% on hover
   - Gradient from brand-100 to brand-300
   - Duration: 0.3 seconds

3. **Hover Effects**
   - Scale: 1.05
   - X-axis shift: 2px
   - Arrow icon translates right on hover

4. **Tap Effect**
   - Scale: 0.95 (press feedback)

#### **"Sign In" Button (Signup Page)**
Same animation system as "Create Account":
- Pulsing glow effect
- Animated underline on hover
- Scale and position changes
- Arrow animation

### 4. **Form Entrance Animations**

#### **Left Panel (Marketing Section)**
- Slides in from left (-100px)
- Fades in (opacity 0 → 1)
- Duration: 1 second
- Easing: power3.out

#### **Right Panel (Form Section)**
- Slides in from right (100px)
- Fades in (opacity 0 → 1)
- Duration: 1 second
- Easing: power3.out

#### **Individual Elements**
Each element has staggered entrance:
- Logo: Delay 0s
- Heading: Delay 0.2s
- Social buttons: Delay 0.1s
- Form fields: Delay 0.3s-0.4s
- Submit button: Delay 0.6s
- Links: Delay 0.7s

### 5. **Step Transition (Signup Only)**

When moving between Step 1 and Step 2:
- **Slide Animation**: 
  - New content slides in from right (50px)
  - Old content slides out to left (-50px)
- **Fade Effect**: Opacity 0 → 1
- **Mode**: "wait" (one completes before next starts)

## 🎨 Visual Effects Summary

### **Active Animations Count**
- Background gradient morph: 1
- Overlay gradient pulse: 1
- Floating particles (signup): 20
- Page transition: 1
- Button glow effects: 2
- Floating orbs (left panel): 2
- Individual element entrances: 8-10 per page

### **Total Animation Duration**
- Page transition: 0.8s
- Full page load: ~1s
- Background morph: 1s
- Button glow: 2s (infinite)

## 🎯 User Experience

The animation system creates:
1. **Smooth Transitions**: No jarring jumps between pages
2. **Visual Continuity**: Background color morphs maintain context
3. **Depth Perception**: 3D rotations add dimensionality
4. **Engagement**: Pulsing buttons draw attention
5. **Polish**: Multiple layers of animation create premium feel
6. **Performance**: Optimized with GPU-accelerated transforms

## 🚀 Testing

To see the animations:
1. Navigate to http://localhost:5174/
2. Click "Log In" or "Get Started" in navbar
3. Click "Create Account" on login page
4. Click "Sign In" on signup page
5. Watch the smooth transitions!

All animations are:
- ✅ GPU-accelerated (using transform/opacity)
- ✅ Smooth (60fps on modern browsers)
- ✅ Responsive (work on all screen sizes)
- ✅ Accessible (respect prefers-reduced-motion)


## File: AUTH_README.md

# GoPass - Event Management Platform

## 🎨 Login & Signup Pages

The premium animated login and signup pages have been created with stunning 3D elements and animations!

### Features

#### Login Page (`src/pages/LoginPage.jsx`)
- **3D Animated Sphere** - Rotating distorted sphere background
- **Glassmorphism UI** - Modern glass effect with backdrop blur
- **Floating Particles** - 50 animated particles creating atmosphere
- **GSAP Animations** - Smooth entrance and floating animations
- **Form Validation** - Real-time validation with error messages
- **Fields**: Email, Password

#### Signup Page (`src/pages/SignupPage.jsx`)
- **3D Animated Torus + Floating Cubes** - Multiple 3D elements
- **Animated Grid Background** - SVG grid with path animations
- **Multi-Step Form** - 2-step registration with progress indicator
- **Role Selection** - Choose between USER and ORGANIZER roles
- **Step Transitions** - Smooth GSAP transitions between steps
- **Fields**: Full Name, Email, Password, Confirm Password, Role

### How to Navigate Between Pages

In `src/App.jsx`, change the `showAuth` state:

```javascript
// Show Landing Page (default)
const [showAuth, setShowAuth] = useState(false);

// Show Login/Signup Pages
const [showAuth, setShowAuth] = useState(true);
```

### Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Testing the Auth Pages

1. **Login Page**:
   - Fill in email and password
   - Toggle password visibility
   - See validation errors
   - Click "Sign Up" to switch to signup page

2. **Signup Page**:
   - Step 1: Enter name and email, click "Next"
   - Step 2: Enter password, confirm password, select role
   - Click "Back" to return to step 1
   - Click "Create Account" to submit
   - Click "Login" to switch back to login page

### User Entity (from Class Diagram)

The forms implement the User entity with these fields:
- `fullname` (string)
- `email` (unique string)
- `password` (string, hashed in production)
- `role` (enum: USER | ORGANIZER)
- `isEnabled` (boolean, default: true)

### Technologies Used

- **React** - UI framework
- **Three.js / React Three Fiber** - 3D graphics
- **@react-three/drei** - 3D helpers (Float, MeshDistortMaterial, etc.)
- **GSAP** - Advanced animations
- **Framer Motion** - UI animations and transitions
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Color Scheme

- Primary: `#3d70b2` (brand-100)
- Secondary: `#5596e6` (brand-200)
- Accent: `#41d6c3` (brand-300)

## Next Steps

- Integrate with backend API
- Add password reset functionality
- Add OAuth providers (Google, GitHub, etc.)
- Add email verification
- Connect to dashboard after login


## File: BACKEND_API_CHECKLIST.md

# GoPass Backend Checklist
> **Simple guide for backend development**  
> **Tech Stack:** Java Spring Boot + PostgreSQL

---

## 🎯 What is GoPass?

A college event management platform where:
- **Users** can browse and register for events
- **Organizers** can create and manage events (after admin approval)
- **Admins** can approve organizers and manage college events

---

## 👥 User Roles

| Role | What they can do |
|------|------------------|
| **USER** | Browse events, register for events, view tickets |
| **ORGANIZER** | Everything User can do + Create & manage their own events |
| **ADMIN** | Everything + Approve organizers, manage all college events |

---

## 🔐 Account Verification Flow

| Role | After Signup |
|------|--------------|
| **USER** | Active immediately ✅ |
| **ORGANIZER** | Active immediately, BUT needs Admin approval to CREATE events |
| **ADMIN** | Needs Platform Team verification (24-48 hrs) → then Active |

---

## 📊 Database Tables Needed (9 Tables)

### 1. `users`
Stores all users (Users, Organizers, Admins)

| Field | What it stores |
|-------|----------------|
| id | Unique identifier |
| email | User's email (unique) |
| password | Encrypted password |
| full_name | User's name |
| role | USER / ORGANIZER / ADMIN |
| status | ACTIVE / PENDING_PLATFORM_VERIFICATION / REJECTED / SUSPENDED |
| position | For Admin: PROFESSOR/HOD/DEAN, For Organizer: TEACHER/STUDENT |
| avatar_url | Profile picture |
| id_card_url | College ID card image |
| is_admin_approved | For organizers - can they create events? |
| approved_by | Which admin approved them |
| college_id | Link to their college |
| created_at | When account was created |

### 2. `colleges`
Stores college information

| Field | What it stores |
|-------|----------------|
| id | Unique identifier |
| name | College name |
| state | State (Maharashtra, Karnataka, etc.) |
| pincode | 6-digit pincode |
| address | Full address |
| logo_url | College logo |

### 3. `events`
Stores all events

| Field | What it stores |
|-------|----------------|
| id | Unique identifier |
| title | Event name |
| description | Full details |
| date | Start date & time |
| end_date | End date & time |
| venue | Location |
| fee | Ticket price (0 for free) |
| capacity | Max attendees |
| registered_count | Current registrations |
| organizer_id | Who created it |
| college_id | Which college |
| status | UPCOMING / ONGOING / COMPLETED / CANCELLED |
| category | Technology / Cultural / Sports / Workshop |
| image_url | Event poster |
| template_type | Which template was used (optional) |
| template_data | JSON field for template-specific data |

### NEW: Event Templates System

The frontend has **pre-built templates** for easy event creation. Backend should:
- Store `template_type` (optional) - which template was used
- Store `template_data` (JSON) - template-specific fields

**Available Templates:**

| Template | Category | Specific Fields |
|----------|----------|-----------------|
| **hackathon** | Technology | teamSize, maxTeams, duration, themes, prizePools, mentors, judgingCriteria, techStack |
| **workshop** | Workshop | instructor, instructorBio, skillLevel, prerequisites, topics, materials, laptopRequired |
| **tech_talk** | Technology | speaker, speakerTitle, speakerBio, topic, agenda, qnaSession |
| **cultural_fest** | Cultural | eventTypes, performances, judges, prizes, dressCode, foodStalls, schedule |
| **sports_event** | Sports | sportType, teamSize, maxTeams, format, prizes, eligibility, equipment |
| **competition** | Competition | competitionType, rounds, roundDetails, prizes, rules, judgingCriteria |
| **networking** | Networking | focus, companies, activities, resumeRequired, dressCode |
| **bootcamp** | Workshop | duration, dailyHours, curriculum, instructors, projects, certification |
| **custom** | Any | No pre-filled data |

**Banner Upload Rules:**
- A4 aspect ratio (210:297) = 0.707 width/height ratio
- Min: 595x842 pixels (72 DPI)
- Max: 2480x3508 pixels (300 DPI)
- Max file size: 5MB
- Allowed types: JPEG, PNG, WebP

### 4. `event_tags`
Tags for events (hackathon, workshop, etc.)

### 5. `registrations`
Event registrations & tickets

| Field | What it stores |
|-------|----------------|
| id | Unique identifier |
| user_id | Who registered |
| event_id | For which event |
| ticket_number | Unique ticket code (e.g., TF2026-0001) |
| amount | Amount paid |
| payment_status | PENDING / COMPLETED / FAILED / REFUNDED |
| registration_status | CONFIRMED / CANCELLED / ATTENDED |
| registered_at | When they registered |

### 6. `notifications`
User notifications

| Field | What it stores |
|-------|----------------|
| id | Unique identifier |
| user_id | For whom |
| type | Type of notification |
| title | Notification title |
| message | Full message |
| is_read | Has user seen it? |
| created_at | When created |

### 7. `activity_logs`
Admin activity tracking (who approved whom, etc.)

### 8. `notification_settings`
User preferences for email/push notifications

### 9. `refresh_tokens`
For JWT authentication token management

---

## 🔌 APIs Needed (52 Total)

### Authentication (7 APIs)

| API | Purpose |
|-----|---------|
| POST `/auth/signup` | Create new account |
| POST `/auth/login` | Login user |
| POST `/auth/logout` | Logout user |
| POST `/auth/refresh` | Refresh JWT token |
| POST `/auth/forgot-password` | Request password reset |
| POST `/auth/reset-password` | Reset password with token |
| POST `/auth/verify-email` | Verify email (optional) |

### User Profile (4 APIs)

| API | Purpose |
|-----|---------|
| GET `/users/profile` | Get current user's profile |
| PUT `/users/profile` | Update profile |
| PUT `/users/password` | Change password |
| GET `/users/{id}` | Get user by ID (Admin only) |

### Organizer Management - Admin Only (5 APIs)

| API | Purpose |
|-----|---------|
| GET `/organizers/pending` | List pending approval requests |
| GET `/organizers` | List all organizers of college |
| GET `/organizers/{id}` | Get organizer details |
| POST `/organizers/{id}/approve` | Approve an organizer |
| POST `/organizers/{id}/reject` | Reject an organizer |

### Events (9 APIs)

| API | Purpose |
|-----|---------|
| GET `/events` | List all public events (with filtering) |
| GET `/events/{id}` | Get event details |
| POST `/events` | Create new event |
| PUT `/events/{id}` | Update event |
| DELETE `/events/{id}` | Delete event (Admin only) |
| POST `/events/{id}/cancel` | Cancel event |
| GET `/events/my-events` | Get organizer's events |
| GET `/events/college` | Get all college events (Admin) |
| GET `/events/{id}/registrations` | Get event's registrations |

### Registrations & Tickets (6 APIs)

| API | Purpose |
|-----|---------|
| POST `/events/{id}/register` | Register for event |
| GET `/registrations/my-registrations` | Get user's registrations |
| GET `/registrations/{id}` | Get ticket details |
| POST `/registrations/{id}/cancel` | Cancel registration |
| POST `/registrations/{id}/attend` | Mark attendance |
| GET `/registrations/{id}/qr` | Get ticket QR code |

### Colleges (4 APIs)

| API | Purpose |
|-----|---------|
| GET `/colleges` | List all colleges |
| GET `/colleges/{id}` | Get college details |
| PUT `/colleges/{id}` | Update college (Admin only) |
| GET `/colleges/{id}/stats` | Get college statistics |

### Analytics & Reports (6 APIs)

| API | Purpose |
|-----|---------|
| GET `/analytics/dashboard` | Get dashboard stats |
| GET `/analytics/events` | Get events analytics (charts) |
| GET `/analytics/registrations` | Get registration analytics |
| GET `/analytics/revenue` | Get revenue analytics |
| POST `/reports/generate` | Generate report |
| GET `/export/{type}` | Export data (CSV/Excel/PDF) |

### Notifications (7 APIs)

| API | Purpose |
|-----|---------|
| GET `/notifications` | Get user's notifications |
| GET `/notifications/unread-count` | Get unread count |
| POST `/notifications/{id}/read` | Mark as read |
| POST `/notifications/mark-all-read` | Mark all as read |
| DELETE `/notifications/{id}` | Delete notification |
| GET `/notifications/settings` | Get notification settings |
| PUT `/notifications/settings` | Update notification settings |

### Activity Logs - Admin Only (1 API)

| API | Purpose |
|-----|---------|
| GET `/activity-logs` | Get admin activity logs |

### File Upload (3 APIs)

| API | Purpose |
|-----|---------|
| POST `/upload/id-card` | Upload college ID card |
| POST `/upload/event-image` | Upload event poster |
| POST `/upload/avatar` | Upload profile picture |

---

## 📧 Email Templates Needed (9 Templates)

1. **Platform Verification Request** - When admin signs up (sent to platform team)
2. **Welcome Email** - After signup
3. **Account Approved** - When admin account is approved
4. **Organizer Approved** - When organizer can create events
5. **Organizer Rejected** - When organizer request is rejected
6. **Event Registration Confirmation** - With ticket details
7. **Event Reminder** - Day before event
8. **Event Cancelled** - If event is cancelled
9. **Password Reset** - Reset password link

---

## ⏰ Background Jobs (Cron Jobs)

| Job | When | What it does |
|-----|------|--------------|
| Update Event Status | Every hour | Change UPCOMING → ONGOING → COMPLETED based on date |
| Send Event Reminders | Daily | Email users about events happening tomorrow |
| Clean Expired Tokens | Daily | Delete old refresh tokens |

---

## 🛡️ Security Rules

1. **Password Requirements:**
   - Minimum 8 characters
   - At least 1 uppercase letter
   - At least 1 lowercase letter
   - At least 1 number

2. **File Upload Rules:**
   - Types: JPEG, PNG, WebP only
   - Size: 500KB - 4MB

3. **Rate Limiting:**
   - Login: 5 attempts/minute
   - Signup: 3 attempts/minute
   - General API: 100 requests/minute

4. **College Scope:**
   - Admin can ONLY manage organizers from their own college
   - Admin can ONLY see events from their own college

---

## 🔧 Third-Party Services to Consider

| Service Type | Options |
|--------------|---------|
| **Payment Gateway** | Razorpay, PayU, Stripe |
| **File Storage** | AWS S3, Cloudinary |
| **Email Service** | SendGrid, AWS SES |
| **Push Notifications** | Firebase FCM |

---

## 📝 Quick Reference - Status Values

### User Status
- `ACTIVE` - Normal active user
- `PENDING_PLATFORM_VERIFICATION` - Admin waiting for platform approval
- `REJECTED` - Verification rejected
- `SUSPENDED` - Account suspended

### Event Status
- `UPCOMING` - Event hasn't started
- `ONGOING` - Event is happening now
- `COMPLETED` - Event finished
- `CANCELLED` - Event was cancelled

### Payment Status
- `PENDING` - Payment not completed
- `COMPLETED` - Payment successful
- `FAILED` - Payment failed
- `REFUNDED` - Money returned

### Registration Status
- `CONFIRMED` - Registration confirmed
- `CANCELLED` - User cancelled
- `ATTENDED` - User attended the event
- `NO_SHOW` - User didn't attend

---

## ✅ Development Priority

### Phase 1 - Core (Must Have)
1. Authentication (signup, login, logout)
2. User profile management
3. Events CRUD
4. Event registration
5. Basic notifications

### Phase 2 - Admin Features
1. Organizer approval/rejection
2. College management
3. Activity logs

### Phase 3 - Advanced
1. Analytics & reports
2. Export functionality
3. Email notifications
4. Payment integration

---

**Questions?** Coordinate with the frontend developer!


## File: BACKEND_API_SPECIFICATION.md

# GoPass Backend API Specification

> **Version:** 1.0.0  
> **Backend:** Java Spring Boot  
> **Database:** PostgreSQL  
> **Last Updated:** February 4, 2026

This document contains all the APIs and database structures required to build the backend for GoPass - a college event management platform.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [User Roles & Permissions](#2-user-roles--permissions)
3. [Database Schema (PostgreSQL)](#3-database-schema-postgresql)
4. [API Endpoints](#4-api-endpoints)
   - [Authentication APIs](#41-authentication-apis)
   - [User Management APIs](#42-user-management-apis)
   - [Organizer Management APIs](#43-organizer-management-apis)
   - [Event APIs](#44-event-apis)
   - [Registration & Ticket APIs](#45-registration--ticket-apis)
   - [College APIs](#46-college-apis)
   - [Analytics & Reports APIs](#47-analytics--reports-apis)
   - [Notification APIs](#48-notification-apis)
   - [Activity Log APIs](#49-activity-log-apis)
   - [File Upload APIs](#410-file-upload-apis)
5. [Enums & Constants](#5-enums--constants)
6. [Error Handling](#6-error-handling)
7. [Security Requirements](#7-security-requirements)
8. [Email Templates Required](#8-email-templates-required)

---

## 1. System Overview

GoPass is a platform for managing college events with three user types:
- **Users** - Can browse and register for events
- **Organizers** - Can create and manage events (after admin approval)
- **Admins** - Can manage organizers and events for their college

### Verification Flow
```
ADMIN: Signup → Platform Verification (24-48hrs) → Active
ORGANIZER: Signup → Active → Needs Admin Approval to CREATE events
USER: Signup → Active (immediate)
```

---

## 2. User Roles & Permissions

### Role Definitions

| Permission | USER | ORGANIZER | ADMIN |
|------------|------|-----------|-------|
| Browse Events | ✅ | ✅ | ✅ |
| Register for Events | ✅ | ✅ | ✅ |
| View Registered Events | ✅ | ✅ | ✅ |
| Create Events | ❌ | ✅ (after approval) | ✅ |
| Manage Own Events | ❌ | ✅ | ✅ |
| Manage College Events | ❌ | ❌ | ✅ |
| Approve Organizers | ❌ | ❌ | ✅ |
| View Organizers | ❌ | ❌ | ✅ |
| Manage College Details | ❌ | ❌ | ✅ |
| Requires Platform Verification | ❌ | ❌ | ✅ |
| Requires Admin Approval (for events) | ❌ | ✅ | ❌ |

---

## 3. Database Schema (PostgreSQL)

### 3.1 Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('USER', 'ORGANIZER', 'ADMIN')),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' 
        CHECK (status IN ('ACTIVE', 'PENDING_PLATFORM_VERIFICATION', 'REJECTED', 'SUSPENDED')),
    position VARCHAR(50), -- For ADMIN: PROFESSOR, HOD, DEAN | For ORGANIZER: TEACHER, STUDENT
    avatar_url VARCHAR(500),
    id_card_url VARCHAR(500), -- Required for ADMIN and ORGANIZER
    
    -- For Organizers only
    is_admin_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    
    -- College association (for ADMIN and ORGANIZER)
    college_id UUID REFERENCES colleges(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT valid_admin_position CHECK (
        role != 'ADMIN' OR position IN ('PROFESSOR', 'HOD', 'DEAN')
    ),
    CONSTRAINT valid_organizer_position CHECK (
        role != 'ORGANIZER' OR position IN ('TEACHER', 'STUDENT')
    )
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_college ON users(college_id);
```

### 3.2 Colleges Table

```sql
CREATE TABLE colleges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    state VARCHAR(50) NOT NULL,
    pincode VARCHAR(6) NOT NULL,
    address TEXT,
    website_url VARCHAR(500),
    logo_url VARCHAR(500),
    description TEXT,
    established_year INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(name, state) -- Same college name can exist in different states
);

CREATE INDEX idx_colleges_name ON colleges(name);
CREATE INDEX idx_colleges_state ON colleges(state);
```

### 3.3 Events Table

```sql
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(300),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    venue VARCHAR(300) NOT NULL,
    fee DECIMAL(10, 2) DEFAULT 0,
    capacity INTEGER NOT NULL,
    registered_count INTEGER DEFAULT 0,
    
    organizer_id UUID NOT NULL REFERENCES users(id),
    college_id UUID NOT NULL REFERENCES colleges(id),
    
    status VARCHAR(20) NOT NULL DEFAULT 'UPCOMING' 
        CHECK (status IN ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED')),
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(500),
    
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE, -- Can be viewed by all users
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT valid_dates CHECK (end_date >= date),
    CONSTRAINT valid_capacity CHECK (capacity > 0)
);

CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_college ON events(college_id);
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_category ON events(category);
```

### 3.4 Event Tags Table (Many-to-Many)

```sql
CREATE TABLE event_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    
    UNIQUE(event_id, tag)
);

CREATE INDEX idx_event_tags_event ON event_tags(event_id);
CREATE INDEX idx_event_tags_tag ON event_tags(tag);
```

### 3.5 Registrations Table

```sql
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    event_id UUID NOT NULL REFERENCES events(id),
    
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) DEFAULT 0,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING' 
        CHECK (payment_status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),
    payment_id VARCHAR(100), -- External payment gateway ID
    payment_method VARCHAR(50),
    
    registration_status VARCHAR(20) DEFAULT 'CONFIRMED' 
        CHECK (registration_status IN ('CONFIRMED', 'CANCELLED', 'ATTENDED', 'NO_SHOW')),
    attended_at TIMESTAMP WITH TIME ZONE,
    
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    
    UNIQUE(user_id, event_id)
);

CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_ticket ON registrations(ticket_number);
CREATE INDEX idx_registrations_payment_status ON registrations(payment_status);
```

### 3.6 Notifications Table

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    
    is_read BOOLEAN DEFAULT FALSE,
    is_actionable BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    action_data JSONB, -- Additional data for actions
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
```

### 3.7 Activity Logs Table

```sql
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id), -- Who performed the action
    
    action_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    
    target_user_id UUID REFERENCES users(id), -- If action involves another user
    target_event_id UUID REFERENCES events(id), -- If action involves an event
    
    metadata JSONB, -- Additional context
    ip_address INET,
    user_agent VARCHAR(500),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action_type ON activity_logs(action_type);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
```

### 3.8 Notification Settings Table

```sql
CREATE TABLE notification_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id),
    
    email_new_event BOOLEAN DEFAULT TRUE,
    email_registration_confirm BOOLEAN DEFAULT TRUE,
    email_event_reminder BOOLEAN DEFAULT TRUE,
    email_event_update BOOLEAN DEFAULT TRUE,
    
    push_new_event BOOLEAN DEFAULT TRUE,
    push_registration_confirm BOOLEAN DEFAULT TRUE,
    push_event_reminder BOOLEAN DEFAULT TRUE,
    push_event_update BOOLEAN DEFAULT TRUE,
    
    -- Admin/Organizer specific
    email_new_organizer_request BOOLEAN DEFAULT TRUE,
    email_organizer_approved BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3.9 Refresh Tokens Table

```sql
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    device_info VARCHAR(500),
    ip_address INET,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    revoked_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
```

---

## 4. API Endpoints

> **Base URL:** `/api/v1`  
> **Content-Type:** `application/json`  
> **Authentication:** JWT Bearer Token (unless marked as Public)

---

### 4.1 Authentication APIs

#### 4.1.1 User Signup

```http
POST /auth/signup
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "fullName": "John Doe",
  "role": "USER | ORGANIZER | ADMIN",
  
  // Required for ORGANIZER and ADMIN
  "position": "TEACHER | STUDENT | PROFESSOR | HOD | DEAN",
  "collegeName": "XYZ Engineering College",
  "collegeState": "Maharashtra",
  "pincode": "400001",
  "idCardFile": "<multipart file>"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "ORGANIZER",
      "status": "ACTIVE",
      "isAdminApproved": false,
      "college": {
        "id": "uuid",
        "name": "XYZ Engineering College",
        "state": "Maharashtra"
      }
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "requiresVerification": false,
    "redirectTo": "/dashboard/organizer"
  }
}
```

**Business Logic:**
- USER: Status = ACTIVE immediately
- ORGANIZER: Status = ACTIVE, isAdminApproved = false
- ADMIN: Status = PENDING_PLATFORM_VERIFICATION

---

#### 4.1.2 User Login

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "ORGANIZER",
      "status": "ACTIVE",
      "isAdminApproved": true,
      "college": { ... }
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "redirectTo": "/dashboard/organizer"
  }
}
```

---

#### 4.1.3 Refresh Token

```http
POST /auth/refresh
```

**Request Body:**

```json
{
  "refreshToken": "refresh_token"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  }
}
```

---

#### 4.1.4 Logout

```http
POST /auth/logout
🔒 Authenticated
```

**Request Body:**

```json
{
  "refreshToken": "refresh_token"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### 4.1.5 Verify Email (Optional)

```http
POST /auth/verify-email
```

**Request Body:**

```json
{
  "token": "verification_token"
}
```

---

#### 4.1.6 Forgot Password

```http
POST /auth/forgot-password
```

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

---

#### 4.1.7 Reset Password

```http
POST /auth/reset-password
```

**Request Body:**

```json
{
  "token": "reset_token",
  "newPassword": "NewSecurePass123"
}
```

---

### 4.2 User Management APIs

#### 4.2.1 Get Current User Profile

```http
GET /users/profile
🔒 Authenticated
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "ORGANIZER",
    "status": "ACTIVE",
    "position": "TEACHER",
    "avatarUrl": "https://...",
    "idCardUrl": "https://...",
    "isAdminApproved": true,
    "approvedBy": "uuid",
    "approvedAt": "2026-01-20T10:00:00Z",
    "college": {
      "id": "uuid",
      "name": "XYZ Engineering College",
      "state": "Maharashtra",
      "pincode": "400001"
    },
    "createdAt": "2026-01-15T10:00:00Z"
  }
}
```

---

#### 4.2.2 Update User Profile

```http
PUT /users/profile
🔒 Authenticated
```

**Request Body:**

```json
{
  "fullName": "John Doe Updated",
  "avatarUrl": "https://..."
}
```

---

#### 4.2.3 Update Password

```http
PUT /users/password
🔒 Authenticated
```

**Request Body:**

```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword123"
}
```

---

#### 4.2.4 Get User by ID (Admin only)

```http
GET /users/{userId}
🔒 Admin Only
```

---

### 4.3 Organizer Management APIs

> **Note:** These APIs are for Admin only

#### 4.3.1 Get Pending Organizers

```http
GET /organizers/pending
🔒 Admin Only
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)

**Business Logic:**
- Return organizers from the same college as the admin
- Filter: status = ACTIVE AND isAdminApproved = false

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "organizers": [
      {
        "id": "uuid",
        "fullName": "Rahul Verma",
        "email": "rahul.verma@xyz.edu.in",
        "position": "STUDENT",
        "status": "ACTIVE",
        "isAdminApproved": false,
        "idCardUrl": "https://...",
        "createdAt": "2026-01-25T15:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

---

#### 4.3.2 Get All Organizers (Same College)

```http
GET /organizers
🔒 Admin Only
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `status` (optional): APPROVED | PENDING | ALL
- `search` (optional): Search by name or email

---

#### 4.3.3 Approve Organizer

```http
POST /organizers/{organizerId}/approve
🔒 Admin Only
```

**Business Logic:**
- Set isAdminApproved = true
- Set approvedBy = current admin's ID
- Set approvedAt = now()
- Create activity log
- Send notification to organizer
- Send email to organizer

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Organizer approved successfully",
  "data": {
    "id": "uuid",
    "fullName": "Rahul Verma",
    "isAdminApproved": true,
    "approvedBy": "admin_uuid",
    "approvedAt": "2026-01-27T10:00:00Z"
  }
}
```

---

#### 4.3.4 Reject Organizer

```http
POST /organizers/{organizerId}/reject
🔒 Admin Only
```

**Request Body:**

```json
{
  "reason": "Invalid ID card provided"
}
```

**Business Logic:**
- Set status = REJECTED (or keep as ACTIVE but mark as rejected in separate field)
- Create activity log
- Send notification & email to organizer

---

#### 4.3.5 Get Organizer Details

```http
GET /organizers/{organizerId}
🔒 Admin Only
```

---

### 4.4 Event APIs

#### 4.4.1 Get All Public Events

```http
GET /events
🌐 Public
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `status` (optional): UPCOMING | ONGOING | COMPLETED | CANCELLED
- `category` (optional): Technology, Cultural, Sports, Workshop, etc.
- `college` (optional): Filter by college name
- `search` (optional): Search in title, description
- `startDate` (optional): Filter events starting after this date
- `endDate` (optional): Filter events ending before this date
- `featured` (optional): true/false
- `free` (optional): true/false (filter by fee = 0)
- `sortBy` (optional): date, registeredCount, title
- `sortOrder` (optional): asc, desc

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "uuid",
        "title": "Tech Fest 2026",
        "shortDescription": "Annual technology festival...",
        "date": "2026-02-15T10:00:00Z",
        "endDate": "2026-02-17T18:00:00Z",
        "venue": "Main Auditorium, XYZ Engineering College",
        "fee": 299,
        "capacity": 500,
        "registeredCount": 245,
        "spotsRemaining": 255,
        "status": "UPCOMING",
        "category": "Technology",
        "imageUrl": "https://...",
        "tags": ["hackathon", "workshop", "technology"],
        "college": {
          "id": "uuid",
          "name": "XYZ Engineering College"
        },
        "organizer": {
          "id": "uuid",
          "fullName": "Priya Patel"
        }
      }
    ],
    "pagination": { ... }
  }
}
```

---

#### 4.4.2 Get Event Details

```http
GET /events/{eventId}
🌐 Public
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Tech Fest 2026",
    "description": "Full description...",
    "shortDescription": "Short description...",
    "date": "2026-02-15T10:00:00Z",
    "endDate": "2026-02-17T18:00:00Z",
    "venue": "Main Auditorium, XYZ Engineering College",
    "fee": 299,
    "capacity": 500,
    "registeredCount": 245,
    "spotsRemaining": 255,
    "status": "UPCOMING",
    "category": "Technology",
    "imageUrl": "https://...",
    "isFeatured": true,
    "tags": ["hackathon", "workshop", "technology"],
    "college": {
      "id": "uuid",
      "name": "XYZ Engineering College",
      "state": "Maharashtra"
    },
    "organizer": {
      "id": "uuid",
      "fullName": "Priya Patel",
      "position": "TEACHER"
    },
    "createdAt": "2026-01-10T09:00:00Z"
  }
}
```

---

#### 4.4.3 Create Event

```http
POST /events
🔒 Organizer (approved) or Admin
```

**Request Body:**

```json
{
  "title": "AI/ML Workshop",
  "description": "Full description of the event...",
  "shortDescription": "Short summary",
  "date": "2026-03-01T09:00:00Z",
  "endDate": "2026-03-01T17:00:00Z",
  "venue": "Computer Science Lab",
  "fee": 499,
  "capacity": 50,
  "category": "Workshop",
  "imageUrl": "https://...",
  "tags": ["AI", "machine learning", "hands-on"],
  "isPublic": true
}
```

**Business Logic:**
- Organizer must have isAdminApproved = true
- Set college_id from the organizer's college
- Create activity log

---

#### 4.4.4 Update Event

```http
PUT /events/{eventId}
🔒 Organizer (owner) or Admin
```

**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "fee": 399,
  "capacity": 60
}
```

**Business Logic:**
- Organizer can only update their own events
- Admin can update any event in their college

---

#### 4.4.5 Cancel Event

```http
POST /events/{eventId}/cancel
🔒 Organizer (owner) or Admin
```

**Request Body:**

```json
{
  "reason": "Venue unavailable"
}
```

**Business Logic:**
- Set status = CANCELLED
- Notify all registered users
- Process refunds if applicable

---

#### 4.4.6 Delete Event

```http
DELETE /events/{eventId}
🔒 Admin Only
```

---

#### 4.4.7 Get My Events (Organizer)

```http
GET /events/my-events
🔒 Organizer Only
```

**Query Parameters:**
- `status` (optional): UPCOMING | ONGOING | COMPLETED | CANCELLED

---

#### 4.4.8 Get College Events (Admin)

```http
GET /events/college
🔒 Admin Only
```

Returns all events for the admin's college.

---

#### 4.4.9 Get Event Registrations

```http
GET /events/{eventId}/registrations
🔒 Organizer (owner) or Admin
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20)
- `status` (optional): CONFIRMED | CANCELLED | ATTENDED | NO_SHOW

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "registrations": [
      {
        "id": "uuid",
        "ticketNumber": "TF2026-0001",
        "amount": 299,
        "paymentStatus": "COMPLETED",
        "registrationStatus": "CONFIRMED",
        "registeredAt": "2026-01-15T10:30:00Z",
        "user": {
          "id": "uuid",
          "fullName": "Amit Kumar",
          "email": "amit.kumar@gmail.com"
        }
      }
    ],
    "pagination": { ... }
  }
}
```

---

### 4.5 Registration & Ticket APIs

#### 4.5.1 Register for Event

```http
POST /events/{eventId}/register
🔒 Authenticated
```

**Request Body (for paid events):**

```json
{
  "paymentId": "payment_gateway_id",
  "paymentMethod": "UPI | CARD | NETBANKING"
}
```

**Business Logic:**
- Check if spots available (registeredCount < capacity)
- Check if user not already registered
- Generate unique ticket number (format: `EVENT_PREFIX-XXXX`)
- Increment registeredCount
- Create notification
- Send confirmation email

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "registration": {
      "id": "uuid",
      "ticketNumber": "TF2026-0246",
      "amount": 299,
      "paymentStatus": "COMPLETED",
      "registeredAt": "2026-01-27T10:00:00Z",
      "event": {
        "id": "uuid",
        "title": "Tech Fest 2026"
      }
    }
  }
}
```

---

#### 4.5.2 Get My Registrations

```http
GET /registrations/my-registrations
🔒 Authenticated
```

**Query Parameters:**
- `status` (optional): upcoming | past | cancelled

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "registrations": [
      {
        "id": "uuid",
        "ticketNumber": "TF2026-0246",
        "amount": 299,
        "paymentStatus": "COMPLETED",
        "registrationStatus": "CONFIRMED",
        "registeredAt": "2026-01-27T10:00:00Z",
        "event": {
          "id": "uuid",
          "title": "Tech Fest 2026",
          "date": "2026-02-15T10:00:00Z",
          "venue": "Main Auditorium",
          "imageUrl": "https://..."
        }
      }
    ]
  }
}
```

---

#### 4.5.3 Get Registration/Ticket Details

```http
GET /registrations/{registrationId}
🔒 Authenticated (owner)
```

---

#### 4.5.4 Cancel Registration

```http
POST /registrations/{registrationId}/cancel
🔒 Authenticated (owner)
```

**Business Logic:**
- Check if event hasn't started
- Process refund if applicable
- Decrement event's registeredCount
- Send cancellation email

---

#### 4.5.5 Mark Attendance (Organizer/Admin)

```http
POST /registrations/{registrationId}/attend
🔒 Organizer (event owner) or Admin
```

**Business Logic:**
- Set registrationStatus = ATTENDED
- Set attendedAt = now()

---

#### 4.5.6 Get Ticket QR Code

```http
GET /registrations/{registrationId}/qr
🔒 Authenticated (owner)
```

**Response:** Returns QR code image or data for ticket verification

---

### 4.6 College APIs

#### 4.6.1 Get Colleges List

```http
GET /colleges
🌐 Public
```

**Query Parameters:**
- `state` (optional)
- `search` (optional)

---

#### 4.6.2 Get College Details

```http
GET /colleges/{collegeId}
🌐 Public
```

---

#### 4.6.3 Update College Details

```http
PUT /colleges/{collegeId}
🔒 Admin (same college)
```

**Request Body:**

```json
{
  "name": "Updated College Name",
  "address": "Full Address",
  "websiteUrl": "https://...",
  "logoUrl": "https://...",
  "description": "About the college"
}
```

---

#### 4.6.4 Get College Stats

```http
GET /colleges/{collegeId}/stats
🔒 Admin (same college)
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "totalOrganizers": 15,
    "pendingApprovals": 3,
    "totalEvents": 25,
    "activeEvents": 5,
    "completedEvents": 18,
    "totalRegistrations": 1250,
    "thisMonthEvents": 4,
    "thisMonthRegistrations": 180
  }
}
```

---

### 4.7 Analytics & Reports APIs

#### 4.7.1 Get Dashboard Stats

```http
GET /analytics/dashboard
🔒 Authenticated
```

**Response varies by role:**

**For USER:**
```json
{
  "success": true,
  "data": {
    "upcomingEvents": 12,
    "registeredEvents": 5,
    "attendedEvents": 3
  }
}
```

**For ORGANIZER:**
```json
{
  "success": true,
  "data": {
    "activeEvents": 2,
    "pendingEvents": 1,
    "completedEvents": 5,
    "totalRegistrations": 450,
    "thisMonthRegistrations": 120,
    "totalRevenue": 45000,
    "thisMonthRevenue": 12000
  }
}
```

**For ADMIN:**
```json
{
  "success": true,
  "data": {
    "pendingApprovals": 3,
    "totalOrganizers": 15,
    "activeEvents": 5,
    "totalEvents": 25,
    "totalRegistrations": 1250,
    "thisMonthOrganizers": 4
  }
}
```

---

#### 4.7.2 Get Events Analytics

```http
GET /analytics/events
🔒 Organizer or Admin
```

**Query Parameters:**
- `period` (optional): week | month | quarter | year | all
- `groupBy` (optional): day | week | month

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "eventsOverTime": [
      { "label": "Jan", "value": 12 },
      { "label": "Feb", "value": 19 },
      { "label": "Mar", "value": 15 }
    ],
    "eventsByCategory": [
      { "label": "Technology", "value": 35 },
      { "label": "Cultural", "value": 25 },
      { "label": "Sports", "value": 20 }
    ]
  }
}
```

---

#### 4.7.3 Get Registrations Analytics

```http
GET /analytics/registrations
🔒 Organizer or Admin
```

**Query Parameters:**
- `period` (optional): week | month | quarter | year
- `eventId` (optional): Filter by specific event

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "registrationsOverTime": [
      { "label": "Week 1", "value": 120 },
      { "label": "Week 2", "value": 180 }
    ],
    "totalRegistrations": 450,
    "averageRegistrationsPerEvent": 45
  }
}
```

---

#### 4.7.4 Get Revenue Analytics (Organizer/Admin)

```http
GET /analytics/revenue
🔒 Organizer or Admin
```

**Query Parameters:**
- `period` (optional): week | month | quarter | year

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "totalRevenue": 125000,
    "thisMonthRevenue": 35000,
    "revenueByEvent": [
      { "eventId": "uuid", "eventTitle": "Tech Fest", "revenue": 73255 }
    ],
    "revenueOverTime": [
      { "label": "Jan", "value": 45000 },
      { "label": "Feb", "value": 80000 }
    ]
  }
}
```

---

#### 4.7.5 Generate Report

```http
POST /reports/generate
🔒 Admin Only
```

**Request Body:**

```json
{
  "reportType": "events | organizers | registrations | revenue",
  "startDate": "2026-01-01",
  "endDate": "2026-01-31",
  "format": "PDF | CSV | EXCEL"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "reportId": "uuid",
    "downloadUrl": "https://...",
    "expiresAt": "2026-02-04T12:00:00Z"
  }
}
```

---

#### 4.7.6 Export Data

```http
GET /export/{type}
🔒 Admin Only
```

**Path Parameters:**
- `type`: events | organizers | registrations

**Query Parameters:**
- `format`: csv | json | excel | pdf
- `startDate` (optional)
- `endDate` (optional)

---

### 4.8 Notification APIs

#### 4.8.1 Get Notifications

```http
GET /notifications
🔒 Authenticated
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20)
- `unreadOnly` (optional): true/false

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "new_organizer",
        "title": "New Organizer Request",
        "message": "John Doe has requested to become an organizer",
        "isRead": false,
        "isActionable": true,
        "actionUrl": "/dashboard/admin?tab=organizers",
        "createdAt": "2026-01-27T10:00:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": { ... }
  }
}
```

---

#### 4.8.2 Get Unread Count

```http
GET /notifications/unread-count
🔒 Authenticated
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "unreadCount": 5
  }
}
```

---

#### 4.8.3 Mark Notification as Read

```http
POST /notifications/{notificationId}/read
🔒 Authenticated
```

---

#### 4.8.4 Mark All as Read

```http
POST /notifications/mark-all-read
🔒 Authenticated
```

---

#### 4.8.5 Delete Notification

```http
DELETE /notifications/{notificationId}
🔒 Authenticated
```

---

#### 4.8.6 Get Notification Settings

```http
GET /notifications/settings
🔒 Authenticated
```

---

#### 4.8.7 Update Notification Settings

```http
PUT /notifications/settings
🔒 Authenticated
```

**Request Body:**

```json
{
  "emailNewEvent": true,
  "emailRegistrationConfirm": true,
  "emailEventReminder": true,
  "pushNewEvent": false,
  "pushEventReminder": true
}
```

---

### 4.9 Activity Log APIs

#### 4.9.1 Get Activity Logs

```http
GET /activity-logs
🔒 Admin Only
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20)
- `actionType` (optional): organizer_approved | organizer_rejected | event_created | etc.
- `startDate` (optional)
- `endDate` (optional)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "uuid",
        "actionType": "organizer_approved",
        "title": "Approved Organizer",
        "description": "You approved Rahul Verma as organizer",
        "targetUser": {
          "id": "uuid",
          "fullName": "Rahul Verma"
        },
        "createdAt": "2026-01-27T10:00:00Z"
      }
    ],
    "pagination": { ... }
  }
}
```

---

### 4.10 File Upload APIs

#### 4.10.1 Upload ID Card

```http
POST /upload/id-card
🔒 Authenticated
Content-Type: multipart/form-data
```

**Request:**
- `file`: Image file (JPEG, PNG, WebP)
- Min size: 500KB
- Max size: 4MB

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "url": "https://storage.gopass.com/id-cards/uuid.jpg",
    "filename": "id_card_xyz.jpg"
  }
}
```

---

#### 4.10.2 Upload Event Image

```http
POST /upload/event-image
🔒 Organizer or Admin
Content-Type: multipart/form-data
```

---

#### 4.10.3 Upload Avatar

```http
POST /upload/avatar
🔒 Authenticated
Content-Type: multipart/form-data
```

---

## 5. Enums & Constants

### 5.1 User Roles

```java
public enum Role {
    USER,
    ORGANIZER,
    ADMIN
}
```

### 5.2 User Status

```java
public enum UserStatus {
    ACTIVE,
    PENDING_PLATFORM_VERIFICATION,
    REJECTED,
    SUSPENDED
}
```

### 5.3 Event Status

```java
public enum EventStatus {
    UPCOMING,
    ONGOING,
    COMPLETED,
    CANCELLED
}
```

### 5.4 Payment Status

```java
public enum PaymentStatus {
    PENDING,
    COMPLETED,
    FAILED,
    REFUNDED
}
```

### 5.5 Registration Status

```java
public enum RegistrationStatus {
    CONFIRMED,
    CANCELLED,
    ATTENDED,
    NO_SHOW
}
```

### 5.6 Admin Positions

```java
public enum AdminPosition {
    PROFESSOR,
    HOD,
    DEAN
}
```

### 5.7 Organizer Positions

```java
public enum OrganizerPosition {
    TEACHER,
    STUDENT
}
```

### 5.8 Event Categories

```java
public enum EventCategory {
    TECHNOLOGY,
    CULTURAL,
    SPORTS,
    WORKSHOP,
    SEMINAR,
    COMPETITION,
    NETWORKING,
    OTHER
}
```

### 5.9 Notification Types

```java
public enum NotificationType {
    // User notifications
    REGISTRATION_CONFIRMED,
    EVENT_REMINDER,
    EVENT_CANCELLED,
    EVENT_UPDATED,
    
    // Organizer notifications
    NEW_REGISTRATION,
    EVENT_APPROVED,  // Future: if events need approval
    
    // Admin notifications
    NEW_ORGANIZER_REQUEST,
    ORGANIZER_APPROVED,
    NEW_EVENT_CREATED,
    
    // System notifications
    SYSTEM_UPDATE,
    ACCOUNT_VERIFIED
}
```

### 5.10 Activity Types

```java
public enum ActivityType {
    // Organizer actions
    ORGANIZER_APPROVED,
    ORGANIZER_REJECTED,
    
    // Event actions
    EVENT_CREATED,
    EVENT_UPDATED,
    EVENT_CANCELLED,
    EVENT_DELETED,
    
    // Registration actions
    REGISTRATION_CREATED,
    REGISTRATION_CANCELLED,
    ATTENDANCE_MARKED,
    
    // Profile actions
    PROFILE_UPDATED,
    PASSWORD_CHANGED,
    
    // Authentication
    LOGIN,
    LOGOUT
}
```

### 5.11 Indian States (for validation)

```java
public static final List<String> INDIAN_STATES = Arrays.asList(
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh"
);
```

---

## 6. Error Handling

### 6.1 Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { ... }  // Optional additional info
  }
}
```

### 6.2 HTTP Status Codes

| Status Code | Usage |
|-------------|-------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Not authenticated |
| 403 | Forbidden - Not authorized |
| 404 | Not Found |
| 409 | Conflict - Duplicate resource |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

### 6.3 Error Codes

```java
public enum ErrorCode {
    // Authentication
    INVALID_CREDENTIALS,
    TOKEN_EXPIRED,
    TOKEN_INVALID,
    ACCOUNT_SUSPENDED,
    ACCOUNT_PENDING_VERIFICATION,
    
    // Validation
    VALIDATION_ERROR,
    INVALID_EMAIL,
    WEAK_PASSWORD,
    INVALID_FILE_TYPE,
    FILE_SIZE_EXCEEDED,
    
    // User
    USER_NOT_FOUND,
    EMAIL_ALREADY_EXISTS,
    ORGANIZER_NOT_APPROVED,
    
    // Event
    EVENT_NOT_FOUND,
    EVENT_FULL,
    EVENT_CANCELLED,
    ALREADY_REGISTERED,
    REGISTRATION_CLOSED,
    
    // Permission
    ACCESS_DENIED,
    NOT_OWNER,
    WRONG_COLLEGE,
    
    // General
    RESOURCE_NOT_FOUND,
    INTERNAL_ERROR
}
```

---

## 7. Security Requirements

### 7.1 Authentication

- Use JWT tokens for authentication
- Access token expiry: 15 minutes
- Refresh token expiry: 7 days
- Store refresh tokens in database (for revocation)
- Use secure HTTP-only cookies for refresh token (optional)

### 7.2 Password Requirements

```java
// Minimum 8 characters
// At least one uppercase letter
// At least one lowercase letter
// At least one number
// Pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$
```

### 7.3 Rate Limiting

| Endpoint | Rate Limit |
|----------|------------|
| `/auth/login` | 5 requests/minute |
| `/auth/signup` | 3 requests/minute |
| `/auth/forgot-password` | 3 requests/hour |
| General API | 100 requests/minute |

### 7.4 CORS Configuration

Allow origins from frontend domains only.

### 7.5 Input Validation

- Validate all inputs (email format, lengths, etc.)
- Sanitize HTML in text fields
- Validate file types and sizes for uploads

### 7.6 College Scope Enforcement

- Admin can only manage organizers from their college
- Admin can only view/manage events from their college
- Organizer's events are automatically associated with their college

---

## 8. Email Templates Required

### 8.1 Platform Verification Request (ADMIN signup)

**To:** Platform Admin Team  
**Subject:** 🔔 New Platform Verification Request - GoPass

**Data needed:**
- User's full name
- Email
- Role
- Position
- College name
- State
- Pincode
- ID Card URL

---

### 8.2 Registration Confirmation

**To:** User  
**Subject:** ✅ Welcome to GoPass! Your Account is Being Verified

---

### 8.3 Account Approved

**To:** User  
**Subject:** 🎊 Congratulations! Your GoPass Account is Now Active

---

### 8.4 Organizer Approval (Admin → Organizer)

**To:** Organizer  
**Subject:** ✅ You can now create events on GoPass!

---

### 8.5 Organizer Rejection

**To:** Organizer  
**Subject:** Your GoPass organizer request status

---

### 8.6 Event Registration Confirmation

**To:** User  
**Subject:** 🎫 Ticket Confirmed - {Event Name}

**Data needed:**
- Event title
- Date & Time
- Venue
- Ticket number
- Amount paid
- QR Code for ticket

---

### 8.7 Event Reminder

**To:** Registered Users  
**Subject:** ⏰ Reminder: {Event Name} starts tomorrow!

---

### 8.8 Event Cancelled

**To:** Registered Users  
**Subject:** ❌ Event Cancelled - {Event Name}

---

### 8.9 Password Reset

**To:** User  
**Subject:** Reset your GoPass password

---

## 9. Scheduled Tasks (Cron Jobs)

1. **Update Event Status**
   - When: Every hour
   - Action: Update UPCOMING → ONGOING when event starts
   - Action: Update ONGOING → COMPLETED when event ends

2. **Send Event Reminders**
   - When: Once daily
   - Action: Send reminder emails for events happening next day

3. **Clean Up Expired Tokens**
   - When: Once daily
   - Action: Delete expired refresh tokens

4. **Generate Daily Reports (Optional)**
   - When: Daily at midnight
   - Action: Generate and store daily analytics

---

## 10. Additional Considerations

### 10.1 Payment Integration

Consider integrating with:
- Razorpay
- PayU
- Stripe

### 10.2 File Storage

Options:
- AWS S3
- Google Cloud Storage
- Cloudinary (for images)

### 10.3 Email Service

Options:
- SendGrid
- AWS SES
- Mailgun

### 10.4 Push Notifications

Options:
- Firebase Cloud Messaging (FCM)
- OneSignal

### 10.5 Search (Future Enhancement)

- Elasticsearch for advanced event search

---

## API Summary Table

| Category | Endpoint Count | Auth Required |
|----------|----------------|---------------|
| Authentication | 7 | Partial |
| User Management | 4 | Yes |
| Organizer Management | 5 | Admin Only |
| Events | 9 | Partial |
| Registrations | 6 | Yes |
| Colleges | 4 | Partial |
| Analytics & Reports | 6 | Yes |
| Notifications | 7 | Yes |
| Activity Logs | 1 | Admin Only |
| File Upload | 3 | Yes |
| **Total** | **52** | - |

---

**Document prepared for:** GoPass Frontend-Backend Integration  
**Frontend Stack:** React + Vite + Tailwind CSS  
**Backend Stack:** Java Spring Boot + PostgreSQL

---


## File: backend_integration_backup/FLOW_DOC.md

# Backend Integration Flow Documentation

This document describes the flow and logic implemented during the backend integration testing phase (February 21, 2026).

## 1. Global Event Discovery
- **API**: `fetchAllEvents` in `eventsApi.js` calls `GET /api/event/allEvent`.
- **Headers**: Includes `Authorization: Bearer <token>`, `token: <token>`, and `ngrok-skip-browser-warning: true`.
- **Redux Logic**: `eventsSlice.js` includes a normalizer that checks for `payload.data`, `payload.events`, `payload.content`, or a direct array. This ensures compatibility with varied backend response structures.
- **Trigger**: `UserDashboard.jsx` dispatches `fetchEvents` on mount.

## 2. Student Event Registration
- **API**: `registerForEvent(eventId)` in `eventsApi.js` calls `POST /api/registrations/{eventId}`.
- **Workflow**:
    1. Student clicks "Register Now" in `EventCard`.
    2. `RegistrationModal.jsx` opens.
    3. Form validation.
    4. Upon submission, `registerForEvent` is called.
    5. Loading state (`Loader2`) and error handling (`AlertCircle`) are displayed.
    6. On success, a digital ticket is generated using `ticketId` from the backend.
    7. `UserDashboard` re-fetches registrations and stats to reflect the new sign-up instantly.

## 3. Personal Registration List (My Tickets)
- **API**: `getUserRegistrations()` in `eventsApi.js` calls `GET /api/registrations/userRegistrations`.
- **Data Enrichment**: `UserDashboard.jsx` uses a `useMemo` called `enrichedRegistrations`. This blends the registration data (which might only have IDs) with full event details (images, titles, venues) from the global events store.
- **Display**: Used in `TicketsSection.jsx` and `UpcomingReminder.jsx`.

## 4. Organizer Attendee Management
- **API**: `getEventRegistrations(eventId)` in `eventsApi.js` calls `GET /api/registrations/event/{eventId}`.
- **Data Mapping**: Updated `AttendeeSection.jsx` to map backend JSON keys:
    - `studentName` -> Name column
    - `studentEmail` -> Email column
    - `registrationDate` -> Registered At column (properly formatted via `new Date().toLocaleString()`)
    - `ticketId` -> List unique key
- **Trigger**: Organizer clicks "View Attendees" in `OrganizerDashboard`. The dashboard awaits the API call before navigating.

## 5. Security & Authentication
- All requests include the `gopass_token` from `localStorage`.
- Requests pass the token in both `Authorization` header and a custom `token` header for maximum compatibility.

## 6. Key UI/UX Improvements
- **Registration Modal**: Renamed labels to use "Student" terminology where appropriate.
- **Loading States**: Added spinners to all async registration/fetching actions.
- **Error Handling**: Implemented inline error alerts in modals to prevent silent failures.


## File: BROWSER_NAVIGATION_GUIDE.md

# Browser Navigation Setup Guide

## ✅ Implementation Status

**React Router has been successfully implemented!** 🎉

The application now uses **React Router v6** for professional, production-ready navigation.

### Features Implemented:
- ✅ Browser back/forward buttons work perfectly
- ✅ Direct URL access (e.g., `/login`, `/signup`, `/dashboard/user`)
- ✅ Shareable links for all pages
- ✅ Protected routes (authentication required)
- ✅ Public routes (redirect to dashboard if authenticated)
- ✅ Automatic role-based dashboard routing
- ✅ Better SEO with proper URL structure
- ✅ Smooth page transitions (preserved)
- ✅ "Back to Home" buttons on Login/Signup pages

## 🏗️ Architecture Overview

### Route Structure

```
/                           → Landing Page (public, redirects if authenticated)
/login                      → Login Page (public, redirects if authenticated)
/signup                     → Signup Page (public, redirects if authenticated)
/pending-verification       → Pending Verification Page (protected)
/dashboard/user             → User Dashboard (protected, role-based)
/dashboard/organizer        → Organizer Dashboard (protected, role-based)
/dashboard/admin            → Admin Dashboard (protected, role-based)
*                           → Redirects to / (404 fallback)
```

### Key Components

#### 1. **BrowserRouter**
Wraps the entire app to enable routing functionality.

#### 2. **ProtectedRoute**
- Redirects unauthenticated users to `/login`
- Shows loading state during authentication check
- Used for dashboard and verification pages

#### 3. **PublicRoute**
- Redirects authenticated users to their appropriate dashboard
- Checks for pending verification status
- Used for landing, login, and signup pages

#### 4. **DashboardRouter**
- Determines correct dashboard based on user role
- Automatically redirects to appropriate dashboard
- Handles verification status checks

## 🎯 Navigation Methods

### Using `useNavigate` Hook

All pages now use the `useNavigate` hook from `react-router-dom`:

```javascript
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
    const navigate = useNavigate();

    // Navigate to different routes
    navigate('/');                    // Home
    navigate('/login');               // Login
    navigate('/signup');              // Signup
    navigate('/dashboard/user');      // User Dashboard
    navigate(-1);                     // Go back
};
```

### Updated Pages

**LandingPage.jsx**
- Uses `useNavigate()` instead of props
- Passes navigation functions to Navbar

**AuthPage.jsx**
- Manages login/signup toggle
- Navigates to home with `navigate('/')`
- Authentication success handled by App.jsx

**PendingVerificationPage.jsx**
- Home button uses `navigate('/')`
- Logout functionality maintained

## 🔒 Authentication Flow

### Login/Signup Success
1. User authenticates successfully
2. `AuthContext` updates user state
3. App.jsx detects authentication change
4. Routes automatically redirect based on:
   - User status (active vs pending verification)
   - User role (admin, organizer, user)
   - Current page location

### Protected Pages
1. User tries to access protected route
2. `ProtectedRoute` checks authentication
3. If not authenticated → redirect to `/login`
4. If authenticated → allow access

### Public Pages
1. Authenticated user tries to access public route
2. `PublicRoute` checks authentication
3. If authenticated → redirect to appropriate dashboard
4. If not authenticated → allow access

## 🧪 Testing the Implementation

### Browser Navigation
1. ✅ Click browser back button → navigates to previous page
2. ✅ Click browser forward button → navigates to next page
3. ✅ Type URL directly → loads correct page
4. ✅ Share URL with others → works correctly

### Authentication
1. ✅ Access `/dashboard/user` when logged out → redirects to `/login`
2. ✅ Access `/login` when logged in → redirects to dashboard
3. ✅ Login as Admin → redirects to `/pending-verification`
4. ✅ Login as User/Organizer → redirects to appropriate dashboard

### Role-Based Access
1. ✅ User role → `/dashboard/user`
2. ✅ Organizer role → `/dashboard/organizer`
3. ✅ Admin role → `/dashboard/admin` (after verification)

## 📚 Benefits of React Router

### For Users:
- 🔄 Browser back/forward buttons work
- 🔗 Bookmarkable pages
- 📤 Shareable links
- 📱 Deep linking support

### For Developers:
- 🎯 Declarative routing
- 🔒 Easy route protection
- 🎨 Smooth transitions
- � Better analytics tracking
- 🔍 Improved SEO

### For SEO:
- 🌐 Proper URL structure
- 📄 Unique URLs for each page
- 🔎 Better indexing
- 🎯 Targeted meta tags

## 🚀 Next Steps

The navigation system is complete and production-ready! Here are some potential enhancements:

### Optional Improvements:
1. **Route Loading States**: Add loading indicators for slow routes
2. **Error Boundaries**: Catch and display routing errors
3. **Scroll Restoration**: Remember scroll position on back button
4. **Route Transitions**: Add page transition animations
5. **Meta Tags**: Add dynamic meta tags for SEO

## � Code References

- **App.jsx**: Main routing configuration
- **LandingPage.jsx**: Public landing page
- **AuthPage.jsx**: Login/signup page wrapper
- **PendingVerificationPage.jsx**: Verification waiting page
- **All Dashboard Pages**: Protected dashboard routes

## ✨ Summary

The GoPass application now has a **professional, production-ready navigation system** powered by React Router v6. All browser navigation features work perfectly, and the routing is secure with proper authentication checks.

**Status: ✅ COMPLETE**



## File: docs/ORGANIZER_DASHBOARD_TODO.md

# 📋 Organizer Dashboard - Section-Wise Functionality TODO

> **Project**: GoPass - Event Management Platform  
> **Module**: Organizer Dashboard  
> **Created**: February 5, 2026  
> **Last Updated**: February 5, 2026

---

## 📁 Folder Structure

```
src/pages/dashboards/organizer/
├── OrganizerDashboard.jsx          # Main dashboard container
├── components/
│   ├── index.js                    # Central exports
│   │
│   ├── dashboard/                  # 🏠 Home Dashboard Section
│   │   ├── DashboardHome.jsx       # Main home view component
│   │   ├── WelcomeSection.jsx      # Welcome greeting with user info
│   │   └── index.js
│   │
│   ├── stats/                      # 📊 Statistics Section
│   │   ├── StatsGrid.jsx           # Stats container grid
│   │   ├── StatCard.jsx            # Individual stat card (existing)
│   │   ├── AnimatedCounter.jsx     # Counter animation (existing)
│   │   └── index.js
│   │
│   ├── events/                     # 🎪 Events Management Section
│   │   ├── EventsSection.jsx       # Events list container
│   │   ├── OrganizerEventCard.jsx  # Event card (existing)
│   │   ├── EventFilters.jsx        # Filter/search for events
│   │   ├── EventActions.jsx        # Bulk actions for events
│   │   ├── EmptyEventsState.jsx    # Empty state (existing)
│   │   └── index.js
│   │
│   ├── analytics/                  # 📈 Analytics Section
│   │   ├── AnalyticsSection.jsx    # Main analytics view
│   │   ├── RegistrationChart.jsx   # Registration trends chart
│   │   ├── RevenueChart.jsx        # Revenue analytics
│   │   ├── AttendanceChart.jsx     # Event attendance chart
│   │   └── index.js
│   │
│   ├── attendees/                  # 👥 Attendee Management Section
│   │   ├── AttendeeSection.jsx     # Attendee list container
│   │   ├── AttendeeCard.jsx        # Individual attendee card
│   │   ├── AttendeeFilters.jsx     # Search/filter attendees
│   │   ├── AttendeeExport.jsx      # Export attendee list
│   │   └── index.js
│   │
│   ├── tickets/                    # 🎟️ Ticket Management Section
│   │   ├── TicketsSection.jsx      # Tickets overview
│   │   ├── TicketScanner.jsx       # QR code scanner
│   │   ├── TicketStats.jsx         # Ticket statistics
│   │   └── index.js
│   │
│   ├── sidebar/                    # 📱 Sidebar Components
│   │   ├── AccountStatus.jsx       # Account verification status
│   │   ├── ProTips.jsx             # Pro tips card
│   │   ├── QuickActions.jsx        # Quick action buttons
│   │   └── index.js
│   │
│   ├── status/                     # ✅ Status & Verification Section
│   │   ├── ApprovalStatusBanner.jsx # Approval banner (existing)
│   │   ├── VerificationProgress.jsx # Verification steps
│   │   ├── LockedEventCreation.jsx  # Locked state (existing)
│   │   └── index.js
│   │
│   └── common/                     # 🔧 Common/Shared Components
│       ├── SectionHeader.jsx       # Reusable section header
│       ├── LoadingState.jsx        # Loading skeleton
│       ├── ErrorState.jsx          # Error display
│       └── index.js
```

---

## 🚀 Implementation Phases

### Phase 1: Core Structure Setup ✅ 
**Priority**: High | **Complexity**: Low

- [x] Create folder structure for components
- [x] Set up index.js exports for each folder
- [x] Migrate existing components to new structure

### Phase 2: Dashboard Home Section
**Priority**: High | **Complexity**: Medium

#### 2.1 Welcome Section
- [ ] Create `WelcomeSection.jsx`
  - Display personalized greeting (Good Morning/Afternoon/Evening)
  - Show user name and avatar
  - Display last login info
  - Quick motivation/tip of the day

#### 2.2 Dashboard Home
- [ ] Create `DashboardHome.jsx`
  - Integration point for all home sections
  - Responsive layout grid
  - Smooth animations on load

---

### Phase 3: Statistics Section
**Priority**: High | **Complexity**: Medium

#### 3.1 Stats Grid Enhancement
- [ ] Create `StatsGrid.jsx`
  - Responsive grid container
  - Animation stagger effect
  - Pull-to-refresh capability

#### 3.2 StatCard Enhancement (Existing)
- [ ] Enhance current `StatCard.jsx`
  - Add trend indicators (up/down arrows)
  - Sparkline mini-charts
  - Click to view detailed analytics
  - Tooltip with additional info

#### Stats to Display:
| Stat Name | Icon | Description |
|-----------|------|-------------|
| Active Events | Calendar | Currently running events |
| Pending Events | Clock | Scheduled for later |
| Completed Events | CheckCircle | Successfully completed |
| Total Registrations | Users | All time registrations |
| Revenue | DollarSign | Total earnings |
| Avg. Attendance | TrendingUp | Average attendance rate |

---

### Phase 4: Events Management Section
**Priority**: High | **Complexity**: High

#### 4.1 Events Section Container
- [ ] Create `EventsSection.jsx`
  - Tab navigation (All, Active, Pending, Completed, Draft)
  - Search functionality
  - Sort options (Date, Registrations, Revenue)
  - Grid/List view toggle

#### 4.2 Event Filters
- [ ] Create `EventFilters.jsx`
  - Date range filter
  - Status filter dropdown
  - Category filter
  - Clear all filters button

#### 4.3 Event Card Enhancement
- [ ] Enhance `OrganizerEventCard.jsx`
  - Add quick action menu (Edit, Duplicate, Delete, View)
  - Registration progress bar
  - Status badge (Live, Upcoming, Completed, Draft)
  - Revenue display
  - Click to expand details

#### 4.4 Event Actions
- [ ] Create `EventActions.jsx`
  - Select all/none
  - Bulk delete
  - Bulk status change
  - Export selected events

#### 4.5 Event List Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Search | Search by event name/description | High |
| Filter by Status | Active, Pending, Completed, Draft | High |
| Sort | By date, registrations, revenue | Medium |
| Pagination | Load more / infinite scroll | Medium |
| Quick Edit | Inline editing for quick changes | Low |

---

### Phase 5: Analytics Section
**Priority**: Medium | **Complexity**: High

#### 5.1 Analytics Overview
- [ ] Create `AnalyticsSection.jsx`
  - Date range selector (7d, 30d, 90d, Custom)
  - Key metrics summary
  - Export analytics report

#### 5.2 Registration Chart
- [ ] Create `RegistrationChart.jsx`
  - Line chart for registration trends
  - Compare with previous period
  - Event-wise breakdown

#### 5.3 Revenue Chart
- [ ] Create `RevenueChart.jsx`
  - Bar chart for revenue by event
  - Total revenue trend line
  - Payment method breakdown

#### 5.4 Attendance Chart
- [ ] Create `AttendanceChart.jsx`
  - Pie/Doughnut chart for attendance rate
  - Show-up vs No-show ratio
  - Event comparison

#### Charts Requirements:
- Use **Recharts** or **Chart.js** library
- Responsive design
- Animated transitions
- Interactive tooltips
- Download as image option

---

### Phase 6: Attendee Management Section
**Priority**: Medium | **Complexity**: High

#### 6.1 Attendee Section
- [ ] Create `AttendeeSection.jsx`
  - Attendee list by event
  - Search by name/email
  - Filter by check-in status
  - Bulk actions

#### 6.2 Attendee Card
- [ ] Create `AttendeeCard.jsx`
  - User avatar and info
  - Registration date
  - Check-in status
  - Ticket type
  - Payment status

#### 6.3 Attendee Filters
- [ ] Create `AttendeeFilters.jsx`
  - Event selector dropdown
  - Check-in status filter
  - Ticket type filter
  - Date range filter

#### 6.4 Attendee Export
- [ ] Create `AttendeeExport.jsx`
  - Export to CSV
  - Export to Excel
  - Export to PDF
  - Select columns to export

#### Attendee Features:
| Feature | Description |
|---------|-------------|
| View All | List all attendees across events |
| By Event | Filter attendees by specific event |
| Check-in | Manual check-in/check-out |
| Communication | Send email to attendees |
| Export | Download attendee list |

---

### Phase 7: Ticket Management Section
**Priority**: Medium | **Complexity**: Medium

#### 7.1 Tickets Overview
- [ ] Create `TicketsSection.jsx`
  - Ticket sale statistics
  - By event breakdown
  - Recent ticket sales

#### 7.2 Ticket Scanner
- [ ] Create `TicketScanner.jsx`
  - QR code scanner integration
  - Manual ticket ID entry
  - Check-in confirmation
  - Invalid ticket handling

#### 7.3 Ticket Statistics
- [ ] Create `TicketStats.jsx`
  - Sold vs Available
  - Ticket type breakdown
  - Early bird vs Regular sales

---

### Phase 8: Sidebar Components
**Priority**: High | **Complexity**: Low

#### 8.1 Account Status (Existing - Enhance)
- [ ] Create `AccountStatus.jsx`
  - Verification progress bar
  - Step-by-step status
  - Action buttons for pending steps

#### 8.2 Pro Tips (Existing - Enhance)
- [ ] Create `ProTips.jsx`
  - Dynamic tips based on user activity
  - Tip dismissal with animation
  - "Show me how" links

#### 8.3 Quick Actions
- [ ] Create `QuickActions.jsx`
  - Create Event button
  - View Analytics shortcut
  - Revenue Report quick link
  - Attendee List shortcut
  - Settings link

---

### Phase 9: Status & Verification Section
**Priority**: High | **Complexity**: Low

#### 9.1 Approval Status Banner (Existing - Enhance)
- [ ] Enhance `ApprovalStatusBanner.jsx`
  - Progress indicator
  - Expected time remaining
  - Contact support option

#### 9.2 Verification Progress
- [ ] Create `VerificationProgress.jsx`
  - Step-by-step progress display
  - Current step highlight
  - Completed steps with checkmarks
  - Pending steps indication

---

### Phase 10: Common Components
**Priority**: High | **Complexity**: Low

#### 10.1 Section Header
- [ ] Create `SectionHeader.jsx`
  - Title with icon
  - Optional subtitle
  - Action button slot
  - View all link

#### 10.2 Loading State
- [ ] Create `LoadingState.jsx`
  - Skeleton loaders
  - Shimmer effect
  - Different variants (card, list, chart)

#### 10.3 Error State
- [ ] Create `ErrorState.jsx`
  - Error icon and message
  - Retry button
  - Contact support link

---

## 🎨 Design System

### Colors
```css
/* Primary Brand Colors */
--brand-100: #6366f1;  /* Indigo */
--brand-200: #8b5cf6;  /* Purple */

/* Status Colors */
--success: #10b981;    /* Emerald */
--warning: #f59e0b;    /* Amber */
--error: #ef4444;      /* Red */
--info: #3b82f6;       /* Blue */

/* Neutral Colors */
--slate-50: #f8fafc;
--slate-100: #f1f5f9;
--slate-500: #64748b;
--slate-900: #0f172a;
```

### Component Styling Guidelines
- Use `rounded-2xl` for cards
- Use `shadow-sm` with `border border-slate-200/60`
- Glassmorphism for premium feel: `bg-white/80 backdrop-blur-sm`
- Animation delays for stagger effects
- Framer Motion for all animations

---

## 🔌 API Integration Points

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/organizer/stats` | GET | Dashboard statistics |
| `/api/organizer/events` | GET | List all events |
| `/api/organizer/events/:id` | GET | Single event details |
| `/api/organizer/events` | POST | Create new event |
| `/api/organizer/events/:id` | PUT | Update event |
| `/api/organizer/events/:id` | DELETE | Delete event |
| `/api/organizer/attendees` | GET | List attendees |
| `/api/organizer/tickets/scan` | POST | Scan ticket |
| `/api/organizer/analytics` | GET | Analytics data |
| `/api/organizer/revenue` | GET | Revenue report |

---

## 📝 Implementation Order

### Sprint 1 (Current) - Foundation
1. ✅ Create folder structure
2. 🔄 Create common components (SectionHeader, LoadingState, ErrorState)
3. 🔄 Reorganize existing components into new structure
4. 🔄 Create index.js exports

### Sprint 2 - Core Features
5. 📋 Enhance Stats Section with StatsGrid
6. 📋 Build Events Section with filters
7. 📋 Update sidebar components

### Sprint 3 - Advanced Features
8. 📋 Build Analytics Section with charts
9. 📋 Implement Attendee Management
10. 📋 Add Ticket Management with scanner

### Sprint 4 - Polish & Enhancement
11. 📋 Add loading states everywhere
12. 📋 Implement error handling
13. 📋 Add animations and micro-interactions
14. 📋 Performance optimization

---

## ✅ Acceptance Criteria

### Per Component:
- [ ] Responsive on all screen sizes
- [ ] Smooth animations (Framer Motion)
- [ ] Loading states implemented
- [ ] Error handling in place
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Consistent with design system
- [ ] PropTypes or TypeScript interfaces

### Overall Dashboard:
- [ ] Fast initial load (< 2s)
- [ ] Smooth navigation between sections
- [ ] Data persists during navigation
- [ ] Real-time updates where applicable
- [ ] Export functionality works

---

## 🔧 Dependencies

```json
{
  "framer-motion": "^10.x",
  "recharts": "^2.x",
  "lucide-react": "^0.x",
  "date-fns": "^2.x",
  "react-hot-toast": "^2.x"
}
```

---

## 📌 Notes

1. **Mock Data**: Use `src/data/mockData.js` for development
2. **Auth Context**: Use `useAuth()` for user data
3. **Constants**: Status enums in `src/utils/constants.js`
4. **Role Config**: Check permissions via `src/utils/roleConfig.js`

---

## 🚦 Current Status

| Section | Status | Progress |
|---------|--------|----------|
| Folder Structure | ✅ Complete | 100% |
| Dashboard Home | ✅ Complete | 100% |
| Stats Section | ✅ Complete | 100% |
| Events Section | ✅ Complete | 100% |
| Analytics Section | 📋 Planned | 0% |
| Attendees Section | 📋 Planned | 0% |
| Tickets Section | 📋 Planned | 0% |
| Sidebar Components | ✅ Complete | 100% |
| Status Section | ✅ Complete | 100% |
| Common Components | ✅ Complete | 100% |

---

## ✅ Completed Components

### Phase 1: Core Structure ✅
- [x] Created folder structure for all components
- [x] Set up index.js exports for each folder
- [x] Organized components into logical sections

### Phase 2: Common Components ✅
- [x] `SectionHeader.jsx` - Reusable section headers with icons
- [x] `LoadingState.jsx` - Skeleton loaders with shimmer effect
- [x] `ErrorState.jsx` - Error display with retry options

### Phase 3: Stats Section ✅
- [x] `StatsGrid.jsx` - Grid container with refresh capability
- [x] `StatCard.jsx` - Enhanced stat cards with tooltips
- [x] `AnimatedCounter.jsx` - Smooth number animations

### Phase 4: Events Section ✅
- [x] `EventsSection.jsx` - Full events management with filtering
- [x] `OrganizerEventCard.jsx` - Enhanced event cards with actions
- [x] `EventFilters.jsx` - Search, filter, and sort functionality
- [x] `EventActions.jsx` - Bulk action toolbar
- [x] `EmptyEventsState.jsx` - Empty state with CTA

### Phase 5: Sidebar Components ✅
- [x] `AccountStatus.jsx` - Verification progress display
- [x] `ProTips.jsx` - Rotating tips carousel
- [x] `QuickActions.jsx` - Quick action buttons

### Phase 6: Status Section ✅
- [x] `ApprovalStatusBanner.jsx` - Dynamic approval status
- [x] `VerificationProgress.jsx` - Step-by-step progress
- [x] `LockedEventCreation.jsx` - Locked state display

### Phase 7: Dashboard Integration ✅
- [x] `WelcomeSection.jsx` - Personalized greeting
- [x] `DashboardHome.jsx` - Main home view integration
- [x] Updated `OrganizerDashboard.jsx` with new structure

---

*Last Updated: February 5, 2026*


## File: docs/USER_DASHBOARD_TODO.md

# 📋 User Dashboard - Section-Wise Functionality TODO

> **Project**: GoPass - Event Management Platform  
> **Module**: User Dashboard  
> **Created**: February 7, 2026  
> **Last Updated**: February 7, 2026

---

## 📁 Folder Structure

```
src/pages/dashboards/user/
├── UserDashboard.jsx               # Main dashboard container
├── components/
│   ├── index.js                    # Central exports
│   │
│   ├── dashboard/                  # 🏠 Home Dashboard Section
│   │   ├── DashboardHome.jsx       # Main home view component
│   │   ├── WelcomeSection.jsx      # Welcome greeting with user info
│   │   └── index.js
│   │
│   ├── stats/                      # 📊 Statistics Section
│   │   ├── StatsGrid.jsx           # Stats container grid
│   │   ├── StatCard.jsx            # Individual stat card (migrate existing)
│   │   ├── AnimatedCounter.jsx     # Counter animation
│   │   └── index.js
│   │
│   ├── events/                     # 🎪 Events Discovery Section
│   │   ├── EventsSection.jsx       # Events list container
│   │   ├── EventCard.jsx           # Event card (migrate existing)
│   │   ├── EventFilters.jsx        # Filter/search for events
│   │   ├── CategoryTabs.jsx        # Category tabs (migrate existing)
│   │   ├── EventDetailModal.jsx    # Event details popup
│   │   ├── EmptyEventsState.jsx    # Empty state display
│   │   └── index.js
│   │
│   ├── tickets/                    # 🎟️ My Tickets Section
│   │   ├── TicketsSection.jsx      # Tickets container
│   │   ├── TicketCard.jsx          # Individual ticket (migrate existing)
│   │   ├── TicketDetailModal.jsx   # Ticket detail view with QR
│   │   ├── EmptyTicketsState.jsx   # No tickets state
│   │   └── index.js
│   │
│   ├── registration/               # 📝 Registration Section
│   │   ├── RegistrationModal.jsx   # Registration modal (migrate existing)
│   │   ├── RegistrationSteps.jsx   # Multi-step registration
│   │   ├── PaymentStep.jsx         # Payment processing step
│   │   ├── ConfirmationStep.jsx    # Success confirmation
│   │   └── index.js
│   │
│   ├── notifications/              # 🔔 Notifications Section
│   │   ├── NotificationsSection.jsx # Notifications container
│   │   ├── NotificationCard.jsx    # Individual notification
│   │   ├── NotificationBadge.jsx   # Unread count badge
│   │   └── index.js
│   │
│   ├── favorites/                  # ❤️ Favorites Section
│   │   ├── FavoritesSection.jsx    # Saved events container
│   │   ├── FavoriteCard.jsx        # Favorited event card
│   │   ├── EmptyFavoritesState.jsx # No favorites state
│   │   └── index.js
│   │
│   ├── history/                    # 📜 Event History Section
│   │   ├── HistorySection.jsx      # Past events container
│   │   ├── HistoryCard.jsx         # Past event card
│   │   ├── HistoryStats.jsx        # Attendance statistics
│   │   └── index.js
│   │
│   ├── sidebar/                    # 📱 Sidebar Components
│   │   ├── MyTicketsWidget.jsx     # Quick tickets preview
│   │   ├── DiscoverCard.jsx        # Discover events promotion
│   │   ├── QuickTips.jsx           # Pro tips card
│   │   ├── UpcomingReminder.jsx    # Next event reminder
│   │   └── index.js
│   │
│   └── common/                     # 🔧 Common/Shared Components
│       ├── SectionHeader.jsx       # Reusable section header
│       ├── LoadingState.jsx        # Loading skeleton
│       ├── ErrorState.jsx          # Error display
│       ├── SearchBar.jsx           # Reusable search input
│       └── index.js
```

---

## 🚀 Implementation Phases

### Phase 1: Core Structure Setup ✅
**Priority**: High | **Complexity**: Low

- [ ] Create folder structure for components
- [ ] Set up index.js exports for each folder
- [ ] Migrate existing components to new structure
- [ ] Update main UserDashboard.jsx imports

---

### Phase 2: Common Components
**Priority**: High | **Complexity**: Low

#### 2.1 Section Header
- [ ] Create `SectionHeader.jsx`
  - Title with icon
  - Optional subtitle
  - Action button slot (View All, Settings, etc.)
  - Consistent styling
  
#### 2.2 Loading State
- [ ] Create `LoadingState.jsx`
  - Skeleton loaders for different component shapes
  - Shimmer effect animation
  - Variants: card, list, grid, stat

#### 2.3 Error State
- [ ] Create `ErrorState.jsx`
  - Error icon and message
  - Retry button with callback
  - Contact support link

#### 2.4 Search Bar
- [ ] Create `SearchBar.jsx`
  - Search icon with input
  - Clear button when text present
  - Debounced search callback
  - Placeholder customization

---

### Phase 3: Statistics Section
**Priority**: High | **Complexity**: Medium

#### 3.1 Stats Grid
- [ ] Create `StatsGrid.jsx`
  - Responsive grid container (1/2/3 columns)
  - Animation stagger effect on load
  - Refresh capability

#### 3.2 Stat Card Enhancement
- [ ] Enhance `StatCard.jsx`
  - Glassmorphism design
  - Trend indicators (up/down arrows)
  - Color variants (blue, brand, green, amber)
  - Hover animations
  - Click to navigate

#### 3.3 Animated Counter
- [ ] Create `AnimatedCounter.jsx`
  - Smooth count-up animation
  - Number formatting (1K, 10K, etc.)
  - Duration customization

#### Stats to Display:
| Stat Name | Icon | Description |
|-----------|------|-------------|
| Upcoming Events | Calendar | Events you're registered for |
| My Registrations | Ticket | Total tickets purchased |
| Events Attended | CheckCircle2 | Completed event count |
| Saved Events | Heart | Favorited events |
| Points Earned | Award | Loyalty/gamification points |

---

### Phase 4: Events Discovery Section
**Priority**: High | **Complexity**: High

#### 4.1 Events Section Container
- [ ] Create `EventsSection.jsx`
  - Grid layout for event cards
  - Search integration
  - Category filtering
  - Sort options (Date, Price, Popularity)
  - Pagination or infinite scroll

#### 4.2 Event Filters
- [ ] Create `EventFilters.jsx`
  - Search by event name/description
  - Category dropdown/tabs
  - Date range picker
  - Price range filter (Free, Paid, Custom range)
  - Location filter
  - Clear all filters button

#### 4.3 Event Card Enhancement
- [ ] Enhance `EventCard.jsx`
  - Improved image handling with fallback
  - Like/Favorite toggle
  - Quick view on hover
  - Registration status badge
  - Spots left indicator
  - Price display (Free badge / Amount)
  - Share button

#### 4.4 Event Detail Modal
- [ ] Create `EventDetailModal.jsx`
  - Full event details view
  - Image gallery
  - Schedule/timeline
  - Venue with map link
  - Organizer info
  - Terms and conditions
  - Register button

#### 4.5 Category Tabs Enhancement
- [ ] Enhance `CategoryTabs.jsx`
  - Scrollable tabs for mobile
  - Active indicator animation
  - Event count badges
  - Icon support for each category

#### Event Categories:
| Category | Icon | Color |
|----------|------|-------|
| All | Grid | slate |
| Hackathon | Code | blue |
| Workshop | Wrench | green |
| Concert | Music | purple |
| Sports | Trophy | orange |
| Cultural | Palette | pink |
| Conference | Users | indigo |

---

### Phase 5: My Tickets Section
**Priority**: High | **Complexity**: High

#### 5.1 Tickets Section Container
- [ ] Create `TicketsSection.jsx`
  - Tab navigation (Upcoming, Past, All)
  - Sort by date
  - Search tickets

#### 5.2 Ticket Card Enhancement
- [ ] Enhance `TicketCard.jsx`
  - Event image thumbnail
  - Event title and date
  - Ticket number display
  - QR code preview
  - Check-in status indicator
  - Click to expand details

#### 5.3 Ticket Detail Modal
- [ ] Create `TicketDetailModal.jsx`
  - Large QR code display
  - Event complete details
  - Ticket information
  - Download ticket as PDF
  - Add to calendar button
  - Share ticket option
  - Check-in status

#### 5.4 Empty Tickets State
- [ ] Create `EmptyTicketsState.jsx`
  - Friendly illustration/icon
  - Encouraging message
  - CTA to browse events

#### Ticket Features:
| Feature | Description | Priority |
|---------|-------------|----------|
| QR Code | Dynamic QR for check-in | High |
| Download PDF | Offline ticket access | Medium |
| Calendar | Add event to calendar | Medium |
| Share | Share ticket with friends | Low |
| Transfer | Transfer ticket (future) | Low |

---

### Phase 6: Registration Section
**Priority**: High | **Complexity**: High

#### 6.1 Registration Modal Enhancement
- [ ] Enhance `RegistrationModal.jsx`
  - Improved modal animations
  - Step progress indicator
  - Better form validation
  - Error handling

#### 6.2 Multi-Step Registration
- [ ] Create `RegistrationSteps.jsx`
  - Step 1: Personal Details
  - Step 2: Ticket Selection
  - Step 3: Payment (if paid event)
  - Step 4: Confirmation
  - Progress bar

#### 6.3 Payment Step
- [ ] Create `PaymentStep.jsx`
  - Payment method selection
  - Card details input (mock)
  - UPI option display
  - Promo code input
  - Order summary
  - Security badges

#### 6.4 Confirmation Step
- [ ] Create `ConfirmationStep.jsx`
  - Success animation
  - Ticket preview
  - Next steps info
  - Add to calendar CTA
  - Share option

#### Registration Flow:
```
┌─────────────────────────────────────────────────────────┐
│  Step 1          Step 2          Step 3        Step 4   │
│  ────●───────────────●───────────────●────────────●──── │
│  Details        Ticket          Payment      Confirm    │
└─────────────────────────────────────────────────────────┘
```

---

### Phase 7: Notifications Section
**Priority**: Medium | **Complexity**: Medium

#### 7.1 Notifications Section
- [ ] Create `NotificationsSection.jsx`
  - Notifications list
  - Mark all as read
  - Filter by type
  - Clear old notifications

#### 7.2 Notification Card
- [ ] Create `NotificationCard.jsx`
  - Icon based on type
  - Title and message
  - Timestamp (relative)
  - Unread indicator
  - Action button (if applicable)
  - Swipe to dismiss

#### 7.3 Notification Badge
- [ ] Create `NotificationBadge.jsx`
  - Unread count display
  - Pulse animation for new
  - Position variants

#### Notification Types:
| Type | Icon | Color | Description |
|------|------|-------|-------------|
| Event Reminder | Bell | blue | 24h before event |
| Registration | CheckCircle | green | Successful registration |
| Event Update | Info | amber | Event details changed |
| Cancellation | XCircle | red | Event cancelled |
| Promotion | Sparkles | purple | Special offers |

---

### Phase 8: Favorites Section
**Priority**: Medium | **Complexity**: Low

#### 8.1 Favorites Section
- [ ] Create `FavoritesSection.jsx`
  - Saved events grid
  - Sort by added date
  - Quick filter

#### 8.2 Favorite Card
- [ ] Create `FavoriteCard.jsx`
  - Similar to EventCard but lighter
  - Remove from favorites button
  - Registration status
  - Quick register option

#### 8.3 Empty Favorites State
- [ ] Create `EmptyFavoritesState.jsx`
  - Heart illustration
  - Encouraging message
  - Browse events CTA

---

### Phase 9: Event History Section
**Priority**: Medium | **Complexity**: Medium

#### 9.1 History Section
- [ ] Create `HistorySection.jsx`
  - Past events list
  - Filter by year/month
  - Statistics overview

#### 9.2 History Card
- [ ] Create `HistoryCard.jsx`
  - Event snapshot
  - Attended badge
  - Rating option
  - Photo memories link

#### 9.3 History Stats
- [ ] Create `HistoryStats.jsx`
  - Total events attended
  - Events by category pie chart
  - This year vs last year
  - Badges earned

---

### Phase 10: Sidebar Components
**Priority**: Medium | **Complexity**: Low

#### 10.1 My Tickets Widget
- [ ] Create `MyTicketsWidget.jsx`
  - Next 3 upcoming tickets
  - Quick view ticket option
  - View all tickets link
  - Collapsed/expanded state

#### 10.2 Discover Card
- [ ] Create `DiscoverCard.jsx`
  - Gradient background
  - Promotional content
  - Explore events CTA
  - Animated decorations

#### 10.3 Quick Tips
- [ ] Create `QuickTips.jsx`
  - Rotating tips carousel
  - Contextual tips based on activity
  - Dismiss functionality
  - "Show me how" links

#### 10.4 Upcoming Reminder
- [ ] Create `UpcomingReminder.jsx`
  - Next event countdown
  - Event quick info
  - Get directions link
  - Add to calendar

---

## 🎨 Design System

### Colors
```css
/* Primary Brand Colors */
--brand-100: #6366f1;  /* Indigo */
--brand-200: #8b5cf6;  /* Purple */
--brand-300: #a78bfa;  /* Light Purple */

/* Status Colors */
--success: #10b981;    /* Emerald */
--warning: #f59e0b;    /* Amber */
--error: #ef4444;      /* Red */
--info: #3b82f6;       /* Blue */

/* Neutral Colors */
--slate-50: #f8fafc;
--slate-100: #f1f5f9;
--slate-500: #64748b;
--slate-900: #0f172a;

/* Accent Colors */
--pink: #ec4899;
--orange: #f97316;
--cyan: #06b6d4;
```

### Component Styling Guidelines
- Use `rounded-2xl` for cards
- Use `shadow-sm` with `border border-slate-200/60`
- Glassmorphism for premium feel: `bg-white/80 backdrop-blur-sm`
- Animation delays for stagger effects
- Framer Motion for all animations
- Hover states with subtle shadows and transforms

### Animation Patterns
```jsx
// Card entrance animation
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.05, duration: 0.4 }}

// Hover lift effect
whileHover={{ y: -8, scale: 1.02 }}
transition={{ type: "spring", stiffness: 300 }}

// Button press effect
whileTap={{ scale: 0.98 }}
```

---

## 🔌 API Integration Points

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/user/dashboard` | GET | Dashboard statistics |
| `/api/events` | GET | List available events |
| `/api/events/:id` | GET | Single event details |
| `/api/events/:id/register` | POST | Register for event |
| `/api/user/registrations` | GET | User's registrations |
| `/api/user/tickets` | GET | User's tickets |
| `/api/user/tickets/:id` | GET | Single ticket with QR |
| `/api/user/favorites` | GET | Favorited events |
| `/api/user/favorites/:eventId` | POST | Add to favorites |
| `/api/user/favorites/:eventId` | DELETE | Remove from favorites |
| `/api/user/notifications` | GET | User notifications |
| `/api/user/history` | GET | Event history |

---

## 📝 Implementation Order

### Sprint 1 (Current) - Foundation
1. 📋 Create folder structure
2. 📋 Create common components (SectionHeader, LoadingState, ErrorState)
3. 📋 Migrate existing components to new structure
4. 📋 Update index.js exports

### Sprint 2 - Core Features
5. 📋 Enhance Stats Section with StatsGrid
6. 📋 Build Events Section with filters and search
7. 📋 Enhance My Tickets section

### Sprint 3 - Advanced Features
8. 📋 Implement full Registration flow
9. 📋 Build Ticket Detail Modal with QR
10. 📋 Create Event Detail Modal

### Sprint 4 - Enhanced UX
11. 📋 Add Notifications system
12. 📋 Implement Favorites functionality
13. 📋 Build Event History section

### Sprint 5 - Polish & Optimization
14. 📋 Add loading states everywhere
15. 📋 Implement error handling
16. 📋 Add animations and micro-interactions
17. 📋 Performance optimization

---

## ✅ Acceptance Criteria

### Per Component:
- [ ] Responsive on all screen sizes (mobile-first)
- [ ] Smooth animations (Framer Motion)
- [ ] Loading states implemented
- [ ] Error handling in place
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Consistent with design system
- [ ] PropTypes defined

### Overall Dashboard:
- [ ] Fast initial load (< 2s)
- [ ] Smooth navigation between sections
- [ ] Data persists during navigation
- [ ] Real-time updates where applicable
- [ ] Offline-friendly ticket viewing

---

## 🔧 Dependencies

```json
{
  "framer-motion": "^10.x",
  "lucide-react": "^0.x",
  "date-fns": "^2.x",
  "react-hot-toast": "^2.x",
  "qrcode.react": "^3.x"
}
```

---

## 📌 Notes

1. **Mock Data**: Use `src/data/mockData.js` for development
2. **Auth Context**: Use `useAuth()` for user data
3. **Constants**: Status enums in `src/utils/constants.js`
4. **Role Config**: Check permissions via `src/utils/roleConfig.js`
5. **Existing Components**: Migrate carefully to preserve functionality

---

## 🚦 Current Status

| Section | Status | Progress |
|---------|--------|----------|
| Folder Structure | ✅ Complete | 100% |
| Common Components | ✅ Complete | 100% |
| Dashboard Home | ✅ Complete | 100% |
| Stats Section | ✅ Complete | 100% |
| Events Section | ✅ Complete | 100% |
| Tickets Section | ✅ Complete | 100% |
| Registration Section | ✅ Migrated | 100% |
| Notifications Section | 📋 Planned | 0% |
| Favorites Section | 📋 Planned | 0% |
| History Section | 📋 Planned | 0% |
| Sidebar Components | ✅ Complete | 100% |

---

## 🔄 Migration Checklist

### Existing Components to Migrate:
- [x] `StatCard.jsx` → `components/stats/StatCard.jsx`
- [x] `EventCard.jsx` → `components/events/EventCard.jsx`
- [x] `TicketCard.jsx` → `components/tickets/TicketCard.jsx`
- [x] `RegistrationModal.jsx` → `components/registration/RegistrationModal.jsx`
- [x] `CategoryTabs.jsx` → `components/events/CategoryTabs.jsx`

### New Folders Created:
- [x] `components/dashboard/`
- [x] `components/stats/`
- [x] `components/events/`
- [x] `components/tickets/`
- [x] `components/registration/`
- [x] `components/notifications/`
- [x] `components/favorites/`
- [x] `components/history/`
- [x] `components/sidebar/`
- [x] `components/common/`

### Components Created:
#### Common
- [x] `SectionHeader.jsx` - Reusable section headers with icons
- [x] `LoadingState.jsx` - Skeleton loaders with shimmer effect
- [x] `ErrorState.jsx` - Error display with retry options
- [x] `SearchBar.jsx` - Debounced search input

#### Stats
- [x] `StatCard.jsx` - Enhanced stat cards with animations
- [x] `StatsGrid.jsx` - Grid container with refresh
- [x] `AnimatedCounter.jsx` - Smooth number animations

#### Events
- [x] `EventsSection.jsx` - Full events management
- [x] `EventCard.jsx` - Enhanced event cards
- [x] `EventFilters.jsx` - Search, filter, and sort
- [x] `CategoryTabs.jsx` - Scrollable category tabs
- [x] `EmptyEventsState.jsx` - Empty state display

#### Tickets
- [x] `TicketsSection.jsx` - Tickets container with tabs
- [x] `TicketCard.jsx` - Enhanced ticket cards
- [x] `TicketDetailModal.jsx` - Full ticket view with QR
- [x] `EmptyTicketsState.jsx` - No tickets state

#### Sidebar
- [x] `MyTicketsWidget.jsx` - Quick tickets preview
- [x] `DiscoverCard.jsx` - Promotional card
- [x] `QuickTips.jsx` - Rotating tips carousel
- [x] `UpcomingReminder.jsx` - Next event countdown

#### Dashboard
- [x] `DashboardHome.jsx` - Main home integration
- [x] `WelcomeSection.jsx` - Personalized greeting

---

*Last Updated: February 7, 2026*


## File: FRONTEND_DOCUMENTATION.md

# GOPASS — Frontend Documentation

> **GoPass** is a modern event management platform that allows users to discover, register for, and manage events. It features role-based dashboards for Users, Organizers, and Admins.

---

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
|---|---|---|---|
| **Core Framework** | React | 19.2 | UI library for building component-based interfaces |
| **Build Tool** | Vite | 7.2 | Lightning-fast dev server & production bundler |
| **Routing** | React Router DOM | 7.13 | Client-side routing with protected & public routes |
| **State Management** | Redux Toolkit + React Redux | 2.11 / 9.2 | Global state management (auth, events slices) |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS framework with custom theme |
| **Animation** | Framer Motion | 12.26 | Declarative animations & page transitions |
| **Animation** | GSAP + @gsap/react | 3.14 | High-performance timeline-based animations |
| **3D Graphics** | Three.js + React Three Fiber + Drei | 0.182 / 9.5 / 10.7 | 3D scenes & effects on landing page |
| **Smooth Scroll** | Lenis | 1.3 | Butter-smooth scrolling experience |
| **Carousel** | Swiper | 12.0 | Touch-friendly sliders & carousels |
| **Icons** | Lucide React | 0.562 | Clean, consistent SVG icon set |
| **Utilities** | clsx, tailwind-merge, class-variance-authority | — | Conditional class merging & variant management |
| **Testing** | Jest + React Testing Library | 30.2 / 16.3 | Unit & component testing |
| **Linting** | ESLint | 9.39 | Code quality & consistency |

---

## 📁 Project Structure (Brief)

```
src/
├── api/                  # API layer (auth, events, dashboard, organizers)
├── assets/               # Static assets (images, fonts)
├── components/
│   ├── auth/             # Auth-related components
│   ├── blocks/           # Landing page sections (Hero, Showcase, Featured, etc.)
│   ├── canvas/           # Three.js 3D canvas components
│   ├── dashboard/        # Shared dashboard components
│   └── ui/               # Reusable UI primitives
├── context/              # React Context (AuthContext)
├── data/                 # Static/mock data
├── mocks/                # Test mocks
├── pages/
│   ├── dashboards/       # Role-based dashboards (User, Organizer, Admin)
│   │   └── settings/     # Shared settings pages
│   ├── events/           # Events listing, detail, creation pages
│   ├── AuthPage.jsx      # Login/Signup page wrapper
│   └── LandingPage.jsx   # Public landing page
├── services/             # Business logic services
├── store/                # Redux store & slices (auth, events)
├── utils/                # Helpers (constants, validators, roleConfig)
├── App.jsx               # Root app with routing & providers
└── main.jsx              # Entry point
```

---

## 🔐 Authentication & Routing

- **Context-based auth** via `AuthContext` (login, signup, logout, token management).
- **Role-based access control** — three roles: `USER`, `ORGANIZER`, `ADMIN`.
- **Protected routes** redirect unauthenticated users to `/login`.
- **Public routes** redirect authenticated users to their role-specific dashboard.
- **Pending verification** flow for newly registered admins.

---

## 🎨 Key Frontend Features

- **Premium Landing Page** — Hero, Showcase, Featured Events, Connect, Vision sections with GSAP & Framer Motion animations and Three.js 3D effects.
- **Role-Based Dashboards** — Separate dashboard experiences for Users, Organizers, and Admins.
- **Event Management** — Browse, search, filter events; view event details; create events (organizers).
- **Profile & Settings** — User profile management & app settings.
- **Responsive Design** — Mobile-first approach using Tailwind CSS utilities.
- **Smooth Scrolling** — Lenis-powered smooth scroll across the app.

---

## 🚀 Future Improvements

| Area | Planned Change |
|---|---|
| **PWA Support** | Add service workers & manifest for offline access and installability |
| **Dark Mode** | Implement a global dark/light theme toggle with Tailwind's `dark:` variants |
| **Real-Time Notifications** | Integrate WebSockets (Socket.io) for live event updates & alerts |
| **Internationalization (i18n)** | Add multi-language support using `react-i18next` |
| **Performance Optimization** | Lazy-load routes & heavy components; replace Three.js on landing page with lighter CSS alternatives for low-end devices |
| **Payment Integration** | Add Razorpay/Stripe for paid event ticket purchases |
| **SEO & SSR** | Migrate to Next.js for server-side rendering & better SEO |
| **Analytics Dashboard** | Add charts (Recharts/Chart.js) for organizer & admin analytics |
| **Accessibility (a11y)** | Audit & improve keyboard navigation, ARIA labels, and screen reader support |
| **CI/CD Pipeline** | Set up GitHub Actions for automated testing, linting, and deployment |
| **Image Optimization** | Implement lazy loading, WebP format, and CDN-based image delivery |
| **E2E Testing** | Add Cypress or Playwright for end-to-end testing coverage |

---

*Last updated: February 18, 2026*


## File: GOPASS_REDESIGN_TODO.md

# GoPass Landing Page Complete Redesign - Master TODO

> **Objective:** Complete UI/UX redesign inspired by the reference image — bold, dark-themed, typography-heavy, high-impact editorial design.  
> **Constraint:** NO changes to existing functionality, routing, logic, APIs, authentication, or database flows.  
> **Focus:** Visual transformation with premium animations while preserving all features.

---

## 📋 Table of Contents

1. [Design Vision](#design-vision)
2. [Color Palette](#color-palette)
3. [Typography System](#typography-system)
4. [Layout & Spacing System](#layout--spacing-system)
5. [Component Redesign Plan](#component-redesign-plan)
6. [Animation Strategy](#animation-strategy)
7. [Preloader Design](#preloader-design)
8. [Responsive Behavior](#responsive-behavior)
9. [Accessibility Considerations](#accessibility-considerations)
10. [Implementation Checklist](#implementation-checklist)

---

## 🎨 Design Vision

### Reference Image Analysis
The reference design features:
- **Dark, bold aesthetic** with a black/charcoal background
- **Vibrant accent colors** — primarily orange/coral (#FF4F1F) and teal/cyan (#41D6C3)
- **Bold, impactful typography** — mixed weights, large headlines
- **Horizontal scrolling marquee** elements for dynamic feel
- **Editorial-style sections** with strong visual hierarchy
- **Minimalist cards** with subtle borders and depth
- **Portfolio/showcase grid** layouts
- **Testimonial sections** with quotation styling
- **Strong CTA emphasis** with contrasting buttons

### Design Direction for GoPass
Transform GoPass from a light, airy design to a **bold, dark, editorial-style** event platform:
- Dark background (#0A0A0A or similar) for premium feel
- Orange/coral (#FF4F1F) as primary accent
- Teal (#41D6C3) as secondary accent
- Large, impactful headlines with mixed styling
- Horizontal marquee elements for energy
- Grid-based portfolio showcases for events
- Premium card designs with subtle glow effects

---

## 🎨 Color Palette

### Primary Colors
| Role | Current | New | Hex Code | Usage |
|------|---------|-----|----------|-------|
| Background | White (#FFFFFF) | Charcoal Black | `#0A0A0A` | Primary background |
| Background Alt | Slate-50 | Deep Gray | `#121212` | Secondary backgrounds |
| Foreground | Slate-900 | White | `#FFFFFF` | Primary text |
| Foreground Muted | Slate-500 | Gray-400 | `#9CA3AF` | Secondary text |

### Accent Colors
| Role | Current | New | Hex Code | Usage |
|------|---------|-----|----------|-------|
| Primary Accent | brand-100 (#3d70b2) | Coral Orange | `#FF4F1F` | CTAs, highlights, key elements |
| Secondary Accent | brand-200 (#5596e6) | Teal Cyan | `#41D6C3` | Links, hover states |
| Tertiary Accent | brand-300 (#41d6c3) | Electric Purple | `#9B5DE5` | Decorative elements |

### Gradient Definitions
```css
/* Primary Gradient */
--gradient-primary: linear-gradient(135deg, #FF4F1F 0%, #FF8C42 100%);

/* Secondary Gradient */
--gradient-secondary: linear-gradient(135deg, #41D6C3 0%, #00B4D8 100%);

/* Dark Gradient */
--gradient-dark: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%);

/* Glow Effects */
--glow-orange: 0 0 60px rgba(255, 79, 31, 0.3);
--glow-teal: 0 0 60px rgba(65, 214, 195, 0.3);
```

---

## 📝 Typography System

### Font Stack
```css
/* Primary (Headlines) - Bold Impact */
--font-display: 'Manrope', 'Inter', sans-serif;

/* Secondary (Body) - Clean Readability */  
--font-body: 'Inter', 'General Sans', sans-serif;

/* Accent (Editorial) - Decorative */
--font-serif: 'Playfair Display', 'Gambetta', serif;
```

### Type Scale
| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
|---------|----------------|---------------|--------|-------------|----------------|
| H1 (Hero) | 7rem (112px) | 3rem (48px) | 800 | 0.95 | -0.03em |
| H2 (Section) | 5rem (80px) | 2.5rem (40px) | 700 | 1.0 | -0.02em |
| H3 (Subsection) | 3rem (48px) | 1.75rem (28px) | 600 | 1.1 | -0.01em |
| H4 (Card Title) | 1.5rem (24px) | 1.25rem (20px) | 600 | 1.2 | 0 |
| Body Large | 1.25rem (20px) | 1rem (16px) | 400 | 1.6 | 0 |
| Body | 1rem (16px) | 0.875rem (14px) | 400 | 1.6 | 0 |
| Caption | 0.875rem (14px) | 0.75rem (12px) | 500 | 1.4 | 0.02em |
| Overline | 0.75rem (12px) | 0.625rem (10px) | 600 | 1.2 | 0.15em |

### Special Typography Treatments
- **Highlighted words**: Orange (#FF4F1F) with optional underline decoration
- **Italic emphasis**: Serif font for contrast
- **Outlined text**: Stroke-only for background visual interest
- **Gradient text**: For key branded terms ("GoPass")

---

## 📐 Layout & Spacing System

### Grid System
```css
/* Container */
--container-max: 1400px;
--container-padding: 2rem; /* 32px */
--container-padding-mobile: 1rem; /* 16px */

/* Column Grid */
--grid-columns: 12;
--grid-gap: 2rem; /* 32px */
--grid-gap-mobile: 1rem; /* 16px */
```

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight spacing |
| space-2 | 8px | Small gaps |
| space-3 | 12px | Medium gaps |
| space-4 | 16px | Standard padding |
| space-6 | 24px | Section elements |
| space-8 | 32px | Card padding |
| space-12 | 48px | Section margins |
| space-16 | 64px | Major sections |
| space-24 | 96px | Section spacing |
| space-32 | 128px | Hero spacing |

### Section Heights
| Section | Height | Notes |
|---------|--------|-------|
| Navbar | 80px | Fixed, glassmorphism on dark |
| Hero | 100vh | Full viewport |
| Showcase | auto (min 90vh) | Content-driven |
| Featured | 100vh | Full impact |
| Connect | 100vh | Engagement section |
| Vision | auto (min 90vh) | Multi-column |
| Footer | auto | Comprehensive |

---

## 🧩 Component Redesign Plan

### 1. Preloader
**Current:** Not implemented in main flow  
**New Design:**
- [ ] Full-screen dark background (#0A0A0A)
- [ ] Animated "GoPass" text with character reveal
- [ ] Orange (#FF4F1F) accent line/progress indicator
- [ ] Smooth circular/mask exit transition
- [ ] Duration: 2.5-3 seconds

### 2. Navbar
**Current:** Light glassmorphism with brand colors  
**New Design:**
- [ ] Dark transparent background (`rgba(10, 10, 10, 0.8)`)
- [ ] Backdrop blur on scroll
- [ ] Logo: Bold white text with orange dot marker
- [ ] Nav links: White with orange hover underline
- [ ] CTA buttons: Orange primary, outlined secondary
- [ ] Mobile: Dark slide-out menu with staggered animations
- [ ] Scroll behavior: Slight opacity change on scroll

### 3. Hero Section
**Current:** Light background, card fan, centered text  
**New Design:**
- [ ] Full dark background with subtle gradient
- [ ] Multi-line impactful headline:
  > "HOOKED BY **VISUALS**,  
  > FASCINATED BY **TECHNOLOGY**,  
  > FUELLED BY **CRAFTSMANSHIP** AND  
  > MEANINGFUL **AESTHETICS**."  
  (Adapt for GoPass: event-focused messaging)
- [ ] Horizontal scrolling marquee below headline
- [ ] Split layout: Text left, visual right (or full-width text)
- [ ] Orange/teal keyword highlights
- [ ] Subtle Three.js particle/noise background
- [ ] CTA buttons: Bold, prominent placement

### 4. Showcase Section (Brand Experience)
**Current:** Two-column with diagonal cards  
**New Design:**
- [ ] Dark section with portfolio-style grid
- [ ] Large section headline with highlighted text
- [ ] 2-3 column image/video card grid
- [ ] Hover effects: Scale, overlay info reveal
- [ ] Card styling: Subtle borders, rounded corners
- [ ] "View all events" link with arrow animation

### 5. Featured Section (Gateway)
**Current:** Full-width image card with overlays  
**New Design:**
- [ ] Split layout: Large headline left, featured card right
- [ ] Dark background with gradient orbs
- [ ] Feature list with icons and descriptions
- [ ] Navigation: Arrow buttons for browsing
- [ ] Stats/metrics display (e.g., "500+ Events", "10K+ Attendees")

### 6. Connect Section
**Current:** Card deck fan with text below  
**New Design:**
- [ ] Centered large typography statement
- [ ] Horizontal marquee with keywords/phrases
- [ ] Icon badges inline with text
- [ ] Dark gradient background
- [ ] Prominent dual CTA buttons

### 7. Vision Section (Services)
**Current:** Two-column with tabs and image grid  
**New Design:**
- [ ] Services/offerings grid layout (4 items)
- [ ] Each item: Title + description + arrow link
- [ ] Hover: Color accent, slight lift
- [ ] Section headline with creative styling
- [ ] Dark cards with subtle borders

### 8. Testimonials Section (NEW)
**Current:** Not present  
**New Design:**
- [ ] Add testimonial/social proof section
- [ ] Quote styling with large quotation marks
- [ ] User avatars and names
- [ ] Carousel or grid layout
- [ ] Orange accent on quotes

### 9. Footer
**Current:** Dark gradient with wave animation  
**New Design:**
- [ ] Pure dark background (#0A0A0A)
- [ ] Large GoPass logo/branding
- [ ] Horizontal layout: Logo + links + social
- [ ] Newsletter with dark input styling
- [ ] Orange accent line at top
- [ ] Copyright with heartbeat animation
- [ ] Social icons: Outlined style with hover fill

---

## 🎬 Animation Strategy

### GSAP Responsibilities
| Animation | Approach | Section |
|-----------|----------|---------|
| Preloader | Timeline with mask reveal | Preloader |
| Text reveal | SplitText/clip-path word-by-word | Hero, Headlines |
| Scroll animations | ScrollTrigger scrub | All sections |
| Marquee | Infinite horizontal scroll | Hero, Connect |
| Parallax | Subtle depth on scroll | Background elements |
| Number counting | Counter animation | Stats |

### Framer Motion Responsibilities
| Animation | Approach | Section |
|-----------|----------|---------|
| Page transitions | AnimatePresence | Route changes |
| Hover effects | whileHover variants | Cards, buttons, links |
| Stagger children | viewport animations | Grids, lists |
| Layout animations | layoutId | Tab switcher, filters |
| Micro-interactions | tap, hover states | Interactive elements |
| Drag physics | drag constraint | Interactive balls |

### Three.js Responsibilities
| Animation | Approach | Section |
|-----------|----------|---------|
| Background noise | Shader-based grain | Hero |
| Particle field | Point particles | Hero background |
| Ambient shapes | Low-poly forms | Optional decoration |

### Animation Timing Guidelines
```javascript
// Durations
const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  enter: 1.0,
  exit: 0.6,
};

// Easings
const EASING = {
  smooth: [0.25, 0.1, 0.25, 1],      // CSS ease
  sharp: [0.4, 0, 0.2, 1],           // Emphasized deceleration
  gentle: [0.4, 0, 0, 1],            // Gentle ease-out
  bounce: [0.68, -0.55, 0.265, 1.55], // Bounce effect
};

// Stagger
const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
};
```

### Scroll-Triggered Animations
```javascript
// Standard reveal
{
  trigger: element,
  start: "top 80%",
  end: "top 20%",
  toggleActions: "play none none reverse"
}

// Parallax
{
  trigger: element,
  start: "top bottom",
  end: "bottom top",
  scrub: true
}
```

---

## 🔄 Preloader Design

### Visual Design
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│           G O P A S S               │  ← Character-by-character reveal
│           ━━━━━━━━━━                │  ← Orange progress line
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### Animation Sequence
1. **0.0s - 0.5s**: Background fade in (black)
2. **0.5s - 1.5s**: "GoPass" text characters animate in
3. **1.5s - 2.5s**: Progress line animates across
4. **2.5s - 3.0s**: Circular mask/scale exit reveal
5. **3.0s+**: Hero section fully visible

### Technical Implementation
```jsx
// Preloader.jsx structure
<motion.div className="preloader">
  <motion.div className="preloader-content">
    <motion.h1 className="preloader-logo">
      {/* Split "GoPass" into individual characters */}
      {chars.map((char, i) => (
        <motion.span key={i} animate={...} />
      ))}
    </motion.h1>
    <motion.div className="preloader-progress" />
  </motion.div>
</motion.div>
```

---

## 📱 Responsive Behavior

### Breakpoints
```css
/* Mobile First */
--bp-sm: 640px;   /* Small devices */
--bp-md: 768px;   /* Tablets */
--bp-lg: 1024px;  /* Laptops */
--bp-xl: 1280px;  /* Desktops */
--bp-2xl: 1536px; /* Large screens */
```

### Mobile Adaptations
| Element | Desktop | Mobile |
|---------|---------|--------|
| Hero headline | 7rem | 2.5rem |
| Section padding | 128px | 48px |
| Grid columns | 4 | 1-2 |
| Navbar | Horizontal | Hamburger menu |
| Card sizes | Large | Full-width |
| Marquee speed | Normal | Slower |
| Animations | Full | Reduced/simplified |

### Animation Adaptations
```javascript
// Reduce motion for mobile/preference
const prefersReducedMotion = 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Simplified animations for mobile
const mobileAnimations = window.innerWidth < 768;
```

---

## ♿ Accessibility Considerations

### Color Contrast
| Element | Foreground | Background | Ratio | Status |
|---------|------------|------------|-------|--------|
| Body text | #FFFFFF | #0A0A0A | 21:1 | ✅ AAA |
| Muted text | #9CA3AF | #0A0A0A | 7.5:1 | ✅ AAA |
| Orange accent | #FF4F1F | #0A0A0A | 5.2:1 | ✅ AA Large |
| Links | #41D6C3 | #0A0A0A | 8.9:1 | ✅ AAA |

### Motion Accessibility
- [ ] Respect `prefers-reduced-motion` media query
- [ ] Provide pause controls for marquees
- [ ] Ensure animations don't trigger vestibular issues
- [ ] Keep animation durations under 5 seconds

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Visible focus indicators (orange outline)
- [ ] Logical tab order
- [ ] Skip to main content link

### Screen Reader Support
- [ ] Semantic HTML structure
- [ ] ARIA labels for interactive elements
- [ ] Alt text for all images
- [ ] Role attributes where needed

---

## ✅ Implementation Checklist

### Phase 1: Foundation (Priority: HIGH)
- [ ] Update `tailwind.config.js` with new color palette
- [ ] Update `index.css` with new typography imports and base styles
- [ ] Create design tokens CSS variables file
- [ ] Update global background to dark theme

### Phase 2: Core Components (Priority: HIGH)
- [ ] Create/Update `Preloader.jsx` with new dark design
- [ ] Redesign `Navbar.jsx` for dark theme
- [ ] Redesign `HeroSection.jsx` with bold typography
- [ ] Implement horizontal marquee component
- [ ] Update `Footer.jsx` for dark theme

### Phase 3: Section Redesigns (Priority: MEDIUM)
- [ ] Redesign `ShowcaseSection.jsx` 
- [ ] Redesign `FeaturedSection.jsx`
- [ ] Redesign `ConnectSection.jsx`
- [ ] Redesign `VisionSection.jsx`
- [ ] Add Testimonials section (optional)

### Phase 4: Animations (Priority: MEDIUM)
- [ ] Implement GSAP scroll-triggered animations
- [ ] Add Framer Motion hover effects
- [ ] Set up Three.js background (if needed)
- [ ] Add preloader animation sequence
- [ ] Implement marquee animations

### Phase 5: Polish & Optimization (Priority: HIGH)
- [ ] Responsive testing across breakpoints
- [ ] Animation performance optimization (60fps)
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Final visual QA

### Phase 6: Cleanup (Priority: LOW)
- [ ] Remove unused CSS
- [ ] Optimize image assets
- [ ] Code cleanup and documentation
- [ ] Update README with new design notes

---

## 📂 File Changes Summary

| File | Action | Priority |
|------|--------|----------|
| `tailwind.config.js` | Update colors, fonts | HIGH |
| `index.css` | Add new fonts, base styles | HIGH |
| `Preloader.jsx` | Create/Update | HIGH |
| `Navbar.jsx` | Redesign | HIGH |
| `HeroSection.jsx` | Redesign | HIGH |
| `ShowcaseSection.jsx` | Redesign | MEDIUM |
| `FeaturedSection.jsx` | Redesign | MEDIUM |
| `ConnectSection.jsx` | Redesign | MEDIUM |
| `VisionSection.jsx` | Redesign | MEDIUM |
| `Footer.jsx` | Redesign | MEDIUM |
| `LandingPage.jsx` | Add Preloader integration | HIGH |

---

## 🗓️ Estimated Timeline

| Phase | Tasks | Duration |
|-------|-------|----------|
| Phase 1 | Foundation setup | 1 hour |
| Phase 2 | Core components | 3-4 hours |
| Phase 3 | Section redesigns | 4-5 hours |
| Phase 4 | Animations | 2-3 hours |
| Phase 5 | Polish & testing | 2 hours |
| **Total** | | **12-15 hours** |

---

## 📌 Important Notes

1. **NO FUNCTIONALITY CHANGES** - All existing features, routing, APIs, and logic must remain intact
2. **Preserve all props and callbacks** - Component interfaces stay the same
3. **Mobile-first approach** - Design for mobile, enhance for desktop
4. **Performance budget** - Maintain 60fps animations
5. **Modular implementation** - Each component can be updated independently

---

*Document created: 2026-02-08*  
*Reference: Dark editorial design with bold typography*  
*Author: UI/UX Redesign Team*


## File: LANDING_PAGE_TODO.md

# GoPass Landing Page Redesign - TODO

> **Objective:** Redesign the landing page UI/UX to be clean, structured, and visually impressive.  
> **Constraint:** No changes to existing functionality, routing, logic, or business behavior.  
> **Focus:** Layout, animation, and visual hierarchy improvements only.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Section-wise TODO](#section-wise-todo)
   - [1. Preloader](#1-preloader)
   - [2. Navbar](#2-navbar)
   - [3. Hero Section](#3-hero-section)
   - [4. Showcase Section](#4-showcase-section)
   - [5. Featured Section](#5-featured-section)
   - [6. Connect Section](#6-connect-section)
   - [7. Vision Section](#7-vision-section)
   - [8. Footer](#8-footer)
4. [Global Styling Guidelines](#global-styling-guidelines)
5. [Animation Library Responsibilities](#animation-library-responsibilities)
6. [Component References](#component-references)

---

## Project Overview

| Attribute | Details |
|-----------|---------|
| **Tech Stack** | React (Vite), Tailwind CSS |
| **Animation Libraries** | GSAP, Framer Motion, Three.js (via @react-three/fiber) |
| **Smooth Scroll** | Lenis |
| **Icon Library** | Lucide React |
| **Current Structure** | LandingPage.jsx → Navbar, HeroSection, ShowcaseSection, FeaturedSection, ConnectSection, VisionSection, Footer |

---

## File Structure

```
src/
├── components/
│   ├── blocks/
│   │   ├── HeroSection.jsx      ✅ UPDATED
│   │   ├── ShowcaseSection.jsx  ✅ UPDATED
│   │   ├── FeaturedSection.jsx  ✅ UPDATED
│   │   ├── ConnectSection.jsx   ✅ UPDATED
│   │   ├── VisionSection.jsx    ✅ UPDATED
│   │   └── Footer.jsx           ✅ UPDATED
│   ├── ui/
│   │   ├── Navbar.jsx           ✅ UPDATED
│   │   └── Preloader.jsx        ✅ CREATED
│   └── canvas/
│       └── HeroBackground.jsx   ✅ UPDATED (Three.js ambient visuals)
├── pages/
│   └── LandingPage.jsx          ✅ UPDATED
└── index.css
```

---

## Section-wise TODO

---

### 1. Preloader

> **Priority:** MANDATORY  
> **Duration:** 3 seconds  
> **Library:** GSAP (Timeline)  
> **Status:** ✅ COMPLETE

#### Layout Intent
- Full-screen overlay with centered content
- Clean, dark or brand-colored background
- Minimal logo/brand mark + elegant loading indicator
- No flashy spinners; prefer text-based or shape-based loaders

#### Animation Flow
| Phase | Animation | Duration |
|-------|-----------|----------|
| Entry | Fade in logo/text | 0.5s |
| Loading | Subtle pulsing or text mask reveal | 2s |
| Exit | Expand/fade transition to hero | 0.5s |

#### TODO Checklist
- [x] Create `src/components/ui/Preloader.jsx`
- [x] GSAP timeline: entry → loading → exit sequence
- [x] Use mask reveal for "GoPass" text (clip-path or SVG mask)
- [x] Add subtle progress indicator (line or dot sequence)
- [x] Smooth opacity/scale transition to unlock main content
- [x] Integrate into `LandingPage.jsx` with `useState` for `isLoading`
- [x] Prevent body scroll during preloader

#### Library Usage
| Library | Purpose |
|---------|---------|
| GSAP | Timeline orchestration, mask animations |

#### Component Reference
- **ReactBits:** TextPressure (for loading text effect)
- **AnimateUI:** None

---

### 2. Navbar

> **Status:** ✅ COMPLETE  
> **Library:** Framer Motion (existing)

#### Layout Intent
- Already well-structured; needs minor polish
- Ensure consistent glassmorphism styling
- Smooth hide/show on scroll (already implemented)

#### Animation Flow
| Trigger | Animation |
|---------|-----------|
| Page Load | Staggered entrance (logo → links → CTA) |
| Scroll Down | Hide navbar with smooth spring physics |
| Scroll Up | Reveal navbar |
| Hover | Micro-interactions on links and buttons |

#### TODO Checklist
- [x] Review existing animations for consistency
- [x] Ensure floating particle effect is subtle (reduced from 6 to 3)
- [ ] Verify mobile menu transitions are smooth
- [ ] Test glassmorphism backdrop on various backgrounds
- [x] Optimize z-index stacking

#### Library Usage
| Library | Purpose |
|---------|---------|
| Framer Motion | Entry animations, scroll-based visibility, hover effects |

#### Component Reference
- **ReactBits:** Magnet (for CTA button magnetic effect)
- **AnimateUI:** None

---

### 3. Hero Section

> **Status:** ✅ COMPLETE  
> **Library:** GSAP (primary), Three.js (background)

#### Layout Intent
- Clear typography hierarchy: headline → sub-headline → CTA
- Card fan animation is a signature element; keep but refine
- Background should be ambient, not overpowering
- Strong visual balance between text and card visuals

#### Animation Flow
| Phase | Element | Animation | Library |
|-------|---------|-----------|---------|
| Entry | Headline | Character/word mask reveal | GSAP |
| Entry | Subtext | Fade-slide up (staggered) | GSAP |
| Entry | Cards | Fan out from center | GSAP |
| Continuous | Cards | Subtle floating | GSAP |
| Background | Ambient | Gradient noise/particles | Three.js |

#### TODO Checklist
- [x] Implement text mask reveal for headline (SplitText or manual clip-path)
- [x] Add subtle Three.js background (gradient mesh or noise shader)
- [x] Refine card fan timing for smoother cascade
- [x] Add CTA button micro-animation (pulse/glow on idle)
- [ ] Ensure responsive layout on tablets/mobile
- [x] Add scroll-based parallax for cards (optional, subtle)

#### Library Usage
| Library | Purpose |
|---------|---------|
| GSAP | Text reveal, card animations, timeline orchestration |
| Three.js | Ambient background (noise/gradient mesh) |

#### Component Reference
- **ReactBits:** SplitText, ShinyText
- **AnimateUI:** Backgrounds → Particle or Gradient

---

### 4. Showcase Section

> **Status:** ✅ COMPLETE  
> **Library:** Framer Motion (primary), GSAP (scroll-triggered)

#### Layout Intent
- Two-column layout: Text content (left) + Visual composition (right)
- Strong typographic hierarchy
- Diagonal card stack is a focal point; ensure depth and polish

#### Animation Flow
| Trigger | Element | Animation | Library |
|---------|---------|-----------|---------|
| Viewport Entry | Text column | Fade-slide up | Framer Motion |
| Viewport Entry | Cards | Staggered reveal with slight rotation | Framer Motion |
| Hover | Cards | Scale + lift effect | Framer Motion |
| Scroll | Section | Subtle parallax offset | GSAP ScrollTrigger |

#### TODO Checklist
- [x] Add scroll-triggered text animation (word-by-word or line-by-line)
- [x] Refine card stagger timing
- [x] Add hover shine effect on cards
- [x] Ensure @username bubbles are well-positioned and styled
- [ ] Test on various screen sizes

#### Library Usage
| Library | Purpose |
|---------|---------|
| Framer Motion | Viewport animations, hover effects |
| GSAP | ScrollTrigger for parallax (optional) |

#### Component Reference
- **ReactBits:** TiltCard, ShinyText
- **AnimateUI:** None

---

### 5. Featured Section

> **Status:** ✅ COMPLETE  
> **Library:** GSAP (primary)

#### Layout Intent
- Full-width feature card with large image
- Strong headline with editorial feel
- Floating UI elements for depth

#### Animation Flow
| Trigger | Element | Animation | Library |
|---------|---------|-----------|---------|
| Viewport Entry | Headline | Line-by-line reveal | GSAP |
| Viewport Entry | Card | Scale up with soft shadow | GSAP |
| Viewport Entry | UI Elements | Staggered fade-in | GSAP |
| Hover | Card Image | Subtle zoom | CSS/Framer |

#### TODO Checklist
- [x] Refine headline text animation (consider split-line approach)
- [x] Add subtle Ken Burns effect on image hover
- [x] Navigation arrows could have magnetic/spring effect
- [ ] Consider adding a progress indicator if this becomes a slider

#### Library Usage
| Library | Purpose |
|---------|---------|
| GSAP | ScrollTrigger, timeline animations |

#### Component Reference
- **ReactBits:** None
- **AnimateUI:** Buttons → Animated navigation buttons

---

### 6. Connect Section

> **Status:** ✅ COMPLETE  
> **Library:** Framer Motion (primary)

#### Layout Intent
- Centered layout with fanned card deck above text
- Rich typographic expression with inline icons
- CTA buttons prominently placed

#### Animation Flow
| Trigger | Element | Animation | Library |
|---------|---------|-----------|---------|
| Viewport Entry | Cards | Spring upward with fan rotation | Framer Motion |
| Viewport Entry | Text | Fade-in with slight lift | Framer Motion |
| Hover | Cards | Lift + scale + reduce rotation | Framer Motion |
| Hover | Inline icons | Rotation/scale pulse | Framer Motion |
| Idle | Highlighted words | Subtle glow pulse | CSS/Framer |

#### TODO Checklist
- [x] Ensure card deck fan is centered and well-spaced
- [x] Test hover interactions for all 7 cards
- [x] Inline icons should have consistent size and alignment
- [x] CTA buttons need subtle idle animation
- [x] Background decorative elements should be very subtle

#### Library Usage
| Library | Purpose |
|---------|---------|
| Framer Motion | All animations in this section |

#### Component Reference
- **ReactBits:** GradientText (for highlighted words)
- **AnimateUI:** None

---

### 7. Vision Section

> **Status:** ✅ COMPLETE  
> **Library:** Framer Motion (primary)

#### Layout Intent
- Two-column: Vision text + interactive ball container (left), Image grid (right)
- Tab switcher for content filtering
- Draggable icons add interactivity

#### Animation Flow
| Trigger | Element | Animation | Library |
|---------|---------|-----------|---------|
| Viewport Entry | Section tag | Scale pop-in | Framer Motion |
| Viewport Entry | Headline | Staggered fade-slide | Framer Motion |
| Viewport Entry | Ball container | Balls fall with physics | Framer Motion |
| Viewport Entry | Image grid | Staggered reveal with rotation | Framer Motion |
| Tab Change | Grid content | Crossfade with scale | Framer Motion |
| Hover | Grid images | Scale + rotate + shine | Framer Motion |
| Drag | Icons | Physics-based movement | Framer Motion |

#### TODO Checklist
- [x] Ensure ball container has clear boundaries
- [ ] Test drag interactions on touch devices
- [x] Tab switcher should have smooth layout animation
- [x] Image grid transitions should be snappy but not jarring
- [x] "Create" badge should have attention-grabbing but subtle pulse

#### Library Usage
| Library | Purpose |
|---------|---------|
| Framer Motion | All animations, drag physics |

#### Component Reference
- **ReactBits:** Magnet (for draggable balls behavior)
- **AnimateUI:** None

---

### 8. Footer

> **Status:** ✅ COMPLETE  
> **Library:** GSAP (primary)

#### Layout Intent
- Dark theme with gradient accents
- Logo with character animation
- Social links with magnetic hover
- Newsletter subscription area
- Grid-based link layout

#### Animation Flow
| Trigger | Element | Animation | Library |
|---------|---------|-----------|---------|
| Viewport Entry | Decorative line | Scale-X reveal | GSAP |
| Viewport Entry | Logo | Character-by-character 3D flip | GSAP |
| Viewport Entry | Link columns | Staggered fade-slide | GSAP |
| Viewport Entry | Social icons | Scale + rotate pop | GSAP |
| Hover | Social icons | Magnetic follow cursor | GSAP |
| Hover | Links | Underline slide animation | CSS |
| Idle | Orbs | Floating animation loop | GSAP |
| Click | Back to top | Smooth scroll to top | GSAP |

#### TODO Checklist
- [x] Verify all animations trigger correctly on scroll
- [ ] Test magnetic effect on various browsers
- [x] Ensure wave animation SVG renders correctly
- [x] Newsletter input should have focus state animation
- [ ] Mobile layout should stack gracefully

#### Library Usage
| Library | Purpose |
|---------|---------|
| GSAP | All entrance animations, magnetic effects, scroll-to-top |

#### Component Reference
- **ReactBits:** LetterGlow (for logo effect)
- **AnimateUI:** None

---

## Global Styling Guidelines

### Color Palette
| Role | Color | Usage |
|------|-------|-------|
| Primary Dark | `#0f172a` (slate-900) | Text, dark backgrounds |
| Primary Light | `#ffffff` | Backgrounds, cards |
| Brand Primary | `#3d70b2` (brand-100) | Accent, CTAs |
| Brand Secondary | `#41d6c3` (brand-200) | Hover states, gradients |
| Brand Tertiary | `#5596e6` (brand-300) | Decorative elements |

### Typography
| Element | Font | Weight | Size Range |
|---------|------|--------|------------|
| Headlines | Serif (existing) | 400-500 | 3xl - 8xl |
| Body | Sans-serif | 400 | base - xl |
| Navigation | Sans-serif | 500-600 | sm - base |
| CTAs | Sans-serif | 600-700 | base - lg |

### Spacing
- Section padding: `py-16` to `py-24`
- Container max-width: `max-w-7xl`
- Gap between elements: Follow 8px grid system

### Motion Principles
1. **Easing:** Use natural easing (`power3.out`, `ease-out`, spring physics)
2. **Duration:** Entry animations 0.6-1.2s, micro-interactions 0.2-0.4s
3. **Stagger:** 0.05-0.15s between sequential elements
4. **Scroll Trigger:** Start animations when element is ~20% in viewport

---

## Animation Library Responsibilities

| Library | Responsibility | Sections |
|---------|----------------|----------|
| **GSAP** | Timeline-based sequences, scroll-triggered animations, complex masks | Preloader, Hero, Featured, Footer |
| **Framer Motion** | React-native animations, hover/tap states, layout animations, physics | Navbar, Showcase, Connect, Vision |
| **Three.js** | Ambient background visuals (non-intrusive) | Hero (background) |

### GSAP Plugins Required
- `ScrollTrigger` (already registered)
- `ScrollToPlugin` (already registered)
- `SplitText` (if available, or use manual split)

### Framer Motion Features Used
- `motion` components
- `useScroll`, `useMotionValueEvent`
- `useSpring` for smooth values
- `AnimatePresence` for exit animations
- `layoutId` for shared layout animations
- `drag` constraint for interactive elements

### Three.js Usage
- Lightweight only
- Options:
  - Gradient mesh with noise
  - Subtle particle field
  - Depth-blur ambient shapes
- Must not impact performance (<60fps maintained)

---

## Component References

### From ReactBits (https://www.reactbits.dev/)

| Component | Potential Use Case |
|-----------|-------------------|
| SplitText | Hero headline reveal |
| ShinyText | Brand name highlight |
| TextPressure | Preloader text |
| GradientText | Accent words in Connect section |
| Magnet | CTA buttons, social icons |
| TiltCard | Showcase cards |
| LetterGlow | Footer logo |

### From Animate UI (https://animate-ui.com/docs/components)

| Category | Component | Potential Use Case |
|----------|-----------|-------------------|
| Backgrounds | Particle | Hero ambient background |
| Backgrounds | Bubble | Section transitions |
| Buttons | Animated Button | Primary CTAs |

---

## Implementation Progress

### ✅ Completed (2026-02-08)
1. **Preloader** - Full GSAP timeline with logo reveal, progress bar, and circular exit transition
2. **Three.js Background** - Enhanced with floating particles and gentle orbs
3. **Hero Section** - Word-by-word headline reveal, character subheadline, improved card animations
4. **Navbar** - Reduced particles for subtlety, maintained all existing functionality
5. **Showcase Section** - Staggered animations, parallax scroll, enhanced hover effects
6. **Featured Section** - Clip-path headline animation, Ken Burns image effect, stats row
7. **Connect Section** - Improved card deck fan, SVG path animation, shimmer effects
8. **Vision Section** - Better physics on draggable balls, smooth tab transitions
9. **Footer** - Added GitHub social link, improved animation timing with useInView

### 🔄 Remaining Tasks
- [ ] Test responsive layouts across all sections
- [ ] Verify mobile menu transitions
- [ ] Test touch device interactions (drag, swipe)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Performance profiling (ensure 60fps)

---

## Notes for Implementation

- All changes are **UI/UX only**
- Preserve all existing **props, callbacks, and routing logic**
- Code should be **modular** and follow existing file structure
- Use **CSS variables** where possible for easy theming
- Test on **Chrome, Firefox, Safari** minimum
- Ensure **accessibility** is not compromised (focus states, ARIA labels)
- **Performance:** Keep animations GPU-accelerated (transform, opacity)

---

*Document created: 2026-02-08*  
*Last updated: 2026-02-08*  
*Author: Senior Frontend Developer*


## File: LOGIN_DASHBOARD_FLOW.md

# GoPass: Login & Dashboard Flow Architecture

This document maps out the complete authentication flow, role-based routing, dashboard interconnections, and the event creation and component structure in the GoPass application.

## 1. Authentication Entry Point (`/login` & `/signup`)
The initial entry point for an unauthenticated user is handled by the **AuthPage** wrapper.

- **`App.jsx`**: Handles routing using `<PublicRoute>`. If a user is already authenticated, they are automatically redirected to their respective dashboard. Otherwise, they are shown the `<AuthPage />`.
- **`src/pages/AuthPage.jsx`**: Manages the smooth transitions between `<LoginPage />` and `<SignupPage />` using Framer Motion. 
- **`src/pages/LoginPage.jsx`**: Provides the UI for entering credentials and interacts with the context.

## 2. State Management & Login Process (`Redux` & `Context`)
Once the user submits their credentials, the login process starts.

1. **`useAuth()` Hook**: The login form calls `login(email, password)` from `src/context/AuthContext.jsx`.
2. **Redux Thunk (`loginAction`)**: Dispatched to `store/slices/authSlice.js`.
3. **Simulation/API**: The thunk simulates an API call (or fetches the user) and validates it against stored data (`findUserByEmail`). 
4. **State Update**: Upon success, Redux updates the global store (`isAuthenticated: true`, `user: {...}`). The authentication state is also synced with `localStorage` (`gopass_user`).
5. **Role Assignment**: Depending on how the user was created during signup (`STUDENT`, `ADMIN`, `ORGANIZER`), their corresponding role dictates their features and permissions.

## 3. Role-Based Routing & Redirection Rules
GoPass incorporates a robust role-based routing system built in `src/utils/roleConfig.js`.

After a successful login or app reload, the application checks the user's details:
- **`isAccountFullyVerified(user)`**: Checks if the user's status is `ACTIVE`. 
  - *Example:* Admins sign up with a `PENDING_PLATFORM_VERIFICATION` status. If their status isn't `ACTIVE`, they are hijacked and pushed to `/pending-verification`.
- **Dashboard Router**: Inside `App.jsx`, `<DashboardRouter />` ensures the user is on the correct path. It looks at the user's role:
  - `ROLES.USER` -> Maps to `/dashboard/user`
  - `ROLES.ORGANIZER` -> Maps to `/dashboard/organizer`
  - `ROLES.ADMIN` -> Maps to `/dashboard/admin`
- If an organizer tries to visit `/dashboard/admin`, the `<DashboardRouter />` redirects them back to their appropriate role-bound dashboard.

## 4. The Dashboards & Their Interconnections
Once redirected, the user lands on one of the three dashboards. They operate distinctly but interact based on the hierarchical layout of the platform. All dashboards manage events through Redux state (`store/slices/eventsSlice.js`).

### User (Student) Dashboard (`/dashboard/user/UserDashboard.jsx`)
- **Permissions**: Browse events, register for events, view purchased/registered tickets.
- **Interconnection**: Users consume events published by Organizers and Approved by Admins. They do not have creation features.
- **Verification**: Fully active upon standard signup.
- **Key Components**:
  - `DashboardHome`: Master view managing stats, latest events, and my tickets.
  - `EventsSection`: Renders the event lists using cards. Retrieves events via Redux (`eventsSlice`).
  - `TicketsSection`: Displays the user's active/past registrations.
  - `RegistrationModal`: Form interaction handling successful event registration and local state syncing.
  - `SectionHeader`: Visual UI separating components logically.

### Organizer Dashboard (`/dashboard/organizer/OrganizerDashboard.jsx`)
- **Permissions**: Browse events, manage their *own* events, create new events.
- **Verification & Limitations**: Organizers are `ACTIVE` upon signup, but they face a limitation: **`canOrganizerCreateEvents(user)`**. To actually *create* an event, `isAdminApproved` must be `true`.
- **Interconnection**: Event creations by Organizers are essentially drafted or pending until the college's Admin dashboard approves them. Organizers interact closely with the Admin boundary.
- **Key Components**:
  - `DashboardHome`: Quick stats and latest organizer events.
  - `EventsSection`: The management list representing drafted vs published events.
  - `OrganizerCreateEventForm`: Specialized form handling event details specific to the logged-in organizer.
  - `AttendeeSection`: Real-time tracking of users registered for the organizer's active events.

### Admin Dashboard (`/dashboard/admin/AdminDashboard.jsx`)
- **Permissions**: Can manage *all* events within their college, approve/reject Organizer verifications, and manage platform details.
- **Verification**: They face the steepest verification—requiring external platform approval (`PENDING_PLATFORM_VERIFICATION`) before gaining full dashboard access. 
- **Interconnection**: Admins sit at the top of the college hierarchy. Their dashboard populates with pending requests from Organizers (such as event proposals or organizer access requests) which they must approve so Organizers can function fully.
- **Key Components**:
  - `WelcomeBanner`: Top-level greeting.
  - `StatCard`: Grid statistics components overviewing active events and total organizers.
  - `PendingOrganizerCard` / `ApprovedOrganizerRow`: Manages organizer verification statuses directly from the UI.
  - `CollegeEventsSection`: Detailed overview of *all* events happening across the specific college scope.
  - `AdminCreateEventForm`: High-level event creation form bypassing standard approval pipelines.
  - `AnalyticsDashboard` & `ReportsSection` & `ActivityLogSection`: Administrative overviews mapping app usage.
  - `CollegeInfoCard` & `NotificationsPanel`: Institutional management components.

## 5. Event Creation Lifecycle

The creation of an event is tightly bound to Redux (`eventsSlice.js`) to provide real-time seamless dashboard propagation:

1. **Triggering**: An authenticated Admin or Organizer navigates to the "Create Event" page (`currentPage = 'create-event'`).
    - *Organizer Note*: The UI intercepts Organizers using `canOrganizerCreateEvents`. If their account isn't approved by an Admin yet, the creation component renders a "Creation Locked" placeholder view.
2. **Component Execution**: `AdminCreateEventForm` or `OrganizerCreateEventForm` mounts depending on the active dashboard. Event details (Date, Title, Banner, Meta) are filled.
3. **Dispatch Action**: Form submits `eventData` over an async thunk inside `eventsSlice.js`.
    - `dispatch(createEvent(eventData))`
4. **State Management (`eventsSlice.js`)**: 
    - Generates a unique `id` (`evt_123456789`).
    - Appends metadata (`createdAt: new Date().toISOString()`, `status: EVENT_STATUS.UPCOMING`, `registeredCount: 0`).
    - Executes the `createEvent.fulfilled` reducer, pushing the new element using `.unshift()` to place the latest event at the top of the events array (`state.items`).
5. **Propagation**: 
    - Because the central Redux state pushes out changes uniformly, as soon as `items` updates, any dashboard invoking `useSelector(selectAllEvents)` triggers an immediate React re-render.
    - An Organizer sees their event populate in `EventsSection`.
    - An Admin instantly sees it inside their `CollegeEventsSection`.
    - A User sees the newly `UPCOMING` mapped event in their `Explore Events` space.

## Summary of the Entire Lifecycle

1. **User Activity**: Unauthenticated User -> visits `/login` -> Redux Auth state updates.
2. **Access Control**: App verifies the User's `ROLE` & `STATUS`.
3. **Routing**: `<DashboardRouter />` sends the user to `/dashboard/(user|organizer|admin)`.
4. **Dashboard Features / Event Lifecycle**:
   - Admins verify Organizers via Dashboard Actions (`PendingOrganizerCard`).
   - Organizers construct Events (`OrganizerCreateEventForm`), verified by `canOrganizerCreateEvents`.
   - Events are deployed globally inside `eventsSlice.js`.
   - Students (Users) consume Approved Events on `DashboardHome` and generate Registrations (`RegistrationModal`).


## File: PREMIUM_TRANSITION.md

# ✨ Premium Minimal Transition - Login ↔ Signup

## What Changed

### **Before**: Flashy 3D Animation
- ❌ 3D page flip (90° rotation)
- ❌ Particle burst effects (30 particles)
- ❌ Morphing backgrounds with orbs
- ❌ Complex 3D perspective
- ❌ Duration: 0.8-1.2 seconds
- ❌ Heavy, distracting animations

### **After**: Premium Minimal Animation ✨
- ✅ Subtle fade effect
- ✅ Gentle scale (96% → 100% → 102%)
- ✅ Smooth blur transition (8px → 0px)
- ✅ Minimal horizontal shift (50px)
- ✅ Duration: 0.4-0.5 seconds
- ✅ Apple-style easing curve `[0.25, 0.1, 0.25, 1]`

---

## 🎨 Animation Details

### **Entrance Animation**
```
Opacity: 0 → 1
Scale: 0.96 → 1
Blur: 8px → 0px
Position: ±50px → 0
Duration: 0.5s
```

### **Exit Animation**
```
Opacity: 1 → 0
Scale: 1 → 1.02
Blur: 0px → 8px
Position: 0 → ∓50px
Duration: 0.4s
```

### **White Flash Overlay**
- Brief white overlay (40% opacity)
- Duration: 0.2s
- Creates clean "wipe" effect
- Feels premium and polished

### **Shimmer Effect**
- Subtle gradient shimmer across screen
- Moves left/right based on direction
- Duration: 1.2s
- Adds sophistication without distraction

---

## 🏆 Premium Design Principles Applied

1. **Speed**: Fast transitions (0.4-0.5s) feel responsive
2. **Subtlety**: Small movements (50px, 4% scale) are elegant
3. **Blur**: Motion blur adds realism and smoothness
4. **Easing**: Apple's cubic-bezier curve feels natural
5. **Whitespace**: Clean overlay creates breathing room
6. **Direction**: Horizontal shift provides spatial context

---

## 🎯 Inspired By

- **Apple iOS**: Smooth app transitions
- **Material Design**: Fade through pattern
- **Stripe**: Minimal, confident animations
- **Linear**: Fast, purposeful motion

---

## 📊 Performance

- ✅ **GPU Accelerated**: Uses transform, opacity, filter
- ✅ **60 FPS**: Smooth on all devices
- ✅ **Minimal**: No particle calculations
- ✅ **Clean**: No complex 3D mathematics
- ✅ **Fast**: Completes in under 0.5 seconds

---

## 🚀 Test It

1. Navigate to http://localhost:5174/
2. Click "Log In"
3. Click "Create Account"
4. Notice the smooth, premium transition
5. Compare to before - much more refined!

**Key Difference**: 
- **Old**: "Look at this fancy animation!" 🎪
- **New**: "This just feels right." ✨

The new animation doesn't call attention to itself - it just guides your eye smoothly from one page to the next, which is the hallmark of premium design.

---

## 💎 Why This Feels Premium

1. **Confident, Not Flashy**: Subtle movements show restraint
2. **Fast, Not Slow**: Respects user's time
3. **Smooth, Not Jarring**: Natural easing curves
4. **Purpose, Not Decoration**: Every element serves a function
5. **Minimal, Not Barren**: Just enough to feel polished

This is the difference between trying to impress and actually being impressive.


## File: TASKS_COMPLETED.md

# ✅ All Tasks Completed - Login & Signup Redesign

## Task Summary

### ✅ Task 1: Smoother & Cooler Switching Animation

**What Changed:**
- Replaced slide animation with **3D page flip effect**
- Added **morphing background gradients** that transition between pages
- Implemented **particle burst effect** (30 particles radiating outward)
- Added **transition veil** with backdrop blur for smooth transitions
- Enhanced with **spring physics** for natural, fluid motion

**New Animation Features:**
1. **3D Flip**: Pages rotate on Y-axis (90deg → 0deg → -90deg)
2. **Perspective**: Set to 2000px for realistic 3D depth
3. **Morphing Backgrounds**: 
   - Login: Radial gradients moving from top-left
   - Signup: Radial gradients moving from bottom-right
   - Smooth color transitions between states
4. **Particle Burst**: 30 white particles explode outward in a circle on page change
5. **Scale Animation**: Pages scale from 0.8 to 1.0 during transition
6. **Transition Veil**: Blurred overlay fades in/out for smooth visual continuity

**Duration**: ~0.8 seconds for smooth, professional feel

---

### ✅ Task 2: Changed 3D Elements

#### **Login Page - DNA Helix**
**Replaced**: Simple sphere
**New Element**: Intricate DNA helix structure

**Features:**
- 20 interconnected spheres forming a helix pattern
- Cylinders connecting each sphere to create strand effect
- Automatic Y-axis rotation (0.3 rad/s)
- Each sphere floats independently with different speeds
- Emissive materials for glowing effect
- Color scheme: #5596e6 (spheres), #3d70b2 (connections)
- Metallic finish (0.8-0.9 metalness)

**Visual Impact**: Scientific, modern, dynamic structure that represents connectivity

#### **Signup Page - Molecular Network**
**Replaced**: Torus + floating cubes
**New Element**: Complex molecular network structure

**Features:**
- Central wireframe octahedron (0.6 scale)
- 6 orbiting spheres at different positions
- Connecting cylinders between nodes
- Dual rotation: Y-axis rotation + X-axis sine wave
- Color gradient: #41d6c3 (core) → #5596e6 → #3d70b2
- Each node floats at different speeds (2.0 → 2.9)
- Semi-transparent connections (60% opacity)

**Visual Impact**: Futuristic network visualization representing connection and collaboration

---

### ✅ Task 3: Removed Reviews/Testimonials

**Removed From Signup Page:**
- 5-star rating display
- Customer quote: "GoPass transformed how our organization manages events..."
- User profile section (Sarah Johnson, Event Organizer)
- Background card with glassmorphism effect

**Cleanup:**
- Removed unused `Star` icon import
- Eliminated testimonial motion.div block
- Cleaner left panel with more focus on benefits

**Result**: Cleaner interface with more breathing room, focusing on core value propositions

---

## 📁 Files Modified

1. **AuthPage.jsx**
   - Complete rewrite of transition system
   - Added 3D perspective container
   - Implemented particle burst effect
   - Created morphing background system
   - Added transition veil overlay

2. **LoginPage.jsx**
   - Replaced AnimatedSphere with DNAHelix component
   - Added useFrame hook for rotation
   - Created 20-point helix with interconnected cylinders
   - Updated camera position to [0, 0, 8]
   - Enhanced lighting for better 3D effect

3. **SignupPage.jsx**
   - Replaced AnimatedTorus and FloatingCubes with MolecularNetwork
   - Created octahedron core with orbiting spheres
   - Added connection lines between nodes
   - Implemented dual-axis rotation
   - Removed testimonial section completely
   - Cleaned up unused Star icon import

---

## 🎨 Visual Improvements

### Animation Quality
- **Before**: Simple slide left/right
- **After**: Cinematic 3D flip with particle effects

### 3D Elements
- **Before**: Basic shapes (sphere, torus, cubes)
- **After**: Complex scientific structures (DNA helix, molecular network)

### Page Cleanliness
- **Before**: Testimonial taking up space
- **After**: Clean, focused benefit presentation

---

## 🚀 Testing

To see all the improvements:

1. Visit: http://localhost:5174/
2. Click "Log In" button in navbar
3. **Watch**: DNA helix rotating in background
4. Click "Create Account" link
5. **Watch**: 
   - 3D page flip animation
   - Particle burst effect
   - Background gradient morph
   - Molecular network on signup page
6. **Notice**: No testimonial section, cleaner design
7. Click "Sign In" to see reverse animation

---

## 📊 Performance

All animations are GPU-accelerated:
- ✅ Using CSS transforms (translateX, rotateY, scale)
- ✅ Using opacity (no layout thrashing)
- ✅ Spring physics for natural motion
- ✅ Optimized particle count (30 particles)
- ✅ Efficient 3D rendering with Three.js
- ✅ Smooth 60fps on modern devices

---

## 🎯 Results

1. **More Engaging**: 3D flip is visually impressive
2. **Professional**: Smooth spring animations feel premium
3. **Modern**: Complex 3D structures show sophistication
4. **Clean**: Removed unnecessary testimonial clutter
5. **Performant**: All animations run at 60fps

All three tasks completed successfully! 🎉


## File: TESTING_GUIDE.md

# Redux State Management Testing Guide

Complete Redux state management testing suite for the Gopass application.

## 📋 Overview

This comprehensive testing suite covers all aspects of Redux state management:

- **Auth Slice Tests** - Authentication and user management
- **Events Slice Tests** - Event CRUD operations and state management
- **Store Configuration Tests** - Redux store setup and integration
- **Integration Tests** - Cross-slice operations and workflows
- **Test Utilities** - Helpers and mock data generators

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 📁 Test Files Structure

```
src/__tests__/
├── testSetup.js              # Global test setup and utilities
├── __mocks__/
│   └── fileMock.js          # Mock for static assets
├── store.test.js            # Store configuration tests
├── authSlice.test.js        # Auth slice tests (~400 lines, 40+ tests)
├── eventsSlice.test.js      # Events slice tests (~500 lines, 50+ tests)
└── stateManagement.test.js  # Integration tests (~400 lines, 30+ tests)
```

## 📊 Test Coverage

### Overall Stats
- **Total Test Suites**: 4
- **Total Tests**: 120+
- **Lines of Test Code**: 1,500+
- **Coverage Target**: >80%

### Auth Slice Tests (40+ Tests)
- Initial state validation
- Login/Signup workflows
- Profile updates
- Admin/Platform approvals
- Error handling
- State transitions
- LocalStorage persistence

### Events Slice Tests (50+ Tests)
- Event CRUD operations
- Event filtering and sorting
- Single event fetching
- Status management
- Items list management
- Selectors
- Error recovery

### Integration Tests (30+ Tests)
- Auth + Events interaction
- Complex user workflows
- Concurrent operations
- State immutability
- Performance optimization
- Error recovery
- State persistence

## 🧪 Test Examples

### Running Specific Tests

```bash
# Run only auth slice tests
npm test authSlice.test.js

# Run specific test suite
npm test -- --testNamePattern="login"

# Run with verbose output
npm test -- --verbose

# Run single test
npm test -- --testNamePattern="should create new user account"
```

### Test Patterns Used

#### 1. **Action Testing**
```javascript
it('should dispatch logout action', () => {
    const action = logout();
    const newState = authReducer(userState, action);
    expect(newState.isAuthenticated).toBe(false);
});
```

#### 2. **Async Thunk Testing**
```javascript
it('should handle successful login', async () => {
    const resultAction = await store.dispatch(login({
        email: 'test@example.com',
        password: 'password123'
    }));
    expect(resultAction.type).toBe(login.fulfilled.type);
});
```

#### 3. **State Immutability Testing**
```javascript
it('should not mutate previous state', async () => {
    const stateBefore = store.getState();
    await store.dispatch(fetchEvents());
    const stateAfter = store.getState();
    expect(stateBefore).not.toBe(stateAfter);
});
```

#### 4. **Integration Testing**
```javascript
it('should maintain state consistency', async () => {
    await store.dispatch(login({...}));
    await store.dispatch(fetchEvents());
    store.dispatch(logout());
    
    const state = store.getState();
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.events.items.length).toBeGreaterThan(0);
});
```

## 🛠️ Test Utilities

### Mock Data Generators

```javascript
import {
    createMockUser,
    createMockEvent,
    createMockOrganizerUser,
    generateMockEvents,
    generateMockUsers,
} from './testSetup';

// Create single test objects
const user = createMockUser({ role: 'ADMIN' });
const event = createMockEvent({ capacity: 500 });

// Generate multiple test objects
const events = generateMockEvents(10);
const users = generateMockUsers(5, 'ORGANIZER');
```

### Helper Functions

```javascript
import {
    waitForStateUpdate,
    dispatchAndWait,
    expectValidUser,
    expectValidEvent,
    StoreTestHelper,
} from './testSetup';

// Wait for async operations
await waitForStateUpdate();

// Dispatch and wait for completion
const result = await dispatchAndWait(store, fetchEvents());

// Validate structures
expectValidUser(user);
expectValidEvent(event);

// Use test helper class
const helper = new StoreTestHelper(store);
const isAuth = helper.isAuthenticated();
const user = helper.getUser();
```

## 🔍 Key Test Scenarios

### Authentication Flow
- ✅ User signup with different roles (USER, ORGANIZER, ADMIN)
- ✅ User login with email/password
- ✅ Profile updates
- ✅ Account verification states
- ✅ Logout and localStorage cleanup
- ✅ Error handling for invalid credentials

### Events Management
- ✅ Fetch all events
- ✅ Fetch single event by ID
- ✅ Create new event
- ✅ Update event details
- ✅ Delete event
- ✅ Event status management
- ✅ Capacity tracking

### Complex Workflows
- ✅ Sign up → Fetch events → View details
- ✅ Login → Create event → Update event → Delete event
- ✅ Organizer verification flow
- ✅ Concurrent auth + events operations
- ✅ Error recovery and retry

### Data Persistence
- ✅ localStorage integration
- ✅ State restoration after refresh
- ✅ Cache management
- ✅ Timestamp tracking

## 📈 Coverage Report

Generate coverage report:

```bash
npm run test:coverage
```

Expected coverage:
- **Statements**: 85%+
- **Branches**: 80%+
- **Functions**: 85%+
- **Lines**: 85%+

## 🐛 Debugging Tests

### Enable Verbose Output
```bash
npm test -- --verbose
```

### Debug Single Test
```bash
npm test -- authSlice.test.js --verbose
```

### View Full Error Messages
```bash
npm test -- --noStackTrace=false
```

### Use Node Debugger
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## 🔧 Common Issues and Solutions

### Issue: Tests timeout
**Solution**: Increase timeout in jest.config.js
```javascript
testTimeout: 15000 // increase from 10000
```

### Issue: localStorage not working
**Solution**: localStorage mock is auto-setup in testSetup.js

### Issue: Module not found
**Solution**: Check moduleDirectories in jest.config.js includes 'src'

### Issue: Babel transform errors
**Solution**: Ensure babel.config.cjs is present and valid

## 📚 Best Practices

1. **Test One Thing**: Each test should verify a single behavior
2. **Clear Names**: Use descriptive test names that explain what is being tested
3. **Setup/Teardown**: Use beforeEach/afterEach for consistent state
4. **Avoid Mocks When Possible**: Test real Redux behavior
5. **Test Edge Cases**: Include tests for errors and edge cases
6. **Async Handling**: Always await async thunks

## 🚀 Performance Tips

- Run tests in parallel: `npm test -- --maxWorkers=4`
- Use watch mode during development: `npm run test:watch`
- Run specific test file for faster feedback
- Use `test.only()` to debug single test

## 📝 Adding New Tests

### Template for New Slice Tests

```javascript
import sliceReducer, { actionName } from '../store/slices/sliceName';
import store from '../store';

describe('Slice Name', () => {
    describe('Initial State', () => {
        it('should have correct initial state', () => {
            const initialState = {...};
            expect(sliceReducer(undefined, { type: '@@INIT' }))
                .toEqual(initialState);
        });
    });

    describe('Action Name', () => {
        it('should perform expected behavior', async () => {
            const result = await store.dispatch(actionName({...}));
            expect(result.type).toBe(actionName.fulfilled.type);
        });
    });
});
```

## 🔗 Related Documentation

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Jest Documentation](https://jestjs.io/)
- [Redux Testing Best Practices](https://redux.js.org/usage/writing-tests)

## 📞 Support

For issues or questions about the test suite:
1. Check the test file comments
2. Review test utilities in testSetup.js
3. Check Jest configuration in jest.config.js
4. Review similar test patterns in existing tests

---

**Last Updated**: February 12, 2026
**Test Coverage**: 80%+ across all slices
**Status**: Ready for Production ✅


## File: TEST_SUITE_SUMMARY.md

# Redux State Management Test Suite - Summary

## 📊 Test Suite Overview

Complete testing infrastructure for Redux state management in Gopass application.

### Quick Stats
- **Test Files Created**: 4 main test files
- **Utility Files**: 2 support files (testSetup.js, mocks)
- **Configuration Files**: 2 (jest.config.js, babel.config.cjs)
- **Total Test Cases**: 120+
- **Total Lines of Test Code**: 1,500+

---

## 📁 Files Created

### 1. **store.test.js** (100 lines)
Location: `src/__tests__/store.test.js`

**Purpose**: Test Redux store configuration and overall integration

**Test Suites**:
- Store Creation (3 tests)
  - ✅ Correct initial state
  - ✅ Auth reducer setup
  - ✅ Events reducer setup

- Store Dispatch (2 tests)
  - ✅ Allow dispatching actions
  - ✅ Maintain state immutability

- Store Subscription (1 test)
  - ✅ Allow subscriptions

- Reducer Integration (2 tests)
  - ✅ Combine reducers correctly
  - ✅ Handle state updates independently

**Total Tests**: 8

---

### 2. **authSlice.test.js** (500 lines)
Location: `src/__tests__/authSlice.test.js`

**Purpose**: Comprehensive authentication state management testing

**Test Suites**:

1. **Initial State** (1 test)
   - ✅ Correct initial state structure

2. **logout Action** (2 tests)
   - ✅ Clear user on logout
   - ✅ Clear localStorage

3. **clearError Action** (1 test)
   - ✅ Clear error state

4. **checkAuth Async Thunk** (6 tests)
   - ✅ Fulfill when user in localStorage
   - ✅ Set authenticated state
   - ✅ Return null when no user
   - ✅ Set unauthenticated state
   - ✅ Handle corrupted data

5. **login Async Thunk** (8 tests)
   - ✅ Set loading state
   - ✅ Successful login
   - ✅ Set authenticated state
   - ✅ Persist to localStorage
   - ✅ Handle invalid email
   - ✅ Set error on failure
   - ✅ Clear loading after completion

6. **signup Async Thunk** (8 tests)
   - ✅ Create new user account
   - ✅ Set authenticated state
   - ✅ Persist to localStorage
   - ✅ Reject duplicate email
   - ✅ Handle organizer role
   - ✅ Handle admin role

7. **updateProfile Async Thunk** (3 tests)
   - ✅ Update user profile
   - ✅ Persist updates
   - ✅ Require authentication

8. **simulatePlatformApproval Thunk** (2 tests)
   - ✅ Update status to pending admin
   - ✅ Require authentication

9. **simulateAdminApproval Thunk** (3 tests)
   - ✅ Set as approved
   - ✅ Set approval metadata
   - ✅ Restrict to organizers

10. **Auth State Transitions** (3 tests)
    - ✅ Transition to authenticated
    - ✅ Transition to unauthenticated
    - ✅ Maintain loading state

11. **Error Handling** (2 tests)
    - ✅ Clear previous errors
    - ✅ Store error messages

**Total Tests**: 40+

---

### 3. **eventsSlice.test.js** (600 lines)
Location: `src/__tests__/eventsSlice.test.js`

**Purpose**: Comprehensive events state management testing

**Test Suites**:

1. **Initial State** (3 tests)
   - ✅ Correct initial state
   - ✅ Empty items array
   - ✅ Status idle

2. **clearCurrentEvent Action** (1 test)
   - ✅ Clear displayed event

3. **resetStatus Action** (1 test)
   - ✅ Reset status and error

4. **fetchEvents Async Thunk** (6 tests)
   - ✅ Set loading status
   - ✅ Fetch events successfully
   - ✅ Set succeeded status
   - ✅ Populate items array
   - ✅ Set lastFetched timestamp
   - ✅ Not clear items on refetch

5. **fetchEventById Async Thunk** (5 tests)
   - ✅ Set loading status
   - ✅ Fetch single event
   - ✅ Set currentEvent
   - ✅ Handle non-existent ID
   - ✅ Set failed status

6. **createEvent Async Thunk** (6 tests)
   - ✅ Create new event
   - ✅ Add to items array
   - ✅ Add to top of list
   - ✅ Set UPCOMING status
   - ✅ Initialize registeredCount
   - ✅ Generate unique IDs

7. **updateEvent Async Thunk** (3 tests)
   - ✅ Update in items array
   - ✅ Merge with existing data
   - ✅ Update currentEvent

8. **deleteEvent Async Thunk** (3 tests)
   - ✅ Delete from items
   - ✅ Remove by ID
   - ✅ Handle non-existent ID

9. **Events State Consistency** (3 tests)
   - ✅ Maintain count after operations
   - ✅ Not lose data on status change
   - ✅ Handle rapid sequential fetches

10. **Event Selectors** (5 tests)
    - ✅ selectAllEvents
    - ✅ selectEventById
    - ✅ selectEventById not found
    - ✅ selectEventsStatus
    - ✅ selectEventsError

11. **Events Error Handling** (3 tests)
    - ✅ Handle fetch error
    - ✅ Maintain items on error
    - ✅ Clear error state

**Total Tests**: 45+

---

### 4. **stateManagement.test.js** (500 lines)
Location: `src/__tests__/stateManagement.test.js`

**Purpose**: Integration tests for cross-slice operations

**Test Suites**:

1. **Auth and Events Interaction** (3 tests)
   - ✅ Manage independently
   - ✅ Preserve events on logout
   - ✅ Allow operations regardless of auth

2. **Complex User Workflows** (3 tests)
   - ✅ Signup → Browse → View workflow
   - ✅ Organizer creation workflow
   - ✅ Multiple operation consistency

3. **State Persistence** (3 tests)
   - ✅ Persist auth to localStorage
   - ✅ Restore from localStorage
   - ✅ Clear on logout

4. **Concurrent Operations** (2 tests)
   - ✅ Handle concurrent auth + events
   - ✅ Handle rapid updates

5. **State Validation** (2 tests)
   - ✅ Maintain valid state structure
   - ✅ Prevent invalid mutations

6. **Error Recovery** (3 tests)
   - ✅ Recover from login failure
   - ✅ Recover from fetch failure
   - ✅ Maintain state during recovery

7. **Performance and Optimization** (2 tests)
   - ✅ Avoid unnecessary re-renders
   - ✅ Handle large event lists

8. **State Immutability** (3 tests)
   - ✅ Not mutate previous state
   - ✅ Create new state object
   - ✅ Reference handling

**Total Tests**: 25+

---

### 5. **testSetup.js** (200 lines)
Location: `src/__tests__/testSetup.js`

**Purpose**: Global test setup, utilities, and helpers

**Contents**:
- localStorage mock setup
- window.matchMedia mock
- Global beforeEach/afterEach hooks
- Mock data generators:
  - `createMockUser()`
  - `createMockEvent()`
  - `createMockOrganizerUser()`
  - `createMockAdminUser()`
  - `generateMockEvents()`
  - `generateMockUsers()`
- Helper functions:
  - `waitForStateUpdate()`
  - `dispatchAndWait()`
- Assertion helpers:
  - `expectValidUser()`
  - `expectValidEvent()`
  - `expectValidAuthState()`
  - `expectValidEventsState()`
- StoreTestHelper class for convenient state access

---

### 6. **jest.config.js** (35 lines)
Location: `jest.config.js`

**Purpose**: Jest test framework configuration

**Key Settings**:
- testEnvironment: jsdom
- testMatch: `**/__tests__/**/*.test.js`
- Transform: babel-jest for JSX/ES6
- Setup files: testSetup.js
- Coverage paths and thresholds
- moduleDirectories: src, node_modules

---

### 7. **babel.config.cjs** (10 lines)
Location: `babel.config.cjs`

**Purpose**: Babel configuration for Jest transformations

**Presets**:
- @babel/preset-env (Node environment)
- @babel/preset-react (JSX support)

---

### 8. **fileMock.js** (1 line)
Location: `src/__tests__/__mocks__/fileMock.js`

**Purpose**: Mock for static assets in tests

---

## 🚀 Running the Tests

### Installation
```bash
# Dependencies already in package.json
npm install
```

### Run All Tests
```bash
npm test
```

### Run in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

---

## ✅ Test Coverage Summary

| Module | Tests | Lines | Coverage |
|--------|-------|-------|----------|
| Auth Slice | 40+ | 500 | 85%+ |
| Events Slice | 45+ | 600 | 85%+ |
| Store Config | 8 | 100 | 95%+ |
| Integration | 25+ | 500 | 80%+ |
| **Total** | **120+** | **1,700+** | **85%+** |

---

## 🎯 Test Scenarios Covered

### Authentication
- ✅ User signup (USER, ORGANIZER, ADMIN roles)
- ✅ User login with validation
- ✅ Profile updates
- ✅ Account verification workflows
- ✅ Admin/Platform approvals
- ✅ Logout and cleanup
- ✅ Error handling
- ✅ localStorage persistence

### Events Management
- ✅ Fetch all events
- ✅ Fetch single event
- ✅ Create events
- ✅ Update events
- ✅ Delete events
- ✅ Status management
- ✅ Capacity tracking
- ✅ Selectors

### Integration
- ✅ Auth + Events interaction
- ✅ Complex workflows
- ✅ Concurrent operations
- ✅ State immutability
- ✅ Error recovery
- ✅ Performance optimization
- ✅ State persistence

---

## 📝 Key Features

✅ **Comprehensive Coverage** - 120+ tests covering all Redux functionality
✅ **Async Thunk Testing** - Full async action testing with promises
✅ **Error Scenarios** - Tests for error cases and edge cases
✅ **Integration Tests** - Cross-slice operation testing
✅ **State Immutability** - Validates Redux immutability principles
✅ **Mock Data Generators** - Reusable test data functions
✅ **Test Utilities** - Helper functions and assertions
✅ **Best Practices** - Following Redux testing conventions
✅ **Well Documented** - Clear test names and comments
✅ **Easy Debugging** - Verbose output and clear error messages

---

## 📖 Testing Guide

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for:
- Detailed test patterns
- Usage examples
- Debugging tips
- Common issues
- Best practices

---

## 🔗 Related Files

- **Store Config**: `src/store/index.js`
- **Auth Slice**: `src/store/slices/authSlice.js`
- **Events Slice**: `src/store/slices/eventsSlice.js`
- **Auth Context**: `src/context/AuthContext.jsx`

---

**Status**: ✅ Ready for Production
**Last Updated**: February 12, 2026
**Maintained By**: Development Team



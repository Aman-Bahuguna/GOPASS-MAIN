# 🎟️ GOPASS — Premium Event Management Platform

<div align="center">

**A next-generation event discovery and management platform built for college communities.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-latest-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)

</div>

---

## ✨ Features

- 🎫 **Event Discovery & Registration** — Browse hackathons, workshops, cultural fests and more
- 👤 **Role-Based Dashboards** — Separate views for Users, Organizers, and Admins
- 🔐 **Authentication** — Secure login/signup with multi-step organizer verification
- 📊 **Organizer Tools** — Create events, manage attendees, view analytics
- 🛡️ **Admin Panel** — Approve organizer requests and moderate the platform
- 🎨 **Premium UI** — GSAP animations, Three.js 3D background, Framer Motion transitions

---

## 🚀 Tech Stack

| Category | Tech |
|---|---|
| Framework | React 19 + Vite |
| State | Redux Toolkit |
| Styling | TailwindCSS + PostCSS |
| Routing | React Router v7 |
| Animations | GSAP, Framer Motion, Lenis |
| 3D Graphics | Three.js + React Three Fiber |
| Testing | Jest + React Testing Library |

---

## 📦 Getting Started

**Prerequisites:** Node.js v18+, npm

```bash
# Clone the repo
git clone https://github.com/Aman-Bahuguna/GOPASS.git
cd GOPASS

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=your_backend_url
```

---

## 🧰 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run all tests |
| `npm run test:coverage` | Generate test coverage report |

---

## 📁 Project Structure

```
src/
├── api/           # API layer (mock → swap for real backend)
├── components/    # Reusable UI & page sections
├── context/       # AuthContext (facade over Redux)
├── mocks/         # Mock data for development
├── pages/         # Pages & role-based dashboards
├── store/         # Redux slices (auth, events)
└── utils/         # Constants, role config helpers
```

---

## 👤 User Roles

| Role | Access |
|---|---|
| `USER` | Browse events, register, personal dashboard |
| `ORGANIZER` | Create events, manage attendees (requires admin approval) |
| `ADMIN` | Approve organizers, platform moderation |

---

## 👨‍💻 Author

**Aman Bahuguna** — [@Aman-Bahuguna](https://github.com/Aman-Bahuguna)

---

## 📄 License

MIT License

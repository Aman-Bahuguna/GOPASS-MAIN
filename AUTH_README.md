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

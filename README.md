# EducationGate - One Platform for Jobs, Scholarships & Study Abroad

EducationGate is an AI-powered educational and career guidance platform designed to simplify decision-making for students, job-seekers, and HR recruiters. It unifies eligibility checking, university data, financial estimations, and study-abroad guidance into one smart ecosystem.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Project Status](https://img.shields.io/badge/status-In%20Development-blue.svg)](https://github.com/sultanofficial717/Educationgate)
[![Built with React](https://img.shields.io/badge/built%20with-React%2018-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typescript-5.1-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-5.0-purple.svg)](https://vitejs.dev)

---

## Vision

To build Pakistan's most comprehensive education & career hub where users can instantly check their eligibility, explore opportunities, calculate expenses, and make informed choices for their future.

---

## Core Features

### Authentication System

Secure, dual-role authentication supporting both students and recruiters:

* **Student Login:** Access to personal dashboard, eligibility tools, and profile management
* **Recruiter Login:** Advanced recruitment dashboard for job postings and candidate management
* **Secure Session Management:** localStorage-based persistence with protected routes
* **Demo Credentials:**
  - **Student:** `student@edu360.com` / `student123`
  - **Recruiter:** `recruiter@edu360.com` / `recruiter123`

### Student Professional Dashboard

A comprehensive, LinkedIn-style profile management system for students featuring:

* **Profile Sections:**
  - About/Bio with headline and contact information
  - Work Experience with company details and timeline
  - Education with degrees and specializations
  - Skills (tag-based, fully editable)
  - Projects with GitHub links
  - Volunteer Work history
  - Open Source Contributions
  - Academic Publications
  - Research Experience

* **Profile Management:** Edit, delete, and add entries to each section
* **Persistent Storage:** All profile data saved and synced across sessions
* **Responsive Design:** Optimized for desktop and mobile devices

### Recruiter Dashboard

A powerful HR management platform for recruiters featuring:

* **Company Profile:** Company details, industry, size, and team member management
* **Job Management:** Post new jobs, track active postings
* **Applications:** View and manage candidate applications with filtering
* **Candidate Search:** Find and filter applicants by skills and qualifications
* **Events Management:** Announce campus drives and schedule webinars
* **Analytics:** Overview of open positions, active candidates, and scheduled interviews

### AI-Based Eligibility Checker

A smart system that evaluates academic records, skill sets, and experience against opportunity requirements for:

* Jobs
* Scholarships
* Fellowships
* International opportunities

### Pakistan Universities Information Portal

A complete, structured database for all Pakistani universities, including:

* Admission criteria & Entry test details
* Semester fee breakdown & Financial aid availability
* Programs offered & Department strengths
* Merit history and Merit Calculator
* Hostel & transport details

### Global Study Abroad Portal

A consolidated platform for international education planning:

* Country-wise study requirements
* Universities' fee structures & best programs
* Visa requirements & Application timelines
* Scholarship options

### Expense Calculator (International)

An accurate tool for budgeting international studies, covering:

* Tuition cost and living expenses
* Travel & visa expenses
* Total yearly & multi-year budget estimation
* Real-time currency conversion

### Entry Tests Information

Comprehensive information about Pakistan's academic entry tests:

* NAT test details and preparation resources
* University-specific entry requirements
* Test schedules and registration information

### Tutoring Platform

Connect students with qualified tutors:

* Browse available tutors by subject and expertise
* Tutor profiles with qualifications
* Subject-specific guidance

### AI Chatbot Assistant (AiEdubot)

An intelligent conversational assistant for:

* Answering education-related queries
* Providing guidance on career choices
* Assisting with eligibility checks
* Real-time support for platform navigation

---

## Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18 + TypeScript | Building fast, responsive, type-safe user interfaces |
| **Routing** | React Router v6 | Client-side navigation and protected routes |
| **Styling** | Tailwind CSS + PostCSS | Modern utility-first CSS framework |
| **UI Components** | Shadcn UI | Pre-built, accessible React components |
| **Icons** | Lucide React | Beautiful, consistent icon library |
| **State Management** | React Context API | Global authentication and app state |
| **Build Tool** | Vite | Lightning-fast development and production builds |
| **Package Manager** | Bun | Fast, all-in-one JavaScript runtime |
| **Linting** | ESLint | Code quality and consistency |
| **Version Control** | Git + GitHub | Source code management and collaboration |
| **Hosting** | GitHub Pages / Vercel | Deployment and scaling (planned) |

---

## Installation & Setup

### Prerequisites

* **Node.js** 18+ or **Bun** 1.0+
* **Git** for version control
* A modern web browser (Chrome, Firefox, Safari, Edge)

### Clone the Repository

```bash
git clone https://github.com/sultanofficial717/Educationgate.git
cd Educationgate
```

### Install Dependencies

Using npm:
```bash
npm install
```

Or using Bun:
```bash
bun install
```

### Environment Setup

Create a `.env.local` file in the project root (optional for local development):

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_AI_CHATBOT_KEY=your_api_key_here
```

### Run Development Server

Using npm:
```bash
npm run dev
```

Or using Bun:
```bash
bun run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Using npm:
```bash
npm run build
npm run preview
```

Or using Bun:
```bash
bun run build
bun run preview
```

---

## Project Structure

```
Educationgate/
├── src/
│   ├── components/              # Reusable React components
│   │   ├── AuthModal.tsx        # Login/Register modal
│   │   ├── Navbar.tsx           # Main navigation bar
│   │   ├── ExpenseCalculator.tsx
│   │   ├── MeritCalculator.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HeroSection.tsx
│   │   └── ui/                  # Shadcn UI components
│   ├── pages/                   # Page components (route views)
│   │   ├── Index.tsx            # Home page
│   │   ├── Universities.tsx     # Universities portal
│   │   ├── StudentDashboard.tsx # Student profile dashboard
│   │   ├── RecruiterDashboard.tsx # Recruiter HR dashboard
│   │   ├── MeritCalculatorPage.tsx # Merit calculator
│   │   ├── EntryTests.tsx       # Entry tests information
│   │   ├── Tutors.tsx           # Tutoring platform
│   │   ├── StudyAbroad.tsx      # Study abroad portal
│   │   ├── AiEdubotPage.tsx     # AI chatbot interface
│   │   └── NotFound.tsx         # 404 page
│   ├── context/                 # React Context providers
│   │   └── AuthContext.tsx      # Authentication context
│   ├── hooks/                   # Custom React hooks
│   │   └── use-toast.ts         # Toast notification hook
│   ├── lib/                     # Utility functions
│   │   └── utils.ts             # Helper functions
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── eslint.config.js             # ESLint configuration
└── README.md                    # This file
```

---

## Design System

### Color Palette

* **Primary:** HSL(150, 100%, 20%) - Deep Green
* **Accent:** HSL(100, 60%, 50%) - Lime Green
* **Background:** Light gray with green accents
* **Text:** Dark gray for optimal readability

### Typography

* **Headings:** Bold, hierarchical structure
* **Body:** Clean, readable sans-serif font
* **Buttons:** Consistent styling with hover/active states

### Components

All UI components are built with:
* Accessibility (WCAG 2.1 AA compliance)
* Responsive design (mobile-first approach)
* Consistent spacing and sizing (Tailwind utilities)
* Dark mode support (through Tailwind config)

---

## Authentication Flow

### Student/Recruiter Login

1. User selects role (Student or Recruiter) on the "Get Started" page
2. Enters credentials in the authentication modal
3. System validates against dummy user database
4. On success, creates user session in localStorage
5. Redirects to appropriate dashboard (Student or Recruiter)
6. Session persists across page reloads until logout

### Protected Routes

All dashboard pages are protected:
- Check if user is authenticated (`isAuthenticated`)
- Verify user role matches route requirements
- Redirect to home if unauthorized access attempted

---

## Pages & Features

| Page | Role | Features |
| :--- | :--- | :--- |
| **Home** | All | Hero section, feature overview, navigation |
| **Universities** | All | Search and filter Pakistani universities |
| **Merit Calculator** | All | Calculate university merit scores |
| **Entry Tests** | All | NAT test information and resources |
| **Tutors** | All | Browse and connect with tutors |
| **Study Abroad** | All | International education planning |
| **Student Dashboard** | Student | LinkedIn-style profile management |
| **Recruiter Dashboard** | Recruiter | Job posting and candidate management |
| **AiEdubot** | All | AI chatbot for guidance and support |

---

## Key Features Implementation

### 1. Responsive Navigation

- Sticky navigation bar with role-based menu items
- Mobile hamburger menu
- Quick access to user dashboard
- Logout functionality

### 2. Back Navigation

- "Go Back" buttons on all pages for seamless navigation
- Uses React Router's `navigate(-1)` hook
- Maintains browser history

### 3. Form Handling

- Input validation on registration/login
- Error message display
- "Use Demo Credentials" quick-fill option
- Form reset after successful submission

### 4. Data Persistence

- localStorage for session management
- Student profile data saved locally
- Automatic session recovery on page reload

### 5. Responsive Design

- Mobile-first CSS with Tailwind
- Flexible layouts using grid and flexbox
- Touch-friendly buttons and interactions
- Optimized images and assets

---

## Development Workflow

### Git Workflow

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "feat: description of changes"

# Push to remote
git push -u origin feature/your-feature-name

# Create a Pull Request on GitHub
```

### Code Standards

* **TypeScript:** Strict type checking enabled
* **ESLint:** Enforce code quality rules
* **Formatting:** Consistent spacing and indentation
* **Components:** Functional components with hooks

### Testing (Planned)

* Unit tests for utility functions
* Integration tests for components
* E2E tests for critical user flows

---

## Known Issues & Future Enhancements

### Current Limitations

* Student profile data is stored locally (localStorage) - not persisted to backend
* Recruiter dashboard features are UI placeholders
* AI chatbot requires API integration

### Planned Features

1. **Backend API** - Node.js/Express server for data persistence
2. **Database** - PostgreSQL for user data and university information
3. **Real AI Integration** - ChatGPT API integration for smarter chatbot
4. **Payment Gateway** - Stripe integration for premium features
5. **Email Notifications** - SendGrid for application updates
6. **File Upload** - Resume and document management system
7. **Search Optimization** - Elasticsearch for fast university search
8. **Mobile App** - React Native for iOS/Android

---

## Code Examples

### Using Authentication

```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }
  
  return <p>Welcome, {user?.name}!</p>;
}
```

### Navigating Between Pages

```typescript
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function PageWithBackButton() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate(-1)}>
      <ArrowLeft /> Go Back
    </button>
  );
}
```

### Using Toast Notifications

```typescript
import { useToast } from '@/hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();
  
  const handleClick = () => {
    toast({
      title: "Success!",
      description: "Operation completed successfully",
    });
  };
  
  return <button onClick={handleClick}>Show Toast</button>;
}
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure:
* Your code follows the existing style
* TypeScript types are properly defined
* Components are documented with JSDoc comments
* Tests are included for new features

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Support & Contact

For questions, issues, or suggestions:

* **GitHub Issues:** [Submit an Issue](https://github.com/sultanofficial717/Educationgate/issues)
* **Project Repository:** [sultanofficial717/Educationgate](https://github.com/sultanofficial717/Educationgate)
* **Developer:** Sultan Atiq Ur Rehman

---

## Acknowledgments

* [React](https://react.dev) - UI library
* [Vite](https://vitejs.dev) - Build tool
* [Tailwind CSS](https://tailwindcss.com) - CSS framework
* [Shadcn UI](https://ui.shadcn.com) - Component library
* [Lucide React](https://lucide.dev) - Icon library
* [TypeScript](https://www.typescriptlang.org) - Type safety

---

## Project Stats

* **Technologies:** React, TypeScript, Tailwind CSS, Vite
* **Total Pages:** 9 main pages + dashboards
* **Components:** 50+ reusable components
* **Lines of Code:** 5000+ (frontend)
* **Status:** Active Development

---

**Last Updated:** December 2025  
**Repository:** [github.com/sultanofficial717/Educationgate](https://github.com/sultanofficial717/Educationgate)


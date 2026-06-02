# 📚 School Diary - SPA Application

A modern Single Page Application (SPA) built with React, TypeScript, Vite, and Tailwind CSS. This application helps students manage their school subjects, assignments, grades, and profile information in a single, intuitive interface.

## 🎯 Features

- **Dashboard**: View all subjects with search functionality
- **Subject Details**: Explore individual subjects with lessons and reviews
- **Diary**: Track your grades and add new entries
- **Profile Management**: Edit and manage your student profile with form validation
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first approach with Flexbox/Grid
- **State Management**: Redux Toolkit for global state
- **Form Validation**: React Hook Form + Zod for robust validation
- **Component Architecture**: Atomic Design methodology for reusable components
- **Lazy Loading**: Optimized page loading with React.lazy and Suspense
- **LocalStorage Persistence**: Save state and preferences locally

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript (strict mode)
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/           # Button, Card, Input, Modal, Textarea
│   ├── molecules/       # SearchBar, SubjectCard, Rating
│   └── organisms/       # Header, Navigation, ProfileForm
├── pages/               # Dashboard, SubjectDetail, Diary, Profile, NotFound
├── hooks/               # useSubjects, useDiary, useDebounce, useTheme
├── services/            # API service integration
├── store/               # Redux slices and configuration
├── types/               # TypeScript interfaces
├── utils/               # Helpers and localStorage
└── App.tsx              # Main routing component
```

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
# Runs at http://localhost:5173
```

### Build
```bash
npm run build
```

### Other Commands
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run type-check` - TypeScript type checking

## 📝 Key Features

### Custom Hooks
- **useSubjects()**: Fetch subjects from API
- **useDiary()**: Manage diary entries with persistence
- **useDebounce()**: Search optimization
- **useTheme()**: Dark mode management

### State Management
- Redux Toolkit for auth and diary state
- Context-based theme switching
- LocalStorage for persistence

### Form Validation
- React Hook Form for efficient forms
- Zod for runtime validation
- Real-time error feedback

### Responsive Design
- Mobile-first with Tailwind CSS
- Grid: 1 col (mobile) → 3 cols (desktop)
- Touch-friendly interactions

## 🎨 Atomic Design

Components follow atomic design pattern:
- **Atoms**: Basic reusable elements
- **Molecules**: Simple compositions
- **Organisms**: Complex combinations
- **Pages**: Complete screens

## 🌙 Dark Mode

Toggle dark mode via header button. Theme preference persists in localStorage.

## 🔒 TypeScript Strict Mode

All files use strict TypeScript mode for type safety.

## 🎓 Educational Features

Demonstrating:
- Modern React patterns
- Component composition
- State management
- Form validation
- API integration
- Responsive design
- Git version control

## 💻 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

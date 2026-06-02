# School Diary SPA Development Instructions

This file provides guidance for developing and maintaining the School Diary Single Page Application.

## Project Overview

A modern React-based school diary application demonstrating:
- Component-based architecture with Atomic Design
- TypeScript strict mode
- Modern state management patterns
- Form validation and API integration
- Responsive design with Tailwind CSS

## Technology Stack

- **React 19** with TypeScript (strict mode)
- **Vite 8** for fast builds
- **React Router 7** for navigation
- **Redux Toolkit** for state management
- **React Hook Form + Zod** for form validation
- **Tailwind CSS v4** for styling
- **ESLint + Prettier** for code quality

## Project Structure

The application follows Atomic Design principles:

```
src/
├── components/
│   ├── atoms/        # Basic UI elements
│   ├── molecules/    # Simple compositions
│   └── organisms/    # Complex components
├── pages/            # Page-level components
├── hooks/            # Custom React hooks
├── services/         # API integration
├── store/            # Redux configuration
├── types/            # TypeScript definitions
├── utils/            # Helper functions
└── App.tsx           # Main routing
```

## Development Guidelines

### Component Development

1. **Atoms**: Create fundamental building blocks
   - Keep props minimal and specific
   - Use forwardRef for input components
   - Implement proper TypeScript types

2. **Molecules**: Combine atoms into meaningful units
   - Add business logic where appropriate
   - Use custom hooks for complex state
   - Include error handling

3. **Organisms**: Build complex, self-contained components
   - May contain multiple molecules
   - Handle page-level concerns
   - Integrate with Redux for state

### Hooks Development

- Use useEffect properly to avoid infinite loops
- Implement error handling and loading states
- Cache API results when appropriate
- Use custom hooks for reusable logic

### State Management

- Use Redux Toolkit for global state
- Keep Redux for global app state
- Use local state for component-specific data
- Persist important state to localStorage

### Forms

- Always use React Hook Form for forms
- Implement Zod validation schema
- Show field-level error messages
- Disable submit button during submission

### API Integration

- Use Axios for HTTP requests
- Implement proper error handling
- Add loading states for async operations
- Mock API responses for development

## Coding Standards

### TypeScript

- Enable strict mode in tsconfig.json
- Use proper type imports (type-only)
- Avoid implicit any types
- Document complex types

### Component Naming

- Use PascalCase for component files
- Use camelCase for hook files
- Use UPPER_CASE for constants
- Use descriptive names

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use dark mode classes (dark:)
- Avoid inline styles

### Git Commits

Make meaningful commits:
- Feature: `feat: add user authentication`
- Bug Fix: `fix: resolve profile form validation`
- Refactor: `refactor: extract common hook logic`
- Docs: `docs: update README with API guide`

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production

npm run build

# Format code
npm run format

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Testing Guidelines

For critical functionality, add tests:
- Test components render correctly
- Test form validation
- Test error handling
- Test state updates

## Performance Considerations

- Use React.lazy() for page components
- Implement proper code splitting
- Memoize expensive computations
- Use useCallback for event handlers

## Accessibility

- Use semantic HTML elements
- Include aria-labels where needed
- Maintain proper color contrast
- Support keyboard navigation

## Common Tasks

### Adding a New Page

1. Create component in `/pages` directory
2. Add route in `App.tsx`
3. Implement loading and error states
4. Add navigation link

### Adding a New Component

1. Determine component level (atom/molecule/organism)
2. Create in appropriate directory
3. Export from `index.ts`
4. Use in parent components

### Adding API Integration

1. Add method to `services/api.ts`
2. Create custom hook if needed
3. Handle loading and error states
4. Use in components

### Managing State

1. Create Redux slice if global state needed
2. Dispatch actions in components
3. Use useSelector for accessing state
4. Persist to localStorage if needed

## Debugging Tips

- Use React DevTools browser extension
- Use Redux DevTools for state inspection
- Check console for TypeScript errors
- Use ESLint to catch issues early
- Test in dark mode

## Build and Deployment

- Check build output size
- Verify all routes work in production
- Test on mobile devices
- Validate dark mode functionality

## Known Issues and Limitations

- Mock API uses JSONPlaceholder (no real data)
- No authentication backend
- Limited to in-browser storage
- No real-time sync

## Future Enhancements

- Unit tests with Vitest
- End-to-end tests with Playwright
- Backend API integration
- User authentication
- Real-time notifications
- File uploads

## Useful Resources

- React Documentation: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Tailwind CSS: https://tailwindcss.com
- Redux Toolkit: https://redux-toolkit.js.org
- React Router: https://reactrouter.com
- React Hook Form: https://react-hook-form.com

## Support

For questions or issues:
1. Check existing documentation
2. Review similar components
3. Consult TypeScript types
4. Check console for error messages

---

Last Updated: 2026-06-02

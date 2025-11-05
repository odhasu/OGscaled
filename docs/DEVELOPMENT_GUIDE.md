# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Modern code editor (VS Code recommended)

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## Development Workflow

### 1. Creating New Components

#### CSS Component
```css
/* src/styles/components.css */

.my-component {
  /* Base styles */
}

.my-component__element {
  /* Child element */
}

.my-component--modifier {
  /* Variation */
}
```

#### JavaScript Component
```javascript
// src/scripts/components/MyComponent.js

class MyComponent {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // Initialization logic
  }

  static initAll() {
    const elements = document.querySelectorAll('.my-component');
    return [...elements].map(el => new MyComponent(el));
  }
}

export default MyComponent;
```

#### Register in Main
```javascript
// src/scripts/main.js

import MyComponent from './components/MyComponent.js';

class App {
  initComponents() {
    this.components.myComponent = MyComponent.initAll();
  }
}
```

### 2. Adding Utility Functions

```javascript
// src/scripts/utils/helpers.js

export const myUtility = (param) => {
  // Implementation
  return result;
};
```

### 3. Using the API Module

```javascript
import API from '@utils/api.js';

// GET request
const { success, data } = await API.get('/endpoint');

// POST request
const result = await API.post('/endpoint', {
  key: 'value'
});
```

## Code Style Guide

### JavaScript
```javascript
// ✅ Good
const handleClick = (event) => {
  event.preventDefault();
  // Logic here
};

// ❌ Bad
function handleClick(e) {
  e.preventDefault()
  // Logic here
}
```

### CSS
```css
/* ✅ Good */
.component {
  display: flex;
  gap: var(--spacing-md);
}

/* ❌ Bad */
.Component {
  display: flex;
  gap: 16px;
}
```

## Testing

### Manual Testing Checklist
- [ ] All videos play correctly
- [ ] Timeline animates on scroll
- [ ] Forms submit properly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Smooth animations

### Browser Testing
Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Build Process

### Development Build
```bash
npm run dev
```
- Hot module replacement
- Source maps enabled
- Unminified code

### Production Build
```bash
npm run build
```
- Minified and optimized
- Tree-shaking applied
- Assets compressed

### Preview Production
```bash
npm run preview
```
- Test production build locally
- Verify optimizations

## Debugging Tips

### CSS Issues
1. Check browser DevTools
2. Verify CSS import order
3. Check for specificity conflicts
4. Validate CSS custom properties

### JavaScript Issues
1. Check console for errors
2. Use debugger statements
3. Verify import paths
4. Check event listener bindings

### Performance Issues
1. Use Lighthouse audit
2. Check Network tab
3. Profile JavaScript execution
4. Optimize images and assets

## Git Workflow

### Branch Naming
- `feature/component-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/area-name` - Code refactoring
- `docs/update-name` - Documentation

### Commit Messages
```
type(scope): description

feat(video): add autoplay functionality
fix(timeline): correct animation timing
docs(readme): update installation steps
style(css): format component styles
refactor(api): simplify error handling
```

## Deployment

### Build for Production
```bash
# Build
npm run build

# Output will be in /dist directory
```

### Deploy to Server
1. Build production files
2. Upload dist/ contents to server
3. Configure server for SPA routing
4. Test all functionality

### Environment Variables
Create `.env.local`:
```
VITE_API_URL=https://api.example.com
VITE_SITE_NAME=OGResell
```

## Troubleshooting

### Common Issues

**Issue**: Styles not loading
- Check CSS import paths in main.css
- Verify file names match exactly
- Clear browser cache

**Issue**: Scripts not executing
- Check for JavaScript errors in console
- Verify module imports are correct
- Ensure type="module" in script tag

**Issue**: Build fails
- Delete node_modules and reinstall
- Check for syntax errors
- Update dependencies

## Resources

### Documentation
- [Vite](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)

### Tools
- VS Code Extensions:
  - ESLint
  - Prettier
  - Live Server
  - Path Intellisense

## Support

Need help? Check:
1. This documentation
2. Project README.md
3. Code comments
4. Team communication channels

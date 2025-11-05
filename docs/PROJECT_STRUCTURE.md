# Project Structure Documentation

## 📂 Directory Organization

### `/src` - Source Files
Contains all development source files organized by type.

#### `/src/styles` - Stylesheets
Modular CSS architecture for better maintainability:

- **base.css** - Foundation styles
  - CSS custom properties (variables)
  - Global resets and normalization
  - Typography base styles
  - Color system

- **layout.css** - Layout system
  - Container utilities
  - Grid system
  - Flexbox utilities
  - Responsive breakpoints

- **components.css** - UI Components
  - Buttons
  - Cards
  - Badges
  - Video containers
  - Timeline elements
  - Glass morphism effects

- **timeline.css** - Timeline Specific
  - Timeline structure
  - Vertical line styling
  - Content boxes
  - Responsive timeline layout

- **animations.css** - Animations
  - Keyframe definitions
  - Animation utility classes
  - Transition effects
  - Scroll animations

- **main.css** - Central Import
  - Imports all modular CSS files
  - Maintains proper cascade order

#### `/src/scripts` - JavaScript Modules

##### `/src/scripts/components` - UI Components
Object-oriented components as ES6 classes:

- **VideoPlayer.js**
  - Video playback control
  - Play/pause functionality
  - Multi-video coordination
  - Custom controls

- **Timeline.js**
  - Timeline animations
  - Scroll-based reveals
  - Intersection Observer integration

- **ScrollHandler.js**
  - Header scroll effects
  - Hide/show on scroll direction
  - Scroll-based class toggling

##### `/src/scripts/utils` - Utility Functions
Reusable helper modules:

- **dom.js** - DOM Manipulation
  - Query selectors (`$`, `$$`)
  - Class manipulation
  - Attribute handling
  - Event listeners
  - Element creation

- **helpers.js** - General Utilities
  - Debounce/throttle
  - Date/number formatting
  - Validation functions
  - Clipboard operations
  - URL parameter handling

- **api.js** - API Communication
  - HTTP request wrapper
  - RESTful methods (GET, POST, PUT, DELETE)
  - Error handling
  - Application-specific endpoints

##### `/src/scripts/main.js` - Application Entry
- App initialization
- Component coordination
- Event listener setup
- Global error handling

### `/public` - Static Assets
Public assets served directly:
- Images
- Videos
- Fonts
- Icons
- Other static files

### `/server` - Backend (Optional)
Server-side code if needed:
- API endpoints
- Database connections
- Server configuration

### `/config` - Configuration
Build and development configuration:
- vite.config.js
- postcss.config.js
- tailwind.config.js

### `/docs` - Documentation
Project documentation:
- API documentation
- Component guides
- Style guide
- Development notes

## 🔄 File Relationships

```
index.html
  ├─→ src/styles/main.css
  │    ├─→ base.css
  │    ├─→ layout.css
  │    ├─→ components.css
  │    ├─→ timeline.css
  │    └─→ animations.css
  │
  └─→ src/scripts/main.js
       ├─→ components/
       │    ├─→ VideoPlayer.js
       │    ├─→ Timeline.js
       │    └─→ ScrollHandler.js
       └─→ utils/
            ├─→ dom.js
            ├─→ helpers.js
            └─→ api.js
```

## 🎯 Benefits of This Structure

### Modularity
- Each file has a single responsibility
- Easy to locate and modify specific features
- Reduced conflicts in version control

### Maintainability
- Clear separation of concerns
- Easy to test individual modules
- Simplified debugging process

### Scalability
- Easy to add new components
- Modular CSS prevents cascade issues
- Simple to extend functionality

### Performance
- Code splitting opportunities
- Selective importing
- Optimized bundling

### Developer Experience
- Clear file organization
- Intuitive naming conventions
- Comprehensive documentation
- Easy onboarding for new developers

## 🔧 Best Practices

### CSS
1. Use CSS custom properties for theming
2. Follow BEM or utility-first naming
3. Keep specificity low
4. Organize by component

### JavaScript
1. Use ES6+ features
2. Prefer classes for components
3. Keep functions pure when possible
4. Document complex logic

### Files
1. One component per file
2. Named exports for utilities
3. Default export for main components
4. Keep files under 300 lines

## 📝 Naming Conventions

### Files
- **Components**: PascalCase (VideoPlayer.js)
- **Utilities**: camelCase (helpers.js)
- **Styles**: kebab-case (components.css)

### Code
- **Classes**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: kebab-case

## 🚀 Migration Guide

To migrate from old structure to new:

1. **Backup existing files**
2. **Update HTML imports** to point to src/styles/main.css and src/scripts/main.js
3. **Test all functionality** after migration
4. **Remove old files** once verified
5. **Update documentation** as needed

## 🔍 Quick Reference

Need to find:
- **Styles?** → `/src/styles/`
- **Scripts?** → `/src/scripts/`
- **Components?** → `/src/scripts/components/`
- **Utilities?** → `/src/scripts/utils/`
- **Assets?** → `/public/`
- **Config?** → `/config/` or root-level config files

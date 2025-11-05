# OGResell Website

A professional reselling coaching platform built with modern web technologies.

## 🚀 Project Structure

```
ogresell/
├── src/
│   ├── styles/              # Modular CSS files
│   │   ├── base.css        # Base styles & variables
│   │   ├── layout.css      # Layout utilities
│   │   ├── components.css  # Component styles
│   │   ├── timeline.css    # Timeline specific
│   │   ├── animations.css  # Animation keyframes
│   │   └── main.css        # Main import file
│   │
│   ├── scripts/             # JavaScript modules
│   │   ├── components/     # UI components
│   │   │   ├── VideoPlayer.js
│   │   │   ├── Timeline.js
│   │   │   └── ScrollHandler.js
│   │   ├── utils/          # Utility functions
│   │   │   ├── dom.js      # DOM helpers
│   │   │   ├── helpers.js  # General utilities
│   │   │   └── api.js      # API handler
│   │   └── main.js         # App entry point
│   │
├── public/                  # Static assets
│   └── assets/             # Images, videos, etc.
│
├── server/                  # Backend (if needed)
│   ├── index.js
│   └── db.json
│
├── config/                  # Configuration files
├── docs/                    # Documentation
├── index.html              # Main HTML file
├── package.json            # Dependencies
├── vite.config.js          # Build configuration
└── README.md               # This file
```

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Style Architecture

The CSS is organized into modular files for better maintainability:

- **base.css**: CSS variables, resets, typography
- **layout.css**: Grid, flexbox, containers
- **components.css**: Reusable UI components
- **timeline.css**: Timeline-specific styles
- **animations.css**: Keyframe animations
- **main.css**: Central import file

## 🔧 JavaScript Architecture

The JavaScript is organized into ES6 modules:

- **components/**: Reusable UI components as classes
- **utils/**: Helper functions for DOM, API, etc.
- **main.js**: App initialization and coordination

## 🚀 Features

- ✅ Modular CSS architecture
- ✅ ES6 JavaScript modules
- ✅ Component-based structure
- ✅ Video player with custom controls
- ✅ Animated timeline
- ✅ Scroll-based animations
- ✅ Responsive design
- ✅ Glass morphism effects

## 🔨 Development

### Adding New Components

1. Create component file in `src/scripts/components/`
2. Import in `main.js`
3. Initialize in App class

### Adding New Styles

1. Add to appropriate CSS module in `src/styles/`
2. Ensure proper import order in `main.css`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

Please read CONTRIBUTING.md for details on our code of conduct and development process.

## 📞 Support

For support, email support@scaled.info

# OGScaled.info

> A professional reselling coaching platform built with modern web technologies

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 About

OGScaled is a comprehensive reselling coaching platform that helps entrepreneurs scale their e-commerce businesses. The website features interactive timelines, video testimonials, and a streamlined application process for coaching programs.

**Live Site**: [OGScaled.info](https://ogscaled.info)

### Key Features

- 🎥 Interactive video testimonials from successful students
- 📊 Animated timeline showcasing program milestones
- 💳 Integrated Stripe payment processing
- 📱 Fully responsive design with glass morphism effects
- ⚡ Lightning-fast performance with Vite
- 🎨 Modular CSS architecture for easy maintenance

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
# Clone the repository
git clone https://github.com/odhasu/OGscaled.git
cd OGscaled

# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

This project is built with Vite and can be deployed to any static hosting service:

### Vercel / Netlify / GitHub Pages

```bash
# Build the project
npm run build

# The dist/ folder contains production-ready files
# Upload to your hosting service or configure auto-deploy from GitHub
```

### Environment Variables

The Stripe integration uses a public key that is safe for client-side use. If you're forking this project:

1. Replace the Stripe public key in your Stripe.js integration
2. No `.env` file is required for the public key (it's meant to be visible)
3. **Never** commit Stripe secret keys (sk_live_) to the repository

## 🎨 Style Architecture

The CSS is organized into modular files for better maintainability:

- **base.css**: CSS variables, resets, typography
- **layout.css**: Grid, flexbox, containers
- **components.css**: Reusable UI components
- **timeline.css**: Timeline-specific styles
- **animations.css**: Keyframe animations
- **main.css**: Central import file

### Current reorganization status (Nov 2025)

- A very large historical stylesheet (`css/styles.css`, ~125k lines) has been copied to `src/styles/legacy.css` and is now loaded via `src/styles/main.css`.
- `index.html` references only `src/styles/main.css`, so we can safely extract blocks from `legacy.css` into the modular files above without touching HTML.
- As we extract sections (variables/base/typography/components/utilities), we will delete them from `legacy.css` until it can be removed.

## 🔧 JavaScript Architecture

The JavaScript is organized into ES6 modules:

- **components/**: Reusable UI components as classes
- **utils/**: Helper functions for DOM, API, etc.
- **main.js**: App initialization and coordination

### Key JavaScript Modules

- **apply-modal.js**: Dynamic modal system with overlay, ESC/click-outside close, body scroll lock
- **video-player.js**: Custom video player controls
- **video-testimonials.js**: Testimonial carousel functionality

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

MIT License - see [LICENSE](LICENSE) file for details

## 👥 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test locally: `npm run dev`
4. Format and lint: `npm run format && npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📞 Support

- **Website**: [OGScaled.info](https://ogscaled.info)
- **Email**: support@scaled.info
- **Issues**: [GitHub Issues](https://github.com/odhasu/OGscaled/issues)

## 🙏 Acknowledgments

Built with ❤️ by the Scaled.info team

---

**Note**: This is the public repository for OGScaled.info. For business inquiries, please visit our website or contact us directly.

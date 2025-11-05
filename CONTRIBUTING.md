# Contributing to OGScaled

Thank you for considering contributing to OGScaled! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on our [GitHub Issues](https://github.com/odhasu/OGscaled/issues) page with:
- A clear description of the issue
- Steps to reproduce the behavior
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

### Suggesting Features

Feature requests are welcome! Please open an issue with:
- A clear description of the feature
- Use cases and benefits
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** following our code style guidelines
4. **Test your changes**: `npm run dev` to preview locally
5. **Format your code**: `npm run format` (Prettier)
6. **Lint your code**: `npm run lint` (ESLint)
7. **Commit your changes** with a clear commit message
8. **Push to your fork** and submit a pull request

### Code Style

- We use **ESLint** and **Prettier** for code formatting
- Run `npm run format` before committing
- Run `npm run lint` to check for issues
- Follow existing code patterns and conventions
- Write clear, descriptive commit messages

### CSS Guidelines

- We are actively reorganizing CSS into modular files
- New styles should go in the appropriate file:
  - `src/styles/variables.css` - Design tokens (colors, spacing, etc.)
  - `src/styles/components.css` - Component-specific styles
  - `src/styles/utilities.css` - Utility classes
  - `src/styles/custom.css` - Project-specific overrides
- Avoid adding to `legacy.css` (it's being phased out)
- Use CSS custom properties from `variables.css`

### JavaScript Guidelines

- Use vanilla JavaScript (ES6+)
- Wrap functionality in IIFE patterns
- Avoid global scope pollution
- Use semantic naming conventions
- Add comments for complex logic

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/OGscaled.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Questions?

Feel free to open an issue for any questions or concerns. We appreciate your interest in contributing!

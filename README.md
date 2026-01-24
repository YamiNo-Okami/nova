# Nova

An **infinite canvas application** built with React, TypeScript, and Vite. A zoomable, pannable workspace for visual organization and note-taking.

## Features

- **Infinite Canvas**: Unlimited vertical workspace with a dotted grid background
- **Pan & Zoom Controls**: 
  - Click and drag to pan vertically
  - Ctrl + scroll to zoom (0.2x to 3x)
  - Vertical limits: -2000px upward
- **Interactive Grid**: Visual dotted grid that transforms with pan/zoom operations
- **Dynamic Cursor**: Changes between "grab" and "grabbing" during interaction
- **Collapsible Sidebar**: Toggleable sidebar for navigation and controls

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building  
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Data Structure

The application uses TypeScript types for canvas elements:

- `Grid`: Container with ID, name, and cards array
- `CardData`: Individual cards with position (x, y), size (width, height), and content

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

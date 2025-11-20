# VDS Web Components

A framework-agnostic web components library built with TypeScript, Lit, and pure CSS.

## Features

- 🎨 **Pure CSS** - No external CSS frameworks, fully customizable
- ♿ **Accessible** - WCAG 2.1 AA compliant with full keyboard navigation
- 🎯 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JS
- 🎨 **Customizable** - CSS custom properties for theming
- 📦 **Tree-shakeable** - Import only what you need
- 🧪 **Well Tested** - Unit, integration, and accessibility tests
- 📱 **Responsive** - Mobile-first design
- 🌙 **Dark Mode** - Built-in dark mode support

## Installation

```bash
npm install @vds/web-components
```

## Quick Start

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="@vds/web-components/tokens">
    <script type="module" src="@vds/web-components/button"></script>
  </head>
  <body>
    <vds-button>Click me</vds-button>
  </body>
</html>
```

## Components

- **vds-button** - Interactive button component with multiple variants
- **vds-input** - Form input component with validation
- **vds-modal** - Modal dialog with focus trapping

## Documentation

Full documentation is available at [docs-site](./docs-site/).

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test

# Run accessibility tests
npm run test:a11y

# Run E2E tests
npm run test:e2e

# Build
npm run build

# Build documentation
npm run docs:build
```

## Creating a New Component

Use the component generator script to create a new component:

```bash
npm run create-component <component-name>
```

Example:
```bash
npm run create-component card
```

This will automatically:
- Create the component directory structure
- Generate all necessary files (component, tests, config, README)
- Register the component in the main index
- Add it to package exports
- Create documentation page
- Update component loader

Then customize the generated component as needed!

## Project Structure

```
vds/
├── packages/          # Component packages
│   ├── vds-button/
│   ├── vds-input/
│   └── vds-modal/
├── tokens/            # CSS design tokens
├── docs-site/         # Documentation site (VitePress)
├── tests/             # Test files
└── scripts/           # Build scripts
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT


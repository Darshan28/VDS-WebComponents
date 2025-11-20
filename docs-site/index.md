# VDS Web Components

A framework-agnostic web components library built with TypeScript and Lit.

## Features

- 🎨 **Pure CSS** - No external CSS frameworks
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🎯 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JS
- 🎨 **Customizable** - CSS custom properties for theming
- 📦 **Tree-shakeable** - Import only what you need
- 🧪 **Well Tested** - Unit, integration, and accessibility tests
- 📱 **Responsive** - Mobile-first design

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

## Usage with Frameworks

### React

```tsx
import '@vds/web-components/button';

function App() {
  return <vds-button>Click me</vds-button>;
}
```

### Vue

```vue
<template>
  <vds-button>Click me</vds-button>
</template>

<script setup>
import '@vds/web-components/button';
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import '@vds/web-components/button';

@Component({
  selector: 'app-root',
  template: '<vds-button>Click me</vds-button>'
})
export class AppComponent {}
```

## Components

- [Button](/components/button) - Interactive button component
- [Input](/components/input) - Form input component
- [Modal](/components/modal) - Modal dialog component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT


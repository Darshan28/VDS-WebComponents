# How to Create a New Component

This guide walks you through creating a new component in the VDS Web Components library.

## Step-by-Step Guide

### 1. Create Component Directory

Create a new directory in `packages/` following the naming convention:
- Component name: `vds-{component-name}`
- Directory: `packages/vds-{component-name}/`

Example:
```bash
mkdir packages/vds-card
```

### 2. Create Component Files

You'll need to create these files:

#### a. Component TypeScript File (`vds-{name}.ts`)

Create the main component file with:
- LitElement base class
- Shadow DOM styles
- Properties with `@property` decorator (using `accessor` keyword)
- Render method
- Event handling
- Proper TypeScript types

#### b. Package Configuration (`package.json`)

Copy from an existing component and update:
- `name`: `@vds/{component-name}`
- `description`: Update to match your component
- `main`: `./dist/vds-{name}.js`
- `types`: `./dist/vds-{name}.d.ts`

#### c. Vite Configuration (`vite.config.ts`)

Copy from an existing component and update:
- `entry`: `vds-{name}.ts`
- `name`: `VDS{ComponentName}` (PascalCase)
- `fileName`: `vds-{name}`

#### d. Tests (`vds-{name}.test.ts`)

Create unit tests using `@open-wc/testing`:
- Component initialization
- Property reflection
- Event dispatching
- Accessibility

#### e. README (`README.md`)

Documentation including:
- Installation
- Usage examples
- API reference
- Events
- CSS custom properties
- Parts

### 3. Register Component in Main Index

Update `packages/index.ts`:
```typescript
export { VDS{ComponentName} } from './vds-{name}/vds-{name}.js';
export type { {TypeName} } from './vds-{name}/vds-{name}.js';
```

### 4. Update Root Package Exports

Update root `package.json` exports:
```json
"./{name}": {
  "import": "./packages/vds-{name}/dist/vds-{name}.js",
  "types": "./packages/vds-{name}/dist/vds-{name}.d.ts"
}
```

### 5. Add Documentation

Create documentation in `docs-site/components/{name}.md`:
- Use `<ComponentDemo>` for live examples
- Document all properties, events, and usage

### 6. Update Component Loader

Update `docs-site/.vitepress/components/load-components.ts`:
```typescript
import '../../../packages/vds-{name}/vds-{name}.js';
```

## Component Template

Here's a minimal component template:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('vds-{name}')
export class VDS{ComponentName} extends LitElement {
  static styles = css`
    :host {
      display: block;
      /* Your styles here */
    }
  `;

  @property({ type: String })
  accessor label = '';

  render() {
    return html`
      <div part="container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-{name}': VDS{ComponentName};
  }
}
```

## Best Practices

1. **Naming**: Use `vds-` prefix for all components
2. **Properties**: Use `accessor` keyword with `@property` decorator
3. **Events**: Use `vds-{component}-{action}` format
4. **CSS Variables**: Use `--vds-{component}-{property}` format
5. **Parts**: Expose all stylable elements via `part` attribute
6. **Accessibility**: Include proper ARIA attributes
7. **Testing**: Write tests for all functionality
8. **Documentation**: Document all public APIs

## Quick Start Script

You can use this script to scaffold a new component:

```bash
# Set your component name
COMPONENT_NAME="card"
COMPONENT_PASCAL="Card"

# Create directory
mkdir -p packages/vds-${COMPONENT_NAME}

# Copy template files from an existing component
cp -r packages/vds-button/* packages/vds-${COMPONENT_NAME}/

# Rename files
cd packages/vds-${COMPONENT_NAME}
mv vds-button.ts vds-${COMPONENT_NAME}.ts
mv vds-button.test.ts vds-${COMPONENT_NAME}.test.ts
mv vds-button.a11y.test.ts vds-${COMPONENT_NAME}.a11y.test.ts

# Then manually update:
# - package.json (name, description)
# - vite.config.ts (entry, name, fileName)
# - Component class name and element name
# - All references in tests
```

## Example: Creating a Card Component

See the example in `packages/vds-card/` (if created) for a complete reference implementation.


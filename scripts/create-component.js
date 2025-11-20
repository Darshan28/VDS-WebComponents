#!/usr/bin/env node

/**
 * Component Generator Script
 * Usage: node scripts/create-component.js <component-name>
 * Example: node scripts/create-component.js card
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Get component name from command line
const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Error: Component name is required');
  console.log('Usage: node scripts/create-component.js <component-name>');
  console.log('Example: node scripts/create-component.js card');
  process.exit(1);
}

// Validate component name (lowercase, kebab-case)
if (!/^[a-z][a-z0-9-]*$/.test(componentName)) {
  console.error('❌ Error: Component name must be lowercase kebab-case (e.g., "card", "data-table")');
  process.exit(1);
}

// Convert to PascalCase for class names
const pascalCase = componentName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

const componentDir = join(rootDir, 'packages', `vds-${componentName}`);
const componentFile = `vds-${componentName}.ts`;
const componentClass = `VDS${pascalCase}`;
const elementName = `vds-${componentName}`;

console.log(`🚀 Creating component: ${elementName}`);
console.log(`📁 Directory: ${componentDir}`);

// Create directory
if (existsSync(componentDir)) {
  console.error(`❌ Error: Component directory already exists: ${componentDir}`);
  process.exit(1);
}

mkdirSync(componentDir, { recursive: true });

// 1. Create component TypeScript file
const componentTemplate = `import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * VDS ${pascalCase} Component
 * 
 * @element ${elementName}
 * 
 * @csspart container - The main container element
 */
@customElement('${elementName}')
export class ${componentClass} extends LitElement {
  static styles = css\`
    :host {
      display: block;
      --vds-${componentName}-padding: var(--vds-spacing-md, 1rem);
      --vds-${componentName}-bg: var(--vds-color-bg-primary, #ffffff);
      --vds-${componentName}-border-radius: var(--vds-radius-md, 0.375rem);
      --vds-${componentName}-shadow: var(--vds-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    .container {
      padding: var(--vds-${componentName}-padding);
      background-color: var(--vds-${componentName}-bg);
      border-radius: var(--vds-${componentName}-border-radius);
      box-shadow: var(--vds-${componentName}-shadow);
    }
  \`;

  @property({ type: String })
  accessor title = '';

  render() {
    return html\`
      <div part="container" class="container">
        \${this.title ? html\`<h3 part="title">\${this.title}</h3>\` : ''}
        <div part="content">
          <slot></slot>
        </div>
      </div>
    \`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    '${elementName}': ${componentClass};
  }
}
`;

writeFileSync(join(componentDir, componentFile), componentTemplate);

// 2. Create package.json
const packageJson = {
  name: `@vds/${componentName}`,
  version: '0.0.0-semantic-release',
  description: `VDS ${pascalCase} Web Component`,
  type: 'module',
  main: `./dist/${componentFile.replace('.ts', '.js')}`,
  types: `./dist/${componentFile.replace('.ts', '.d.ts')}`,
  exports: {
    '.': {
      import: `./dist/${componentFile.replace('.ts', '.js')}`,
      types: `./dist/${componentFile.replace('.ts', '.d.ts')}`
    }
  },
  files: ['dist'],
  scripts: {
    build: 'vite build',
    test: 'vitest run',
    'test:watch': 'vitest'
  },
  dependencies: {
    lit: '^3.1.0'
  },
  devDependencies: {
    '@open-wc/testing': '^3.1.7',
    '@types/node': '^20.11.0',
    typescript: '^5.3.3',
    vite: '^5.0.11',
    vitest: '^1.2.0'
  }
};

writeFileSync(join(componentDir, 'package.json'), JSON.stringify(packageJson, null, 2));

// 3. Create vite.config.ts
const viteConfig = `import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, '${componentFile}'),
      name: '${componentClass}',
      fileName: '${componentName}',
      formats: ['es']
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'lit'
        }
      }
    },
    sourcemap: true,
    minify: 'esbuild',
    outDir: 'dist'
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  }
});
`;

writeFileSync(join(componentDir, 'vite.config.ts'), viteConfig);

// 4. Create test file
const testFile = `import { expect, fixture, html } from '@open-wc/testing';
import { ${componentClass} } from './${componentFile.replace('.ts', '.js')}';

describe('${componentClass}', () => {
  it('should be defined', () => {
    expect(${componentClass}).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<${componentClass}>(
      html\`<${elementName}></${elementName}>\`
    );
    
    expect(el.title).to.equal('');
  });

  it('should reflect title attribute', async () => {
    const el = await fixture<${componentClass}>(
      html\`<${elementName} title="Test Title"></${elementName}>\`
    );
    
    expect(el.getAttribute('title')).to.equal('Test Title');
    expect(el.title).to.equal('Test Title');
  });

  it('should render slot content', async () => {
    const el = await fixture<${componentClass}>(
      html\`<${elementName}>Test Content</${elementName}>\`
    );
    
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).to.not.be.null;
  });
});
`;

writeFileSync(join(componentDir, `${componentName}.test.ts`), testFile);

// 5. Create README.md
const readme = `# ${elementName}

VDS ${pascalCase} Web Component - A customizable ${componentName} component.

## Installation

\`\`\`bash
npm install @vds/${componentName}
\`\`\`

## Usage

### HTML

\`\`\`html
<script type="module" src="@vds/${componentName}"></script>

<${elementName} title="Card Title">
  Content goes here
</${elementName}>
\`\`\`

### JavaScript/TypeScript

\`\`\`typescript
import '@vds/${componentName}';
// or
import { ${componentClass} } from '@vds/${componentName}';
\`\`\`

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| \`title\` | \`string\` | \`''\` | ${pascalCase} title |

## Properties

All attributes are available as properties and are reactive.

## CSS Custom Properties

\`\`\`css
--vds-${componentName}-padding
--vds-${componentName}-bg
--vds-${componentName}-border-radius
--vds-${componentName}-shadow
\`\`\`

## Parts

- \`container\`: The main container element
- \`title\`: The title element (if provided)
- \`content\`: The content wrapper

## Examples

### Basic Usage

\`\`\`html
<${elementName}>Content</${elementName}>
\`\`\`

### With Title

\`\`\`html
<${elementName} title="My ${pascalCase}">Content</${elementName}>
\`\`\`

## Accessibility

- Semantic HTML structure
- Proper ARIA attributes where needed
- Keyboard navigation support
`;

writeFileSync(join(componentDir, 'README.md'), readme);

// 6. Update packages/index.ts
const indexPath = join(rootDir, 'packages', 'index.ts');
let indexContent = readFileSync(indexPath, 'utf-8');

// Add export
const newExport = `export { ${componentClass} } from './vds-${componentName}/${componentFile.replace('.ts', '.js')}';`;
indexContent = indexContent.replace(
  /^export \{ VDSModal \} from/,
  `${newExport}\n$&`
);

writeFileSync(indexPath, indexContent);

// 7. Update root package.json exports
const rootPackagePath = join(rootDir, 'package.json');
const rootPackage = JSON.parse(readFileSync(rootPackagePath, 'utf-8'));

if (!rootPackage.exports) {
  rootPackage.exports = {};
}

rootPackage.exports[`./${componentName}`] = {
  import: `./packages/vds-${componentName}/dist/${componentFile.replace('.ts', '.js')}`,
  types: `./packages/vds-${componentName}/dist/${componentFile.replace('.ts', '.d.ts')}`
};

writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2));

// 8. Create documentation file
const docsDir = join(rootDir, 'docs-site', 'components');
if (!existsSync(docsDir)) {
  mkdirSync(docsDir, { recursive: true });
}

const docsContent = `# ${pascalCase}

The \`${elementName}\` component is a customizable ${componentName} component.

## Basic Usage

<ComponentDemo code='<${elementName}>Content</${elementName}>' />

## With Title

<ComponentDemo code='<${elementName} title="My ${pascalCase}">Content</${elementName}>' />

## Events

\`\`\`javascript
const ${componentName} = document.querySelector('${elementName}');
${componentName}.addEventListener('vds-${componentName}-change', (e) => {
  console.log('${pascalCase} changed:', e.detail);
});
\`\`\`

## API Reference

See the [full API documentation](https://github.com/your-org/vds-web-components/tree/main/packages/vds-${componentName}#readme).
`;

writeFileSync(join(docsDir, `${componentName}.md`), docsContent);

// 9. Update component loader
const loaderPath = join(rootDir, 'docs-site', '.vitepress', 'components', 'load-components.ts');
let loaderContent = readFileSync(loaderPath, 'utf-8');

const newImport = `import '../../../packages/vds-${componentName}/${componentFile.replace('.ts', '.js')}';`;
loaderContent = loaderContent.replace(
  /import '\.\.\/\.\.\/\.\.\/packages\/vds-modal\/vds-modal\.js';/,
  `$&\n${newImport}`
);

writeFileSync(loaderPath, loaderContent);

// 10. Update VitePress sidebar config
const configPath = join(rootDir, 'docs-site', '.vitepress', 'config.ts');
let configContent = readFileSync(configPath, 'utf-8');

// Add to sidebar items
const sidebarItem = `            { text: '${pascalCase}', link: '/components/${componentName}' }`;
configContent = configContent.replace(
  /(\{ text: 'Modal', link: '\/components\/modal' \})/,
  `$1,\n${sidebarItem}`
);

writeFileSync(configPath, configContent);

// 11. Update ComponentGallery.vue to include new component
const galleryPath = join(rootDir, 'docs-site', '.vitepress', 'components', 'ComponentGallery.vue');
let galleryContent = readFileSync(galleryPath, 'utf-8');

// Add component to the components array
const componentEntry = `  {
    name: '${componentName}',
    title: '${pascalCase}',
    description: '${pascalCase} component description',
    link: '/components/${componentName}',
    preview: '<${elementName}>${pascalCase}</${elementName}>'
  }`;

// Find the last component entry and add before the closing bracket
galleryContent = galleryContent.replace(
  /(\s+preview: '<vds-modal open title="Modal Title"><p>Modal content<\/p><\/vds-modal>'\s+\})/,
  `$1,\n${componentEntry}`
);

writeFileSync(galleryPath, galleryContent);

console.log('✅ Component created successfully!');
console.log('');
console.log('📝 Next steps:');
console.log(`   1. Review and customize: packages/vds-${componentName}/${componentFile}`);
console.log(`   2. Update tests: packages/vds-${componentName}/${componentName}.test.ts`);
console.log(`   3. Customize styles and add properties as needed`);
console.log(`   4. Run tests: cd packages/vds-${componentName} && npm test`);
console.log(`   5. Build: npm run build`);
console.log('');
console.log('🎉 Happy coding!');


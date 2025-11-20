# vds-button

VDS Button Web Component - A customizable, accessible button component.

## Installation

```bash
npm install @vds/button
```

## Usage

### HTML

```html
<script type="module" src="@vds/button"></script>

<vds-button>Click me</vds-button>
```

### JavaScript/TypeScript

```typescript
import '@vds/button';
// or
import { VDSButton } from '@vds/button';
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'outline' \| 'ghost'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disables the button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |
| `aria-label` | `string` | - | Accessible label |

## Properties

All attributes are available as properties and are reactive.

## Events

### `vds-button-click`

Fired when the button is clicked (not fired when disabled).

**Event Detail:**
```typescript
{
  originalEvent: MouseEvent
}
```

## Slots

- **Default slot**: Button label/text content
- **`icon` slot**: Icon content (rendered before label)

## CSS Custom Properties

```css
--vds-btn-padding-x-sm
--vds-btn-padding-y-sm
--vds-btn-padding-x-md
--vds-btn-padding-y-md
--vds-btn-padding-x-lg
--vds-btn-padding-y-lg
--vds-btn-font-size-sm
--vds-btn-font-size-md
--vds-btn-font-size-lg
--vds-btn-bg-primary
--vds-btn-bg-primary-hover
/* ... and more */
```

## Parts

- `button`: The button element
- `label`: The label/text content
- `icon`: The icon slot container

## Examples

### Basic Usage

```html
<vds-button>Primary Button</vds-button>
<vds-button variant="secondary">Secondary</vds-button>
<vds-button variant="danger">Delete</vds-button>
```

### Sizes

```html
<vds-button size="sm">Small</vds-button>
<vds-button size="md">Medium</vds-button>
<vds-button size="lg">Large</vds-button>
```

### With Icon

```html
<vds-button>
  <span slot="icon">⭐</span>
  Star
</vds-button>
```

### Disabled

```html
<vds-button disabled>Disabled Button</vds-button>
```

### Event Handling

```javascript
const button = document.querySelector('vds-button');
button.addEventListener('vds-button-click', (e) => {
  console.log('Button clicked!', e.detail);
});
```

## Accessibility

- Proper ARIA roles and attributes
- Keyboard navigation (Enter/Space)
- Focus management
- Screen reader support


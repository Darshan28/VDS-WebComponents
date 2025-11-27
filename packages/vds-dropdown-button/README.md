# vds-dropdown-button

VDS Dropdown Button Web Component - A customizable dropdown button component with split and regular styles.

## Installation

```bash
npm install @vds/dropdown-button
```

## Usage

### HTML

```html
<script type="module" src="@vds/dropdown-button"></script>

<!-- Split style (default) -->
<vds-dropdown-button>Action</vds-dropdown-button>

<!-- Regular style -->
<vds-dropdown-button button-style="regular">Action</vds-dropdown-button>
```

### JavaScript/TypeScript

```typescript
import '@vds/dropdown-button';
// or
import { VDSDropdownButton } from '@vds/dropdown-button';
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `shape` | `'rounded' \| 'sharp' \| 'pill'` | `'rounded'` | Corner radius preset |
| `type` | `'filled' \| 'outline'` | `'filled'` | Surface treatment |
| `button-style` | `'split' \| 'regular'` | `'split'` | Button style - split (two buttons) or regular (single button) |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Color intent |
| `disabled` | `boolean` | `false` | Disables the button |

## Properties

All attributes are available as properties and are reactive.

## Events

### `vds-dropdown-button-click`

Fired when either the main button or dropdown button is clicked (not fired when disabled).

**Event Detail:**
```typescript
{
  originalEvent: MouseEvent;
  part: 'main' | 'dropdown';
}
```

## Slots

- **Default slot**: Button label/text content
- **`prefix-icon` slot**: Icon content rendered before the label

## CSS Custom Properties

You can customize the dropdown button appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-dropdown-btn-font-family` | `var(--vds-font-family-sans)` | Font family for button text |
| `--vds-dropdown-btn-font-weight` | `var(--vds-font-weight-normal, 400)` | Font weight for button text (varies by size) |
| `--vds-dropdown-btn-font-size` | `var(--vds-font-size-md, 0.75rem)` | Font size for button text (varies by size) |
| `--vds-dropdown-btn-padding-x` | `var(--vds-spacing-md, 1rem)` | Horizontal padding (left and right) |
| `--vds-dropdown-btn-padding-y` | `var(--vds-spacing-sm, 0.5rem)` | Vertical padding (top and bottom) |
| `--vds-dropdown-btn-gap` | `var(--vds-spacing-xs, 0.1875rem)` | Gap between icon and text |
| `--vds-dropdown-btn-min-height` | `28px` (varies by size) | Minimum height of the button |
| `--vds-dropdown-btn-radius` | `var(--vds-radius-lg, 0.5rem)` | Border radius (varies by shape) |
| `--vds-dropdown-btn-accent` | `var(--vds-color-brand, #00b578)` | Primary accent color (varies by variant) |
| `--vds-dropdown-btn-accent-hover` | `var(--vds-color-brand-hover, #009d68)` | Accent color on hover (varies by variant) |
| `--vds-dropdown-btn-accent-active` | `var(--vds-color-brand-active, #007a51)` | Accent color when active (varies by variant) |
| `--vds-dropdown-btn-on-accent` | `var(--vds-color-white, #ffffff)` | Text color on accent background (varies by variant) |
| `--vds-dropdown-btn-border-color` | `var(--vds-color-border-success, var(--vds-color-brand, #00b578))` | Border color (varies by variant) |
| `--vds-dropdown-btn-muted-bg` | `var(--vds-color-green-100, #e6f9f3)` | Muted background color for outline type hover (varies by variant) |
| `--vds-dropdown-btn-muted-bg-strong` | `var(--vds-color-green-200, #b3efd9)` | Strong muted background color for outline type active (varies by variant) |
| `--vds-dropdown-btn-label-color` | `var(--vds-dropdown-btn-on-accent)` | Label text color |
| `--vds-dropdown-btn-disabled-bg` | `var(--vds-color-gray-200, #f8f9fb)` | Background color when disabled |
| `--vds-dropdown-btn-disabled-color` | `var(--vds-color-slate-500, #90a0b9)` | Text color when disabled |
| `--vds-dropdown-btn-disabled-border` | `var(--vds-color-gray-300, #eaeef4)` | Border color when disabled |
| `--vds-dropdown-btn-transition` | `var(--vds-transition-base, 200ms ease-in-out)` | Transition duration and timing |
| `--vds-dropdown-btn-divider-color` | `var(--vds-color-green-200, #b3efd9)` | Divider color between buttons (split style, primary variant only) |
| `--vds-dropdown-btn-icon-size` | `var(--vds-dropdown-btn-font-size)` | Icon size (matches font size) |

## CSS Parts

| Part | Description |
|------|-------------|
| `container` | The main container element |
| `main-button` | The main button element (split style only) |
| `dropdown-button` | The dropdown button element |
| `divider` | The divider element between buttons (split style, primary variant only) |
| `label` | The label/text content |
| `prefix-icon` | The leading icon slot |
| `chevron-icon` | The chevron dropdown icon |

## Examples

### Split Style (Default)

```html
<vds-dropdown-button button-style="split" variant="primary">
  Action
</vds-dropdown-button>
```

### Regular Style

```html
<vds-dropdown-button button-style="regular" variant="primary">
  Action
</vds-dropdown-button>
```

### With Icon

```html
<vds-dropdown-button button-style="split">
  <vds-icon slot="prefix-icon" name="plus"></vds-icon>
  New Item
</vds-dropdown-button>
```

### Different Sizes

```html
<vds-dropdown-button size="small">Small</vds-dropdown-button>
<vds-dropdown-button size="medium">Medium</vds-dropdown-button>
<vds-dropdown-button size="large">Large</vds-dropdown-button>
```

### Different Shapes

```html
<vds-dropdown-button shape="rounded">Rounded</vds-dropdown-button>
<vds-dropdown-button shape="pill">Pill</vds-dropdown-button>
<vds-dropdown-button shape="sharp">Sharp</vds-dropdown-button>
```

### Outline Type

```html
<vds-dropdown-button type="outline" variant="primary">
  Outline Button
</vds-dropdown-button>
```

### Disabled State

```html
<vds-dropdown-button disabled>Disabled</vds-dropdown-button>
```

## Event Handling

```typescript
const button = document.querySelector('vds-dropdown-button');

button.addEventListener('vds-dropdown-button-click', (event) => {
  const { part, originalEvent } = event.detail;
  
  if (part === 'main') {
    console.log('Main button clicked');
  } else if (part === 'dropdown') {
    console.log('Dropdown button clicked');
  }
});
```


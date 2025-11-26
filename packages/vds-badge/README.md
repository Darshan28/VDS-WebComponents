# vds-badge

VDS Badge Web Component - A customizable badge component for labels, tags, and status indicators.

## Installation

```bash
npm install @vds/badge
```

## Usage

### HTML

```html
<script type="module" src="@vds/badge"></script>

<vds-badge>New</vds-badge>
```

### JavaScript/TypeScript

```typescript
import '@vds/badge';
// or
import { VDSBadge } from '@vds/badge';
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'warning' \| 'info' \| 'danger'` | `'primary'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Badge size |
| `shape` | `'pill' \| 'rounded'` | `'pill'` | Corner radius preset |

## Properties

All attributes are available as properties and are reactive.

## Slots

- **Default slot**: Badge label/text content
- **`icon` slot**: Icon content rendered before the label

## CSS Custom Properties

You can customize the badge appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-badge-font-family` | `var(--vds-font-family-sans)` | Font family for badge text |
| `--vds-badge-font-weight` | `var(--vds-font-weight-normal, 400)` | Font weight for badge text |
| `--vds-badge-font-size` | `var(--vds-font-size-xs, 0.75rem)` | Font size for badge text (varies by size) |
| `--vds-badge-line-height` | `1` | Line height for badge text |
| `--vds-badge-padding-x` | `var(--vds-spacing-sm, 0.5rem)` | Horizontal padding (left and right) |
| `--vds-badge-padding-y` | `var(--vds-spacing-2xs, 0.125rem)` | Vertical padding (top and bottom) |
| `--vds-badge-gap` | `var(--vds-spacing-xs, 0.25rem)` | Gap between icon and text |
| `--vds-badge-min-width` | `1rem` (varies by size) | Minimum width of the badge |
| `--vds-badge-radius` | `var(--vds-radius-full, 9999px)` | Border radius (varies by shape) |
| `--vds-badge-bg` | `var(--vds-color-green-100, #e6f9f3)` | Background color (varies by variant) |
| `--vds-badge-text` | `var(--vds-color-brand, #00b578)` | Text color (varies by variant) |
| `--vds-badge-icon-size` | `9px` (varies by size) | Size of the icon slot content |

### Customization Example

```css
vds-badge {
  --vds-badge-padding-x: 0.75rem;
  --vds-badge-padding-y: 0.25rem;
  --vds-badge-radius: 0.5rem;
  --vds-badge-bg: #f0f0f0;
  --vds-badge-text: #333333;
}
```

## Parts

- `badge`: The badge container element
- `icon`: The icon slot container
- `label`: The label/text content

## Examples

### Basic Usage

```html
<vds-badge>New</vds-badge>
<vds-badge variant="secondary">Draft</vds-badge>
<vds-badge variant="danger">Error</vds-badge>
```

### Sizes

```html
<vds-badge size="sm">Small</vds-badge>
<vds-badge size="md">Medium</vds-badge>
<vds-badge size="lg">Large</vds-badge>
```

### Shapes

```html
<vds-badge shape="pill">Pill</vds-badge>
<vds-badge shape="rounded">Rounded</vds-badge>
```

### With Icon

```html
<vds-badge>
  <vds-icon slot="icon" name="check"></vds-icon>
  Verified
</vds-badge>

<vds-badge variant="warning">
  <vds-icon slot="icon" name="alert"></vds-icon>
  Warning
</vds-badge>
```

## Variants

- **primary**: Green background with brand color text (success/positive states)
- **secondary**: Gray background with slate text (neutral/default states)
- **tertiary**: Light gray background with muted text (subtle states)
- **warning**: Orange background with orange text (caution states)
- **info**: Blue background with blue text (informational states)
- **danger**: Red background with red text (error/critical states)

## Accessibility

- Semantic HTML structure
- Proper color contrast ratios
- Screen reader friendly text content


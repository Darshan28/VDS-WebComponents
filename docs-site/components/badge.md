# Badge

The `vds-badge` component is a customizable badge component for labels, tags, and status indicators.

## Basic Usage

<ComponentDemo code='<vds-badge>New</vds-badge>' />

## Variants

<ComponentDemo code='<vds-badge>Primary</vds-badge>
<vds-badge variant="secondary">Secondary</vds-badge>
<vds-badge variant="tertiary">Tertiary</vds-badge>
<vds-badge variant="warning">Warning</vds-badge>
<vds-badge variant="info">Info</vds-badge>
<vds-badge variant="danger">Danger</vds-badge>' />

## Shapes

<ComponentDemo code='<vds-badge shape="pill">Pill</vds-badge>
<vds-badge shape="rounded">Rounded</vds-badge>' />

## Sizes

<ComponentDemo code='<vds-badge size="sm">Small</vds-badge>
<vds-badge size="md">Medium</vds-badge>
<vds-badge size="lg">Large</vds-badge>' />

## With Icon

<ComponentDemo code='<vds-badge>
  <vds-icon slot="icon" name="check" aria-hidden="true"></vds-icon>
  Verified
</vds-badge>
<vds-badge size="lg" variant="warning">
  <vds-icon slot="icon" name="tag" aria-hidden="true"></vds-icon>
  tag
</vds-badge>' />

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

<ComponentDemo code='<vds-badge>Default Badge</vds-badge>
<vds-badge style="--vds-badge-padding-x: 0.75rem; --vds-badge-padding-y: 0.25rem; --vds-badge-radius: 0.5rem; --vds-badge-bg: #f0f0f0; --vds-badge-text: #333333;">Customized Badge</vds-badge>' />

```css
vds-badge {
  --vds-badge-padding-x: 0.75rem;
  --vds-badge-padding-y: 0.25rem;
  --vds-badge-radius: 0.5rem;
  --vds-badge-bg: #f0f0f0;
  --vds-badge-text: #333333;
}
```

## API Reference

See the [full API documentation](https://github.com/your-org/vds-web-components/tree/main/packages/vds-badge#readme).


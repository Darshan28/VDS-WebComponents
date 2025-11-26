# Button

The `vds-button` component is a customizable, accessible button component.

## Basic Usage

<ComponentDemo code='<vds-button>Click me</vds-button>' />

## Variants

<ComponentDemo code='<vds-button>Primary</vds-button>
<vds-button variant="secondary">Secondary</vds-button>
<vds-button variant="warning">Warning</vds-button>
<vds-button variant="danger">Danger</vds-button>
<vds-button variant="info">Info</vds-button>' />

## Appearances

<ComponentDemo code='<vds-button appearance="filled">Filled</vds-button>
<vds-button appearance="outline">Outline</vds-button>
<vds-button appearance="text">Text</vds-button>' />

## Shapes

<ComponentDemo code='<vds-button shape="rounded">Rounded</vds-button>
<vds-button shape="pill">Pill</vds-button>
<vds-button shape="sharp">Sharp</vds-button>' />

## Sizes

<ComponentDemo code='<vds-button size="sm">Small</vds-button>
<vds-button size="md">Medium</vds-button>
<vds-button size="lg">Large</vds-button>' />

## Prefix & Suffix Icons

<ComponentDemo code='<vds-button>
  <vds-icon slot="prefix-icon" name="arrow-left" aria-hidden="true"></vds-icon>
  Back
</vds-button>
<vds-button variant="secondary">
  Next
  <vds-icon slot="suffix-icon" name="arrow-right" aria-hidden="true"></vds-icon>
</vds-button>' />

## Disabled State

<ComponentDemo code='<vds-button disabled>Disabled</vds-button>' />

## CSS Custom Properties

You can customize the button appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-btn-font-family` | `var(--vds-font-family-sans)` | Font family for button text |
| `--vds-btn-font-weight` | `var(--vds-font-weight-normal, 400)` | Font weight for button text (varies by size) |
| `--vds-btn-font-size` | `var(--vds-font-size-md, 1rem)` | Font size for button text (varies by size) |
| `--vds-btn-padding-x` | `var(--vds-spacing-md, 1rem)` | Horizontal padding (left and right) |
| `--vds-btn-padding-y` | `var(--vds-spacing-sm, 0.5rem)` | Vertical padding (top and bottom) |
| `--vds-btn-gap` | `var(--vds-spacing-sm, 0.5rem)` | Gap between icon and text |
| `--vds-btn-min-height` | `28px` (varies by size) | Minimum height of the button |
| `--vds-btn-radius` | `var(--vds-radius-lg, 0.5rem)` | Border radius (varies by shape) |
| `--vds-btn-accent` | `var(--vds-color-brand, #00b578)` | Primary accent color (varies by variant) |
| `--vds-btn-accent-hover` | `var(--vds-color-brand-hover, #009d68)` | Accent color on hover (varies by variant) |
| `--vds-btn-accent-active` | `var(--vds-color-brand-active, #007a51)` | Accent color when active/pressed (varies by variant) |
| `--vds-btn-on-accent` | `var(--vds-color-white, #ffffff)` | Text color on accent background (varies by variant) |
| `--vds-btn-border-color` | `var(--vds-color-border-success)` | Border color (varies by variant) |
| `--vds-btn-muted-bg` | `var(--vds-color-green-100, #e6f9f3)` | Muted background for outline/text appearances (varies by variant) |
| `--vds-btn-muted-bg-strong` | `var(--vds-color-green-200, #b3efd9)` | Stronger muted background for active state (varies by variant) |
| `--vds-btn-focus-ring` | `var(--vds-color-blue-500, #4366ff)` | Focus ring color |
| `--vds-btn-label-color` | `var(--vds-btn-on-accent)` | Text/label color |
| `--vds-btn-disabled-bg` | `var(--vds-color-gray-200, #f8f9fb)` | Background color when disabled |
| `--vds-btn-disabled-color` | `var(--vds-color-slate-500, #90a0b9)` | Text color when disabled |
| `--vds-btn-disabled-border` | `var(--vds-color-gray-300, #eaeef4)` | Border color when disabled |
| `--vds-btn-transition` | `var(--vds-transition-base, 200ms ease-in-out)` | Transition timing for state changes |

### Customization Example

<ComponentDemo code='<vds-button>Default Button</vds-button>
<vds-button style="--vds-btn-padding-x: 1.5rem; --vds-btn-padding-y: 0.75rem; --vds-btn-radius: 0.75rem; --vds-btn-accent: #6366f1; --vds-btn-accent-hover: #4f46e5; --vds-btn-on-accent: #ffffff;">Customized Button</vds-button>' />

```css
vds-button {
  --vds-btn-padding-x: 1.5rem;
  --vds-btn-padding-y: 0.75rem;
  --vds-btn-radius: 0.75rem;
  --vds-btn-accent: #6366f1;
  --vds-btn-accent-hover: #4f46e5;
  --vds-btn-on-accent: #ffffff;
}
```

## Events

```javascript
const button = document.querySelector('vds-button');
button.addEventListener('vds-button-click', (e) => {
  console.log('Button clicked!', e.detail);
});
```

## API Reference

See the [full API documentation](https://github.com/your-org/vds-web-components/tree/main/packages/vds-button#readme).

# Design Tokens

VDS uses CSS custom properties (CSS variables) for all design tokens. All tokens use the `--vds-` namespace.

## Figma Variable Structure

The VDS Figma file (`VDS > vds-button` page) organizes variables into three linked collections. Understanding how they cascade is key to maintaining parity between design and code.

### 1. Brand (Base) Collection
- **Raw palette + primitives**: tokens such as `--vds-color/brand`, `--vds-color/brand-hover`, `--vds-color/brand-active`, grayscale (`--vds-color-gray/200`), accent ramps (`--vds-color-blue/500`, `--vds-color-red/500`, etc.), typography (`--vds-font/family`, `--vds-font-size/md`, `--vds-font-weight/normal`), spacing (`--vds-spacing/xs` … `--vds-spacing/lg`), and radii (`--vds-radius/md`, `--vds-radius/full`).
- **Purpose**: acts as the single source of truth for measurable values (hex codes, px values) that designers maintain in Figma and engineers mirror in `tokens/tokens.css`.

### 2. Alias (Semantic) Collection
- **Semantic rebinding**: tokens like `--vds-color-border/success`, `--vds-color-border/warning`, `--vds-color-border/danger`, and `--vds-color-border/info` pull directly from brand hues (`success → --vds-color/brand (#00B578)`, `warning → --vds-color-orange/500`, etc.).
- **Why it matters**: product teams can shift what “success” or “warning” means by changing a single alias instead of touching every component. The alias layer also holds text/background pairings (e.g., `--vds-color/white`, `--vds-color/black`) so accessibility adjustments propagate automatically.

### 3. Mapped (Component) Collection
- **Component hooks**: individual components bind their fills, borders, typography, and spacing to alias tokens. Example from the `size=medium, shape=rounded, type=filled, state=normal, variant=primary` button (`node 23:9188`):
  - Background uses the brand base: `background: var(--vds-color/brand)`.
  - Border references the alias: `border-color: var(--vds-color-border/success)`.
  - Content spacing & typography stay on primitives: `gap: var(--vds-spacing/sm)`, `padding: var(--vds-spacing/md)`, `font-size: var(--vds-font-size/md)`, `font-weight: var(--vds-font-weight/normal)`.
  - Text/icon color locks to the neutral primitives (`--vds-color/white`), ensuring contrast regardless of which brand hue the alias resolves to.
- **Result**: swapping aliases (e.g., pointing `--vds-color-border/success` to another ramp) instantly updates every mapped component variant without editing component-level styles.

## Colors

### Primary Colors
```css
--vds-color-primary
--vds-color-primary-hover
--vds-color-primary-active
```

### Semantic Colors
```css
--vds-color-success
--vds-color-danger
--vds-color-warning
--vds-color-info
```

### Text Colors
```css
--vds-color-text-primary
--vds-color-text-secondary
--vds-color-text-disabled
```

## Spacing

```css
--vds-spacing-xs    /* 4px */
--vds-spacing-sm    /* 8px */
--vds-spacing-md    /* 16px */
--vds-spacing-lg    /* 24px */
--vds-spacing-xl    /* 32px */
```

## Typography

```css
--vds-font-family-sans
--vds-font-size-sm
--vds-font-size-md
--vds-font-size-lg
--vds-font-weight-normal
--vds-font-weight-medium
--vds-font-weight-semibold
```

## Border Radius

```css
--vds-radius-sm
--vds-radius-md
--vds-radius-lg
--vds-radius-full
```

## Shadows

```css
--vds-shadow-sm
--vds-shadow-md
--vds-shadow-lg
--vds-shadow-xl
```

## Usage

Import the tokens in your application:

```html
<link rel="stylesheet" href="@vds/web-components/tokens">
```

Or in CSS:

```css
@import '@vds/web-components/tokens';
```

## Overriding Tokens

You can override any token globally:

```css
:root {
  --vds-color-primary: #your-color;
  --vds-spacing-md: 20px;
}
```

Or per component:

```css
vds-button {
  --vds-btn-bg-primary: #custom-color;
}
```


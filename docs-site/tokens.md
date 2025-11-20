# Design Tokens

VDS uses CSS custom properties (CSS variables) for all design tokens. All tokens use the `--vds-` namespace.

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


# Theming

VDS Web Components support extensive theming through CSS custom properties.

## Global Theme Override

Override tokens globally using `:root`:

```css
:root {
  --vds-color-primary: #0066cc;
  --vds-color-primary-hover: #0052a3;
  --vds-spacing-md: 1rem;
  --vds-font-family-sans: 'Your Font', sans-serif;
}
```

## Component-Level Override

Override tokens for specific components:

```css
vds-button {
  --vds-btn-bg-primary: #custom-color;
  --vds-btn-border-radius: 8px;
}
```

## Dark Mode

VDS automatically supports dark mode via `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode tokens are automatically applied */
}
```

Or use a class-based approach:

```html
<html data-theme="dark">
  <!-- Dark mode tokens applied -->
</html>
```

## Custom Themes

Create custom themes by defining a theme class:

```css
.theme-custom {
  --vds-color-primary: #ff6b6b;
  --vds-color-secondary: #4ecdc4;
  --vds-color-success: #95e1d3;
  /* ... more overrides */
}
```

```html
<body class="theme-custom">
  <vds-button>Custom Theme Button</vds-button>
</body>
```

## CSS Parts

Style internal component elements using `::part()`:

```css
vds-button::part(button) {
  border-radius: 20px;
  font-weight: bold;
}

vds-modal::part(backdrop) {
  background-color: rgba(0, 0, 0, 0.8);
}
```

## Slotted Content

Style slotted content using `::slotted()`:

```css
vds-button::slotted([slot="icon"]) {
  font-size: 1.5rem;
}
```


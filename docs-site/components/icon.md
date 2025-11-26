# Icon

The `vds-icon` component renders glyphs from the VDS icon font with consistent sizing, color, and accessibility controls. Load the IcoMoon CSS once in your app (the docs import `packages/vds-icon/assets/style.css`) so classes like `v-download` resolve to real glyphs.

## Basic Usage

<ComponentDemo code='<vds-icon name="arrow-right" rotate="90" label="Arrow Down"></vds-icon>' />

## Sizing

Icons now follow whatever `font-size` is applied to the host element, so you can use your existing typography scale:

<ComponentDemo code='<div style="display:flex;gap:1rem;align-items:center;">
  <vds-icon name="survey" style="font-size:0.75rem" label="Favorite (12px)"></vds-icon>
  <vds-icon name="meeting" style="font-size:1rem" label="Favorite (16px)"></vds-icon>
  <vds-icon name="star" style="font-size:1.5rem" label="Favorite (24px)"></vds-icon>
  <vds-icon name="meeting" style="font-size:2rem" label="Favorite (32px)"></vds-icon>
</div>' />

## Color & Rotation

<ComponentDemo code='<div style="display:flex;gap:1rem;align-items:center;">
  <vds-icon name="info" color="var(--vds-color-info)" label="Info"></vds-icon>
  <vds-icon name="warning" color="var(--vds-color-warning)" label="Warning"></vds-icon>
  <vds-icon name="arrow-right" rotate="90" label="Arrow Down"></vds-icon>
</div>' />

## Animations

<ComponentDemo code='<vds-icon name="arrow-right" spin label="Loading"></vds-icon>' />

## Accessibility

- Provide a `label` whenever the icon communicates meaning.
- Use the `decorative` attribute for purely visual icons.

## Icon Gallery

Browse all available icons below. Click on any icon to copy its name to your clipboard.

<IconGallery />

## API Reference

See the [full README](https://github.com/your-org/vds-web-components/tree/main/packages/vds-icon#readme) for the `vds-icon` package.




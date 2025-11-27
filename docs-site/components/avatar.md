# Avatar

The `vds-avatar` component is a customizable avatar component for displaying user images, initials, or icons.

## Basic Usage

<ComponentDemo code='<vds-avatar variant="text" name="John Doe"></vds-avatar>' />

## Variants

<ComponentDemo code='<vds-avatar variant="image" src="https://via.placeholder.com/100" alt="User"></vds-avatar>
<vds-avatar variant="text" name="John Doe"></vds-avatar>
<vds-avatar variant="icon">
  <vds-icon slot="icon" name="user" aria-hidden="true"></vds-icon>
</vds-avatar>' />

## Sizes

<ComponentDemo code='<vds-avatar size="xs" variant="text" name="JD"></vds-avatar>
<vds-avatar size="sm" variant="text" name="JD"></vds-avatar>
<vds-avatar size="md" variant="text" name="JD"></vds-avatar>
<vds-avatar size="lg" variant="text" name="JD"></vds-avatar>
<vds-avatar size="xl" variant="text" name="JD"></vds-avatar>
<vds-avatar size="2xl" variant="text" name="JD"></vds-avatar>
<vds-avatar size="3xl" variant="text" name="JD"></vds-avatar>
<vds-avatar size="4xl" variant="text" name="JD"></vds-avatar>' />

## Image Avatar

<ComponentDemo code='<vds-avatar src="https://mockmind-api.uifaces.co/content/human/222.jpg" alt="User"></vds-avatar>
<vds-avatar size="lg" src="https://mockmind-api.uifaces.co/content/human/222.jpg" alt="User"></vds-avatar>
<vds-avatar size="xl" src="https://mockmind-api.uifaces.co/content/human/222.jpg" alt="User"></vds-avatar>
<vds-avatar size="4xl" src="https://mockmind-api.uifaces.co/content/human/222.jpg" alt="User"></vds-avatar>' />

## Text Avatar (Initial)

<ComponentDemo code='<vds-avatar variant="text" name="John Doe"></vds-avatar>
<vds-avatar variant="text" initials="A"></vds-avatar>
<vds-avatar variant="text" name="John" size="xl"></vds-avatar>' />

## Icon Avatar

<ComponentDemo code='<vds-avatar variant="icon">
  <vds-icon slot="icon" name="user" aria-hidden="true"></vds-icon>
</vds-avatar>
<vds-avatar variant="icon" size="lg">
  <vds-icon slot="icon" name="user" aria-hidden="true"></vds-icon>
</vds-avatar>' />

## Automatic Fallback

The component automatically falls back from image → text → icon:

<ComponentDemo code='<vds-avatar name="John Doe"></vds-avatar>
<vds-avatar name="Prabhu Balu" variant="image"></vds-avatar>' />

## CSS Custom Properties

You can customize the avatar appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-avatar-size` | `16px` (varies by size) | Width and height of the avatar |
| `--vds-avatar-radius` | `var(--vds-radius-sm, 0.25rem)` | Border radius (varies by size) |
| `--vds-avatar-bg` | `var(--vds-color-green-200, #b3efd9)` | Background color (varies by variant) |
| `--vds-avatar-text-color` | `var(--vds-color-green-700, #007a51)` | Text color for the initial character |
| `--vds-avatar-icon-color` | `var(--vds-color-violet-700, #7107e7)` | Icon color |
| `--vds-avatar-font-family` | `var(--vds-font-family-sans)` | Font family for initials |
| `--vds-avatar-font-weight` | `var(--vds-font-weight-normal, 400)` | Font weight (varies by size) |
| `--vds-avatar-font-size` | `var(--vds-font-size-xs, 0.75rem)` | Font size for the initial character (varies by size) |
| `--vds-avatar-icon-size` | `var(--vds-avatar-font-size)` | Size of the icon (matches font size) |
| `--vds-avatar-padding` | `0` (varies by size) | Internal padding |

### Customization Example

<ComponentDemo code='<vds-avatar variant="text" name="JD" style="--vds-avatar-bg: #f0f0f0; --vds-avatar-text-color: #333333; --vds-avatar-radius: 0.5rem;">Custom</vds-avatar>
<vds-avatar variant="text" name="JD">Default</vds-avatar>' />

```css
vds-avatar {
  --vds-avatar-bg: #f0f0f0;
  --vds-avatar-text-color: #333333;
  --vds-avatar-radius: 0.5rem;
}
```

## API Reference

See the [full API documentation](https://github.com/your-org/vds-web-components/tree/main/packages/vds-avatar#readme).


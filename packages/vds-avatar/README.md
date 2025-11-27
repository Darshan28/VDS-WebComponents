# vds-avatar

VDS Avatar Web Component - A customizable avatar component for displaying user images, initials, or icons.

## Installation

```bash
npm install @vds/avatar
```

## Usage

### HTML

```html
<script type="module" src="@vds/avatar"></script>

<vds-avatar src="https://example.com/avatar.jpg" alt="User"></vds-avatar>
```

### JavaScript/TypeScript

```typescript
import '@vds/avatar';
// or
import { VDSAvatar } from '@vds/avatar';
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | `'xs'` | Avatar size |
| `variant` | `'image' \| 'text' \| 'icon'` | `'image'` | Display variant |
| `src` | `string` | `undefined` | Image source URL |
| `alt` | `string` | `''` | Alt text for image |
| `name` | `string` | `''` | Full name for generating initial (first character) |
| `initials` | `string` | `undefined` | Custom initial to display (first character used) |

## Properties

All attributes are available as properties and are reactive.

## Slots

- **`icon` slot**: Icon content (used when `variant="icon"`)

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

```css
vds-avatar {
  --vds-avatar-bg: #f0f0f0;
  --vds-avatar-text-color: #333333;
  --vds-avatar-radius: 0.5rem;
}
```

## Parts

- `avatar`: The avatar container element
- `image`: The image element (when variant is image)
- `text`: The text/initial element (when variant is text)
- `icon`: The icon slot container (when variant is icon)

## Examples

### Image Avatar

```html
<vds-avatar src="https://example.com/avatar.jpg" alt="John Doe"></vds-avatar>
<vds-avatar size="lg" src="https://example.com/avatar.jpg" alt="John Doe"></vds-avatar>
```

### Text Avatar (Initial)

```html
<vds-avatar variant="text" name="John Doe"></vds-avatar>
<vds-avatar variant="text" initials="A"></vds-avatar>
<vds-avatar variant="text" name="John" size="xl"></vds-avatar>
```

### Icon Avatar

```html
<vds-avatar variant="icon">
  <vds-icon slot="icon" name="user"></vds-icon>
</vds-avatar>
```

### Sizes

```html
<vds-avatar size="xs" variant="text" name="JD"></vds-avatar>
<vds-avatar size="sm" variant="text" name="JD"></vds-avatar>
<vds-avatar size="md" variant="text" name="JD"></vds-avatar>
<vds-avatar size="lg" variant="text" name="JD"></vds-avatar>
<vds-avatar size="xl" variant="text" name="JD"></vds-avatar>
<vds-avatar size="2xl" variant="text" name="JD"></vds-avatar>
<vds-avatar size="3xl" variant="text" name="JD"></vds-avatar>
<vds-avatar size="4xl" variant="text" name="JD"></vds-avatar>
```

### Automatic Fallback

The component automatically falls back from image → text → icon:

```html
<!-- If src fails or is missing, falls back to text initials -->
<vds-avatar src="broken.jpg" name="John Doe"></vds-avatar>

<!-- If no name/initials, falls back to icon -->
<vds-avatar variant="image"></vds-avatar>
```

## Variants

- **image**: Displays an image (circular shape). Falls back to text if `src` is missing and `name`/`initials` are provided.
- **text**: Displays a single initial (first character) from `name` or custom `initials` (rounded square, green background).
- **icon**: Displays an icon from the icon slot (rounded square, violet background).

## Accessibility

- Semantic HTML structure
- Proper `alt` text support for images
- Screen reader friendly text content
- ARIA attributes where appropriate


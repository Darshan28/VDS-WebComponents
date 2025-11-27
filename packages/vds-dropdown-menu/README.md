# VDS Dropdown Menu

The `vds-dropdown-menu` component is a container component for displaying a list of menu items with optional heading, search functionality, and scrollable content.

## Installation

```bash
npm install @vds/dropdown-menu
```

## Usage

### Basic Example

```html
<vds-dropdown-menu>
  <vds-menu-item>Menu item 1</vds-menu-item>
  <vds-menu-item>Menu item 2</vds-menu-item>
  <vds-menu-item>Menu item 3</vds-menu-item>
</vds-dropdown-menu>
```

### With Heading

```html
<vds-dropdown-menu heading="Menu Heading">
  <vds-menu-item>Menu item 1</vds-menu-item>
  <vds-menu-item>Menu item 2</vds-menu-item>
</vds-dropdown-menu>
```

### With Search

```html
<vds-dropdown-menu heading="Menu Heading" search-placeholder="Search items...">
  <vds-menu-item>Menu item 1</vds-menu-item>
  <vds-menu-item>Menu item 2</vds-menu-item>
</vds-dropdown-menu>
```

### Scrollable Menu

```html
<vds-dropdown-menu scrollable max-height="300px">
  <vds-menu-item>Menu item 1</vds-menu-item>
  <vds-menu-item>Menu item 2</vds-menu-item>
  <!-- More items... -->
</vds-dropdown-menu>
```

### With Dividers

```html
<vds-dropdown-menu>
  <vds-menu-item>Menu item 1</vds-menu-item>
  <vds-menu-item>Menu item 2</vds-menu-item>
  <hr />
  <vds-menu-item>Menu item 3</vds-menu-item>
  <vds-menu-item>Menu item 4</vds-menu-item>
</vds-dropdown-menu>
```

### With Show More Button

```html
<vds-dropdown-menu show-more-text="Show more">
  <vds-menu-item>Menu item 1</vds-menu-item>
  <vds-menu-item>Menu item 2</vds-menu-item>
</vds-dropdown-menu>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `heading` | `string \| undefined` | `undefined` | The heading text displayed at the top |
| `searchPlaceholder` | `string \| undefined` | `undefined` | Placeholder text for the search input (shows search when set) |
| `scrollable` | `boolean` | `false` | Whether the menu is scrollable |
| `maxHeight` | `string \| undefined` | `undefined` | Maximum height of the menu (enables scrollable when set) |
| `showMoreText` | `string \| undefined` | `undefined` | Text for the "Show more" button/link |
| `showMoreHref` | `string \| undefined` | `undefined` | URL for the "Show more" link (renders as link if set, button otherwise) |

## Slots

| Slot | Description |
|------|-------------|
| (default) | Menu items and dividers (`<hr>` or elements with `.divider` class) |

## CSS Parts

| Part | Description |
|------|-------------|
| `dropdown-menu` | The dropdown menu container element |
| `header` | The header section (heading and search) |
| `heading` | The heading element |
| `search` | The search input container |
| `search-input` | The search input element |
| `content` | The menu items container |
| `footer` | The footer section (show more button) |
| `show-more` | The show more button/link element |

## CSS Custom Properties

You can customize the dropdown menu appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-dropdown-menu-bg` | `var(--vds-color-white, #ffffff)` | Background color |
| `--vds-dropdown-menu-padding` | `var(--vds-radius-xl, 0.5625rem)` | Internal padding |
| `--vds-dropdown-menu-gap` | `var(--vds-spacing-xs, 0.25rem)` | Gap between items |
| `--vds-dropdown-menu-radius` | `var(--vds-radius-lg, 0.375rem)` | Border radius |
| `--vds-dropdown-menu-shadow` | `0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)` | Box shadow |
| `--vds-dropdown-menu-min-width` | `160px` | Minimum width |
| `--vds-dropdown-menu-max-width` | `260px` | Maximum width |
| `--vds-dropdown-menu-max-height` | `none` | Maximum height (enables scrolling when set) |
| `--vds-dropdown-menu-heading-font-family` | `var(--vds-font-family-sans)` | Font family for heading |
| `--vds-dropdown-menu-heading-font-weight` | `var(--vds-font-weight-semibold, 600)` | Font weight for heading |
| `--vds-dropdown-menu-heading-font-size` | `var(--vds-font-size-md, 1rem)` | Font size for heading |
| `--vds-dropdown-menu-heading-color` | `var(--vds-color-text-primary, #070922)` | Heading text color |
| `--vds-dropdown-menu-search-border` | `3px solid var(--vds-color-green-100, #e6f9f3)` | Search container border |
| `--vds-dropdown-menu-search-radius` | `var(--vds-radius-lg, 0.375rem)` | Search container border radius |
| `--vds-dropdown-menu-divider-color` | `var(--vds-color-border-default, var(--vds-color-gray-300, #eaeef4))` | Divider color |
| `--vds-dropdown-menu-show-more-color` | `var(--vds-color-blue-500, #4366ff)` | Show more text color |
| `--vds-dropdown-menu-scrollbar-width` | `var(--vds-size-4xs, 0.333rem)` | Scrollbar width |
| `--vds-dropdown-menu-scrollbar-color` | `var(--vds-color-dark-100, #e1e2ea)` | Scrollbar color |

## Events

The component emits the following events:

- `vds-dropdown-menu-search`: Fired when the search input value changes. Event detail contains `{ value: string }`.
- `vds-dropdown-menu-show-more`: Fired when the "Show more" button is clicked (only when `showMoreHref` is not set).

### Example

```javascript
const menu = document.querySelector('vds-dropdown-menu');
menu.addEventListener('vds-dropdown-menu-search', (e) => {
  console.log('Search:', e.detail.value);
});
menu.addEventListener('vds-dropdown-menu-show-more', () => {
  console.log('Show more clicked');
});
```

## Examples

### Complete Example

```html
<vds-dropdown-menu heading="Menu Heading" search-placeholder="Search items..." show-more-text="Show more">
  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="user" aria-hidden="true"></vds-icon>
    Profile
  </vds-menu-item>
  <vds-menu-item selected>
    <vds-icon slot="prefix-icon" name="settings" aria-hidden="true"></vds-icon>
    Settings
  </vds-menu-item>
  <hr />
  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="logout" aria-hidden="true"></vds-icon>
    Logout
  </vds-menu-item>
</vds-dropdown-menu>
```

### Custom Styling

```html
<vds-dropdown-menu 
  style="--vds-dropdown-menu-bg: #f5f5f5; --vds-dropdown-menu-radius: 0.5rem;">
  <vds-menu-item>Item 1</vds-menu-item>
  <vds-menu-item>Item 2</vds-menu-item>
</vds-dropdown-menu>
```

```css
vds-dropdown-menu {
  --vds-dropdown-menu-bg: #f5f5f5;
  --vds-dropdown-menu-radius: 0.5rem;
  --vds-dropdown-menu-max-width: 300px;
}
```


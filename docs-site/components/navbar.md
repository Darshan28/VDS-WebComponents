# Navbar

The `vds-navbar` component is a sticky navigation bar that sits at the top of the page. It provides a flexible structure with slots for menu icons, navigation headings, tabs, actions, shortcuts, and profile content.

## Basic Usage

<ComponentDemo code='<vds-navbar variant="default" show-nav-heading>
  <span slot="nav-heading">My Application</span>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

## Variants

### Default (Light)

<ComponentDemo code='<vds-navbar variant="default" show-nav-heading>
  <span slot="nav-heading">Application</span>
  <div slot="actions">
    <vds-button size="sm">New</vds-button>
  </div>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

### Inverse (Dark)

<ComponentDemo code='<vds-navbar variant="inverse" show-nav-heading>
  <span slot="nav-heading">Application</span>
  <div slot="actions">
    <vds-button size="sm" variant="inverse" appearance="outline">New</vds-button>
  </div>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

## With Navigation Heading

<ComponentDemo code='<vds-navbar variant="default" show-nav-heading>
  <span slot="nav-heading">Dashboard</span>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

## With Tabs

<ComponentDemo code='<vds-navbar variant="default">
  <vds-tab slot="tabs" variant="filled">
    <vds-tab-item value="home" active>Home</vds-tab-item>
    <vds-tab-item value="profile">Profile</vds-tab-item>
    <vds-tab-item value="settings">Settings</vds-tab-item>
  </vds-tab>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

## With Search Button

The navbar includes a built-in search button that can be enabled with the `show-search` attribute. The search button includes a magnifying glass icon, "Search" text, and a "⌘K" keyboard shortcut.

<ComponentDemo code='<vds-navbar variant="inverse" show-search>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

### Default Variant with Search

<ComponentDemo code='<vds-navbar variant="default" show-search show-nav-heading>
  <span slot="nav-heading">Application</span>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

## With Actions

You can provide custom actions in the actions slot. When custom actions are provided, they replace the default search button from `show-search`. You can manually add the search button using the same structure:

<ComponentDemo code='<vds-navbar variant="inverse" show-nav-heading>
  <span slot="nav-heading">Application</span>
  <div slot="actions" style="display: flex; gap: 6px; align-items: center;">
    <vds-button class="search-button" size="sm" variant="inverse" appearance="filled">
      <vds-icon slot="prefix-icon" name="magnifying-glass"></vds-icon>
      Search
      <span slot="suffix-icon" class="keyboard-shortcut">⌘K</span>
    </vds-button>
    <vds-button size="sm" variant="inverse" appearance="filled">
      <vds-icon slot="prefix-icon" name="circle-plus"></vds-icon>
      New
    </vds-button>
  </div>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

## With Shortcuts

<ComponentDemo code='<vds-navbar variant="default">
  <div slot="shortcuts" style="display: flex; gap: 0; align-items: center;">
    <vds-button size="md" appearance="text" icon-only aria-label="Notifications">
      <vds-icon slot="icon" name="bell" aria-hidden="true"></vds-icon>
    </vds-button>
    <vds-button size="md" appearance="text" icon-only aria-label="Inbox">
      <vds-icon slot="icon" name="inbox" aria-hidden="true"></vds-icon>
    </vds-button>
    <vds-button size="md" appearance="text" icon-only aria-label="Apps">
      <vds-icon slot="icon" name="grid-2-plus" aria-hidden="true"></vds-icon>
    </vds-button>
    <vds-button size="md" appearance="text" icon-only aria-label="Info">
      <vds-icon slot="icon" name="circle-info" aria-hidden="true"></vds-icon>
    </vds-button>
  </div>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

## With Profile and Brand Logo

The profile section can include both a brand logo and an avatar. The brand logo appears before the avatar with a slight overlap.

### With Brand Logo and Avatar

<ComponentDemo code='<vds-navbar variant="default">
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

### Text Avatar Only

<ComponentDemo code='<vds-navbar variant="default">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

### Image Avatar with Brand Logo

<ComponentDemo code='<vds-navbar variant="default">
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="image" src="https://mockmind-api.uifaces.co/content/human/222.jpg" alt="User" size="md"></vds-avatar>
</vds-navbar>' />

## Complete Example

<ComponentDemo code='<vds-navbar variant="default">
  
  <vds-tab slot="tabs" variant="filled">
    <vds-tab-item value="home" active>Home</vds-tab-item>
    <vds-tab-item value="profile">Profile</vds-tab-item>
    <vds-tab-item value="settings">Settings</vds-tab-item>
  </vds-tab>
  
  <div slot="actions" style="display: flex; gap: 6px; align-items: center;">
    <vds-button class="search-button" size="sm" appearance="filled">
      <vds-icon slot="prefix-icon" name="magnifying-glass"></vds-icon>
      Search
      <span slot="suffix-icon" class="keyboard-shortcut">⌘K</span>
    </vds-button>
    <vds-button size="sm">New</vds-button>
  </div>
  
  <div slot="shortcuts" style="display: flex; gap: 0; align-items: center;">
    <vds-button size="md" appearance="text" icon-only aria-label="Notifications">
      <vds-icon slot="icon" name="bell" aria-hidden="true"></vds-icon>
    </vds-button>
    <vds-button size="md" appearance="text" icon-only aria-label="Info">
      <vds-icon slot="icon" name="circle-info" aria-hidden="true"></vds-icon>
    </vds-button>
  </div>
  
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

## Inverse Variant with Tabs

<ComponentDemo code='<div style="background: #1d3465; padding: 0; margin: -1rem -1rem 1rem -1rem;">
  <vds-navbar variant="inverse">
    <vds-tab slot="tabs" variant="filled-inverse">
      <vds-tab-item value="home" active>Home</vds-tab-item>
      <vds-tab-item value="contacts">Contacts</vds-tab-item>
      <vds-tab-item value="cases">Cases</vds-tab-item>
    </vds-tab>
    <div slot="actions" style="display: flex; gap: 6px; align-items: center;">
      <vds-button size="sm" variant="inverse" appearance="outline">New</vds-button>
    </div>
    <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
    <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
  </vds-navbar>
</div>' />

## Custom Menu Icon

<ComponentDemo code='<vds-navbar variant="default" show-nav-heading>
  <vds-icon slot="menu-icon" name="xmark" aria-hidden="true"></vds-icon>
  <span slot="nav-heading">Application</span>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

## Events

### `vds-navbar-menu-click`

Fired when the menu button is clicked.

**Event Detail:**
```typescript
{
  originalEvent: MouseEvent;
}
```

**Example:**
```javascript
const navbar = document.querySelector('vds-navbar');
navbar.addEventListener('vds-navbar-menu-click', (e) => {
  console.log('Menu clicked!', e.detail.originalEvent);
});
```

## CSS Custom Properties

You can customize the navbar appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-navbar-z-index` | `1000` | Z-index of the navbar |
| `--vds-navbar-height` | `var(--vds-size-2xl, 36px)` | Height of the navbar |
| `--vds-navbar-bg-default` | `var(--vds-color-bg-secondary, #f8f9fb)` | Background color for default variant |
| `--vds-navbar-bg-inverse` | `var(--vds-color-navy-700, #1d3465)` | Background color for inverse variant |
| `--vds-navbar-border-color-default` | `var(--vds-color-border-default, #eaeef4)` | Border color for default variant |
| `--vds-navbar-border-color-inverse` | `var(--vds-color-navy-600, #2e4883)` | Border color for inverse variant |
| `--vds-navbar-text-color-default` | `var(--vds-color-text-primary, #070922)` | Text color for default variant |
| `--vds-navbar-text-color-inverse` | `var(--vds-color-text-inverse, #ffffff)` | Text color for inverse variant |
| `--vds-navbar-gap` | `var(--vds-spacing-3xl, 48px)` | Gap between left and right sections |
| `--vds-navbar-padding-x` | `var(--vds-spacing-md, 12px)` | Horizontal padding |
| `--vds-navbar-font-family` | `var(--vds-font-family-sans, ...)` | Font family |
| `--vds-navbar-font-size` | `var(--vds-font-size-md, 12px)` | Font size |
| `--vds-navbar-divider-color-default` | `var(--vds-color-border-default, #eaeef4)` | Divider color for default variant |
| `--vds-navbar-divider-color-inverse` | `rgba(56, 90, 163, 1)` | Divider color for inverse variant |

### Customization Example

<ComponentDemo code='<vds-navbar 
  variant="default" 
  show-nav-heading
  style="--vds-navbar-bg-default: #e6f9f3; --vds-navbar-text-color-default: #00b578;"
>
  <span slot="nav-heading">Custom Navbar</span>
  <img slot="brand-logo" src="https://tinyurl.com/4kaxwvbc" alt="Brand Logo" style="height: 24px; width: auto;">
  <vds-avatar slot="profile" variant="text" name="JD" size="md"></vds-avatar>
</vds-navbar>' />

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'inverse'` | `'default'` | Color variant (light or dark) |
| `showNavHeading` | `boolean` | `false` | Show the nav heading section |
| `showSearch` | `boolean` | `false` | Show the built-in search button in the actions slot |

### Slots

| Slot | Description |
|------|-------------|
| `menu-icon` | Icon for the menu button (defaults to bars icon) |
| `nav-heading` | Navigation heading/label content |
| `tabs` | Tab navigation content |
| `actions` | Action buttons (search, new button, etc.) |
| `shortcuts` | Shortcut icons |
| `brand-logo` | Brand logo image displayed before the avatar in the profile section |
| `profile` | Profile/avatar content |
| `divider-1` | First divider (between actions and shortcuts) |
| `divider-2` | Second divider (between shortcuts and profile) |

### CSS Parts

| Part | Description |
|------|-------------|
| `navbar` | The main navbar container |
| `left-content` | The left section container |
| `menu-button` | The menu button container |
| `nav-heading` | The navigation heading container |
| `right-content` | The right section container |
| `divider` | The divider elements |
| `profile-container` | The profile container (wraps brand logo and avatar) |
| `brand-logo` | The brand logo container |

## Notes

- The navbar is sticky by default, positioned at the top of the page
- The navbar height is fixed at 36px by default
- Slots allow for maximum flexibility in content arrangement
- The component automatically handles variant-specific styling
- Dividers are optional and can be customized or hidden via slots
- The built-in search button appears in the actions slot when `show-search` is enabled
- If custom content is provided in the actions slot, it replaces the default search button
- The search button automatically adapts to the navbar variant (default/inverse)
- Shortcut icon buttons in the shortcuts slot default to "md" size when no size is specified


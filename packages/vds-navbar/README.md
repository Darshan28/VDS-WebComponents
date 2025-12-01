# vds-navbar

VDS Navbar Web Component - A sticky navigation bar component with support for default and inverse variants.

## Installation

```bash
npm install @vds/navbar
```

## Usage

### HTML

```html
<script type="module" src="@vds/navbar"></script>

<vds-navbar variant="default" show-nav-heading>
  <span slot="nav-heading">My Application</span>
  <div slot="actions">
    <vds-button>Action</vds-button>
  </div>
</vds-navbar>
```

### JavaScript/TypeScript

```typescript
import '@vds/navbar';
// or
import { VDSNavbar } from '@vds/navbar';
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'default' \| 'inverse'` | `'default'` | Color variant (light or dark) |
| `show-nav-heading` | `boolean` | `false` | Show the nav heading section |

## Properties

All attributes are available as properties and are reactive.

## Events

### `vds-navbar-menu-click`

Fired when the menu button is clicked.

**Event Detail:**
```typescript
{
  originalEvent: MouseEvent;
}
```

## Slots

| Slot | Description |
|------|-------------|
| `menu-icon` | Icon for the menu button (defaults to bars icon) |
| `nav-heading` | Navigation heading/label content |
| `tabs` | Tab navigation content |
| `actions` | Action buttons (search, new button, etc.) |
| `shortcuts` | Shortcut icons |
| `profile` | Profile/avatar content |
| `divider-1` | First divider (between actions and shortcuts) |
| `divider-2` | Second divider (between shortcuts and profile) |

## CSS Custom Properties

```css
--vds-navbar-z-index
--vds-navbar-height
--vds-navbar-bg-default
--vds-navbar-bg-inverse
--vds-navbar-border-color-default
--vds-navbar-border-color-inverse
--vds-navbar-text-color-default
--vds-navbar-text-color-inverse
--vds-navbar-gap
--vds-navbar-padding-x
--vds-navbar-padding-y
--vds-navbar-font-family
--vds-navbar-font-size
--vds-navbar-divider-color-default
--vds-navbar-divider-color-inverse
```

## Parts

| Part | Description |
|------|-------------|
| `navbar` | The main navbar container |
| `left-content` | The left section container |
| `menu-button` | The menu button container |
| `nav-heading` | The navigation heading container |
| `right-content` | The right section container |
| `divider` | The divider elements |

## Examples

### Default Variant with Heading

```html
<vds-navbar variant="default" show-nav-heading>
  <span slot="nav-heading">My Application</span>
  <div slot="actions">
    <vds-button>New</vds-button>
  </div>
</vds-navbar>
```

### Inverse Variant with Tabs

```html
<vds-navbar variant="inverse">
  <span slot="nav-heading">Dashboard</span>
  <vds-tab slot="tabs">
    <vds-tab-item>Home</vds-tab-item>
    <vds-tab-item>Settings</vds-tab-item>
  </vds-tab>
</vds-navbar>
```

### Full Featured Navbar

```html
<vds-navbar variant="default" show-nav-heading>
  <span slot="nav-heading">Application</span>
  
  <vds-tab slot="tabs">
    <vds-tab-item>Home</vds-tab-item>
    <vds-tab-item>Profile</vds-tab-item>
    <vds-tab-item>Settings</vds-tab-item>
  </vds-tab>
  
  <div slot="actions">
    <vds-button>Search</vds-button>
    <vds-button>New</vds-button>
  </div>
  
  <div slot="shortcuts">
    <vds-button appearance="text">
      <vds-icon name="bell"></vds-icon>
    </vds-button>
  </div>
  
  <vds-avatar slot="profile" src="avatar.jpg"></vds-avatar>
</vds-navbar>
```


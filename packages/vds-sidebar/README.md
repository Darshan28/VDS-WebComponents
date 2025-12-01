# vds-sidebar

VDS Sidebar Web Component – a collapsible navigation sidebar that supports a collapsed mode (icons only) and an expanded mode (icons with labels).

## Installation

```bash
npm install @vds/sidebar
```

## Usage

### HTML

```html
<script type="module" src="@vds/sidebar"></script>

<vds-sidebar>
  <div slot="header">
    <!-- Logo / avatar -->
    <img src="logo.svg" alt="Brand" height="24" />
  </div>
  <span slot="title">Application</span>

  <!-- Main navigation items -->
  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="home"></vds-icon>
    Home
  </vds-menu-item>
  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="settings"></vds-icon>
    Settings
  </vds-menu-item>

  <div slot="footer">
    <vds-menu-item>
      <vds-icon slot="prefix-icon" name="arrow-right-from-bracket"></vds-icon>
      Logout
    </vds-menu-item>
  </div>
</vds-sidebar>
```

The sidebar can be programmatically collapsed or expanded using the `collapsed` attribute:

```html
<vds-sidebar collapsed></vds-sidebar>
```

### JavaScript/TypeScript

```typescript
import '@vds/sidebar';
// or
import { VDSSidebar } from '@vds/sidebar';
```

## Attributes

| Attribute            | Type                         | Default     | Description                                             |
|----------------------|------------------------------|-------------|---------------------------------------------------------|
| `variant`            | `'default' \| 'inverse'`     | `'default'` | Color variant (light or dark)                          |
| `collapsed`          | `boolean`                    | `false`     | When true, shows only icons and hides text labels      |
| `toggle-aria-label`  | `string`                     | `null`      | Custom aria-label for the collapse/expand toggle button |

## Properties

All attributes are available as properties and are reactive.

## Events

### `vds-sidebar-toggle`

Fired when the sidebar collapsed state changes (via the toggle button).

**Event Detail:**

```typescript
{
  collapsed: boolean;
}
```

## Slots

| Slot      | Description                                                |
|-----------|------------------------------------------------------------|
| `header`  | Header content at the top (logo, avatar, etc.)            |
| `title`   | Optional title text, visible only in expanded mode        |
| (default) | Main navigation content (typically `vds-menu-item`s)      |
| `footer`  | Footer content at the bottom (secondary actions, etc.)    |

## CSS Custom Properties

```css
--vds-sidebar-width-expanded
--vds-sidebar-bg-default
--vds-sidebar-bg-inverse
--vds-sidebar-border-color-default
--vds-sidebar-border-color-inverse
--vds-sidebar-text-color-default
--vds-sidebar-text-color-inverse
--vds-sidebar-padding-x
--vds-sidebar-padding-y
--vds-sidebar-header-height
--vds-sidebar-gap
--vds-sidebar-radius
--vds-sidebar-toggle-size
--vds-sidebar-toggle-radius
--vds-sidebar-toggle-bg-hover
--vds-sidebar-toggle-bg-hover-inverse
--vds-sidebar-font-family
```

## Parts

| Part       | Description                         |
|-----------|-------------------------------------|
| `sidebar` | The main sidebar container          |
| `header`  | The header area at the top          |
| `toggle`  | The toggle button container         |
| `content` | The scrollable navigation content   |
| `footer`  | The footer area at the bottom       |



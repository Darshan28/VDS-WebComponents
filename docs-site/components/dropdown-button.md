# Dropdown Button

The `vds-dropdown-button` component is a customizable dropdown button component with split and regular styles.

## Basic Usage

<ComponentDemo code='<vds-dropdown-button>Action</vds-dropdown-button>' />

## Styles

### Split Style (Default)

The split style displays two separate buttons - a main button and a dropdown button.

<ComponentDemo code='<vds-dropdown-button button-style="split">Action</vds-dropdown-button>' />

### Regular Style

The regular style displays a single button with text and a chevron icon.

<ComponentDemo code='<vds-dropdown-button button-style="regular">Action</vds-dropdown-button>' />

## Variants

<ComponentDemo code='<vds-dropdown-button variant="primary">Primary</vds-dropdown-button>
<vds-dropdown-button variant="secondary">Secondary</vds-dropdown-button>' />

## Types

<ComponentDemo code='<vds-dropdown-button type="filled">Filled</vds-dropdown-button>
<vds-dropdown-button type="outline">Outline</vds-dropdown-button>' />

## Shapes

<ComponentDemo code='<vds-dropdown-button shape="rounded">Rounded</vds-dropdown-button>
<vds-dropdown-button shape="pill">Pill</vds-dropdown-button>
<vds-dropdown-button shape="sharp">Sharp</vds-dropdown-button>' />

## Sizes

<ComponentDemo code='<vds-dropdown-button size="small">Small</vds-dropdown-button>
<vds-dropdown-button size="medium">Medium</vds-dropdown-button>
<vds-dropdown-button size="large">Large</vds-dropdown-button>' />

## With Icon

<ComponentDemo code='<vds-dropdown-button button-style="split">
  <vds-icon slot="prefix-icon" name="plus" aria-hidden="true"></vds-icon>
  New Item
</vds-dropdown-button>' />

## Split Style Examples

<ComponentDemo code='<vds-dropdown-button button-style="split" variant="primary" type="filled">Primary Filled</vds-dropdown-button>
<vds-dropdown-button button-style="split" variant="primary" type="outline">Primary Outline</vds-dropdown-button>
<vds-dropdown-button button-style="split" variant="secondary" type="filled">Secondary Filled</vds-dropdown-button>
<vds-dropdown-button button-style="split" variant="secondary" type="outline">Secondary Outline</vds-dropdown-button>' />

## Regular Style Examples

<ComponentDemo code='<vds-dropdown-button button-style="regular" variant="primary" type="filled">Primary Filled</vds-dropdown-button>
<vds-dropdown-button button-style="regular" variant="primary" type="outline">Primary Outline</vds-dropdown-button>
<vds-dropdown-button button-style="regular" variant="secondary" type="filled">Secondary Filled</vds-dropdown-button>
<vds-dropdown-button button-style="regular" variant="secondary" type="outline">Secondary Outline</vds-dropdown-button>' />

## Disabled State

<ComponentDemo code='<vds-dropdown-button disabled>Disabled</vds-dropdown-button>' />

## With Dropdown Menu

Click the dropdown button to open a menu. The menu appears below the button by default.

<ComponentDemo code='<div style="position: relative; display: inline-block;">
  <vds-dropdown-button id="dropdown-btn-example">Actions</vds-dropdown-button>
  <vds-dropdown-menu id="dropdown-menu-example" style="display: none;">
    <vds-menu-item>
      <vds-icon slot="prefix-icon" name="user" aria-hidden="true"></vds-icon>
      Profile
    </vds-menu-item>
    <vds-menu-item>
      <vds-icon slot="prefix-icon" name="settings" aria-hidden="true"></vds-icon>
      Settings
    </vds-menu-item>
    <vds-menu-item>
      <vds-icon slot="prefix-icon" name="star" aria-hidden="true"></vds-icon>
      Favorites
    </vds-menu-item>
    <hr slot="divider" />
    <vds-menu-item>
      <vds-icon slot="prefix-icon" name="logout" aria-hidden="true"></vds-icon>
      Logout
    </vds-menu-item>
  </vds-dropdown-menu>
</div>' />

### Split Style with Dropdown Menu

<ComponentDemo code='<div style="position: relative; display: inline-block;">
  <vds-dropdown-button id="dropdown-btn-split" button-style="split">
    <vds-icon slot="prefix-icon" name="plus" aria-hidden="true"></vds-icon>
    New Item
  </vds-dropdown-button>
  <vds-dropdown-menu id="dropdown-menu-split" style="display: none;">
    <vds-menu-item>Create Document</vds-menu-item>
    <vds-menu-item>Create Folder</vds-menu-item>
    <vds-menu-item>Import File</vds-menu-item>
  </vds-dropdown-menu>
</div>' />

## Positioning

The dropdown menu can be positioned in 8 different positions relative to the button using the `position` attribute. The default is `bottom-left`.

### Bottom Positions

<ComponentDemo code='<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <div style="position: relative; display: inline-block;">
    <vds-dropdown-button id="dropdown-btn-bl" position="bottom-left">Bottom Left</vds-dropdown-button>
    <vds-dropdown-menu id="dropdown-menu-bl" style="display: none;">
      <vds-menu-item>Option 1</vds-menu-item>
      <vds-menu-item>Option 2</vds-menu-item>
    </vds-dropdown-menu>
  </div>
  <div style="position: relative; display: inline-block;">
    <vds-dropdown-button id="dropdown-btn-br" position="bottom-right">Bottom Right</vds-dropdown-button>
    <vds-dropdown-menu id="dropdown-menu-br" style="display: none;">
      <vds-menu-item>Option 1</vds-menu-item>
      <vds-menu-item>Option 2</vds-menu-item>
    </vds-dropdown-menu>
  </div>
</div>' />

### Top Positions

<ComponentDemo code='<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 100px;">
  <div style="position: relative; display: inline-block;">
    <vds-dropdown-button id="dropdown-btn-tl" position="top-left">Top Left</vds-dropdown-button>
    <vds-dropdown-menu id="dropdown-menu-tl" style="display: none;">
      <vds-menu-item>Option 1</vds-menu-item>
      <vds-menu-item>Option 2</vds-menu-item>
    </vds-dropdown-menu>
  </div>
  <div style="position: relative; display: inline-block;">
    <vds-dropdown-button id="dropdown-btn-tr" position="top-right">Top Right</vds-dropdown-button>
    <vds-dropdown-menu id="dropdown-menu-tr" style="display: none;">
      <vds-menu-item>Option 1</vds-menu-item>
      <vds-menu-item>Option 2</vds-menu-item>
    </vds-dropdown-menu>
  </div>
</div>' />

### Left Positions

<ComponentDemo code='<div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: flex-end;">
  <div style="position: relative; display: inline-block;">
    <vds-dropdown-button id="dropdown-btn-lt" position="left-top">Left Top</vds-dropdown-button>
    <vds-dropdown-menu id="dropdown-menu-lt" style="display: none;">
      <vds-menu-item>Option 1</vds-menu-item>
      <vds-menu-item>Option 2</vds-menu-item>
    </vds-dropdown-menu>
  </div>
  <div style="position: relative; display: inline-block;">
    <vds-dropdown-button id="dropdown-btn-lb" position="left-bottom">Left Bottom</vds-dropdown-button>
    <vds-dropdown-menu id="dropdown-menu-lb" style="display: none;">
      <vds-menu-item>Option 1</vds-menu-item>
      <vds-menu-item>Option 2</vds-menu-item>
    </vds-dropdown-menu>
  </div>
</div>' />

### Right Positions

<ComponentDemo code='<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <div style="position: relative; display: inline-block;">
    <vds-dropdown-button id="dropdown-btn-rt" position="right-top">Right Top</vds-dropdown-button>
    <vds-dropdown-menu id="dropdown-menu-rt" style="display: none;">
      <vds-menu-item>Option 1</vds-menu-item>
      <vds-menu-item>Option 2</vds-menu-item>
    </vds-dropdown-menu>
  </div>
  <div style="position: relative; display: inline-block;">
    <vds-dropdown-button id="dropdown-btn-rb" position="right-bottom">Right Bottom</vds-dropdown-button>
    <vds-dropdown-menu id="dropdown-menu-rb" style="display: none;">
      <vds-menu-item>Option 1</vds-menu-item>
      <vds-menu-item>Option 2</vds-menu-item>
    </vds-dropdown-menu>
  </div>
</div>' />

## CSS Custom Properties

You can customize the dropdown button appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-dropdown-btn-font-family` | `var(--vds-font-family-sans)` | Font family for button text |
| `--vds-dropdown-btn-font-weight` | `var(--vds-font-weight-normal, 400)` | Font weight for button text (varies by size) |
| `--vds-dropdown-btn-font-size` | `var(--vds-font-size-md, 0.75rem)` | Font size for button text (varies by size) |
| `--vds-dropdown-btn-padding-x` | `var(--vds-spacing-md, 1rem)` | Horizontal padding (left and right) |
| `--vds-dropdown-btn-padding-y` | `var(--vds-spacing-sm, 0.5rem)` | Vertical padding (top and bottom) |
| `--vds-dropdown-btn-gap` | `var(--vds-spacing-xs, 0.1875rem)` | Gap between icon and text |
| `--vds-dropdown-btn-min-height` | `28px` (varies by size) | Minimum height of the button |
| `--vds-dropdown-btn-radius` | `var(--vds-radius-lg, 0.5rem)` | Border radius (varies by shape) |
| `--vds-dropdown-btn-accent` | `var(--vds-color-brand, #00b578)` | Primary accent color (varies by variant) |
| `--vds-dropdown-btn-accent-hover` | `var(--vds-color-brand-hover, #009d68)` | Accent color on hover (varies by variant) |
| `--vds-dropdown-btn-accent-active` | `var(--vds-color-brand-active, #007a51)` | Accent color when active (varies by variant) |
| `--vds-dropdown-btn-on-accent` | `var(--vds-color-white, #ffffff)` | Text color on accent background (varies by variant) |
| `--vds-dropdown-btn-border-color` | `var(--vds-color-border-success, var(--vds-color-brand, #00b578))` | Border color (varies by variant) |
| `--vds-dropdown-btn-muted-bg` | `var(--vds-color-green-100, #e6f9f3)` | Muted background color for outline type hover (varies by variant) |
| `--vds-dropdown-btn-muted-bg-strong` | `var(--vds-color-green-200, #b3efd9)` | Strong muted background color for outline type active (varies by variant) |
| `--vds-dropdown-btn-label-color` | `var(--vds-dropdown-btn-on-accent)` | Label text color |
| `--vds-dropdown-btn-disabled-bg` | `var(--vds-color-gray-200, #f8f9fb)` | Background color when disabled |
| `--vds-dropdown-btn-disabled-color` | `var(--vds-color-slate-500, #90a0b9)` | Text color when disabled |
| `--vds-dropdown-btn-disabled-border` | `var(--vds-color-gray-300, #eaeef4)` | Border color when disabled |
| `--vds-dropdown-btn-transition` | `var(--vds-transition-base, 200ms ease-in-out)` | Transition duration and timing |
| `--vds-dropdown-btn-divider-color` | `var(--vds-color-green-200, #b3efd9)` | Divider color between buttons (split style, primary variant only) |
| `--vds-dropdown-btn-icon-size` | `var(--vds-dropdown-btn-font-size)` | Icon size (matches font size) |

### Customization Example

<ComponentDemo code='<vds-dropdown-button style="--vds-dropdown-btn-accent: #4366ff; --vds-dropdown-btn-radius: 0.5rem;">Custom Button</vds-dropdown-button>
<vds-dropdown-button>Default Button</vds-dropdown-button>' />

## Events

The component emits the following events:

- `vds-dropdown-button-click`: Fired when either the main button or dropdown button is clicked. Event detail contains `{ originalEvent: MouseEvent, part: 'main' | 'dropdown' }`.

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `shape` | `'rounded' \| 'sharp' \| 'pill'` | `'rounded'` | Corner radius preset |
| `type` | `'filled' \| 'outline'` | `'filled'` | Surface treatment |
| `button-style` | `'split' \| 'regular'` | `'split'` | Button style - split (two buttons) or regular (single button) |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Color intent |
| `position` | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right' \| 'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom'` | `'bottom-left'` | Position of the dropdown menu relative to the button |
| `disabled` | `boolean` | `false` | Disables the button |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Button label/text content |
| `prefix-icon` | Icon content rendered before the label |

### CSS Parts

| Part | Description |
|------|-------------|
| `container` | The main container element |
| `main-button` | The main button element (split style only) |
| `dropdown-button` | The dropdown button element |
| `divider` | The divider element between buttons (split style, primary variant only) |
| `label` | The label/text content |
| `prefix-icon` | The leading icon slot |
| `chevron-icon` | The chevron dropdown icon |


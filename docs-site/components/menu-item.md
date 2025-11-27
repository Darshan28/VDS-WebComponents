# Menu Item

The `vds-menu-item` component is a flexible menu item component that supports checkboxes (using `vds-checkbox`), avatars, icons, toggle switches, and various states.

## Basic Usage

<ComponentDemo code='<vds-menu-item>Menu item</vds-menu-item>' />

## States

### Normal State

<ComponentDemo code='<vds-menu-item>Menu item</vds-menu-item>' />

### Hover State

The component automatically shows hover state on mouse enter:

<ComponentDemo code='<vds-menu-item>Hover over me</vds-menu-item>' />

### Active/Selected State

When `selected` is true, a checkmark icon appears on the right side of the menu item:

<ComponentDemo code='<vds-menu-item selected>Selected item</vds-menu-item>
<vds-menu-item selected toggle>Selected with toggle</vds-menu-item>' />

### Disabled State

<ComponentDemo code='<vds-menu-item disabled>Disabled item</vds-menu-item>' />

## With Checkbox

The menu item uses the `vds-checkbox` component (small size) when the `checked` property is set:

<ComponentDemo code='<vds-menu-item checked>Checked item</vds-menu-item>
<vds-menu-item>Unchecked item</vds-menu-item>
<vds-menu-item checked disabled>Disabled checked</vds-menu-item>' />

You can customize the checkbox appearance using `vds-checkbox` CSS custom properties. See the [Checkbox component documentation](/components/checkbox) for available customization options.

## With Avatar

<ComponentDemo code='<vds-menu-item>
  <vds-avatar slot="prefix-avatar" variant="text" name="John Doe" size="xs"></vds-avatar>
  Menu item with avatar
</vds-menu-item>' />

## With Icon

<ComponentDemo code='<vds-menu-item>
  <vds-icon slot="prefix-icon" name="user" aria-hidden="true"></vds-icon>
  Menu item with icon
</vds-menu-item>' />

## With Toggle Switch

<ComponentDemo code='<vds-menu-item toggle>Menu item with toggle</vds-menu-item>
<vds-menu-item toggle toggle-checked>Menu item with toggle (on)</vds-menu-item>' />

## Combined Features

<ComponentDemo code='<vds-menu-item checked toggle>
  <vds-avatar slot="prefix-avatar" variant="text" name="Alice" size="xs"></vds-avatar>
  <vds-icon slot="prefix-icon" name="star" aria-hidden="true"></vds-icon>
  Complete menu item
</vds-menu-item>' />

## Selected State with Toggle

The selected checkmark icon appears on the right side, even when a toggle is present:

<ComponentDemo code='<vds-menu-item selected toggle>Selected with toggle</vds-menu-item>
<vds-menu-item selected toggle toggle-checked>Selected with toggle (on)</vds-menu-item>' />

## Selected State with Prefix Icon

You can combine a prefix icon with the selected state. The selected checkmark will appear on the right:

<ComponentDemo code='<vds-menu-item selected>
  <vds-icon slot="prefix-icon" name="star" aria-hidden="true"></vds-icon>
  Selected item with icon
</vds-menu-item>' />

## CSS Custom Properties

You can customize the menu item appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-menu-item-bg` | `var(--vds-color-white, #ffffff)` | Background color |
| `--vds-menu-item-bg-hover` | `var(--vds-color-gray-200, #f8f9fb)` | Background color on hover |
| `--vds-menu-item-bg-active` | `var(--vds-color-gray-200, #f8f9fb)` | Background color when active/selected |
| `--vds-menu-item-padding` | `var(--vds-spacing-sm, 0.5rem)` | Internal padding |
| `--vds-menu-item-gap` | `var(--vds-spacing-sm, 0.5rem)` | Gap between elements |
| `--vds-menu-item-radius` | `var(--vds-radius-md, 0.375rem)` | Border radius |
| `--vds-menu-item-font-family` | `var(--vds-font-family-sans)` | Font family for text |
| `--vds-menu-item-font-weight` | `var(--vds-font-weight-normal, 400)` | Font weight |
| `--vds-menu-item-font-size` | `var(--vds-font-size-md, 0.75rem)` | Font size |
| `--vds-menu-item-text-color` | `var(--vds-color-black, var(--vds-color-text-primary, #070922))` | Text color |
| `--vds-menu-item-text-color-disabled` | `var(--vds-color-text-disabled, #cdced3)` | Text color when disabled |
| `--vds-menu-item-toggle-width` | `22px` | Toggle switch width |
| `--vds-menu-item-toggle-height` | `12px` | Toggle switch height |
| `--vds-menu-item-toggle-bg` | `var(--vds-color-brand, #00b578)` | Toggle switch background when on |
| `--vds-menu-item-toggle-radius` | `var(--vds-radius-full, 9999px)` | Toggle switch border radius |
| `--vds-menu-item-toggle-thumb-size` | `8px` | Toggle switch thumb size |
| `--vds-menu-item-icon-size` | `var(--vds-menu-item-font-size)` | Icon size, matches font size |
| `--vds-menu-item-icon-color` | `var(--vds-color-text-primary, #070922)` | Icon color |
| `--vds-menu-item-icon-color-disabled` | `var(--vds-color-text-disabled, #cdced3)` | Icon color when disabled |
| `--vds-menu-item-icon-color-selected` | `var(--vds-color-brand, #00b578)` | Selected icon color |

### Customization Example

<ComponentDemo code='<vds-menu-item style="--vds-menu-item-bg: #f5f5f5; --vds-menu-item-padding: 1rem; --vds-menu-item-radius: 0.5rem;">Custom styled</vds-menu-item>
<vds-menu-item>Default</vds-menu-item>' />

```css
vds-menu-item {
  --vds-menu-item-bg: #f5f5f5;
  --vds-menu-item-padding: 1rem;
  --vds-menu-item-radius: 0.5rem;
}
```

## Events

The component emits the following events:

- `vds-menu-item-checkbox-change`: Fired when the checkbox is toggled. Event detail contains `{ checked: boolean }`.
- `vds-menu-item-toggle-change`: Fired when the toggle switch is toggled. Event detail contains `{ checked: boolean }`.

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `state` | `'normal' \| 'hover' \| 'active' \| 'disabled'` | `'normal'` | The visual state of the menu item |
| `checked` | `boolean \| undefined` | `undefined` | Whether the checkbox is checked (shows checkbox if set) |
| `disabled` | `boolean` | `false` | Whether the menu item is disabled |
| `toggle` | `boolean` | `false` | Whether to show the toggle switch |
| `toggle-checked` | `boolean` | `false` | Whether the toggle switch is checked |
| `selected` | `boolean` | `false` | Whether the menu item is selected (shows checkmark icon on the right side) |

### Slots

| Slot | Description |
|------|-------------|
| `prefix-checkbox` | Custom checkbox slot (overrides default `vds-checkbox` component) |
| `prefix-avatar` | Avatar slot for user images/initials |
| `prefix-icon` | Leading icon slot |
| (default) | Main text content |
| `suffix-icon` | Trailing icon slot |

**Note:** The default checkbox uses the `vds-checkbox` component with `size="small"`. You can customize the checkbox appearance using `vds-checkbox` CSS custom properties, or provide your own checkbox via the `prefix-checkbox` slot.

### CSS Parts

| Part | Description |
|------|-------------|
| `menu-item` | The menu item container element |
| `prefix` | The prefix content slot container |
| `content` | The main content/text slot container |
| `suffix` | The suffix content slot container |
| `text` | The text content element |

## Examples

### Menu with Multiple Items

<ComponentDemo code='<div style="display: flex; flex-direction: column; gap: 0.25rem; width: 250px;">
  <vds-menu-item checked>Option 1 (checked)</vds-menu-item>
  <vds-menu-item>Option 2</vds-menu-item>
  <vds-menu-item selected>Option 3 (selected - checkmark on right)</vds-menu-item>
  <vds-menu-item disabled>Option 4 (disabled)</vds-menu-item>
</div>' />

### Menu with Toggles

<ComponentDemo code='<div style="display: flex; flex-direction: column; gap: 0.25rem; width: 250px;">
  <vds-menu-item toggle toggle-checked>Notifications</vds-menu-item>
  <vds-menu-item toggle>Email alerts</vds-menu-item>
  <vds-menu-item toggle toggle-checked>SMS alerts</vds-menu-item>
</div>' />

### Menu with Avatars and Icons

<ComponentDemo code='<div style="display: flex; flex-direction: column; gap: 0.25rem; width: 250px;">
  <vds-menu-item>
    <vds-avatar slot="prefix-avatar" variant="text" name="John Doe" size="xs"></vds-avatar>
    John Doe
  </vds-menu-item>
  <vds-menu-item>
    <vds-avatar slot="prefix-avatar" variant="text" name="Jane Smith" size="xs"></vds-avatar>
    Jane Smith
  </vds-menu-item>
  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="settings" aria-hidden="true"></vds-icon>
    Settings
  </vds-menu-item>
</div>' />

### Selected State Examples

The selected checkmark icon always appears on the right side:

<ComponentDemo code='<div style="display: flex; flex-direction: column; gap: 0.25rem; width: 250px;">
  <vds-menu-item selected>Simple selected item</vds-menu-item>
  <vds-menu-item selected>
    <vds-icon slot="prefix-icon" name="user" aria-hidden="true"></vds-icon>
    Selected with prefix icon
  </vds-menu-item>
  <vds-menu-item selected toggle>Selected with toggle</vds-menu-item>
  <vds-menu-item selected checked>Selected with checkbox</vds-menu-item>
</div>' />


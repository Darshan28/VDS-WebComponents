# vds-tab-item

Custom tab item component built with Lit.

## Installation

```bash
pnpm add @vds/tab-item
# or
npm install @vds/tab-item
```

## Usage

```ts
import '@vds/tab-item/vds-tab-item.js';
```

```html
<vds-tab-item active value="profile">
  <vds-icon slot="prefix-icon" name="user"></vds-icon>
  Profile
  <span slot="badge">3</span>
</vds-tab-item>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'filled' \| 'filled-inverse' \| 'rounded'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tab size |
| `active` | `boolean` | `false` | Marks the tab as selected |
| `disabled` | `boolean` | `false` | Disables the tab |
| `closable` | `boolean` | `false` | Shows a close button |
| `badge` | `string` | `''` | Simple badge text (optional) |
| `value` | `string` | `''` | User-defined value emitted with events |
| `close-label` | `string` | `'Close tab'` | Accessible label for the close button |
| `aria-controls` | `string` | `''` | ID of the associated tab panel |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Tab label text |
| `prefix-icon` | Optional icon shown before the label |
| `badge` | Custom badge content |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `vds-tab-item-select` | `{ value?: string, originalEvent: Event }` | Fired when the tab is selected |
| `vds-tab-item-close` | `{ value?: string, originalEvent: Event }` | Fired when the close button is pressed |

## CSS Parts

| Part | Description |
|------|-------------|
| `container` | The clickable container |
| `content` | Flex wrapper for slot content |
| `prefix` | Prefix icon container |
| `label` | Label wrapper |
| `badge` | Badge wrapper |
| `close-button` | Close icon button |
| `indicator` | Active indicator (default variant) |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--vds-tab-font-family` | Font family |
| `--vds-tab-font-size` | Font size |
| `--vds-tab-gap` | Gap between items |
| `--vds-tab-padding-x` | Horizontal padding |
| `--vds-tab-padding-y` | Vertical padding |
| `--vds-tab-radius` | Border radius |
| `--vds-tab-text-color` | Default text color |
| `--vds-tab-text-color-active` | Active text color |
| `--vds-tab-text-color-disabled` | Disabled text color |
| `--vds-tab-bg` | Background color |
| `--vds-tab-bg-hover` | Hover background |
| `--vds-tab-bg-active` | Active background |
| `--vds-tab-indicator-height` | Indicator height |
| `--vds-tab-badge-bg` | Badge background |
| `--vds-tab-badge-color` | Badge text color |
| `--vds-tab-close-color` | Close icon color |
| `--vds-tab-close-color-hover` | Close icon hover color |



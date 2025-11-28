# Tab Item

`vds-tab-item` is a building block for tabbed interfaces. It handles active/hover states, four visual variants, three sizes, badges, icons, and optional close affordances.

## Basic Usage

<ComponentDemo code='<vds-tab-item active value="profile">
  <vds-icon slot="prefix-icon" name="user" aria-hidden="true"></vds-icon>
  Profile
</vds-tab-item>' />

## Variants

<ComponentDemo code='<vds-tab-item variant="default" active>Default</vds-tab-item>
<vds-tab-item variant="filled">Filled</vds-tab-item>
<vds-tab-item variant="rounded">Rounded</vds-tab-item>
<vds-tab-item variant="filled-inverse" active>Filled Inverse</vds-tab-item>' />

## Sizes

<ComponentDemo code='<vds-tab-item size="sm">Small</vds-tab-item>
<vds-tab-item size="md" active>Medium</vds-tab-item>
<vds-tab-item size="lg">Large</vds-tab-item>' />

## Badges & Icons

<ComponentDemo code='<vds-tab-item active badge="3">
  <vds-icon slot="prefix-icon" name="grid" aria-hidden="true"></vds-icon>
  Tasks
</vds-tab-item>
<vds-tab-item>
  <vds-icon slot="prefix-icon" name="message" aria-hidden="true"></vds-icon>
  Messages
  <span slot="badge">12</span>
</vds-tab-item>' />

## Closable Tabs

<ComponentDemo code='<vds-tab-item closable active value="design">
  <vds-icon slot="prefix-icon" name="edit" aria-hidden="true"></vds-icon>
  Design
</vds-tab-item>
<vds-tab-item closable>
  Notes
</vds-tab-item>' />

## Filled Inverse on Dark Background

<ComponentDemo code='<div style="background: #0f1a36; padding: 1rem; border-radius: 12px; display: flex; gap: 0.5rem;">
  <vds-tab-item variant="filled-inverse">Docs</vds-tab-item>
  <vds-tab-item variant="filled-inverse" active closable>API</vds-tab-item>
  <vds-tab-item variant="filled-inverse">
    <span slot="badge">New</span>
    Changelog
  </vds-tab-item>
</div>' />

## Events

- `vds-tab-item-select`: fired when the tab is activated (click, Enter, or Space). Detail includes `{ value?: string, originalEvent }`.
- `vds-tab-item-close`: fired when the close button is pressed. Detail includes `{ value?: string, originalEvent }`.

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Tab label |
| `prefix-icon` | Icon placed before the label |
| `badge` | Custom badge content |

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'filled' \| 'filled-inverse' \| 'rounded'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `active` | `boolean` | `false` | Marks the tab as selected |
| `disabled` | `boolean` | `false` | Disables interactions |
| `closable` | `boolean` | `false` | Shows a close affordance |
| `badge` | `string` | `''` | Simple badge text |
| `value` | `string` | `''` | Custom payload emitted with events |
| `close-label` | `string` | `'Close tab'` | Accessible label for the close icon |
| `aria-controls` | `string` | `''` | Associates the tab with a panel |

## CSS Parts

| Part | Description |
|------|-------------|
| `container` | Clickable wrapper |
| `content` | Flex wrapper for prefix/label/badge |
| `prefix` | Prefix icon container |
| `label` | Label wrapper |
| `badge` | Badge wrapper |
| `close-button` | Close affordance |
| `indicator` | Underline indicator (default variant) |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--vds-tab-font-family` | Font family |
| `--vds-tab-font-weight` | Font weight |
| `--vds-tab-font-size` | Font size |
| `--vds-tab-gap` | Gap between items |
| `--vds-tab-padding-x` | Horizontal padding |
| `--vds-tab-padding-y` | Vertical padding |
| `--vds-tab-radius` | Border radius |
| `--vds-tab-text-color` | Default text color |
| `--vds-tab-text-color-active` | Active text color |
| `--vds-tab-text-color-disabled` | Disabled color |
| `--vds-tab-bg` | Background color |
| `--vds-tab-bg-hover` | Hover background |
| `--vds-tab-bg-active` | Active background |
| `--vds-tab-indicator-height` | Indicator thickness |
| `--vds-tab-badge-bg` | Badge background |
| `--vds-tab-badge-color` | Badge color |
| `--vds-tab-close-color` | Close icon color |
| `--vds-tab-close-color-hover` | Close icon hover color |



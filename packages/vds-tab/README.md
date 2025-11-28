# VDS Tab Component

A container component for managing multiple `vds-tab-item` components. Provides tab navigation with support for variants, sizes, and overflow handling.

## Installation

```bash
npm install @vds/tab
```

## Usage

```html
<vds-tab variant="default" size="md" value="tab1">
  <vds-tab-item value="tab1">Tab 1</vds-tab-item>
  <vds-tab-item value="tab2">Tab 2</vds-tab-item>
  <vds-tab-item value="tab3">Tab 3</vds-tab-item>
</vds-tab>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'default' \| 'filled' \| 'filled-inverse' \| 'rounded'` | `'default'` | The visual variant of the tabs |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size of the tabs |
| `value` | `string` | `''` | The value of the currently active tab |
| `overflow-text` | `string` | `''` | Custom text for the overflow button (defaults to "{count} more") |
| `overflow-count` | `number` | `0` | Number of tabs in overflow (shows overflow button when > 0) |

## Properties

All attributes are also available as properties.

## Slots

| Slot | Description |
|------|-------------|
| (default) | The `vds-tab-item` components |

## CSS Parts

| Part | Description |
|------|-------------|
| `container` | The main container element |
| `tabs` | The tabs container |
| `overflow-button` | The overflow button |

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--vds-tab-border-color` | `var(--vds-color-border-default, #eaeef4)` | Border color for default variant |
| `--vds-tab-gap` | `var(--vds-spacing-none, 0px)` | Gap between tabs |
| `--vds-tab-overflow-button-size` | `var(--vds-font-size-sm, 0.875rem)` | Font size for overflow button |
| `--vds-tab-overflow-button-color` | `var(--vds-color-text-primary, #070922)` | Text color for overflow button |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `vds-tab-change` | `{ value?: string, originalEvent: Event }` | Fired when the active tab changes |
| `vds-tab-overflow` | - | Fired when the overflow button is clicked |

## Examples

### Basic Usage

```html
<vds-tab>
  <vds-tab-item value="home">Home</vds-tab-item>
  <vds-tab-item value="profile">Profile</vds-tab-item>
  <vds-tab-item value="settings">Settings</vds-tab-item>
</vds-tab>
```

### Controlled Active Tab

```html
<vds-tab value="profile">
  <vds-tab-item value="home">Home</vds-tab-item>
  <vds-tab-item value="profile">Profile</vds-tab-item>
  <vds-tab-item value="settings">Settings</vds-tab-item>
</vds-tab>
```

### With Overflow

```html
<vds-tab overflow-count="3" overflow-text="Show more">
  <vds-tab-item value="tab1">Tab 1</vds-tab-item>
  <vds-tab-item value="tab2">Tab 2</vds-tab-item>
  <vds-tab-item value="tab3">Tab 3</vds-tab-item>
</vds-tab>
```

### Variants

```html
<!-- Default variant (with bottom border) -->
<vds-tab variant="default">
  <vds-tab-item value="tab1">Tab 1</vds-tab-item>
  <vds-tab-item value="tab2">Tab 2</vds-tab-item>
</vds-tab>

<!-- Filled variant -->
<vds-tab variant="filled">
  <vds-tab-item value="tab1">Tab 1</vds-tab-item>
  <vds-tab-item value="tab2">Tab 2</vds-tab-item>
</vds-tab>

<!-- Filled Inverse variant -->
<vds-tab variant="filled-inverse">
  <vds-tab-item value="tab1">Tab 1</vds-tab-item>
  <vds-tab-item value="tab2">Tab 2</vds-tab-item>
</vds-tab>

<!-- Rounded variant -->
<vds-tab variant="rounded">
  <vds-tab-item value="tab1">Tab 1</vds-tab-item>
  <vds-tab-item value="tab2">Tab 2</vds-tab-item>
</vds-tab>
```

### Sizes

```html
<!-- Small -->
<vds-tab size="sm">
  <vds-tab-item value="tab1">Tab 1</vds-tab-item>
  <vds-tab-item value="tab2">Tab 2</vds-tab-item>
</vds-tab>

<!-- Medium (default) -->
<vds-tab size="md">
  <vds-tab-item value="tab1">Tab 1</vds-tab-item>
  <vds-tab-item value="tab2">Tab 2</vds-tab-item>
</vds-tab>

<!-- Large -->
<vds-tab size="lg">
  <vds-tab-item value="tab1">Tab 1</vds-tab-item>
  <vds-tab-item value="tab2">Tab 2</vds-tab-item>
</vds-tab>
```

### With Icons

```html
<vds-tab>
  <vds-tab-item value="home">
    <vds-icon name="home" slot="prefix-icon"></vds-icon>
    Home
  </vds-tab-item>
  <vds-tab-item value="profile">
    <vds-icon name="user" slot="prefix-icon"></vds-icon>
    Profile
  </vds-tab-item>
</vds-tab>
```

### With Badges

```html
<vds-tab>
  <vds-tab-item value="inbox" badge="5">Inbox</vds-tab-item>
  <vds-tab-item value="sent">Sent</vds-tab-item>
</vds-tab>
```

### Closable Tabs

```html
<vds-tab>
  <vds-tab-item value="tab1" closable>Tab 1</vds-tab-item>
  <vds-tab-item value="tab2" closable>Tab 2</vds-tab-item>
</vds-tab>
```

## Event Handling

```javascript
const tab = document.querySelector('vds-tab');

tab.addEventListener('vds-tab-change', (event) => {
  console.log('Active tab:', event.detail.value);
});

tab.addEventListener('vds-tab-overflow', () => {
  console.log('Overflow button clicked');
});
```


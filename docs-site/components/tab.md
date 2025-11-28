# Tab

`vds-tab` is a container component for managing multiple `vds-tab-item` components. It provides tab navigation with support for variants, sizes, and overflow handling.

## Basic Usage

<ComponentDemo code='<vds-tab>
  <vds-tab-item value="home" active>Home</vds-tab-item>
  <vds-tab-item value="profile">Profile</vds-tab-item>
  <vds-tab-item value="settings">Settings</vds-tab-item>
</vds-tab>' />

## Variants

### Default

<ComponentDemo code='<vds-tab variant="default">
  <vds-tab-item value="tab1" active>One View</vds-tab-item>
  <vds-tab-item value="tab2">Details</vds-tab-item>
  <vds-tab-item value="tab3">Updates</vds-tab-item>
</vds-tab>' />

### Filled

<ComponentDemo code='<vds-tab variant="filled">
  <vds-tab-item value="tab1" active>Home</vds-tab-item>
  <vds-tab-item value="tab2">Profile</vds-tab-item>
  <vds-tab-item value="tab3">Settings</vds-tab-item>
</vds-tab>' />

### Filled Inverse

<ComponentDemo code='<div style="background: #0f1a36; padding: 1rem; border-radius: 12px;">
  <vds-tab variant="filled-inverse">
    <vds-tab-item value="tab1" active>Ask AI</vds-tab-item>
    <vds-tab-item value="tab2">Contacts</vds-tab-item>
    <vds-tab-item value="tab3">Files</vds-tab-item>
  </vds-tab>
</div>' />

### Rounded

<ComponentDemo code='<vds-tab variant="rounded">
  <vds-tab-item value="tab1" active>Kanban</vds-tab-item>
  <vds-tab-item value="tab2">Grid</vds-tab-item>
  <vds-tab-item value="tab3">Table</vds-tab-item>
</vds-tab>' />

## Sizes

<ComponentDemo code='<vds-tab size="sm">
  <vds-tab-item value="tab1" active>Small</vds-tab-item>
  <vds-tab-item value="tab2">Tab</vds-tab-item>
</vds-tab>

<vds-tab size="md" style="margin-top: 1rem;">
  <vds-tab-item value="tab1" active>Medium</vds-tab-item>
  <vds-tab-item value="tab2">Tab</vds-tab-item>
</vds-tab>

<vds-tab size="lg" style="margin-top: 1rem;">
  <vds-tab-item value="tab1" active>Large</vds-tab-item>
  <vds-tab-item value="tab2">Tab</vds-tab-item>
</vds-tab>' />

## With Icons

<ComponentDemo code='<vds-tab>
  <vds-tab-item value="home" active>
    <vds-icon slot="prefix-icon" name="home" aria-hidden="true"></vds-icon>
    Home
  </vds-tab-item>
  <vds-tab-item value="profile">
    <vds-icon slot="prefix-icon" name="user" aria-hidden="true"></vds-icon>
    Profile
  </vds-tab-item>
  <vds-tab-item value="settings">
    <vds-icon slot="prefix-icon" name="settings" aria-hidden="true"></vds-icon>
    Settings
  </vds-tab-item>
</vds-tab>' />

## With Badges

<ComponentDemo code='<vds-tab>
  <vds-tab-item value="inbox" active badge="5">Inbox</vds-tab-item>
  <vds-tab-item value="sent" badge="12">Sent</vds-tab-item>
  <vds-tab-item value="drafts">Drafts</vds-tab-item>
</vds-tab>' />

## Closable Tabs

<ComponentDemo code='<vds-tab>
  <vds-tab-item value="tab1" active closable>Design</vds-tab-item>
  <vds-tab-item value="tab2" closable>Notes</vds-tab-item>
  <vds-tab-item value="tab3" closable>Tasks</vds-tab-item>
</vds-tab>' />

## Overflow Handling

The `vds-tab` component supports both manual and automatic overflow handling.

### Manual Overflow

When you set the `overflow-count` attribute, the component will show the first N tabs and hide the rest. Clicking the overflow button will display the hidden tabs in a dropdown menu. The overflow button shows the count of hidden tabs in "X more" format.

<ComponentDemo code='<vds-tab overflow-count="3">
  <vds-tab-item value="tab1" active>One View</vds-tab-item>
  <vds-tab-item value="tab2">Details</vds-tab-item>
  <vds-tab-item value="tab3">Updates</vds-tab-item>
  <vds-tab-item value="tab4">Touchpoints</vds-tab-item>
  <vds-tab-item value="tab5">Tasks</vds-tab-item>
  <vds-tab-item value="tab6">Events</vds-tab-item>
</vds-tab>' />

### Automatic Overflow

When `overflow-count` is not set (or set to 0), the component automatically calculates which tabs fit in the available space and hides the rest. The overflow button shows the count of hidden tabs in "X more" format (e.g., "3 more", "5 more").

<ComponentDemo code='<div style="width: 400px;">
  <vds-tab>
    <vds-tab-item value="tab1" active>One View</vds-tab-item>
    <vds-tab-item value="tab2">Details</vds-tab-item>
    <vds-tab-item value="tab3">Updates</vds-tab-item>
    <vds-tab-item value="tab4">Touchpoints</vds-tab-item>
    <vds-tab-item value="tab5">Tasks</vds-tab-item>
    <vds-tab-item value="tab6">Events</vds-tab-item>
    <vds-tab-item value="tab7">Insights</vds-tab-item>
    <vds-tab-item value="tab8">Analytics</vds-tab-item>
  </vds-tab>
</div>' />

### Custom Overflow Text

You can customize the overflow button text using the `overflow-text` attribute:

<ComponentDemo code='<vds-tab overflow-count="2" overflow-text="More">
  <vds-tab-item value="tab1" active>Home</vds-tab-item>
  <vds-tab-item value="tab2">Profile</vds-tab-item>
  <vds-tab-item value="tab3">Settings</vds-tab-item>
  <vds-tab-item value="tab4">Help</vds-tab-item>
</vds-tab>' />

### Custom Overflow Icon

You can customize the overflow button icon using the `overflow-icon` slot. When a custom icon is provided, the button will show only the icon (no count or "more" text), making it perfect for icon-only overflow buttons:

<ComponentDemo code='<vds-tab variant="rounded" overflow-count="2">
  <vds-tab-item value="tab1" active>Home</vds-tab-item>
  <vds-tab-item value="tab2">Profile</vds-tab-item>
  <vds-tab-item value="tab3">Settings</vds-tab-item>
  <vds-tab-item value="tab4">Help</vds-tab-item>
  <vds-icon slot="overflow-icon" name="ellipsis-vertical"></vds-icon>
</vds-tab>' />

<ComponentDemo code='<vds-tab overflow-count="2">
  <vds-tab-item value="tab1" active>Home</vds-tab-item>
  <vds-tab-item value="tab2">Profile</vds-tab-item>
  <vds-tab-item value="tab3">Settings</vds-tab-item>
  <vds-tab-item value="tab4">Help</vds-tab-item>
  <vds-icon slot="overflow-icon" name="gear"></vds-icon>
</vds-tab>' />

**Note:** When using a custom icon, the overflow button becomes icon-only and does not display the count or "more" text. This is useful when you want a cleaner, more minimal overflow indicator.

## Controlled Active Tab

<ComponentDemo code='<vds-tab value="profile">
  <vds-tab-item value="home">Home</vds-tab-item>
  <vds-tab-item value="profile">Profile</vds-tab-item>
  <vds-tab-item value="settings">Settings</vds-tab-item>
</vds-tab>' />

## API Reference

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'default' \| 'filled' \| 'filled-inverse' \| 'rounded'` | `'default'` | The visual variant of the tabs |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size of the tabs |
| `value` | `string` | `''` | The value of the currently active tab |
| `overflow-count` | `number` | `0` | Number of tabs in overflow. When set to a value > 0, uses manual overflow. When 0 or not set, automatically calculates overflow based on available width |
| `overflow-text` | `string` | `''` | Custom text for the overflow button. If not provided, shows the count of hidden tabs in "X more" format |

### Properties

All attributes are also available as properties.

### Slots

| Slot | Description |
|------|-------------|
| (default) | The `vds-tab-item` components |
| `overflow-icon` | Icon for the overflow button. When provided, the button becomes icon-only (no text). Defaults to `chevron-down` if not provided |

### CSS Parts

| Part | Description |
|------|-------------|
| `container` | The main container element |
| `tabs` | The tabs container |
| `overflow-button` | The overflow button |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--vds-tab-border-color` | `var(--vds-color-border-default, #eaeef4)` | Border color for default variant |
| `--vds-tab-gap` | `var(--vds-spacing-none, 0px)` | Gap between tabs |
| `--vds-tab-overflow-button-size` | `var(--vds-font-size-sm, 0.875rem)` | Font size for overflow button |
| `--vds-tab-overflow-button-color` | `var(--vds-color-text-primary, #070922)` | Text color for overflow button |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `vds-tab-change` | `{ value?: string, originalEvent: Event }` | Fired when the active tab changes (from both visible tabs and overflow menu) |

## Event Handling

```javascript
const tab = document.querySelector('vds-tab');

tab.addEventListener('vds-tab-change', (event) => {
  console.log('Active tab:', event.detail.value);
  // Update your application state
});
```

## Overflow Behavior

### Manual Overflow

When `overflow-count` is set to a value greater than 0:
- The component shows the first N tabs (where N = total tabs - overflow-count)
- The remaining tabs are hidden
- Clicking the overflow button opens a menu showing the hidden tabs
- The overflow button displays the count of hidden tabs in "X more" format (e.g., "3 more", "5 more")
- You can customize the text using the `overflow-text` attribute

### Automatic Overflow

When `overflow-count` is 0 or not set:
- The component automatically measures tab widths and available space
- Tabs that don't fit are automatically hidden
- The overflow button shows the count of hidden tabs in "X more" format (e.g., "3 more", "5 more")
- The component recalculates when the container is resized (using ResizeObserver)
- Clicking the overflow button opens a menu showing the hidden tabs

### Overflow Menu

The overflow menu:
- Uses `vds-menu` component to display hidden tabs
- Shows tab icons and text content
- Highlights the active tab if it's in the overflow
- Closes when a tab is selected or when clicking outside
- Automatically positions below the overflow button


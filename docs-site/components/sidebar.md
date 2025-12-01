---
title: Sidebar
description: Collapsible navigation sidebar with icon-only (collapsed) and icon+label (expanded) modes.
---

## Overview

`vds-sidebar` is a vertical navigation shell that can collapse to show only icons, or expand to show icons with labels. It is typically used alongside `vds-menu-item` for the actual navigation links.

## Basic usage

<ComponentDemo code='<vds-sidebar>
  <div slot="header">
    <vds-avatar variant="icon" size="xl">
      <vds-icon name="chart-line" slot="icon"></vds-icon>
    </vds-avatar>
  </div>

  <!-- Application selector in title area -->
  <vds-select slot="title" placeholder="Select application">
    <select>
      <option value="app-1">Sales Dashboard</option>
      <option value="app-2">Operations Console</option>
      <option value="app-3">Admin Panel</option>
      <option value="app-4">Customer Portal</option>
      <option value="app-5">Billing & Invoices</option>
    </select>
  </vds-select>

  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="house"></vds-icon>
    Home
  </vds-menu-item>

  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="chart-column"></vds-icon>
    Analytics
  </vds-menu-item>

  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="gear"></vds-icon>
    Settings
  </vds-menu-item>

  <div slot="footer">
    <vds-menu-item>
      <vds-icon slot="prefix-icon" name="arrow-right-from-bracket"></vds-icon>
      Logout
    </vds-menu-item>
  </div>
</vds-sidebar>' />

The built-in chevron button in the header toggles between collapsed and expanded modes.

## Collapsed vs expanded

<ComponentDemo code='<!-- Expanded (default) with application select -->
<vds-sidebar>
  <div slot="header">
    <vds-avatar variant="icon" size="xl">
      <vds-icon name="chart-line" slot="icon"></vds-icon>
    </vds-avatar>
  </div>

  <vds-select slot="title" placeholder="Select application">
    <select>
      <option value="app-1">Sales Dashboard</option>
      <option value="app-2">Operations Console</option>
      <option value="app-3">Admin Panel</option>
      <option value="app-4">Customer Portal</option>
      <option value="app-5">Billing & Invoices</option>
    </select>
  </vds-select>

  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="house"></vds-icon>
    Home
  </vds-menu-item>
  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="user"></vds-icon>
    Profile
  </vds-menu-item>
</vds-sidebar>

<!-- Collapsed (icons only) - select appears on hover -->
<vds-sidebar collapsed>
  <div slot="header">
    <vds-avatar variant="icon" size="xl">
      <vds-icon name="chart-line" slot="icon"></vds-icon>
    </vds-avatar>
  </div>

  <vds-select slot="title" placeholder="Select application">
    <select>
      <option value="app-1">Sales Dashboard</option>
      <option value="app-2">Operations Console</option>
      <option value="app-3">Admin Panel</option>
      <option value="app-4">Customer Portal</option>
      <option value="app-5">Billing & Invoices</option>
    </select>
  </vds-select>

  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="house"></vds-icon>
    Home
  </vds-menu-item>
  <vds-menu-item>
    <vds-icon slot="prefix-icon" name="user"></vds-icon>
    Profile
  </vds-menu-item>
</vds-sidebar>' />

In **collapsed** mode:

- `vds-menu-item` labels and suffix content are visually hidden.
- Icons remain centered, keeping the sidebar compact.

## Listening to collapsed state

```html
<vds-sidebar id="app-sidebar">
  <!-- content omitted -->
</vds-sidebar>

<script type="module">
  const sidebar = document.querySelector('#app-sidebar');

  sidebar.addEventListener('vds-sidebar-toggle', (event) => {
    console.log('Sidebar collapsed:', event.detail.collapsed);
  });
</script>
```

## Props

| Attribute           | Type                       | Default     | Description                                        |
|---------------------|----------------------------|-------------|----------------------------------------------------|
| `variant`           | `'default' \| 'inverse'`   | `default`   | Color variant for light/dark surfaces             |
| `collapsed`         | `boolean`                  | `false`     | When true, shows only icons and hides labels      |
| `toggle-aria-label` | `string`                   | `null`      | Custom aria-label for the toggle button           |

## Slots

| Slot      | Description                                           |
|-----------|-------------------------------------------------------|
| `header`  | Header area at the top (logo, avatar, etc.)          |
| `title`   | Optional title text next to the header logo          |
| default   | Main navigation content (usually `vds-menu-item`s)   |
| `footer`  | Optional footer area at the bottom                   |

## Events

| Event               | Detail                    | Description                          |
|---------------------|---------------------------|--------------------------------------|
| `vds-sidebar-toggle` | `{ collapsed: boolean }` | Fired when collapsed state changes   |



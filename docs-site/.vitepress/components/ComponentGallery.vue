<template>
  <div class="component-gallery">
    <div class="gallery-grid">
      <ComponentCard
        v-for="component in components"
        :key="component.name"
        :name="component.name"
        :title="component.title"
        :description="component.description"
        :link="component.link"
        :preview="component.preview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ComponentCard from './ComponentCard.vue';

const components = ref([
  {
    name: 'button',
    title: 'Button',
    description: 'Interactive button component with multiple variants and sizes',
    link: '/components/button',
    preview: '<vds-button>Click me</vds-button>'
  },
  {
    name: 'badge',
    title: 'Badge',
    description: 'Badge component for labels, tags, and status indicators',
    link: '/components/badge',
    preview: '<vds-badge>New</vds-badge>'
  },
  {
    name: 'avatar',
    title: 'Avatar',
    description: 'Avatar component for displaying user images, initials, or icons',
    link: '/components/avatar',
    preview: '<vds-avatar variant="text" name="JD"></vds-avatar>'
  },
  {
    name: 'checkbox',
    title: 'Checkbox',
    description: 'Checkbox input component with multiple sizes and states',
    link: '/components/checkbox',
    preview: '<vds-checkbox label="Checkbox"></vds-checkbox>'
  },
  {
    name: 'date',
    title: 'Date',
    description: 'Date and time picker component using Flatpickr',
    link: '/components/date',
    preview: '<vds-date label="Date" type="date" placeholder="Select a date"></vds-date>'
  },
  {
    name: 'icon',
    title: 'Icon',
    description: 'Icon font component with sizing, color, and accessibility controls',
    link: '/components/icon',
    preview: '<vds-icon name="check" label="Success"></vds-icon>'
  },
  {
    name: 'input',
    title: 'Input',
    description: 'Form input component with validation and helper text',
    link: '/components/input',
    preview: '<vds-input label="Email" type="email" placeholder="Enter your email"></vds-input>'
  },
  {
    name: 'tab',
    title: 'Tab',
    description: 'Container component for managing multiple tab items with variants and overflow handling',
    link: '/components/tab',
    preview: '<vds-tab><vds-tab-item active>Tab 1</vds-tab-item><vds-tab-item>Tab 2</vds-tab-item></vds-tab>'
  },
  {
    name: 'tab-item',
    title: 'Tab Item',
    description: 'Composable tab trigger with icons, badges, and close support',
    link: '/components/tab-item',
    preview: '<vds-tab-item active>Tab</vds-tab-item>'
  },
  {
    name: 'modal',
    title: 'Modal',
    description: 'Modal dialog with focus trapping and keyboard navigation',
    link: '/components/modal',
    preview: '<vds-button>Open Modal</vds-button><vds-modal title="Modal Title"><p>Modal content</p></vds-modal>'
  },
  {
    name: 'menu-item',
    title: 'Menu Item',
    description: 'Flexible menu item component with checkboxes, toggles, and various states',
    link: '/components/menu-item',
    preview: '<vds-menu-item>Menu item</vds-menu-item>'
  },
  {
    name: 'dropdown-menu',
    title: 'Dropdown Menu',
    description: 'Container component for displaying lists of menu items with search and scrollable content',
    link: '/components/dropdown-menu',
    preview: '<vds-dropdown-menu><vds-menu-item>Item 1</vds-menu-item><vds-menu-item>Item 2</vds-menu-item></vds-dropdown-menu>'
  },
  {
    name: 'dropdown-button',
    title: 'Dropdown Button',
    description: 'Dropdown button component with split and regular styles',
    link: '/components/dropdown-button',
    preview: '<vds-dropdown-button>Action</vds-dropdown-button>'
  },
  {
    name: 'select',
    title: 'Select',
    description: 'Customizable select component with single/multiple selection and search powered by Choices.js',
    link: '/components/select',
    preview: '<vds-select placeholder="Select..."><select><option value="1">Option 1</option><option value="2">Option 2</option></select></vds-select>'
  },
  {
    name: 'navbar',
    title: 'Navbar',
    description: 'Sticky navigation bar component with support for default and inverse variants',
    link: '/components/navbar',
    preview: '<vds-navbar variant="default" show-nav-heading><span slot="nav-heading">Application</span></vds-navbar>'
  }
]);
</script>

<style scoped>
.component-gallery {
  margin: 2rem 0;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>


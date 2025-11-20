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
    name: 'input',
    title: 'Input',
    description: 'Form input component with validation and helper text',
    link: '/components/input',
    preview: '<vds-input label="Email" type="email" placeholder="Enter your email"></vds-input>'
  },
  {
    name: 'modal',
    title: 'Modal',
    description: 'Modal dialog with focus trapping and keyboard navigation',
    link: '/components/modal',
    preview: '<vds-button>Open Modal</vds-button><vds-modal title="Modal Title"><p>Modal content</p></vds-modal>'
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


<template>
  <a :href="link" class="component-card">
    <div class="card-thumbnail">
      <div class="thumbnail-container" ref="thumbnailContainer"></div>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <div class="card-footer">
        <span class="card-link">View Documentation →</span>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps<{
  name: string;
  title: string;
  description: string;
  link: string;
  preview: string;
}>();

const thumbnailContainer = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();
  if (thumbnailContainer.value) {
    renderPreview();
  }
});

function renderPreview() {
  if (!thumbnailContainer.value) return;
  
  // Clear and set preview HTML
  thumbnailContainer.value.innerHTML = props.preview;
  
  // Force upgrade of custom elements
  const components = thumbnailContainer.value.querySelectorAll('vds-button, vds-input, vds-modal, vds-menu-item, vds-dropdown-button, vds-dropdown-menu, vds-avatar, vds-badge, vds-checkbox, vds-icon');
  components.forEach((el) => {
    if (el.constructor === HTMLElement) {
      const tagName = el.tagName.toLowerCase();
      if (customElements.get(tagName)) {
        const newEl = document.createElement(tagName);
        Array.from(el.attributes).forEach(attr => {
          newEl.setAttribute(attr.name, attr.value);
        });
        newEl.innerHTML = el.innerHTML;
        el.parentNode?.replaceChild(newEl, el);
      }
    }
  });
  
  // Ensure modals are closed in gallery previews and don't block interaction
  const modals = thumbnailContainer.value.querySelectorAll('vds-modal');
  modals.forEach((modal) => {
    modal.removeAttribute('open');
    if ('open' in modal) {
      (modal as any).open = false;
    }
    // Wait for shadow DOM to render, then hide backdrop
    setTimeout(() => {
      const backdrop = modal.shadowRoot?.querySelector('.backdrop');
      if (backdrop) {
        (backdrop as HTMLElement).style.display = 'none';
        (backdrop as HTMLElement).style.pointerEvents = 'none';
      }
      // Also hide the host element
      (modal as HTMLElement).style.display = 'none';
    }, 50);
  });
}
</script>

<style scoped>
.component-card {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  height: 100%;
}

.component-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-thumbnail {
  background: var(--vp-c-bg);
  padding: 2rem;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--vp-c-divider);
}

.thumbnail-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-description {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  flex: 1;
}

.card-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.card-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: color 0.2s;
}

.component-card:hover .card-link {
  color: var(--vp-c-brand-dark);
}
</style>


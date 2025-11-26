<template>
  <div class="icon-gallery">
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search icons..."
        class="search-input"
      />
      <div class="icon-count">{{ filteredIcons.length }} icons</div>
    </div>
    <div class="icons-grid">
      <div
        v-for="icon in filteredIcons"
        :key="icon"
        :class="['icon-item', { copied: copiedIcon === icon }]"
        @click="copyIconName(icon)"
      >
        <div class="icon-preview">
          <vds-icon :name="icon" size="lg" :label="icon"></vds-icon>
        </div>
        <div class="icon-name" :title="icon">{{ icon }}</div>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="showToast" class="copy-toast">
        Copied <code>{{ copiedIcon }}</code> to clipboard
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import iconList from './icon-list.json';

const searchQuery = ref('');
const allIcons = ref<string[]>(iconList as string[]);
const copiedIcon = ref<string>('');
const showToast = ref(false);

const filteredIcons = computed(() => {
  if (!searchQuery.value) {
    return allIcons.value;
  }
  const query = searchQuery.value.toLowerCase();
  return allIcons.value.filter(icon => 
    icon.toLowerCase().includes(query)
  );
});

function copyIconName(iconName: string) {
  navigator.clipboard.writeText(iconName).then(() => {
    copiedIcon.value = iconName;
    showToast.value = true;
    
    // Remove copied class after animation
    setTimeout(() => {
      copiedIcon.value = '';
    }, 500);
    
    // Hide toast after 2 seconds
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}
</script>

<style scoped>
.icon-gallery {
  margin: 2rem 0;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.icon-count {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  white-space: nowrap;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s;
}

.icon-item:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.icon-item.copied {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.copy-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.copy-toast code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.icon-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.icon-name {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-align: center;
  word-break: break-word;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .icons-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.75rem;
  }
  
  .icon-item {
    padding: 0.75rem;
  }
  
  .icon-preview {
    width: 36px;
    height: 36px;
  }
  
  .icon-name {
    font-size: 0.65rem;
  }
}
</style>


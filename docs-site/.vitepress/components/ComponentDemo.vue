<template>
  <div class="component-demo">
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab', { active: activeTab === tab }]"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tab-content">
      <div v-show="activeTab === 'Preview'" class="preview">
        <div class="preview-container" ref="previewContainer"></div>
      </div>
      <div v-show="activeTab === 'Code'" class="code">
        <pre><code v-html="escapedCode"></code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick, onBeforeUnmount } from 'vue';

const props = defineProps<{
  code: string;
  lang?: string;
}>();

const activeTab = ref('Preview');
const tabs = ['Preview', 'Code'];
const previewContainer = ref<HTMLElement | null>(null);

const escapedCode = computed(() => {
  return props.code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
});

onMounted(() => {
  console.log('[ComponentDemo] onMounted: Component mounted');
  // Wait a bit for VitePress to finish rendering
  setTimeout(() => {
    if (previewContainer.value) {
      console.log('[ComponentDemo] onMounted: Calling renderPreview');
      renderPreview();
    } else {
      console.warn('[ComponentDemo] onMounted: previewContainer is null');
    }
  }, 100);
});

watch(() => props.code, () => {
  if (activeTab.value === 'Preview' && previewContainer.value) {
    renderPreview();
  }
});

watch(activeTab, async (newTab) => {
  if (newTab === 'Preview') {
    // Wait for Vue to update the DOM
    await nextTick();
    // Render preview when switching to Preview tab
    renderPreview();
  }
});

function renderPreview() {
  if (!previewContainer.value) {
    console.log('[ComponentDemo] renderPreview: No preview container');
    return;
  }
  
  console.log('[ComponentDemo] renderPreview: Starting render');
  
  // Clear previous content completely
  previewContainer.value.innerHTML = '';
  
  // Use requestAnimationFrame to ensure DOM is cleared before adding new content
  requestAnimationFrame(() => {
    if (!previewContainer.value) return;
    
    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = props.code;
    
    // Move all nodes to the preview container
    while (temp.firstChild) {
      const node = temp.firstChild;
      temp.removeChild(node);
      previewContainer.value.appendChild(node);
    }
    
    // Force upgrade of any custom elements
    // This ensures web components are properly initialized
    const components = previewContainer.value.querySelectorAll('vds-button, vds-input, vds-modal');
    components.forEach((el) => {
      // Check if element is already defined and upgrade it
      if (el.constructor === HTMLElement) {
        // Element hasn't been upgraded yet, try to upgrade it
        const tagName = el.tagName.toLowerCase();
        if (customElements.get(tagName)) {
          // Clone and replace to force upgrade
          const newEl = document.createElement(tagName);
          Array.from(el.attributes).forEach(attr => {
            newEl.setAttribute(attr.name, attr.value);
          });
          newEl.innerHTML = el.innerHTML;
          el.parentNode?.replaceChild(newEl, el);
        }
      }
    });
    
    // Ensure modals are closed by default and don't block interaction
    const modals = previewContainer.value.querySelectorAll('vds-modal');
    modals.forEach((modal) => {
      // Remove open attribute if present
      modal.removeAttribute('open');
      // Ensure modal is closed
      if ('open' in modal) {
        (modal as any).open = false;
      }
      // Clear any inline styles that might interfere
      (modal as HTMLElement).style.display = '';
      (modal as HTMLElement).style.visibility = '';
      (modal as HTMLElement).style.pointerEvents = '';
      
      // Prevent backdrop from blocking clicks when closed
      // Use a small delay to ensure shadow DOM is rendered
      setTimeout(() => {
        const backdrop = modal.shadowRoot?.querySelector('.backdrop');
        if (backdrop) {
          // Only hide if modal is not open
          if (!modal.hasAttribute('open') && !(modal as any).open) {
            (backdrop as HTMLElement).style.display = 'none';
            (backdrop as HTMLElement).style.pointerEvents = 'none';
            (backdrop as HTMLElement).style.visibility = 'hidden';
          } else {
            // Clear any inline styles when modal is open
            (backdrop as HTMLElement).style.display = '';
            (backdrop as HTMLElement).style.pointerEvents = '';
            (backdrop as HTMLElement).style.visibility = '';
          }
        }
        // Don't set pointer-events: none on the modal itself, as it needs to be clickable
        // The backdrop will handle blocking when closed
      }, 100);
    });
    
    // Set up event listeners for modal interactions
    // Use both direct attachment and event delegation for maximum reliability
    const attachButtonListeners = () => {
      if (!previewContainer.value) return;
      
      // Remove any script tags
      const scripts = previewContainer.value.querySelectorAll('script');
      scripts.forEach((script) => {
        script.parentNode?.removeChild(script);
      });
      
      // Find all buttons that open modals and attach listeners directly
      const openButtons = previewContainer.value.querySelectorAll('vds-button[id^="open-modal"]');
      console.log('[ComponentDemo] Found open buttons:', openButtons.length);
      
      openButtons.forEach((button) => {
        const buttonId = button.getAttribute('id');
        if (!buttonId) return;
        
        // Remove existing handler if any
        const existingHandler = (button as any)._openModalHandler;
        if (existingHandler) {
          button.removeEventListener('vds-button-click', existingHandler, true);
          button.removeEventListener('click', existingHandler, true);
        }
        
        // Extract modal ID
        const modalId = buttonId.replace('open-', '');
        const modal = previewContainer.value.querySelector(`#${modalId}`) as any;
        
        console.log('[ComponentDemo] Button:', buttonId, 'Modal:', modalId, 'Found:', !!modal);
        
        if (modal && typeof modal.showModal === 'function') {
          const handler = (e: Event) => {
            console.log('[ComponentDemo] Button clicked:', buttonId, 'Event type:', e.type);
            e.preventDefault();
            e.stopPropagation();
            // Double-check modal still exists and is accessible
            const currentModal = previewContainer.value?.querySelector(`#${modalId}`) as any;
            console.log('[ComponentDemo] Opening modal:', modalId, 'Found:', !!currentModal);
            if (currentModal && typeof currentModal.showModal === 'function') {
              currentModal.showModal();
              console.log('[ComponentDemo] Modal opened successfully');
            } else {
              console.error('[ComponentDemo] Modal not found or showModal not available');
            }
          };
          (button as any)._openModalHandler = handler;
          // Use capture phase to catch events early
          button.addEventListener('vds-button-click', handler, true);
          button.addEventListener('click', handler, true);
          console.log('[ComponentDemo] Listeners attached to button:', buttonId);
        } else {
          console.warn('[ComponentDemo] Modal not found or showModal not available for:', modalId);
        }
      });
      
      // Find all buttons that close modals and attach listeners directly
      const closeButtons = previewContainer.value.querySelectorAll('vds-button[id^="close-modal"]');
      closeButtons.forEach((button) => {
        const buttonId = button.getAttribute('id');
        if (!buttonId) return;
        
        // Remove existing handler if any
        const existingHandler = (button as any)._closeModalHandler;
        if (existingHandler) {
          button.removeEventListener('vds-button-click', existingHandler);
          button.removeEventListener('click', existingHandler);
        }
        
        // Find the modal to close
        let modal: any = null;
        let current: Element | null = button;
        
        // Walk up the DOM tree
        while (current && current !== previewContainer.value) {
          if (current.tagName === 'VDS-MODAL') {
            modal = current;
            break;
          }
          current = current.parentElement;
        }
        
        // If not found, try pattern matching
        if (!modal) {
          const match = buttonId.match(/close-modal-(\d+)/);
          if (match) {
            const modalNumber = match[1];
            modal = previewContainer.value.querySelector(`#modal-${modalNumber}`);
          } else {
            modal = previewContainer.value.querySelector('vds-modal');
          }
        }
        
        if (modal && typeof modal.close === 'function') {
          const handler = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            modal.close();
          };
          (button as any)._closeModalHandler = handler;
          button.addEventListener('vds-button-click', handler);
          button.addEventListener('click', handler);
        }
      });
    };
    
    // Set up listeners multiple times with different timing strategies
    const setupListeners = () => {
      if (!previewContainer.value) {
        console.log('[ComponentDemo] No preview container');
        return;
      }
      
      // Check if buttons actually exist before trying to attach
      const hasButtons = previewContainer.value.querySelectorAll('vds-button').length > 0;
      const hasModals = previewContainer.value.querySelectorAll('vds-modal').length > 0;
      
      console.log('[ComponentDemo] Setting up listeners. Buttons:', hasButtons, 'Modals:', hasModals);
      
      if (hasButtons || hasModals) {
        attachButtonListeners();
      } else {
        console.log('[ComponentDemo] No buttons or modals found yet');
      }
    };
    
    // Immediate setup
    setTimeout(setupListeners, 50);
    
    // After custom elements are defined
    Promise.all([
      customElements.whenDefined('vds-button').catch(() => Promise.resolve()),
      customElements.whenDefined('vds-modal').catch(() => Promise.resolve())
    ]).then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupListeners();
        });
      });
    });
    
    // Additional fallback with longer delay - important for VitePress markdown rendering
    // VitePress may render markdown asynchronously, so we need multiple attempts
    setTimeout(setupListeners, 100);
    setTimeout(setupListeners, 300);
    setTimeout(setupListeners, 600);
    setTimeout(setupListeners, 1000);
    setTimeout(setupListeners, 2000);
    
    // Also try when DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(setupListeners, 500);
      });
    } else {
      setTimeout(setupListeners, 500);
    }
    
    // Retry mechanism - keep trying until buttons are found and listeners attached
    let retryCount = 0;
    const maxRetries = 10;
    const retryInterval = setInterval(() => {
      retryCount++;
      if (retryCount > maxRetries) {
        clearInterval(retryInterval);
        return;
      }
      
      const buttons = previewContainer.value?.querySelectorAll('vds-button[id^="open-modal"]');
      const modals = previewContainer.value?.querySelectorAll('vds-modal');
      
      if (buttons && buttons.length > 0 && modals && modals.length > 0) {
        // Check if listeners are actually attached
        let hasListeners = true;
        buttons.forEach((button) => {
          if (!(button as any)._openModalHandler) {
            hasListeners = false;
          }
        });
        
        if (!hasListeners) {
          setupListeners();
        } else {
          // All listeners attached, stop retrying
          clearInterval(retryInterval);
        }
      } else {
        // Elements not ready yet, keep trying
        setupListeners();
      }
    }, 200);
    
    // Store interval for cleanup
    (previewContainer.value as any)._modalRetryInterval = retryInterval;
    
    // Use MutationObserver to catch dynamically added buttons
    // Disconnect any existing observer first
    if ((previewContainer.value as any)?._modalObserver) {
      (previewContainer.value as any)._modalObserver.disconnect();
    }
    
    if (previewContainer.value && window.MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        // Only trigger if actual nodes were added (not attribute changes on modals)
        const hasAddedNodes = mutations.some(mutation => {
          // Check if any added nodes are new elements (not just attribute changes)
          for (const node of Array.from(mutation.addedNodes)) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Don't trigger if it's just an attribute change on an existing modal
              const el = node as HTMLElement;
              if (el.tagName === 'VDS-MODAL' && el.hasAttribute('open')) {
                // Modal is being opened, don't reset it
                continue;
              }
              return true;
            }
          }
          return false;
        });
        
        if (hasAddedNodes) {
          // Debounce to avoid too many calls
          clearTimeout((previewContainer.value as any)?._modalObserverTimeout);
          (previewContainer.value as any)._modalObserverTimeout = setTimeout(() => {
            // Only set up listeners, don't reset modals that are open
            attachButtonListeners();
          }, 100);
        }
      });
      
      observer.observe(previewContainer.value, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
      });
      
      // Store observer for cleanup
      (previewContainer.value as any)._modalObserver = observer;
    }
    
    // Set up a global document-level event listener (only once for the entire page)
    // This catches events even if they don't bubble to the container
    if (!(window as any).__vdsModalDocumentHandler) {
      (window as any).__vdsModalDocumentHandler = (e: Event) => {
        // Find all preview containers on the page (there might be multiple ComponentDemo instances)
        const allContainers = document.querySelectorAll('.preview-container');
        let targetContainer: HTMLElement | null = null;
        
        const target = e.target as HTMLElement;
        
        // Find which container contains the target
        for (const container of allContainers) {
          if (container.contains(target)) {
            targetContainer = container as HTMLElement;
            break;
          }
        }
        
        if (!targetContainer) return;
        
        // Check if it's a vds-button-click event from a button that opens a modal
        if (e.type === 'vds-button-click') {
          const button = target as HTMLElement;
          if (button && button.tagName === 'VDS-BUTTON') {
            const buttonId = button.getAttribute('id');
            if (buttonId && buttonId.startsWith('open-modal')) {
              const modalId = buttonId.replace('open-', '');
              const modal = targetContainer.querySelector(`#${modalId}`) as any;
              console.log('[ComponentDemo] Global document handler: Button clicked:', buttonId, 'Modal found:', !!modal);
              if (modal && typeof modal.showModal === 'function') {
                e.preventDefault();
                e.stopPropagation();
                modal.showModal();
                console.log('[ComponentDemo] Global document handler: Modal opened');
                return;
              }
            }
          }
        }
        
        // Also handle regular click events - check if click is on or inside a vds-button
        if (e.type === 'click') {
          // Check if target is a vds-button or inside one
          let button: HTMLElement | null = null;
          
          if (target.tagName === 'VDS-BUTTON') {
            button = target;
          } else {
            // Walk up the tree to find vds-button
            let current: HTMLElement | null = target;
            while (current && current !== targetContainer) {
              if (current.tagName === 'VDS-BUTTON') {
                button = current;
                break;
              }
              // Check if we're inside a shadow root
              if (current.shadowRoot) {
                const shadowButton = current.shadowRoot.querySelector('vds-button');
                if (shadowButton) {
                  button = shadowButton as HTMLElement;
                  break;
                }
              }
              current = current.parentElement;
            }
            
            // Also try closest as fallback
            if (!button) {
              button = target.closest('vds-button') as HTMLElement;
            }
          }
          
          if (button) {
            const buttonId = button.getAttribute('id');
            if (buttonId && buttonId.startsWith('open-modal')) {
              const modalId = buttonId.replace('open-', '');
              const modal = targetContainer.querySelector(`#${modalId}`) as any;
              console.log('[ComponentDemo] Global document click handler: Button clicked:', buttonId, 'Modal found:', !!modal);
              if (modal && typeof modal.showModal === 'function') {
                e.preventDefault();
                e.stopPropagation();
                
                // Clear any inline styles that might be blocking the modal
                (modal as HTMLElement).style.display = '';
                (modal as HTMLElement).style.visibility = '';
                (modal as HTMLElement).style.pointerEvents = '';
                
                modal.showModal();
                console.log('[ComponentDemo] Global document click handler: Modal opened, open attribute:', modal.hasAttribute('open'), 'open property:', (modal as any).open);
                
                // Force a re-render by triggering an update
                requestAnimationFrame(() => {
                  // Check if backdrop is visible
                  const backdrop = modal.shadowRoot?.querySelector('.backdrop') as HTMLElement;
                  if (backdrop) {
                    console.log('[ComponentDemo] Backdrop display:', backdrop.style.display, 'computed:', window.getComputedStyle(backdrop).display);
                    // Clear any inline styles on backdrop
                    backdrop.style.display = '';
                    backdrop.style.visibility = '';
                    backdrop.style.pointerEvents = '';
                  }
                  
                  // Force Lit to update
                  if ((modal as any).requestUpdate) {
                    (modal as any).requestUpdate();
                  }
                });
              }
            }
          }
        }
      };
      
      // Attach global listeners once
      document.addEventListener('vds-button-click', (window as any).__vdsModalDocumentHandler, true);
      document.addEventListener('click', (window as any).__vdsModalDocumentHandler, true);
      console.log('[ComponentDemo] Global document-level listeners attached');
    }
  });
}

// Clean up event listeners on unmount
onBeforeUnmount(() => {
  if (previewContainer.value) {
    // Clear retry interval
    const retryInterval = (previewContainer.value as any)._modalRetryInterval;
    if (retryInterval) {
      clearInterval(retryInterval);
    }
    
    // Clear observer timeout
    const observerTimeout = (previewContainer.value as any)._modalObserverTimeout;
    if (observerTimeout) {
      clearTimeout(observerTimeout);
    }
    
    // Note: We don't remove the global document handler on unmount
    // because it's shared across all ComponentDemo instances
    
    // Disconnect MutationObserver
    const observer = (previewContainer.value as any)._modalObserver;
    if (observer && observer.disconnect) {
      observer.disconnect();
    }
    
    // Remove listeners from all buttons
    const buttons = previewContainer.value.querySelectorAll('vds-button');
    buttons.forEach((button) => {
      const openHandler = (button as any)._openModalHandler;
      const closeHandler = (button as any)._closeModalHandler;
      
      if (openHandler) {
        button.removeEventListener('vds-button-click', openHandler, true);
        button.removeEventListener('click', openHandler, true);
      }
      if (closeHandler) {
        button.removeEventListener('vds-button-click', closeHandler, true);
        button.removeEventListener('click', closeHandler, true);
      }
    });
  }
});
</script>

<style scoped>
.component-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;
}

.tabs {
  display: flex;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.tab:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.tab.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
}

.tab-content {
  background: var(--vp-c-bg);
}

.preview {
  padding: 2rem;
  min-height: 100px;
  display: block;
}

.preview[style*="display: none"] {
  display: none !important;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.code {
  margin: 0;
  display: block;
}

.code[style*="display: none"] {
  display: none !important;
}

.code pre {
  margin: 0;
  padding: 1.5rem;
  background: var(--vp-code-block-bg);
  overflow-x: auto;
}

.code code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}
</style>


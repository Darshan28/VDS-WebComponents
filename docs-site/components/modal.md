# Modal

The `vds-modal` component is a customizable, accessible modal dialog with focus trapping.

## Basic Usage

<ComponentDemo code='<vds-button id="open-modal-1">Open Modal</vds-button>
<vds-modal id="modal-1" title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <div slot="footer">
    <vds-button variant="secondary" id="close-modal-1-cancel">Cancel</vds-button>
    <vds-button variant="primary" id="close-modal-1-confirm">Confirm</vds-button>
  </div>
</vds-modal>' />

## With Footer

<ComponentDemo code='<vds-button id="open-modal-2">Delete Item</vds-button>
<vds-modal id="modal-2" title="Delete Item">
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  <div slot="footer">
    <vds-button variant="secondary" id="close-modal-2-cancel">Cancel</vds-button>
    <vds-button variant="danger" id="close-modal-2-delete">Delete</vds-button>
  </div>
</vds-modal>' />

## Sizes

### Small

<ComponentDemo code='<vds-button id="open-modal-sm">Open Small Modal</vds-button>
<vds-modal id="modal-sm" size="sm" title="Small Modal">
  <p>This is a small modal.</p>
  <div slot="footer">
    <vds-button variant="primary" id="close-modal-sm-btn">Close</vds-button>
  </div>
</vds-modal>' />

### Medium (Default)

<ComponentDemo code='<vds-button id="open-modal-md">Open Medium Modal</vds-button>
<vds-modal id="modal-md" size="md" title="Medium Modal">
  <p>This is a medium modal (default size).</p>
  <div slot="footer">
    <vds-button variant="primary" id="close-modal-md-btn">Close</vds-button>
  </div>
</vds-modal>' />

### Large

<ComponentDemo code='<vds-button id="open-modal-lg">Open Large Modal</vds-button>
<vds-modal id="modal-lg" size="lg" title="Large Modal">
  <p>This is a large modal with more content.</p>
  <div slot="footer">
    <vds-button variant="primary" id="close-modal-lg-btn">Close</vds-button>
  </div>
</vds-modal>' />

### Extra Large

<ComponentDemo code='<vds-button id="open-modal-xl">Open Extra Large Modal</vds-button>
<vds-modal id="modal-xl" size="xl" title="Extra Large Modal">
  <p>This is an extra large modal for extensive content.</p>
  <div slot="footer">
    <vds-button variant="primary" id="close-modal-xl-btn">Close</vds-button>
  </div>
</vds-modal>' />

## Without Close Button

<ComponentDemo code='<vds-button id="open-modal-no-close">Open Modal</vds-button>
<vds-modal id="modal-no-close" title="Processing" closable="false">
  <p>Please wait while we process your request...</p>
</vds-modal>' />

## Programmatic Control

```javascript
const modal = document.querySelector('vds-modal');

// Open
modal.showModal();
// or
modal.open = true;

// Close
modal.close();
// or
modal.open = false;

// Listen to events
modal.addEventListener('vds-modal-close', (e) => {
  console.log('Modal closed:', e.detail.reason);
});
```

## API Reference

See the [full API documentation](https://github.com/your-org/vds-web-components/tree/main/packages/vds-modal#readme).

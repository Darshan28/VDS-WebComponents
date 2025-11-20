# vds-modal

VDS Modal Web Component - A customizable, accessible modal dialog component with focus trapping.

## Installation

```bash
npm install @vds/modal
```

## Usage

### HTML

```html
<script type="module" src="@vds/modal"></script>

<vds-modal open title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <div slot="footer">
    <vds-button>Cancel</vds-button>
    <vds-button variant="primary">Confirm</vds-button>
  </div>
</vds-modal>
```

### JavaScript/TypeScript

```typescript
import '@vds/modal';
// or
import { VDSModal } from '@vds/modal';

const modal = document.querySelector('vds-modal');
modal.showModal();
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls modal visibility |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal size |
| `title` | `string` | `''` | Modal title |
| `closable` | `boolean` | `true` | Show close button |
| `close-on-backdrop-click` | `boolean` | `true` | Close when backdrop is clicked |
| `close-on-escape` | `boolean` | `true` | Close when Escape key is pressed |
| `aria-label` | `string` | - | Accessible label (used when no title) |

## Properties

All attributes are available as properties and are reactive.

## Methods

- `showModal()`: Opens the modal
- `close(reason?)`: Closes the modal with optional reason

## Events

### `vds-modal-open`

Fired when the modal opens.

### `vds-modal-close`

Fired when the modal closes.

**Event Detail:**
```typescript
{
  reason: 'backdrop' | 'escape' | 'close-button' | 'programmatic';
}
```

## Slots

- **Default slot**: Modal body content
- **`footer` slot**: Footer content (buttons, actions, etc.)

## CSS Custom Properties

```css
--vds-modal-z-index
--vds-modal-backdrop-z-index
--vds-modal-bg
--vds-modal-backdrop-bg
--vds-modal-border-radius
--vds-modal-shadow
--vds-modal-max-width
--vds-modal-max-width-sm
--vds-modal-max-width-lg
--vds-modal-max-width-xl
--vds-modal-padding
--vds-modal-transition
```

## Parts

- `backdrop`: The backdrop element
- `dialog`: The dialog container
- `header`: The header section
- `body`: The body/content section
- `footer`: The footer section
- `close-button`: The close button
- `title`: The title element

## Examples

### Basic Modal

```html
<vds-modal open title="Hello">
  <p>This is a simple modal.</p>
</vds-modal>
```

### Modal with Footer

```html
<vds-modal open title="Delete Item">
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  <div slot="footer">
    <vds-button variant="secondary">Cancel</vds-button>
    <vds-button variant="danger">Delete</vds-button>
  </div>
</vds-modal>
```

### Different Sizes

```html
<vds-modal open size="sm" title="Small Modal">Small content</vds-modal>
<vds-modal open size="md" title="Medium Modal">Medium content</vds-modal>
<vds-modal open size="lg" title="Large Modal">Large content</vds-modal>
<vds-modal open size="xl" title="Extra Large Modal">XL content</vds-modal>
```

### Programmatic Control

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

### Non-closable Modal

```html
<vds-modal 
  open 
  title="Processing" 
  closable="false"
  close-on-backdrop-click="false"
  close-on-escape="false"
>
  <p>Please wait while we process your request...</p>
</vds-modal>
```

## Accessibility

- Proper ARIA roles (role="dialog", aria-modal="true")
- Focus trapping within modal
- Focus restoration on close
- Keyboard navigation (Escape to close, Tab trapping)
- Screen reader support
- Body scroll lock when open

## Focus Management

The modal automatically:
- Traps focus within the modal when open
- Focuses the first focusable element on open
- Restores focus to the previously focused element on close
- Prevents body scrolling when open


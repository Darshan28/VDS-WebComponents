# VDS Select Component

A web component for creating customizable select inputs using Choices.js.

## Installation

```bash
npm install @vds/select choices.js
```

## CSS Import

You need to import Choices.js CSS in your application:

```javascript
import 'choices.js/public/assets/styles/choices.min.css';
```

Or via CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css">
```

## Usage

### Basic Example

```html
<vds-select
  label="Choose an option"
  placeholder="Select..."
>
</vds-select>

<script type="module">
  import '@vds/select';
  
  const select = document.querySelector('vds-select');
  select.setOptions([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]);
</script>
```

### Multiple Select

```html
<vds-select
  multiple
  label="Choose multiple options"
  remove-item-button
>
</vds-select>
```

### With Options via HTML

```html
<vds-select
  label="Country"
  placeholder="Select a country"
>
  <select>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </select>
</vds-select>
```

### With Groups

```html
<vds-select label="City">
  <select>
    <optgroup label="North America">
      <option value="ny">New York</option>
      <option value="la">Los Angeles</option>
    </optgroup>
    <optgroup label="Europe">
      <option value="lon">London</option>
      <option value="par">Paris</option>
    </optgroup>
  </select>
</vds-select>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | Label text displayed above the select |
| `placeholder` | `string` | `''` | Placeholder text for the select |
| `value` | `string \| string[]` | `''` | Current selected value(s) |
| `multiple` | `boolean` | `false` | Enable multiple selection |
| `disabled` | `boolean` | `false` | Disable the select |
| `readonly` | `boolean` | `false` | Make the select read-only |
| `state` | `'normal' \| 'read-only' \| 'disabled' \| 'error' \| 'active'` | `'normal'` | Visual state of the select |
| `helper-text` | `string` | `''` | Helper text displayed below the select |
| `error-message` | `string` | `''` | Error message displayed when state is 'error' |
| `search-enabled` | `boolean` | `true` | Enable search functionality |
| `remove-item-button` | `boolean` | `false` | Show remove buttons for selected items (multiple mode) |
| `unique-values-only` | `boolean` | `false` | Only allow unique values (multiple mode) |
| `no-results-text` | `string` | `'No results found'` | Text shown when no search results |
| `no-choices-text` | `string` | `'No choices to choose from'` | Text shown when no options available |
| `name` | `string` | `''` | Name attribute for form submission |
| `id` | `string` | `''` | ID attribute for the select |

## Methods

### `setOptions(options: SelectOption[])`

Set the options programmatically.

```typescript
select.setOptions([
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2', disabled: true },
  { value: '3', label: 'Option 3', selected: true }
]);
```

### `getValue(): string | string[]`

Get the current selected value(s).

```typescript
const value = select.getValue();
```

### `clearValue(): void`

Clear the current selection.

```typescript
select.clearValue();
```

## Events

### `vds-select-change`

Fired when the selection changes.

```typescript
select.addEventListener('vds-select-change', (e) => {
  const { value, selectedOptions } = e.detail;
  console.log('Selected:', value);
});
```

Event detail:
- `value: string | string[]` - The selected value(s)
- `selectedOptions: SelectOption[]` - Array of selected option objects
- `originalEvent: Event` - The original change event

### `vds-select-add-item`

Fired when an item is added (multiple mode only).

```typescript
select.addEventListener('vds-select-add-item', (e) => {
  console.log('Added:', e.detail.value);
});
```

### `vds-select-remove-item`

Fired when an item is removed (multiple mode only).

```typescript
select.addEventListener('vds-select-remove-item', (e) => {
  console.log('Removed:', e.detail.value);
});
```

## CSS Custom Properties

The component uses CSS custom properties that can be customized:

```css
vds-select {
  --vds-select-font-size: 1rem;
  --vds-select-padding-x: 12px;
  --vds-select-padding-y: 6px;
  --vds-select-border-color: #eaeef4;
  --vds-select-active-border: #00b578;
  --vds-select-error-border: #fb3145;
}
```

## CSS Parts

The component exposes several CSS parts for styling:

- `wrapper` - The wrapper container
- `label` - The label element
- `info-icon` - The info icon slot
- `select` - The select element container
- `helper-text` - The helper text container

## Accessibility

The component includes proper ARIA attributes and keyboard navigation support through Choices.js. Ensure you provide:

- A descriptive `label` or `aria-label`
- `helper-text` or `aria-describedby` for additional context
- Proper error messages when using `error` state

## Browser Support

This component uses Choices.js, which supports modern browsers including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT


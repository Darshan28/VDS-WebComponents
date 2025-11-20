# vds-input

VDS Input Web Component - A customizable, accessible input component.

## Installation

```bash
npm install @vds/input
```

## Usage

### HTML

```html
<script type="module" src="@vds/input"></script>

<vds-input label="Email" type="email"></vds-input>
```

### JavaScript/TypeScript

```typescript
import '@vds/input';
// or
import { VDSInput } from '@vds/input';
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | `InputType` | `'text'` | Input type (text, email, password, etc.) |
| `value` | `string` | `''` | Input value |
| `placeholder` | `string` | `''` | Placeholder text |
| `label` | `string` | `''` | Label text |
| `name` | `string` | `''` | Input name attribute |
| `id` | `string` | `''` | Input ID (auto-generated if not provided) |
| `disabled` | `boolean` | `false` | Disables the input |
| `required` | `boolean` | `false` | Marks input as required |
| `readonly` | `boolean` | `false` | Makes input readonly |
| `error-message` | `string` | `''` | Error message to display |
| `helper-text` | `string` | `''` | Helper text to display |
| `aria-label` | `string` | - | Accessible label |
| `aria-describedby` | `string` | - | ARIA described by |

## Properties

All attributes are available as properties and are reactive.

## Methods

- `checkValidity()`: Returns true if the input is valid
- `reportValidity()`: Returns true if valid, shows validation message if invalid
- `validity`: Returns the ValidityState object
- `validationMessage`: Returns the validation message

## Events

### `vds-input-change`

Fired when the input value changes and loses focus.

**Event Detail:**
```typescript
{
  value: string;
  originalEvent: Event;
}
```

### `vds-input-input`

Fired on every input value change.

**Event Detail:**
```typescript
{
  value: string;
  originalEvent: Event;
}
```

## CSS Custom Properties

```css
--vds-input-padding-x
--vds-input-padding-y
--vds-input-font-size
--vds-input-line-height
--vds-input-border-radius
--vds-input-border-width
--vds-input-border-color
--vds-input-border-color-focus
--vds-input-border-color-error
--vds-input-bg
--vds-input-color
--vds-input-color-placeholder
--vds-input-transition
```

## Parts

- `input`: The input element
- `label`: The label element
- `wrapper`: The wrapper container
- `error`: The error message container
- `helper`: The helper text container

## Examples

### Basic Usage

```html
<vds-input label="Name" placeholder="Enter your name"></vds-input>
```

### With Validation

```html
<vds-input
  label="Email"
  type="email"
  required
  error-message="Please enter a valid email"
></vds-input>
```

### With Helper Text

```html
<vds-input
  label="Password"
  type="password"
  helper-text="Must be at least 8 characters"
></vds-input>
```

### Disabled

```html
<vds-input label="Disabled Input" disabled value="Cannot edit"></vds-input>
```

### Event Handling

```javascript
const input = document.querySelector('vds-input');
input.addEventListener('vds-input-change', (e) => {
  console.log('Value changed:', e.detail.value);
});

input.addEventListener('vds-input-input', (e) => {
  console.log('Value:', e.detail.value);
});
```

## Accessibility

- Proper ARIA attributes (aria-invalid, aria-required, aria-describedby)
- Label association
- Keyboard navigation
- Screen reader support
- Focus management


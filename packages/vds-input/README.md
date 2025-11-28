# vds-input

VDS Input Web Component - A comprehensive, customizable form input component that supports multiple input types, states, and configurations.

## Installation

```bash
npm install @vds/input
```

## Usage

### HTML

```html
<script type="module" src="@vds/input"></script>

<vds-input label="Email" type="text" placeholder="Enter your email"></vds-input>
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
| `type` | `'text' \| 'textarea' \| 'relationship' \| 'phone' \| 'currency' \| 'email' \| 'password'` | `'text'` | Input type |
| `state` | `'normal' \| 'read-only' \| 'disabled' \| 'error' \| 'active'` | `'normal'` | Input state |
| `value` | `string` | `''` | Input value |
| `placeholder` | `string` | `''` | Placeholder text |
| `label` | `string` | `''` | Label text |
| `helper-text` | `string` | `''` | Helper text displayed below input |
| `name` | `string` | `''` | Input name attribute |
| `id` | `string` | `''` | Input id attribute (auto-generated if not provided) |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readonly` | `boolean` | `false` | Whether the input is read-only |
| `prefix-dropdown-text` | `string` | `''` | Text for prefix dropdown button (phone/currency types) |
| `error-message` | `string` | `''` | Custom error message to display when validation fails |
| `validate-on-blur` | `boolean` | `true` | Whether to validate email on blur (email type only) |
| `aria-label` | `string` | `''` | Accessible label |
| `aria-describedby` | `string` | `''` | ID of element that describes the input |

## Properties

All attributes are available as properties and are reactive. The component automatically syncs `disabled` and `readonly` properties with the `state` property.

## Slots

| Slot | Description |
|------|-------------|
| `info-icon` | Icon displayed next to the label (typically an info icon) |
| `suffix-icon` | Icon displayed at the end of the input (e.g., eye icon for password visibility) |

## CSS Parts

| Part | Description |
|------|-------------|
| `wrapper` | The wrapper container |
| `label` | The label element (contains the label text and info icon slot) |
| `info-icon` | The info icon slot |
| `input-container` | The outer input container (for active state border ring) |
| `prefix-dropdown` | The prefix dropdown button element (for phone/currency, uses `vds-dropdown-button` component) |
| `input-wrapper` | The inner input wrapper |
| `input` | The input/textarea element |
| `suffix-icon` | The suffix icon slot |
| `nav-button-prev` | The previous navigation button (for relationship) |
| `nav-button-next` | The next navigation button (for relationship) |
| `helper-text` | The helper text container |

## CSS Custom Properties

You can customize the input appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-input-font-family` | `var(--vds-font-family-sans)` | Font family for input text |
| `--vds-input-font-weight` | `var(--vds-font-weight-normal, 400)` | Font weight for input text |
| `--vds-input-font-size` | `var(--vds-font-size-md, 12px)` | Font size for input text |
| `--vds-input-label-font-size` | `var(--vds-font-size-sm, 10.5px)` | Font size for label |
| `--vds-input-helper-font-size` | `var(--vds-font-size-xs, 9px)` | Font size for helper text |
| `--vds-input-padding-x` | `var(--vds-spacing-md, 12px)` | Horizontal padding |
| `--vds-input-padding-y` | `var(--vds-spacing-sm, 6px)` | Vertical padding |
| `--vds-input-gap` | `var(--vds-spacing-xs, 3px)` | Gap between elements |
| `--vds-input-height` | `28px` | Height of text input |
| `--vds-input-textarea-height` | `60px` | Height of textarea |
| `--vds-input-radius` | `var(--vds-radius-lg, 6px)` | Border radius |
| `--vds-input-icon-size` | `13.5px` | Size of suffix icon |
| `--vds-input-info-icon-size` | `10.5px` | Size of info icon |
| `--vds-input-nav-button-size` | `28px` | Size of navigation buttons |

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

Fired on every input value change (as the user types).

**Event Detail:**
```typescript
{
  value: string;
  originalEvent: Event;
}
```

### `vds-input-nav`

Fired when navigation buttons are clicked (relationship type only).

**Event Detail:**
```typescript
{
  direction: 'prev' | 'next';
}
```

## Examples

### Basic Usage

```html
<vds-input label="Name" placeholder="Enter your name"></vds-input>
```

### Textarea

```html
<vds-input label="Message" type="textarea" placeholder="Enter your message"></vds-input>
```

### Phone Input

```html
<vds-input 
  label="Phone number" 
  type="phone" 
  prefix-dropdown-text="+91" 
  placeholder="E.g. +1 216 4856 564"
></vds-input>
```

### Currency Input

```html
<vds-input 
  label="Currency" 
  type="currency" 
  prefix-dropdown-text="$ Dollar" 
  placeholder="Enter amount"
></vds-input>
```

### Email Input

```html
<vds-input 
  label="Email address" 
  type="email" 
  placeholder="name@company.com" 
  helper-text="We'll never share your email"
></vds-input>
```

### Password Input

```html
<vds-input 
  label="Password" 
  type="password" 
  placeholder="Enter password"
  helper-text="Use 8 or more characters"
>
</vds-input>
```

`type="password"` automatically shows a toggle button to reveal or hide the value. You can still provide your own suffix icon via the `suffix-icon` slot if you need additional affordances.

### Relationship Input

```html
<vds-input 
  label="Date" 
  type="relationship" 
  placeholder="dd/mm/yyyy"
></vds-input>
```

### Email Input with Validation

`type="email"` includes automatic email format validation. Validation occurs on blur by default (can be disabled with `validate-on-blur="false"`). Invalid emails will show an error state with a default or custom error message.

```html
<vds-input 
  label="Email address" 
  type="email" 
  placeholder="name@company.com"
  helper-text="We'll never share your email"
></vds-input>

<!-- With custom error message -->
<vds-input 
  label="Email address" 
  type="email" 
  error-message="Please provide a valid email"
></vds-input>
```

You can also programmatically validate using the `validate()` method:

```javascript
const input = document.querySelector('vds-input[type="email"]');
const isValid = input.validate(); // returns true/false
```

### With Info Icon and Helper Text

```html
<vds-input 
  label="Email" 
  placeholder="Enter your email" 
  helper-text="We'll never share your email"
>
  <vds-icon slot="info-icon" name="circle-info" aria-hidden="true"></vds-icon>
</vds-input>
```

### With Suffix Icon

```html
<vds-input label="Password" placeholder="Enter password">
  <vds-icon slot="suffix-icon" name="eye" aria-hidden="true"></vds-icon>
</vds-input>
```

### States

```html
<!-- Normal state -->
<vds-input label="Label" state="normal" placeholder="Placeholder"></vds-input>

<!-- Active state (focused) -->
<vds-input label="Label" state="active" placeholder="Placeholder"></vds-input>

<!-- Read-only state -->
<vds-input label="Label" state="read-only" value="Value"></vds-input>

<!-- Disabled state -->
<vds-input label="Label" state="disabled" placeholder="Placeholder"></vds-input>

<!-- Error state -->
<vds-input 
  label="Label" 
  state="error" 
  placeholder="Placeholder" 
  helper-text="Error message"
></vds-input>
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

input.addEventListener('vds-input-nav', (e) => {
  console.log('Navigation:', e.detail.direction);
});
```

## Accessibility

- Proper ARIA attributes (`aria-label`, `aria-describedby`)
- Label association via `for` attribute
- Keyboard navigation support
- Screen reader support
- Focus management with active state

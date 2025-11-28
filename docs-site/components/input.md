# Input

The `vds-input` component is a comprehensive, customizable form input component that supports multiple input types, states, and configurations.

## Basic Usage

<ComponentDemo code='<vds-input placeholder="Placeholder"></vds-input>
<vds-button>Click me</vds-button>' />

## Input Types

### Text Input

<ComponentDemo code='<vds-input label="Label" type="text" placeholder="Placeholder"></vds-input>' />

### Textarea

<ComponentDemo code='<vds-input label="Label" type="textarea" placeholder="Placeholder"></vds-input>' />

### Email Input

Email inputs include automatic validation. The input will show an error state if an invalid email is entered (validation occurs on blur by default).

<ComponentDemo code='<vds-input label="Email address" type="email" placeholder="name@company.com" helper-text="We&apos;ll never share your email"></vds-input>' />

### Email Input with Validation

Try entering an invalid email address and blurring the field to see the validation in action:

<ComponentDemo code='<vds-input label="Email address" type="email" placeholder="name@company.com"></vds-input>' />

### Password Input

`type="password"` automatically renders a visibility toggle button so users can show or hide the current value.

<ComponentDemo code='<vds-input label="Password" type="password" placeholder="Enter password" helper-text="Use 8 or more characters"></vds-input>' />

### Phone Input

Phone inputs include a prefix dropdown button (using `vds-dropdown-button`) for country codes.

<ComponentDemo code="<vds-input label=&quot;Phone number&quot; type=&quot;phone&quot; prefix-dropdown-text=&quot;+91&quot; placeholder=&quot;E.g. +1 216 4856 564&quot;></vds-input>" />

### Currency Input

Currency inputs include a prefix dropdown button (using `vds-dropdown-button`) for currency selection.

<ComponentDemo code="<vds-input label=&quot;Currency&quot; type=&quot;currency&quot; prefix-dropdown-text=&quot;$ Dollar&quot; placeholder=&quot;Enter amount&quot;></vds-input>" />

### Relationship Input

Relationship inputs include navigation buttons for browsing through related records.

<ComponentDemo code='<vds-input label="Related Record" type="relationship" placeholder="Select a record"></vds-input>' />

## States

### Normal State

<ComponentDemo code='<vds-input label="Label" state="normal" placeholder="Placeholder"></vds-input>' />

### Active State (Focused)

The active state shows a 3px green border ring around the entire input container and a 1px green border on the inner input when focused.

<ComponentDemo code='<vds-input label="Label" state="active" placeholder="Placeholder"></vds-input>' />

### Read-Only State

<ComponentDemo code='<vds-input label="Label" state="read-only" value="Value"></vds-input>' />

### Disabled State

<ComponentDemo code='<vds-input label="Label" state="disabled" placeholder="Placeholder"></vds-input>' />

### Error State

<ComponentDemo code='<vds-input label="Label" state="error" placeholder="Placeholder" helper-text="Helper text goes here"></vds-input>' />

## With Label and Info Icon

You can add an info icon next to the label using the `info-icon` slot.

<ComponentDemo code='<vds-input label="Label">
  <vds-icon slot="info-icon" name="circle-info" aria-hidden="true"></vds-icon>
</vds-input>' />

## With Helper Text

Helper text appears below the input and changes color based on the state.

<ComponentDemo code='<vds-input label="Label" placeholder="Placeholder" helper-text="Helper text goes here"></vds-input>
<vds-input label="Label" state="error" placeholder="Placeholder" helper-text="Helper text goes here"></vds-input>' />

## With Suffix Icon

You can add a suffix icon (like an eye icon for password visibility) using the `suffix-icon` slot.

<ComponentDemo code='<vds-input label="Label" placeholder="Placeholder">
  <vds-icon slot="suffix-icon" name="eye" aria-hidden="true"></vds-icon>
</vds-input>' />

## Complete Examples

### Text Input with All Features

<ComponentDemo code='<vds-input label="Label" placeholder="Placeholder" helper-text="Helper text goes here">
  <vds-icon slot="info-icon" name="circle-info" aria-hidden="true"></vds-icon>
  <vds-icon slot="suffix-icon" name="eye" aria-hidden="true"></vds-icon>
</vds-input>' />

### Phone Input with All States

<ComponentDemo code="<div style=&quot;display: flex; flex-direction: column; gap: 1rem;&quot;>
  <vds-input label=&quot;Phone number&quot; type=&quot;phone&quot; prefix-dropdown-text=&quot;+91&quot; state=&quot;normal&quot; placeholder=&quot;E.g. +1 216 4856 564&quot; helper-text=&quot;Helper text goes here&quot;>
    <vds-icon slot=&quot;info-icon&quot; name=&quot;circle-info&quot; aria-hidden=&quot;true&quot;></vds-icon>
    <vds-icon slot=&quot;suffix-icon&quot; name=&quot;eye&quot; aria-hidden=&quot;true&quot;></vds-icon>
  </vds-input>
  <vds-input label=&quot;Phone number&quot; type=&quot;phone&quot; prefix-dropdown-text=&quot;+91&quot; state=&quot;active&quot; placeholder=&quot;E.g. +1 216 4856 564&quot; helper-text=&quot;Helper text goes here&quot;>
    <vds-icon slot=&quot;info-icon&quot; name=&quot;circle-info&quot; aria-hidden=&quot;true&quot;></vds-icon>
    <vds-icon slot=&quot;suffix-icon&quot; name=&quot;eye&quot; aria-hidden=&quot;true&quot;></vds-icon>
  </vds-input>
  <vds-input label=&quot;Phone number&quot; type=&quot;phone&quot; prefix-dropdown-text=&quot;+91&quot; state=&quot;read-only&quot; value=&quot;9972272126&quot; helper-text=&quot;Helper text goes here&quot;>
    <vds-icon slot=&quot;info-icon&quot; name=&quot;circle-info&quot; aria-hidden=&quot;true&quot;></vds-icon>
    <vds-icon slot=&quot;suffix-icon&quot; name=&quot;eye&quot; aria-hidden=&quot;true&quot;></vds-icon>
  </vds-input>
  <vds-input label=&quot;Phone number&quot; type=&quot;phone&quot; prefix-dropdown-text=&quot;+91&quot; state=&quot;disabled&quot; value=&quot;9972272126&quot; helper-text=&quot;Helper text goes here&quot;>
    <vds-icon slot=&quot;info-icon&quot; name=&quot;circle-info&quot; aria-hidden=&quot;true&quot;></vds-icon>
    <vds-icon slot=&quot;suffix-icon&quot; name=&quot;eye&quot; aria-hidden=&quot;true&quot;></vds-icon>
  </vds-input>
  <vds-input label=&quot;Phone number&quot; type=&quot;phone&quot; prefix-dropdown-text=&quot;+91&quot; state=&quot;error&quot; placeholder=&quot;E.g. +1 216 4856 564&quot; helper-text=&quot;Helper text goes here&quot;>
    <vds-icon slot=&quot;info-icon&quot; name=&quot;circle-info&quot; aria-hidden=&quot;true&quot;></vds-icon>
    <vds-icon slot=&quot;suffix-icon&quot; name=&quot;eye&quot; aria-hidden=&quot;true&quot;></vds-icon>
  </vds-input>
</div>" />

### Relationship Input with Navigation

<ComponentDemo code='<vds-input label="Label" type="relationship" placeholder="placeholder" helper-text="Helper text goes here">
  <vds-icon slot="info-icon" name="circle-info" aria-hidden="true"></vds-icon>
  <vds-icon slot="suffix-icon" name="link-simple" aria-hidden="true"></vds-icon>
</vds-input>' />

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

### Customization Example

<ComponentDemo code='<vds-input label="Custom Input" placeholder="Placeholder" helper-text="Helper text goes here" style="--vds-input-border-color-active: #6366f1; --vds-input-focus-ring-color: #eef2ff; --vds-input-radius: 0.75rem;"></vds-input>' />

```css
vds-input {
  --vds-input-border-color-active: #6366f1;
  --vds-input-focus-ring-color: #eef2ff;
  --vds-input-radius: 0.75rem;
}
```

## Events

The component emits the following events:

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

### Example

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

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'text' \| 'textarea' \| 'relationship' \| 'phone' \| 'currency' \| 'email' \| 'password'` | `'text'` | Input type |
| `state` | `'normal' \| 'read-only' \| 'disabled' \| 'error' \| 'active'` | `'normal'` | Input state |
| `value` | `string` | `''` | Input value |
| `placeholder` | `string` | `''` | Placeholder text |
| `label` | `string` | `''` | Label text |
| `helperText` | `string` | `''` | Helper text displayed below input |
| `name` | `string` | `''` | Input name attribute |
| `errorMessage` | `string` | `''` | Custom error message to display when validation fails |
| `validateOnBlur` | `boolean` | `true` | Whether to validate email on blur (email type only) |
| `id` | `string` | `''` | Input id attribute |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readonly` | `boolean` | `false` | Whether the input is read-only |
| `prefixDropdownText` | `string` | `''` | Text for prefix dropdown button (phone/currency types). The prefix uses `vds-dropdown-button` component. |
| `ariaLabel` | `string` | - | Accessible label |
| `ariaDescribedBy` | `string` | - | ID of element that describes the input |

### Slots

| Slot | Description |
|------|-------------|
| `info-icon` | Icon displayed next to the label (typically an info icon) |
| `suffix-icon` | Icon displayed at the end of the input (e.g., eye icon for password visibility) |

### CSS Parts

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

## Examples

### Form with Multiple Inputs

<ComponentDemo code="<form style=&quot;display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;&quot;>
  <vds-input label=&quot;Name&quot; type=&quot;text&quot; placeholder=&quot;Enter your name&quot; helper-text=&quot;Your full name&quot;>
    <vds-icon slot=&quot;info-icon&quot; name=&quot;circle-info&quot; aria-hidden=&quot;true&quot;></vds-icon>
  </vds-input>
  <vds-input label=&quot;Email&quot; type=&quot;text&quot; placeholder=&quot;Enter your email&quot; helper-text=&quot;We&apos;ll never share your email&quot;>
    <vds-icon slot=&quot;info-icon&quot; name=&quot;circle-info&quot; aria-hidden=&quot;true&quot;></vds-icon>
  </vds-input>
  <vds-input label=&quot;Phone&quot; type=&quot;phone&quot; prefix-dropdown-text=&quot;+91&quot; placeholder=&quot;Enter phone number&quot; helper-text=&quot;Include country code&quot;>
    <vds-icon slot=&quot;info-icon&quot; name=&quot;circle-info&quot; aria-hidden=&quot;true&quot;></vds-icon>
  </vds-input>
  <vds-input label=&quot;Message&quot; type=&quot;textarea&quot; placeholder=&quot;Enter your message&quot; helper-text=&quot;Maximum 500 characters&quot;></vds-input>
</form>" />

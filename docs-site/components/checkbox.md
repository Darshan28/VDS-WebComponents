# Checkbox

The `vds-checkbox` component is a customizable checkbox input component that supports multiple sizes, states, and accessibility features.

## Basic Usage

<ComponentDemo code='<vds-checkbox label="Accept terms and conditions"></vds-checkbox>' />

## With Slot Content

<ComponentDemo code='<vds-checkbox>
  <span>I agree to the terms</span>
</vds-checkbox>' />

## States

### Unchecked

<ComponentDemo code='<vds-checkbox label="Unchecked checkbox"></vds-checkbox>' />

### Checked

<ComponentDemo code='<vds-checkbox checked label="Checked checkbox"></vds-checkbox>' />

### Indeterminate

<ComponentDemo code='<vds-checkbox indeterminate label="Indeterminate checkbox"></vds-checkbox>' />

### Disabled

<ComponentDemo code='<vds-checkbox disabled label="Disabled checkbox"></vds-checkbox>
<vds-checkbox disabled checked label="Disabled checked"></vds-checkbox>
<vds-checkbox disabled indeterminate label="Disabled indeterminate"></vds-checkbox>' />

### Hover

The component automatically shows hover state on mouse enter:

<ComponentDemo code='<vds-checkbox label="Hover over me"></vds-checkbox>' />

## Sizes

### Regular (Default)

<ComponentDemo code='<vds-checkbox size="regular" label="Regular size checkbox"></vds-checkbox>' />

### Small

<ComponentDemo code='<vds-checkbox size="small" label="Small size checkbox"></vds-checkbox>' />

## Examples

### Form Integration

<ComponentDemo code='<form style="display: flex; flex-direction: column; gap: 0.5rem;">
  <vds-checkbox name="agree" value="yes" label="I agree to the terms"></vds-checkbox>
  <vds-checkbox name="newsletter" value="yes" label="Subscribe to newsletter"></vds-checkbox>
  <vds-checkbox name="notifications" value="yes" checked label="Enable notifications"></vds-checkbox>
</form>' />

### Select All Pattern

<ComponentDemo code='<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <vds-checkbox indeterminate label="Select all"></vds-checkbox>
  <div style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.25rem;">
    <vds-checkbox checked label="Option 1"></vds-checkbox>
    <vds-checkbox checked label="Option 2"></vds-checkbox>
    <vds-checkbox label="Option 3"></vds-checkbox>
  </div>
</div>' />

## CSS Custom Properties

You can customize the checkbox appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-checkbox-size` | `12px` (regular) / `10.5px` (small) | Size of the checkbox box |
| `--vds-checkbox-border-width` | `0.6px` (or `0.5px` for unchecked regular) | Border width |
| `--vds-checkbox-border-radius` | `2px` | Border radius |
| `--vds-checkbox-border-color` | `var(--vds-color-text-tertiary, #898f9a)` | Border color (unchecked) |
| `--vds-checkbox-border-color-hover` | `var(--vds-color-text-primary, #070922)` | Border color on hover |
| `--vds-checkbox-border-color-disabled` | `var(--vds-color-text-disabled, #cdced3)` | Border color when disabled |
| `--vds-checkbox-bg` | `transparent` | Background color (unchecked) |
| `--vds-checkbox-bg-checked` | `var(--vds-color-brand, #00b578)` | Background color when checked/indeterminate |
| `--vds-checkbox-icon-color` | `var(--vds-color-white, #ffffff)` | Icon color (check/minus) |
| `--vds-checkbox-icon-size` | `8px` (regular) / `7px` (small) | Icon size |
| `--vds-checkbox-label-font-family` | `var(--vds-font-family-sans)` | Font family for label |
| `--vds-checkbox-label-font-weight` | `var(--vds-font-weight-normal, 400)` | Font weight |
| `--vds-checkbox-label-font-size` | `var(--vds-font-size-md, 1rem)` (regular) / `var(--vds-font-size-sm, 0.875rem)` (small) | Font size |
| `--vds-checkbox-label-color` | `var(--vds-color-text-primary, #070922)` | Label text color |
| `--vds-checkbox-label-color-disabled` | `var(--vds-color-text-disabled, #cdced3)` | Label text color when disabled |

### Customization Example

<ComponentDemo code='<vds-checkbox label="Default checkbox"></vds-checkbox>
<vds-checkbox label="Custom styled" style="--vds-checkbox-bg-checked: #ff6b6b; --vds-checkbox-size: 16px; --vds-checkbox-border-radius: 4px;"></vds-checkbox>' />

```css
vds-checkbox {
  --vds-checkbox-bg-checked: #ff6b6b;
  --vds-checkbox-size: 16px;
  --vds-checkbox-border-radius: 4px;
}
```

## Events

The component emits the following events:

- `vds-checkbox-change`: Fired when the checkbox state changes. Event detail contains `{ checked: boolean, indeterminate: boolean }`.

### Example

```javascript
const checkbox = document.querySelector('vds-checkbox');
checkbox.addEventListener('vds-checkbox-change', (e) => {
  console.log('Checked:', e.detail.checked);
  console.log('Indeterminate:', e.detail.indeterminate);
});
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'regular' \| 'small'` | `'regular'` | The size of the checkbox |
| `state` | `'unchecked' \| 'hover' \| 'checked' \| 'disabled' \| 'indeterminate'` | `'unchecked'` | The visual state of the checkbox |
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in indeterminate state |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `label` | `string \| undefined` | `undefined` | The label text (alternative to slot content) |
| `name` | `string \| undefined` | `undefined` | The name attribute for form submission |
| `value` | `string \| undefined` | `undefined` | The value attribute for form submission |

### Slots

| Slot | Description |
|------|-------------|
| (default) | The label content (used when `label` property is not provided) |

### CSS Parts

| Part | Description |
|------|-------------|
| `checkbox` | The checkbox container element |
| `input` | The native input element (hidden) |
| `box` | The visual checkbox box |
| `icon` | The check/indeterminate icon |
| `label` | The label text element |


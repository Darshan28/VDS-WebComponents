# Input

The `vds-input` component is a customizable, accessible form input component.

## Basic Usage

<ComponentDemo code='<vds-input label="Email" type="email"></vds-input>' />

## With Validation

<ComponentDemo code='<vds-input
  label="Email"
  type="email"
  required
  error-message="Please enter a valid email"
></vds-input>' />

## With Helper Text

<ComponentDemo code='<vds-input
  label="Password"
  type="password"
  helper-text="Must be at least 8 characters"
></vds-input>' />

## Disabled State

<ComponentDemo code='<vds-input label="Disabled Input" disabled value="Cannot edit"></vds-input>' />

## Different Input Types

<ComponentDemo code='<vds-input label="Text" type="text" placeholder="Enter text"></vds-input>
<vds-input label="Number" type="number" placeholder="Enter number"></vds-input>
<vds-input label="Email" type="email" placeholder="Enter email"></vds-input>
<vds-input label="Password" type="password" placeholder="Enter password"></vds-input>' />

## Events

```javascript
const input = document.querySelector('vds-input');
input.addEventListener('vds-input-change', (e) => {
  console.log('Value changed:', e.detail.value);
});
```

## API Reference

See the [full API documentation](https://github.com/your-org/vds-web-components/tree/main/packages/vds-input#readme).

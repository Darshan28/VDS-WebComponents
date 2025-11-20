# Button

The `vds-button` component is a customizable, accessible button component.

## Basic Usage

<ComponentDemo code='<vds-button>Click me</vds-button>' />

## Variants

<ComponentDemo code='<vds-button variant="primary">Primary</vds-button>
<vds-button variant="secondary">Secondary</vds-button>
<vds-button variant="success">Success</vds-button>
<vds-button variant="danger">Danger</vds-button>
<vds-button variant="warning">Warning</vds-button>
<vds-button variant="info">Info</vds-button>
<vds-button variant="outline">Outline</vds-button>
<vds-button variant="ghost">Ghost</vds-button>' />

## Sizes

<ComponentDemo code='<vds-button size="sm">Small</vds-button>
<vds-button size="md">Medium</vds-button>
<vds-button size="lg">Large</vds-button>' />

## With Icon

<ComponentDemo code='<vds-button>
  <span slot="icon">⭐</span>
  Star
</vds-button>' />

## Disabled State

<ComponentDemo code='<vds-button disabled>Disabled</vds-button>' />

## Events

```javascript
const button = document.querySelector('vds-button');
button.addEventListener('vds-button-click', (e) => {
  console.log('Button clicked!', e.detail);
});
```

## API Reference

See the [full API documentation](https://github.com/your-org/vds-web-components/tree/main/packages/vds-button#readme).

# Accessibility

VDS Web Components are built with accessibility as a core requirement.

## WCAG 2.1 AA Compliance

All components are designed to meet WCAG 2.1 Level AA standards.

## Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and controls
- **Escape**: Close modals and dropdowns
- **Arrow Keys**: Navigate within components (where applicable)

## ARIA Support

All components include proper ARIA attributes:

- `role` attributes where needed
- `aria-label` for accessible labels
- `aria-describedby` for descriptions
- `aria-invalid` for validation states
- `aria-expanded` for expandable components
- `aria-modal` for modals

## Focus Management

- Focus is properly managed in interactive components
- Modals trap focus within the dialog
- Focus is restored when modals close
- Visible focus indicators on all interactive elements

## Screen Reader Support

All components are tested with screen readers and include:

- Semantic HTML where possible
- Proper heading hierarchy
- Descriptive labels
- Status announcements

## Testing

Accessibility is tested using:

- **axe-core**: Automated accessibility testing
- **Manual testing**: Screen reader testing
- **Keyboard-only navigation**: Full keyboard accessibility

## Best Practices

When using VDS components:

1. Always provide labels for form inputs
2. Use semantic HTML where possible
3. Test with keyboard-only navigation
4. Test with screen readers
5. Ensure sufficient color contrast

## Reporting Issues

If you find an accessibility issue, please report it on GitHub.


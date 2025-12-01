# Select

The `vds-select` component is a customizable select input component powered by Choices.js, supporting single and multiple selection modes, search functionality, and option groups.

## Basic Usage

<ComponentDemo code='<vds-select label="Choose an option" placeholder="Select...">
  <select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</vds-select>' />

## Single Select

<ComponentDemo code='<vds-select label="Country" placeholder="Select a country">
  <select>
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
    <option value="au">Australia</option>
  </select>
</vds-select>' />

## Multiple Select

<ComponentDemo code='<vds-select label="Choose multiple options" multiple remove-item-button>
  <select multiple>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
  </select>
</vds-select>' />

## With Option Groups

<ComponentDemo code='<vds-select label="City" placeholder="Choose a city">
  <select>
    <optgroup label="North America">
      <option value="ny">New York</option>
      <option value="la">Los Angeles</option>
      <option value="chi">Chicago</option>
    </optgroup>
    <optgroup label="Europe">
      <option value="lon">London</option>
      <option value="par">Paris</option>
      <option value="ber">Berlin</option>
    </optgroup>
    <optgroup label="Asia">
      <option value="tok">Tokyo</option>
      <option value="bej">Beijing</option>
      <option value="mum">Mumbai</option>
    </optgroup>
  </select>
</vds-select>' />

## States

### Normal State

<ComponentDemo code='<vds-select label="Label" state="normal" placeholder="Select an option">
  <select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</vds-select>' />

### Active State (Focused)

The active state shows a 3px green border ring around the select when focused.

<ComponentDemo code='<vds-select label="Label" state="active" placeholder="Select an option">
  <select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</vds-select>' />

### Read-Only State

<ComponentDemo code='<vds-select label="Label" state="read-only">
  <select>
    <option value="1" selected>Option 1</option>
    <option value="2">Option 2</option>
  </select>
</vds-select>' />

### Disabled State

<ComponentDemo code='<vds-select label="Label" state="disabled" placeholder="Select an option">
  <select disabled>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</vds-select>' />

### Error State

<ComponentDemo code='<vds-select label="Label" state="error" placeholder="Select an option" error-message="This field is required">
  <select>
    <option value="">Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</vds-select>' />

## With Label and Info Icon

You can add an info icon next to the label using the `info-icon` slot.

<ComponentDemo code='<vds-select label="Label" placeholder="Select an option">
  <vds-icon slot="info-icon" name="circle-info" aria-hidden="true"></vds-icon>
  <select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</vds-select>' />

## With Helper Text

Helper text appears below the select and changes color based on the state.

<ComponentDemo code='<vds-select label="Label" placeholder="Select an option" helper-text="Helper text goes here">
  <select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</vds-select>
<vds-select label="Label" state="error" placeholder="Select an option" error-message="This field is required" helper-text="Helper text goes here">
  <select>
    <option value="">Select an option</option>
    <option value="1">Option 1</option>
  </select>
</vds-select>' />

## Search Functionality

By default, search is enabled. You can disable it if needed.

For both single and multiple select modes, search happens in the dropdown. When you click on the select, the dropdown opens with a search input at the top where you can type to filter options.

<ComponentDemo code='<vds-select label="Searchable Select" placeholder="Type to search..." search-enabled>
  <select>
    <option value="1">Apple</option>
    <option value="2">Banana</option>
    <option value="3">Cherry</option>
    <option value="4">Date</option>
    <option value="5">Elderberry</option>
    <option value="6">Fig</option>
    <option value="7">Grape</option>
  </select>
</vds-select>' />

## Multiple Select with Remove Buttons

<ComponentDemo code='<vds-select label="Tags" multiple remove-item-button placeholder="Select or type to add">
  <select multiple>
    <option value="1">Tag 1</option>
    <option value="2">Tag 2</option>
    <option value="3">Tag 3</option>
    <option value="4">Tag 4</option>
  </select>
</vds-select>' />

## Multiple Select with Placeholder

The placeholder text is displayed in the search input when the dropdown is opened. Selected items appear as tags within the select component.

**Note:** In multiple select mode, search happens in the dropdown (not inline). This provides better visibility and improved overflow handling. When you click to open the dropdown, you'll see a search input at the top of the dropdown menu.

<ComponentDemo code='<vds-select label="Select Tags" multiple placeholder="Select one or more tags">
  <select multiple>
    <option value="important">Important</option>
    <option value="urgent">Urgent</option>
    <option value="review">Review</option>
    <option value="approved">Approved</option>
  </select>
</vds-select>' />

## Add Items Feature

You can enable the `add-items` attribute to allow users to add new options that don't exist in the list. When enabled, users can type a new value in the dropdown search field and press Enter to add it.

### Multiple Select with Add Items

For multiple select, the search input appears in the dropdown when you open it. Type your new value and press Enter to add it.

<ComponentDemo code='<vds-select label="Tags" multiple add-items add-item-text="Press Enter to add a new tag" remove-item-button placeholder="Select or type to add tags">
  <select multiple>
    <option value="work">Work</option>
    <option value="personal">Personal</option>
    <option value="urgent">Urgent</option>
  </select>
</vds-select>' />

### Single Select with Add Items

For single select, the search input also appears in the dropdown.

<ComponentDemo code='<vds-select label="Category" add-items add-item-text="Press Enter to add" search-enabled placeholder="Select or add a category">
  <select>
    <option value="design">Design</option>
    <option value="development">Development</option>
    <option value="marketing">Marketing</option>
  </select>
</vds-select>' />

**Note:** The `add-items` feature requires `search-enabled` to be enabled (which is the default). In both single and multiple select modes, users type a new value in the dropdown search field and press Enter to add it as a new option.

## Programmatic Usage

You can set options programmatically using the `setOptions()` method. The component will automatically initialize Choices.js when options are set.

<ComponentDemo code='<vds-select id="prog-select" label="Programmatic Select" placeholder="Select an option">
</vds-select>
<script>
  const select = document.querySelector("#prog-select");
  if (select) {
    select.setOptions([
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3", disabled: true },
      { value: "4", label: "Option 4", selected: true }
    ]);
  }
</script>' />

Note: The script automatically scopes `document.querySelector` to the preview container and waits for the component to be fully initialized before calling `setOptions()`.

## Select with Avatars

You can create a select component with avatars/images for each option by providing an `avatar` property in the options data.

<ComponentDemo code='<vds-select id="avatar-select" label="Select a person" placeholder="Choose a person" search-enabled>
</vds-select>
<style>
  /* Custom styles for avatar select */
  #avatar-select {
    --vds-select-dropdown-width: 100%;
  }
</style>
<script>
  const select = document.querySelector("#avatar-select");
  if (select) {
    select.setOptions([
      { 
        value: "william", 
        label: "William Howard",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      { 
        value: "zoye", 
        label: "Zoye Lang",
        avatar: "https://i.pravatar.cc/150?img=2"
      },
      { 
        value: "will", 
        label: "Will Reichert",
        avatar: "https://i.pravatar.cc/150?img=3"
      },
      { 
        value: "liam", 
        label: "Liam Johnson",
        avatar: "https://i.pravatar.cc/150?img=4",
        selected: true
      },
      { 
        value: "ketharena", 
        label: "Ketharena Nilson",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      { 
        value: "emma", 
        label: "Emma Adams",
        avatar: "https://i.pravatar.cc/150?img=6"
      },
      { 
        value: "oliver", 
        label: "Oliver Scott",
        avatar: "https://i.pravatar.cc/150?img=7"
      }
    ]);
  }
</script>' />

## Complete Example

<ComponentDemo code='<vds-select label="Complete Select" placeholder="Choose an option" helper-text="Select an option from the list">
  <vds-icon slot="info-icon" name="circle-info" aria-hidden="true"></vds-icon>
  <select>
    <option value="">Choose an option</option>
    <optgroup label="Fruits">
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="cherry">Cherry</option>
    </optgroup>
    <optgroup label="Vegetables">
      <option value="carrot">Carrot</option>
      <option value="broccoli">Broccoli</option>
      <option value="spinach">Spinach</option>
    </optgroup>
  </select>
</vds-select>' />

## CSS Custom Properties

You can customize the select appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-select-font-family` | `var(--vds-font-family-sans)` | Font family for select text |
| `--vds-select-font-weight` | `var(--vds-font-weight-normal, 400)` | Font weight for select text |
| `--vds-select-font-size` | `var(--vds-font-size-md, 1rem)` | Font size for select text |
| `--vds-select-label-font-size` | `var(--vds-font-size-sm, 10.5px)` | Font size for label |
| `--vds-select-helper-font-size` | `var(--vds-font-size-xs, 9px)` | Font size for helper text |
| `--vds-select-padding-x` | `var(--vds-spacing-md, 12px)` | Horizontal padding |
| `--vds-select-padding-y` | `var(--vds-spacing-sm, 6px)` | Vertical padding |
| `--vds-select-gap` | `var(--vds-spacing-xs, 3px)` | Gap between elements |
| `--vds-select-height` | `28px` | Height of select |
| `--vds-select-radius` | `var(--vds-radius-lg, 6px)` | Border radius |
| `--vds-select-border-color` | `var(--vds-color-gray-300, #eaeef4)` | Border color |
| `--vds-select-active-border` | `var(--vds-color-brand, #00b578)` | Active/focused border color |
| `--vds-select-error-border` | `var(--vds-color-red-500, #fb3145)` | Error border color |

### Customization Example

<ComponentDemo code='<vds-select label="Custom Select" placeholder="Select an option" helper-text="Custom styled select" style="--vds-select-active-border: #6366f1; --vds-select-radius: 0.75rem;">
  <select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</vds-select>' />

```css
vds-select {
  --vds-select-active-border: #6366f1;
  --vds-select-radius: 0.75rem;
}
```

## Events

The component emits the following events:

### `vds-select-change`

Fired when the selection changes.

**Event Detail:**
```typescript
{
  value: string | string[];
  selectedOptions: SelectOption[];
  originalEvent: Event;
}
```

### `vds-select-add-item`

Fired when an item is added (multiple mode only).

**Event Detail:**
```typescript
{
  value: string;
  originalEvent: Event;
}
```

### `vds-select-remove-item`

Fired when an item is removed (multiple mode only).

**Event Detail:**
```typescript
{
  value: string;
  originalEvent: Event;
}
```

### Example

```javascript
const select = document.querySelector('vds-select');
select.addEventListener('vds-select-change', (e) => {
  console.log('Value changed:', e.detail.value);
  console.log('Selected options:', e.detail.selectedOptions);
});
select.addEventListener('vds-select-add-item', (e) => {
  console.log('Item added:', e.detail.value);
});
select.addEventListener('vds-select-remove-item', (e) => {
  console.log('Item removed:', e.detail.value);
});
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | Label text displayed above the select |
| `placeholder` | `string` | `''` | Placeholder text for the select (works for both single and multiple select modes) |
| `value` | `string \| string[]` | `''` | Current selected value(s) |
| `multiple` | `boolean` | `false` | Enable multiple selection |
| `disabled` | `boolean` | `false` | Disable the select |
| `readonly` | `boolean` | `false` | Make the select read-only |
| `state` | `'normal' \| 'read-only' \| 'disabled' \| 'error' \| 'active'` | `'normal'` | Visual state of the select |
| `helperText` | `string` | `''` | Helper text displayed below the select |
| `errorMessage` | `string` | `''` | Error message displayed when state is 'error' |
| `searchEnabled` | `boolean` | `true` | Enable search functionality |
| `removeItemButton` | `boolean` | `false` | Show remove buttons for selected items (multiple mode) |
| `addItems` | `boolean` | `false` | Allow users to add new options by typing and pressing Enter |
| `addItemText` | `string` | `'Press Enter to add'` | Text shown when user can add a new item |
| `uniqueValuesOnly` | `boolean` | `false` | Only allow unique values (multiple mode) |
| `noResultsText` | `string` | `'No results found'` | Text shown when no search results |
| `noChoicesText` | `string` | `'No choices to choose from'` | Text shown when no options available |
| `itemSelectText` | `string` | `'Press to select'` | Text shown for item selection hint |
| `name` | `string` | `''` | Name attribute for form submission |
| `id` | `string` | `''` | ID attribute for the select |
| `ariaLabel` | `string` | - | Accessible label |
| `ariaDescribedBy` | `string` | - | ID of element that describes the select |

### Methods

#### `setOptions(options: SelectOption[])`

Set the options programmatically.

```typescript
select.setOptions([
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2', disabled: true },
  { value: '3', label: 'Option 3', selected: true }
]);
```

#### `getValue(): string | string[]`

Get the current selected value(s).

```typescript
const value = select.getValue();
```

#### `clearValue(): void`

Clear the current selection.

```typescript
select.clearValue();
```

### Slots

| Slot | Description |
|------|-------------|
| `info-icon` | Icon displayed next to the label (typically an info icon) |
| Default slot | Native `<select>` element with `<option>` and `<optgroup>` elements |

### CSS Parts

| Part | Description |
|------|-------------|
| `wrapper` | The wrapper container |
| `label` | The label element |
| `info-icon` | The info icon slot |
| `select` | The select element container |
| `helper-text` | The helper text container |

## Examples

### Form with Multiple Selects

<ComponentDemo code="<form style=&quot;display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;&quot;>
  <vds-select label=&quot;Country&quot; placeholder=&quot;Select a country&quot;>
    <select>
      <option value=&quot;&quot;>Select a country</option>
      <option value=&quot;us&quot;>United States</option>
      <option value=&quot;uk&quot;>United Kingdom</option>
      <option value=&quot;ca&quot;>Canada</option>
    </select>
  </vds-select>
  <vds-select label=&quot;Language&quot; placeholder=&quot;Select a language&quot;>
    <select>
      <option value=&quot;&quot;>Select a language</option>
      <option value=&quot;en&quot;>English</option>
      <option value=&quot;es&quot;>Spanish</option>
      <option value=&quot;fr&quot;>French</option>
    </select>
  </vds-select>
  <vds-select label=&quot;Interests&quot; multiple remove-item-button placeholder=&quot;Select interests&quot;>
    <select multiple>
      <option value=&quot;tech&quot;>Technology</option>
      <option value=&quot;art&quot;>Art</option>
      <option value=&quot;music&quot;>Music</option>
      <option value=&quot;sports&quot;>Sports</option>
    </select>
  </vds-select>
</form>" />

## Notes

- This component uses [Choices.js](https://choices-js.github.io/Choices/) under the hood for enhanced functionality
- Choices.js CSS must be imported in your application: `import 'choices.js/public/assets/styles/choices.min.css'`
- The component automatically initializes Choices.js when options are provided via HTML `<select>` or programmatically via `setOptions()`
- Search functionality is enabled by default but can be disabled via the `search-enabled` property
- **Multi-select search behavior:** In multiple select mode, search happens in the dropdown (not inline with selected items). This provides better UX, improved text visibility, and better overflow handling when many items are selected
- For multiple select mode, you can enable remove buttons with the `remove-item-button` attribute
- When multiple items are selected and overflow occurs, the component automatically shows a "X more" indicator instead of increasing the height


# vds-date

VDS Date/Time Picker Web Component - A specialized component for date and time selection using Flatpickr.

## Installation

```bash
npm install @vds/date
```

## Usage

### HTML

```html
<script type="module" src="@vds/date"></script>

<vds-date label="Date" type="date" placeholder="Select a date"></vds-date>
```

### JavaScript/TypeScript

```typescript
import '@vds/date';
// or
import { VDSDate } from '@vds/date';
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | `'date' \| 'time' \| 'datetime' \| 'daterange'` | `'date'` | Date picker type |
| `state` | `'normal' \| 'read-only' \| 'disabled' \| 'error' \| 'active'` | `'normal'` | Input state |
| `value` | `string` | `''` | Date value |
| `placeholder` | `string` | `''` | Placeholder text |
| `label` | `string` | `''` | Label text |
| `helper-text` | `string` | `''` | Helper text displayed below input |
| `name` | `string` | `''` | Input name attribute |
| `id` | `string` | `''` | Input id attribute (auto-generated if not provided) |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readonly` | `boolean` | `false` | Whether the input is read-only |
| `error-message` | `string` | `''` | Custom error message to display |
| `date-format` | `string` | `'Y-m-d'` | Date format for `type="date"` (Flatpickr format tokens) |
| `time-format` | `string` | `'H:i'` | Time format for `type="time"` (Flatpickr format tokens) |
| `datetime-format` | `string` | `'Y-m-d H:i'` | DateTime format for `type="datetime"` (Flatpickr format tokens) |
| `daterange-format` | `string` | `'Y-m-d'` | Date format for `type="daterange"` (Flatpickr format tokens) |
| `time-24hr` | `boolean` | `true` | Whether to use 24-hour format for time/datetime inputs |
| `alt-input` | `boolean` | `false` | Enable human-friendly date display (shows formatted date while storing ISO format) |
| `alt-format` | `string` | `'F j, Y'` | Format for human-friendly date display (when `alt-input` is enabled) |
| `min-date` | `string` | `''` | Minimum selectable date (e.g., `'2024-01-01'`, `'today'`, or ISO string) |
| `max-date` | `string` | `''` | Maximum selectable date (e.g., `'2024-12-31'`, `'today'`, or ISO string) |
| `min-time` | `string` | `''` | Minimum selectable time (e.g., `'09:00'`) |
| `max-time` | `string` | `''` | Maximum selectable time (e.g., `'17:00'`) |
| `disable-dates` | `string` | `''` | JSON string of dates/ranges/functions to disable (see examples) |
| `enable-dates` | `string` | `''` | JSON string of dates/ranges/functions to enable (opposite of disable) |
| `multiple-dates` | `boolean` | `false` | Enable multiple date selection (for `type="date"` only) |
| `conjunction` | `string` | `', '` | Separator for multiple selected dates |
| `week-numbers` | `boolean` | `false` | Display week numbers in calendar |
| `wrap` | `boolean` | `false` | Enable external element wrapping (for custom triggers) |
| `aria-label` | `string` | `''` | Accessible label |
| `aria-describedby` | `string` | `''` | ID of element that describes the input |

## Properties

All attributes are available as properties and are reactive. The component automatically syncs `disabled` and `readonly` properties with the `state` property.

## Slots

| Slot | Description |
|------|-------------|
| `info-icon` | Icon displayed next to the label (typically an info icon) |
| `suffix-icon` | Icon displayed at the end of the input |

## CSS Parts

| Part | Description |
|------|-------------|
| `wrapper` | The wrapper container |
| `label` | The label element (contains the label text and info icon slot) |
| `info-icon` | The info icon slot |
| `input-container` | The outer input container (for active state border ring) |
| `input-wrapper` | The inner input wrapper |
| `input` | The input element |
| `suffix-icon` | The suffix icon slot |
| `helper-text` | The helper text container |

## CSS Custom Properties

You can customize the date picker appearance by overriding these CSS custom properties:

| Variable | Default | Description |
|----------|---------|-------------|
| `--vds-date-font-family` | `var(--vds-font-family-sans)` | Font family for input text |
| `--vds-date-font-weight` | `var(--vds-font-weight-normal, 400)` | Font weight for input text |
| `--vds-date-font-size` | `var(--vds-font-size-md, 12px)` | Font size for input text |
| `--vds-date-label-font-size` | `var(--vds-font-size-sm, 10.5px)` | Font size for label |
| `--vds-date-helper-font-size` | `var(--vds-font-size-xs, 9px)` | Font size for helper text |
| `--vds-date-padding-x` | `var(--vds-spacing-md, 12px)` | Horizontal padding |
| `--vds-date-padding-y` | `var(--vds-spacing-sm, 6px)` | Vertical padding |
| `--vds-date-gap` | `var(--vds-spacing-xs, 3px)` | Gap between elements |
| `--vds-date-radius` | `var(--vds-radius-lg, 6px)` | Border radius |
| `--vds-date-icon-size` | `13.5px` | Size of suffix icon |
| `--vds-date-info-icon-size` | `10.5px` | Size of info icon |

## Events

### `vds-date-change`

Fired when the date value changes and loses focus.

**Event Detail:**
```typescript
{
  value: string;
  originalEvent: Event;
}
```

### `vds-date-input`

Fired on every date value change (as the user types or selects).

**Event Detail:**
```typescript
{
  value: string;
  originalEvent: Event;
}
```

## Examples

### Basic Date Picker

```html
<vds-date label="Meeting date" type="date" helper-text="Select a date"></vds-date>
```

### Custom Date Format

```html
<vds-date 
  label="Meeting date" 
  type="date" 
  date-format="m/d/Y"
  helper-text="MM/DD/YYYY format"
></vds-date>
```

### Time Picker

```html
<vds-date 
  label="Meeting time" 
  type="time" 
  helper-text="Select a time"
></vds-date>

<!-- 12-hour format with AM/PM -->
<vds-date 
  label="Meeting time" 
  type="time" 
  time-format="h:i K"
  time-24hr="false"
  helper-text="12-hour format"
></vds-date>
```

### DateTime Picker

```html
<vds-date 
  label="Meeting date & time" 
  type="datetime" 
  helper-text="Select date and time"
></vds-date>
```

### Date Range Picker

```html
<vds-date 
  label="Date range" 
  type="daterange" 
  helper-text="Select start and end dates"
></vds-date>
```

### Format Tokens

Flatpickr uses format tokens to define date/time formats. Common tokens include:

- **Date**: `Y` (4-digit year), `y` (2-digit year), `m` (month 01-12), `d` (day 01-31), `F` (full month name), `M` (short month name), `j` (day 1-31), `D` (short day name)
- **Time**: `H` (24-hour 00-23), `h` (12-hour 1-12), `i` (minutes 00-59), `s` (seconds 00-59), `K` (AM/PM)
- **Separators**: Any character can be used as a separator (e.g., `/`, `-`, `:`, space)

Examples:
- `'Y-m-d'` → `2024-01-15`
- `'m/d/Y'` → `01/15/2024`
- `'F j, Y'` → `January 15, 2024`
- `'H:i'` → `14:30` (24-hour)
- `'h:i K'` → `2:30 PM` (12-hour)
- `'Y-m-d H:i'` → `2024-01-15 14:30`

### Human-Friendly Dates (altInput)

Use `alt-input` to display dates in a more readable format while storing them in a standard format.

```html
<vds-date 
  label="Meeting date" 
  type="date" 
  alt-input
  alt-format="F j, Y"
  date-format="Y-m-d"
  helper-text="Displays 'January 15, 2024' but stores '2024-01-15'"
></vds-date>
```

### Date Constraints (minDate/maxDate)

Limit the selectable date range:

```html
<!-- Minimum date -->
<vds-date 
  label="Start date" 
  type="date" 
  min-date="today"
></vds-date>

<!-- Date range -->
<vds-date 
  label="Event date" 
  type="date" 
  min-date="2024-01-01"
  max-date="2024-12-31"
></vds-date>
```

### Time Constraints (minTime/maxTime)

Limit the selectable time range:

```html
<!-- Time with limits -->
<vds-date 
  label="Business hours" 
  type="time" 
  min-time="09:00"
  max-time="17:00"
></vds-date>

<!-- DateTime with time limits -->
<vds-date 
  label="Appointment" 
  type="datetime" 
  min-time="09:00"
  max-time="17:00"
></vds-date>
```

### Disabling Dates

Disable specific dates, date ranges, or use functions:

```html
<!-- Disable specific dates (JSON array) -->
<vds-date 
  label="Available date" 
  type="date" 
  disable-dates='["2024-12-25", "2024-12-31"]'
></vds-date>

<!-- Disable date ranges (JSON array of objects) -->
<vds-date 
  label="Available date" 
  type="date" 
  disable-dates='[{"from": "2024-04-01", "to": "2024-05-01"}]'
></vds-date>
```

### Enabling Specific Dates

Enable only specific dates (opposite of disable):

```html
<!-- Enable only specific dates -->
<vds-date 
  label="Select date" 
  type="date" 
  enable-dates='["2024-03-30", "2024-05-21", "2024-06-08"]'
></vds-date>
```

### Multiple Date Selection

Allow users to select multiple dates:

```html
<vds-date 
  label="Select dates" 
  type="date" 
  multiple-dates
  conjunction=", "
  helper-text="Select multiple dates"
></vds-date>
```

### Week Numbers

Display week numbers in the calendar:

```html
<vds-date 
  label="Date" 
  type="date" 
  week-numbers
></vds-date>
```

### External Element Wrapping

Use `wrap` to attach the calendar to a custom trigger element:

```html
<button id="custom-trigger">Pick a date</button>
<vds-date 
  type="date" 
  wrap
></vds-date>

<script>
  const datePicker = document.querySelector('vds-date');
  const trigger = document.getElementById('custom-trigger');
  trigger.addEventListener('click', () => {
    datePicker.shadowRoot.querySelector('input').click();
  });
</script>
```

### States

```html
<!-- Normal state -->
<vds-date label="Label" state="normal" placeholder="Placeholder"></vds-date>

<!-- Active state (focused) -->
<vds-date label="Label" state="active" placeholder="Placeholder"></vds-date>

<!-- Read-only state -->
<vds-date label="Label" state="read-only" value="2024-01-15"></vds-date>

<!-- Disabled state -->
<vds-date label="Label" state="disabled" placeholder="Placeholder"></vds-date>

<!-- Error state -->
<vds-date 
  label="Label" 
  state="error" 
  placeholder="Placeholder" 
  helper-text="Error message"
></vds-date>
```

### Event Handling

```javascript
const datePicker = document.querySelector('vds-date');

datePicker.addEventListener('vds-date-change', (e) => {
  console.log('Date changed:', e.detail.value);
});

datePicker.addEventListener('vds-date-input', (e) => {
  console.log('Date:', e.detail.value);
});
```

## Accessibility

- Proper ARIA attributes (`aria-label`, `aria-describedby`)
- Label association via `for` attribute
- Keyboard navigation support
- Screen reader support
- Focus management with active state


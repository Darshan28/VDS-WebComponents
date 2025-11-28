# Date

The `vds-date` component is a specialized date and time picker component using Flatpickr, providing a consistent picker experience across browsers.

## Basic Usage

<ComponentDemo code='<vds-date label="Date" type="date" placeholder="Select a date"></vds-date>' />

## Date Types

### Date Picker

<ComponentDemo code='<vds-date label="Meeting date" type="date" helper-text="Select a date"></vds-date>' />

### Custom Date Format

You can customize the date format using the `date-format` attribute:

<ComponentDemo code='<vds-date label="Meeting date" type="date" date-format="m/d/Y" helper-text="MM/DD/YYYY format"></vds-date>' />

### Time Picker

Setting `type="time"` enables a time picker. By default, it uses 24-hour format.

<ComponentDemo code='<vds-date label="Meeting time" type="time" helper-text="Select a time"></vds-date>' />

### 12-Hour Time Format

You can customize the time format and use 12-hour format with AM/PM:

<ComponentDemo code='<vds-date label="Meeting time" type="time" time-format="h:i K" time-24hr="false" helper-text="12-hour format"></vds-date>' />

### DateTime Picker

Setting `type="datetime"` enables a combined date and time picker.

<ComponentDemo code='<vds-date label="Meeting date &amp; time" type="datetime" helper-text="Select date and time"></vds-date>' />

### Date Range Picker

Setting `type="daterange"` enables a date range picker, allowing users to select a start and end date.

<ComponentDemo code='<vds-date label="Date range" type="daterange" helper-text="Select start and end dates"></vds-date>' />

#### Format Tokens

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

### Human-Friendly Dates

Use `alt-input` to display dates in a more readable format while storing them in a standard format.

<ComponentDemo code='<vds-date label="Meeting date" type="date" alt-input alt-format="F j, Y" date-format="Y-m-d" helper-text="Displays readable format but stores ISO format"></vds-date>' />

### Date Constraints

Limit the selectable date range using `min-date` and `max-date`:

<ComponentDemo code='<vds-date label="Event date" type="date" min-date="2024-01-01" max-date="2024-12-31" helper-text="Select a date in 2024"></vds-date>' />

### Time Constraints

Limit the selectable time range using `min-time` and `max-time`:

<ComponentDemo code='<vds-date label="Business hours" type="time" min-time="09:00" max-time="17:00" helper-text="Select time between 9 AM and 5 PM"></vds-date>' />

### Multiple Date Selection

Allow users to select multiple dates:

<ComponentDemo code='<vds-date label="Select dates" type="date" multiple-dates conjunction=", " helper-text="Select multiple dates"></vds-date>' />

### Week Numbers

Display week numbers in the calendar:

<ComponentDemo code='<vds-date label="Date" type="date" week-numbers helper-text="Shows week numbers"></vds-date>' />

## States

### Normal State

<ComponentDemo code='<vds-date label="Label" state="normal" placeholder="Placeholder"></vds-date>' />

### Active State (Focused)

The active state shows a 3px green border ring around the entire input container and a 1px green border on the inner input when focused.

<ComponentDemo code='<vds-date label="Label" state="active" placeholder="Placeholder"></vds-date>' />

### Read-Only State

<ComponentDemo code='<vds-date label="Label" state="read-only" value="2024-01-15"></vds-date>' />

### Disabled State

<ComponentDemo code='<vds-date label="Label" state="disabled" placeholder="Placeholder"></vds-date>' />

### Error State

<ComponentDemo code='<vds-date label="Label" state="error" placeholder="Placeholder" helper-text="Helper text goes here"></vds-date>' />

## With Label and Info Icon

You can add an info icon next to the label using the `info-icon` slot.

<ComponentDemo code='<vds-date label="Label">
  <vds-icon slot="info-icon" name="circle-info" aria-hidden="true"></vds-icon>
</vds-date>' />

## With Helper Text

Helper text appears below the input and changes color based on the state.

<ComponentDemo code='<vds-date label="Label" placeholder="Placeholder" helper-text="Helper text goes here"></vds-date>
<vds-date label="Label" state="error" placeholder="Placeholder" helper-text="Helper text goes here"></vds-date>' />

## With Suffix Icon

You can add a suffix icon using the `suffix-icon` slot.

<ComponentDemo code='<vds-date label="Label" placeholder="Placeholder">
  <vds-icon slot="suffix-icon" name="calendar" aria-hidden="true"></vds-icon>
</vds-date>' />

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

### Customization Example

<ComponentDemo code='<vds-date label="Custom Date" placeholder="Placeholder" helper-text="Helper text goes here" style="--vds-date-radius: 0.75rem;"></vds-date>' />

```css
vds-date {
  --vds-date-radius: 0.75rem;
}
```

## Events

The component emits the following events:

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

### Example

```javascript
const datePicker = document.querySelector('vds-date');
datePicker.addEventListener('vds-date-change', (e) => {
  console.log('Date changed:', e.detail.value);
});
datePicker.addEventListener('vds-date-input', (e) => {
  console.log('Date:', e.detail.value);
});
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'date' \| 'time' \| 'datetime' \| 'daterange'` | `'date'` | Date picker type |
| `state` | `'normal' \| 'read-only' \| 'disabled' \| 'error' \| 'active'` | `'normal'` | Input state |
| `value` | `string` | `''` | Date value |
| `placeholder` | `string` | `''` | Placeholder text |
| `label` | `string` | `''` | Label text |
| `helperText` | `string` | `''` | Helper text displayed below input |
| `name` | `string` | `''` | Input name attribute |
| `errorMessage` | `string` | `''` | Custom error message to display |
| `dateFormat` | `string` | `'Y-m-d'` | Date format for `type="date"` (Flatpickr format tokens) |
| `timeFormat` | `string` | `'H:i'` | Time format for `type="time"` (Flatpickr format tokens) |
| `datetimeFormat` | `string` | `'Y-m-d H:i'` | DateTime format for `type="datetime"` (Flatpickr format tokens) |
| `daterangeFormat` | `string` | `'Y-m-d'` | Date format for `type="daterange"` (Flatpickr format tokens) |
| `time24hr` | `boolean` | `true` | Whether to use 24-hour format for time/datetime inputs |
| `altInput` | `boolean` | `false` | Enable human-friendly date display |
| `altFormat` | `string` | `'F j, Y'` | Format for human-friendly date display |
| `minDate` | `string` | `''` | Minimum selectable date |
| `maxDate` | `string` | `''` | Maximum selectable date |
| `minTime` | `string` | `''` | Minimum selectable time |
| `maxTime` | `string` | `''` | Maximum selectable time |
| `disableDates` | `string` | `''` | JSON string of dates/ranges/functions to disable |
| `enableDates` | `string` | `''` | JSON string of dates/ranges/functions to enable |
| `multipleDates` | `boolean` | `false` | Enable multiple date selection |
| `conjunction` | `string` | `', '` | Separator for multiple selected dates |
| `weekNumbers` | `boolean` | `false` | Display week numbers in calendar |
| `wrap` | `boolean` | `false` | Enable external element wrapping |
| `id` | `string` | `''` | Input id attribute |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readonly` | `boolean` | `false` | Whether the input is read-only |
| `ariaLabel` | `string` | - | Accessible label |
| `ariaDescribedBy` | `string` | - | ID of element that describes the input |

### Slots

| Slot | Description |
|------|-------------|
| `info-icon` | Icon displayed next to the label (typically an info icon) |
| `suffix-icon` | Icon displayed at the end of the input |

### CSS Parts

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


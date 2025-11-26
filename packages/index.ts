/**
 * VDS Web Components Library
 * Main entry point for all components
 */

export { VDSBadge } from './vds-badge/vds-badge.js';
export { VDSButton } from './vds-button/vds-button.js';
export { VDSIcon } from './vds-icon/vds-icon.js';
export { VDSInput } from './vds-input/vds-input.js';
export { VDSModal } from './vds-modal/vds-modal.js';

// Re-export types
export type { BadgeVariant, BadgeSize, BadgeShape } from './vds-badge/vds-badge.js';
export type { ButtonVariant, ButtonSize, ButtonAppearance, ButtonShape } from './vds-button/vds-button.js';
export type { InputType, InputChangeEventDetail, InputInputEventDetail } from './vds-input/vds-input.js';
export type { ModalCloseEventDetail } from './vds-modal/vds-modal.js';


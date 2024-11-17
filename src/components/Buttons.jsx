import React from 'react';
import './Buttons.scss';

const BaseButton = ({ className, onClick, children, type = 'button', disabled = false }) => (
  <button
    type={type}
    className={`btn ${className} ${disabled ? 'btn--disabled' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export const PrimaryButton = ({ onClick, children, type = 'button', disabled = false }) => (
  <BaseButton className="btn-primary" onClick={onClick} type={type} disabled={disabled}>
    {children}
  </BaseButton>
);

export const SecondaryButton = ({ onClick, children, type = 'button', disabled = false }) => (
  <BaseButton className="btn-secondary" onClick={onClick} type={type} disabled={disabled}>
    {children}
  </BaseButton>
);

export const TertiaryButton = ({ onClick, children, type = 'button', disabled = false }) => (
  <BaseButton className="btn-tertiary" onClick={onClick} type={type} disabled={disabled}>
    {children}
  </BaseButton>
);

export const ClickableText = ({ onClick, children, type = 'button', disabled = false }) => (
    <BaseButton className="btn-text" onClick={onClick} type={type} disabled={disabled}>
      {children}
    </BaseButton>
);
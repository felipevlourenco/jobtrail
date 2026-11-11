import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

export function Button({
    variant = 'primary',
    children,
    ...props
}: ButtonProps) {
    return (
        <button className={`button button--${variant}`} {...props}>
            {children}
        </button>
    );
}

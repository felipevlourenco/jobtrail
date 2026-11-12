import type { ButtonHTMLAttributes } from 'react';
import { Spinner } from '../Spinner/Spinner';
import './Button.css';

type ButtonVariants = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSizes = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariants;
    size?: ButtonSizes;
    loading?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            className={`button button--${variant} button--${size}`}
            {...props}
        >
            {loading && (
                <div className="button--loading">
                    <Spinner size={size} />
                </div>
            )}
            {children}
        </button>
    );
}

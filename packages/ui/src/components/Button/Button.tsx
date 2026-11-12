import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { Spinner } from '../Spinner/Spinner';
import './Button.css';

export type ButtonVariants = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSizes = 'sm' | 'md' | 'lg';

export type ButtonProps<C extends ElementType = 'button'> = {
    as?: C;
    children?: ReactNode;
    variant?: ButtonVariants;
    size?: ButtonSizes;
    loading?: boolean;
    disabled?: boolean;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'variant' | 'size' | 'disabled' | 'loading' | 'children'>;

export function Button<C extends ElementType = 'button'>({
    children,
    as,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    ...props
}: ButtonProps<C>) {
    const Component: ElementType = as ?? 'button';

    return (
        <Component
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
        </Component>
    );
}

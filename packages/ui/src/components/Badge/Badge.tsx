import type { HTMLAttributes } from 'react';
import './Badge.css';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    // default: 'neutral'
    variant?: BadgeVariant;
}

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
    return <span className={`badge badge--${variant}`}>{children}</span>;
}

import { PropsWithChildren, useEffect } from 'react';
import { Button } from '../Button/Button';
import './Toast.css';

const TIMEOUT = 5000;

type ToastType = 'success' | 'warning' | 'error';

export interface ToastProps extends PropsWithChildren {
    title?: string;
    type?: ToastType;
    onClose?: () => void;
}

export function Toast({
    children,
    title,
    onClose,
    type = 'success',
}: ToastProps) {
    useEffect(() => {
        if (onClose) {
            setTimeout(() => onClose(), TIMEOUT);
        }
    }, []);

    return (
        <div className={`toast--wrapper ${type}`}>
            <div className="toast--info">
                {title && <h4 className="toast--title">{title}</h4>}
                <span className="toast--content">{children}</span>
            </div>
            {onClose && (
                <Button variant="ghost" onClick={onClose}>
                    X
                </Button>
            )}
        </div>
    );
}

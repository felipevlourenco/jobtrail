import {
    createContext,
    createElement,
    useCallback,
    useContext,
    useMemo,
    useState,
    type CSSProperties,
    type PropsWithChildren,
    type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Toast, type ToastProps } from '../../components/Toast/Toast';

type ToastOptions = Pick<ToastProps, 'title' | 'type'> & {
    message: ReactNode;
};

type ToastContextValue = {
    // Replaces the current toast, so only one is visible at a time.
    showToast: (toast: ToastOptions) => void;
    hideToast: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const regionStyle: CSSProperties = { position: 'fixed', right: 0, bottom: 0 };

export function ToastProvider({ children }: PropsWithChildren) {
    const [toast, setToast] = useState<ToastOptions | null>(null);

    const showToast = useCallback((next: ToastOptions) => setToast(next), []);
    const hideToast = useCallback(() => setToast(null), []);
    const value = useMemo(
        () => ({ showToast, hideToast }),
        [showToast, hideToast],
    );

    return createElement(
        ToastContext.Provider,
        { value },
        children,
        createPortal(
            // Always mounted, so screen readers announce new toasts.
            createElement(
                'div',
                { role: 'status', style: regionStyle },
                toast &&
                    createElement(
                        Toast,
                        {
                            title: toast.title,
                            type: toast.type,
                            onClose: hideToast,
                        },
                        toast.message,
                    ),
            ),
            document.body,
        ),
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within <ToastProvider>');
    }

    return context;
}

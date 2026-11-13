import {
    ComponentPropsWithoutRef,
    createContext,
    MouseEvent,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import { Button, ButtonProps } from '../Button/Button';
import './Dialog.css';

type DialogContextValue = {
    open: boolean;
    setOpen: (open: boolean) => void;
    titleId: string;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog() {
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error('Dialog components must be used within <Dialog>');
    }

    return context;
}

type DialogProps = {
    children: ReactNode;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};

function DialogRoot({
    children,
    defaultOpen = false,
    onOpenChange,
}: DialogProps) {
    const [open, setOpenState] = useState(defaultOpen);
    const openRef = useRef(defaultOpen);
    const titleId = useId();

    const setOpen = useCallback(
        (nextOpen: boolean) => {
            if (openRef.current === nextOpen) return;

            openRef.current = nextOpen;
            setOpenState(nextOpen);
            onOpenChange?.(nextOpen);
        },
        [onOpenChange],
    );

    return (
        <DialogContext.Provider value={{ open, setOpen, titleId }}>
            {children}
        </DialogContext.Provider>
    );
}

function DialogTrigger({ children, onClick, type, ...props }: ButtonProps) {
    const { setOpen } = useDialog();

    return (
        <Button
            {...props}
            type={type ?? 'button'}
            onClick={(event) => {
                onClick?.(event);

                if (!event.defaultPrevented) {
                    setOpen(true);
                }
            }}
        >
            {children}
        </Button>
    );
}

function DialogTitle({
    children,
    ...props
}: Omit<ComponentPropsWithoutRef<'h2'>, 'id'>) {
    const { titleId } = useDialog();

    return (
        <h2 {...props} id={titleId}>
            {children}
        </h2>
    );
}

type DialogContentProps = Omit<ComponentPropsWithoutRef<'dialog'>, 'open'> & {
    closeOnBackdropClick?: boolean;
};

function DialogContent({
    children,
    closeOnBackdropClick = true,
    onClose,
    onClick,
    ...props
}: DialogContentProps) {
    const { open, setOpen, titleId } = useDialog();

    const dialogRef = useRef<HTMLDialogElement>(null);

    // Synchronize React state with the native dialog.
    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    // Handle native close events.
    function handleClose(event: React.SyntheticEvent<HTMLDialogElement>) {
        // Ignore an old close event if the dialog has already reopened.
        if (!event.currentTarget.open) {
            setOpen(false);
        }

        onClose?.(event);
    }

    // Optional backdrop dismissal.
    function handleClick(event: MouseEvent<HTMLDialogElement>) {
        onClick?.(event);

        if (
            event.defaultPrevented ||
            !closeOnBackdropClick ||
            event.target !== event.currentTarget ||
            event.detail === 0
        ) {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();

        const outside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (outside) {
            event.currentTarget.close();
        }
    }

    return (
        <dialog
            {...props}
            ref={dialogRef}
            className="dialog"
            aria-labelledby={props['aria-labelledby'] ?? titleId}
            onClose={handleClose}
            onClick={handleClick}
        >
            {children}
        </dialog>
    );
}

export const Dialog = Object.assign(DialogRoot, {
    Trigger: DialogTrigger,
    Content: DialogContent,
    Title: DialogTitle,
});

import { ChangeEvent, HTMLAttributes, useId, useState } from 'react';
import './TextField.css';

export interface TextFieldProps extends HTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    label?: string;
    hint?: string;
    error?: string;
}

export function TextField({
    id,
    defaultValue,
    onChange,
    placeholder,
    label,
    hint,
    error,
    ...props
}: TextFieldProps) {
    const fieldId = useId();
    const textFieldId = id ?? fieldId;
    const [value, setValue] = useState(defaultValue ?? '');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onChange?.(event);
    };

    return (
        <div className="textfiled--wrapper">
            {label && (
                <label htmlFor={textFieldId} className="textfiled--label">
                    {label}
                </label>
            )}
            <input
                id={textFieldId}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                className="textfiled--input"
                type="text"
                {...props}
            />
            {hint && !error && (
                <span
                    aria-describedby={textFieldId}
                    className="textfiled--hint"
                >
                    {hint}
                </span>
            )}
            {error && (
                <span
                    aria-describedby={textFieldId}
                    className="textfiled--error"
                >
                    {error}
                </span>
            )}
        </div>
    );
}

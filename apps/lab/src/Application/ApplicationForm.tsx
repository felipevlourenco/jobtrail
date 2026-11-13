import { Button, TextField } from '@repo/ui';
import { useState } from 'react';
import './ApplicationForm.css';

interface ApplicationFormProps {
    onSubmit: () => void;
}

interface ApplicationFormValues {
    company: string;
    role: string;
}
type Optional<T> = { [P in keyof T]?: T[P] };

function parseApplication(formData: FormData): ApplicationFormValues {
    return {
        company: String(formData.get('company') ?? ''),
        role: String(formData.get('role') ?? ''),
    };
}

function ApplicationForm({ onSubmit }: ApplicationFormProps) {
    const [errors, setErrors] =
        useState<Optional<ApplicationFormValues> | null>(null);

    const handleAction = (formData: FormData) => {
        const data = parseApplication(formData);
        let err: Optional<ApplicationFormValues> = {};

        Object.entries(data).forEach(([key, value]) => {
            if (value.length < 1) {
                err = {
                    ...err,
                    [key]: 'required field',
                };
            }
        });

        if (Object.keys(err).length > 0) {
            setErrors(err);
            return;
        }

        // Submit
        onSubmit();
    };

    return (
        <form action={handleAction}>
            <div className="form-container">
                <TextField
                    name="company"
                    placeholder="Company"
                    error={errors?.company}
                />
                <TextField
                    name="role"
                    placeholder="Role"
                    error={errors?.role}
                />
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
}

export default ApplicationForm;

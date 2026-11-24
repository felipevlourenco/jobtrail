import { Button, TextField } from '@jobtrail/ui';
import { useState } from 'react';
import './ApplicationForm.css';

interface ApplicationFormProps {
    onSubmit: ({ company, role }: { company: string; role: string }) => void;
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
    const [formKey, setFormKey] = useState(0);
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
        onSubmit({
            company: data.company,
            role: data.role,
        });
        setErrors(null);
        setFormKey((key) => key + 1);
    };

    return (
        <form action={handleAction} key={formKey}>
            <div className="form-container">
                <TextField
                    name="company"
                    placeholder="company"
                    error={errors?.company}
                />
                <TextField
                    name="role"
                    placeholder="role"
                    error={errors?.role}
                />
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
}

export default ApplicationForm;

import { Button, TextField } from '@jobtrail/ui';
import { useState } from 'react';
import './ApplicationForm.css';

interface ApplicationFormProps {
    onSubmit: ({ title, content }: { title: string; content: string }) => void;
}

interface ApplicationFormValues {
    title: string;
    content: string;
}
type Optional<T> = { [P in keyof T]?: T[P] };

function parseApplication(formData: FormData): ApplicationFormValues {
    return {
        title: String(formData.get('title') ?? ''),
        content: String(formData.get('content') ?? ''),
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
            title: data.title,
            content: data.content,
        });
        setErrors(null);
        setFormKey((key) => key + 1);
    };

    return (
        <form action={handleAction} key={formKey}>
            <div className="form-container">
                <TextField
                    name="title"
                    placeholder="title"
                    error={errors?.title}
                />
                <TextField
                    name="content"
                    placeholder="content"
                    error={errors?.content}
                />
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
}

export default ApplicationForm;

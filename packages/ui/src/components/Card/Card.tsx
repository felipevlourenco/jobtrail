import type { HTMLAttributes } from 'react';
import './Card.css';

type CardHeadingLevel = 1 | 2 | 3 | 4;

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'id'> {
    id: string | number;
    title: string;
    description?: string;
    // default: 2
    headingLevel?: CardHeadingLevel;
}

export function Card({ id, title, description, headingLevel = 2 }: CardProps) {
    const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4';

    return (
        <div className="card">
            <Heading className="card--heading">{title}</Heading>
            {description && <p className="card--description">{description}</p>}
            <input id={`card-input-${id}`} type="text" />
        </div>
    );
}

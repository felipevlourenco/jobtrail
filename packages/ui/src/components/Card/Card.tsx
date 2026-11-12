import type { HTMLAttributes } from 'react';
import './Card.css';

type CardHeadingLevel = 1 | 2 | 3 | 4;

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'id'> {
    id: number;
    header?: string;
    // default: 2
    headingLevel?: CardHeadingLevel;
}

export function Card({ id, header, children, headingLevel = 2 }: CardProps) {
    const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4';

    return (
        <div className="card">
            {header && <Heading className="card--heading">{header}</Heading>}
            {children}
        </div>
    );
}

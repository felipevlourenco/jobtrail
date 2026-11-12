import './Spinner.css';

type SpinnerSizes = 'sm' | 'md' | 'lg';

export const SPINNER_SIZE_MAP: Record<
    SpinnerSizes,
    {
        width: number;
        height: number;
        strokeWidth: number;
    }
> = {
    sm: { width: 16, height: 16, strokeWidth: 3.5 },
    md: { width: 24, height: 24, strokeWidth: 3 },
    lg: { width: 32, height: 32, strokeWidth: 2.4 },
} as const;

export function Spinner({ size }: { size: SpinnerSizes }) {
    const { width, height, strokeWidth } = SPINNER_SIZE_MAP[size];

    return (
        <svg
            className="spinner"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            role="img"
        >
            <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeOpacity={0.25}
                strokeWidth={strokeWidth}
            />
            <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke={'currentColor'}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        </svg>
    );
}

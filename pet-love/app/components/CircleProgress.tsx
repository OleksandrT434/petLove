// components/CircleProgress.tsx
type Props = {
    progress: number
}

export default function CircleProgress({ progress }: Props) {
    const radius = 50
    const circumference = 2 * Math.PI * radius

    return (
        <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
                cx="60" cy="60" r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="6"
            />
            <circle
                cx="60" cy="60" r={radius}
                fill="none"
                stroke="#fff"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress / 100)}
                transform="rotate(-90 60 60)"
            />
            <text x="60" y="67" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700">
                {progress}%
            </text>
        </svg>
    )
}
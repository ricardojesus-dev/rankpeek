import { useMemo } from "react"

type Props = {
  score?: number
}

export default function ScoreCircle({ score = 0 }: Props) {
  const radius = 60
  const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI

  const progress = score / 100
  const strokeDashoffset = circumference - progress * circumference

  const color = useMemo(() => {
    if (score >= 80) return "#4ade80" // green
    if (score >= 50) return "#facc15" // yellow
    return "#f87171" // red
  }, [score])

  return (
    <div className="flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2}>

        {/* Background */}
        <circle
          stroke="#27272a"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 0.6s ease"
          }}
        />

        {/* SCORE TEXT */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fill: color,
            fontSize: "32px",
            fontWeight: "700"
          }}
        >
          {score}
        </text>

      </svg>
    </div>
  )
}
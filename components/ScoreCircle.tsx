import { getSeoGrade } from "@/lib/score/grade"

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

  const { color: gradeColor, grade } = getSeoGrade(score)

  return (
    <div className="flex items-center justify-center">

      <svg height={radius * 2} width={radius * 2}>

        {/* BACKGROUND */}
        <circle
          stroke="#27272a"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* PROGRESS */}
        <circle
          stroke={gradeColor}
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

        {/* SCORE (MAIN) */}
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          fill={gradeColor}
          fontSize="22"
          fontWeight="700"
        >
          {score}
        </text>

        {/* GRADE (SECONDARY) */}
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          fill="#a1a1aa"
          fontSize="12"
          fontWeight="500"
        >
          Grade {grade}
        </text>

      </svg>
    </div>
  )
}
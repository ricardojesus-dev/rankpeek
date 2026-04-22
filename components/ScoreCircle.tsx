// components/ScoreCircle.tsx
import { getSeoGrade } from "@/lib/score/grade"

type Props = {
  score?: number
}

export default function ScoreCircle({ score = 0 }: Props) {
  const radius = 72
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  const { color: gradeColor, grade } = getSeoGrade(score)

  const gradeStyles =
    score >= 80
      ? { badge: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" }
      : score >= 50
      ? { badge: "bg-amber-500/10 border-amber-500/25 text-amber-400" }
      : { badge: "bg-red-500/10 border-red-500/25 text-red-400" }

  return (
    <div className="flex flex-col items-center gap-4">
      <svg height={radius * 2} width={radius * 2}>
        {/* Track */}
        <circle
          stroke="rgba(255,255,255,0.05)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress arc */}
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
            transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)",
            filter: `drop-shadow(0 0 8px ${gradeColor}60)`,
          }}
        />
        {/* Score number */}
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fill={gradeColor}
          fontSize="28"
          fontWeight="700"
          fontFamily="ui-monospace, monospace"
        >
          {score}
        </text>

      </svg>

      {/* Grade badge */}
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-widest border ${gradeStyles.badge}`}>
        GRADE {grade}
      </span>
    </div>
  )
}
export function getSeoGrade(score: number) {
  if (score >= 90) return { grade: "A+", color: "#22c55e" }
  if (score >= 80) return { grade: "A", color: "#22c55e" }
  if (score >= 70) return { grade: "B", color: "#eab308" }
  if (score >= 60) return { grade: "C", color: "#f97316" }
  return { grade: "D", color: "#ef4444" }
}
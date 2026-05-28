'use client'

export interface CitationProps {
  readonly source: string
  readonly detail: string
}

export default function CitationText({ source, detail }: CitationProps) {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-lg bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-900/20 dark:text-amber-100">
      <span className="text-lg">📚</span>
      <div>
        <p className="font-semibold">{source}</p>
        <p className="mt-1 text-amber-800 dark:text-amber-200">{detail}</p>
      </div>
    </div>
  )
}

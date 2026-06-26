import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

export function Textarea({
  hasError = false,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={[
        'min-h-28 w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4',
        hasError
          ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
          : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
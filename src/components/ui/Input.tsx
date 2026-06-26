import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export function Input({
  hasError = false,
  className = '',
  ...props
}: InputProps) {
  return (
    <input
      className={[
        'h-12 w-full rounded-2xl border bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4',
        hasError
          ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
          : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
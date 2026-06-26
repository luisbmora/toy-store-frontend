import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  htmlFor?: string
  error?: string
  helperText?: string
  children: ReactNode
}

export function FormField({
  label,
  htmlFor,
  error,
  helperText,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      {children}

      {error ? (
        <p className="mt-2 text-sm font-medium text-red-500">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-2 text-sm text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
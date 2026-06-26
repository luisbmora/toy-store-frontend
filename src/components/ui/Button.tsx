import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  isFullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white shadow-md hover:bg-blue-600 focus:ring-blue-100',
  secondary: 'bg-yellow-400 text-slate-900 shadow-md hover:bg-yellow-500 focus:ring-yellow-100',
  danger: 'bg-red-500 text-white shadow-md hover:bg-red-600 focus:ring-red-100',
  ghost: 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 focus:ring-slate-100',
}

export function Button({
  children,
  variant = 'primary',
  isFullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        isFullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
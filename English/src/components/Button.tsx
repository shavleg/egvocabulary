import React, { ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 
  | 'primary'      // მწვანე gradient - მთავარი ქმედება
  | 'secondary'    // ლურჯ-მწვანე gradient - ნახვა
  | 'success'      // მწვანე gradient - წარმატებული ქმედება
  | 'danger'       // წითელი - საშიში ქმედება
  | 'info'         // ნაცრისფერი/ლურჯი - ინფო
  | 'warning'      // ნარინჯისფერი - გაფრთხილება
  | 'language'     // gradient - ენის არჩევა
  | 'icon'         // მხოლოდ აიქონი

export type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  title?: string
  icon?: boolean // თუ true, მრგვალი ღილაკი იქნება
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  children,
  className = '',
  type = 'button',
  title,
  icon = false,
}) => {
  const buttonClass = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${icon ? 'btn-icon' : ''} 
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  )
}

export default Button


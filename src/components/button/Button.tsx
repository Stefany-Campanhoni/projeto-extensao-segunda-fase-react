import "./button.css"

type ButtonProps = {
  children: React.ReactNode
  variant?: "primary" | "edit" | "save" | "danger"
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, variant = "primary", onClick, ...props }: ButtonProps) {
  const variantClass = `button--${variant}`

  return (
    <button
      className={variantClass}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

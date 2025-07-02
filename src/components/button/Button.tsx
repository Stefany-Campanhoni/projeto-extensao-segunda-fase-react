import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./button.css"

type ButtonProps = {
  children?: React.ReactNode
  variant?: "primary" | "edit" | "save" | "danger"
  icon?: IconDefinition
  className?: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant,
  icon,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const variantClass = variant ? `button--${variant}` : ""

  return (
    <button
      className={`button ${variantClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="icon"
        />
      )}
      {children}
    </button>
  )
}

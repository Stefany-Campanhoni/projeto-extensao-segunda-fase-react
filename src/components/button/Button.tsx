import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./button.css"

type ButtonProps = {
  children?: React.ReactNode
  variant?: "primary" | "edit" | "save" | "danger"
  icon?: IconDefinition | null
  iconColor?: string
  iconWidth?: number
  className?: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = "primary",
  icon,
  iconColor = undefined,
  iconWidth = 20,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const variantClass = `button--${variant}`

  return (
    <button
      className={`button ${variantClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <FontAwesomeIcon
          width={iconWidth}
          icon={icon}
          color={iconColor}
          className="icon"
        />
      )}
      {children}
    </button>
  )
}

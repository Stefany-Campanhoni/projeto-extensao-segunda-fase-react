import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./button.css"

type ButtonProps = {
  children?: React.ReactNode
  variant?: "primary" | "edit" | "save" | "danger"
  icon?: IconDefinition | null
  iconWidth?: number
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = "primary",
  icon,
  iconWidth = 20,
  onClick,
  ...props
}: ButtonProps) {
  const variantClass = `button--${variant}`

  return (
    <button
      className={`button ${variantClass}`}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <FontAwesomeIcon
          width={iconWidth}
          icon={icon}
          className="icon"
        />
      )}
      {children}
    </button>
  )
}

import { HTMLInputTypeAttribute } from "react"
import { UseFormRegister } from "react-hook-form"
import "./input-field.css"

type InputFieldProps = {
  label: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  error?: string
  type?: HTMLInputTypeAttribute | "textarea"
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

export function InputField({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  className = "",
  ...rest
}: InputFieldProps) {
  return (
    <div className={`input-field-container ${className}`}>
      <label
        htmlFor={name}
        className="input-label"
      >
        {label}
        {required && <span className="required-mark">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          placeholder={placeholder}
          className={`input-element textarea ${error ? "input-error" : ""}`}
          disabled={disabled}
          {...register(name)}
          {...rest}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`input-element ${error ? "input-error" : ""}`}
          disabled={disabled}
          {...register(name)}
          {...rest}
        />
      )}

      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

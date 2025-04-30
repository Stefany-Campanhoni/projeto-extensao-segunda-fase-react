import logo from "@assets/logo.png"
import "./header.css"

type HeaderProps = {
  title: string
  className?: string
}

export function Header({ title, className }: HeaderProps) {
  return (
    <header className={`topbar ${className}`}>
      <img
        src={logo}
        alt="logo.png"
      />
      <h1>{title}</h1>
    </header>
  )
}

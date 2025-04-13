import { Header } from "@components/header/Header"
import "./page.css"

type PageProps = {
  children: React.ReactNode
  className?: string
}

export function Page({ children, className = "" }: PageProps) {
  return (
    <>
      <Header />
      <main className={`page-content ${className}`}>{children}</main>
    </>
  )
}

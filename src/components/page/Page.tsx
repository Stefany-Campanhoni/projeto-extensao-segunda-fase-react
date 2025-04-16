import { Header } from "@components/header/Header"
import "./page.css"

type PageProps = {
  children: React.ReactNode
  className?: string
  title: string
}

export function Page({ children, className = "", title }: PageProps) {
  return (
    <>
      <Header title={title} />
      <main className={`page-content ${className}`}>{children}</main>
    </>
  )
}

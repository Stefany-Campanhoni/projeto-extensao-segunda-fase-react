import { Header } from "@components/header/Header"
import "./page.css"

type PageProps = {
  children: React.ReactNode
  title: string
  className?: string
  headerClass?: string
}

export function Page({
  children,
  title,
  className = "",
  headerClass = "",
}: PageProps) {
  return (
    <>
      <Header title={title} className={headerClass} />
      <main className={`page-content ${className}`}>{children}</main>
    </>
  )
}

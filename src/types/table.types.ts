export type Column<T = any> = {
  key: string
  label: string
  accessor?: (row: T) => React.ReactNode
  className?: string
}

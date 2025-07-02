export type Column<T = Record<string, unknown>> = {
  key: string
  label: string
  accessor?: (row: T) => React.ReactNode
  className?: string
}

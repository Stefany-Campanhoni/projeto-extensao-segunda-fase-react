import { Column } from "@custom-types/types"
import "./table.css"

type TableProps<T> = {
  columns: Column<T>[]
  rowsData: T[]
  classNamed?: string
  emptyText?: string
}

export function Table<T>({ columns, rowsData, classNamed, emptyText = "" }: TableProps<T>) {
  return (
    <table className={`table-container ${classNamed || ""}`}>
      <thead className="table-header">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className={`table-header-cell ${column.className || ""}`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table-body">
        {rowsData.length === 0 ? (
          <tr className="table-empty-row">
            <td
              colSpan={columns.length}
              className="table-empty-cell"
            >
              {emptyText}
            </td>
          </tr>
        ) : (
          rowsData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="table-row"
            >
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  className={`table-cell ${column.className || ""}`}
                >
                  {column.accessor
                    ? column.accessor(row)
                    : (row[column.key as keyof typeof row] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

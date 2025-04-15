import "./table.css"

export type Column = {
  label: string
}

type TableProps<T> = {
  columns: Column[]
  rowsData: T[]
  classNamed?: string
  emptyText?: string
}

export function Table<T>({ columns, rowsData, classNamed, emptyText = "" }: TableProps<T>) {
  return (
    <table className={`table-container ${classNamed}`}>
      <thead className="table-header">
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="table-header-cell"
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
              {columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className="table-cell"
                >
                  {row[column.label as keyof typeof row] as string}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

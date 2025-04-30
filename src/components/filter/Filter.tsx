import { Button } from "@components/button/Button";
import "./filter.css"

export function Filter() {
  return (
    <section className="filter-container">
      <div className="mb-3">
        <label
          htmlFor="nameFilter"
          className="form-label"
        >
          Nome
        </label>
        <input
          type="text"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="specialtyTypeFilter"
          className="form-label"
        >
          Tipo de Especialidade
        </label>
        <input
          type="text"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="cityNameFilter"
          className="form-label"
        >
          Nome da Cidade
        </label>
        <input
          type="text"
          className="form-control"
        />
      </div>

      <div className="mb-3 filter-control">
        <Button
          type="button"
          variant="danger"
        >
          Remover Filtros
        </Button>

        <Button
          type="button"
          variant="edit"
        >
          Filtrar
        </Button>
      </div>
    </section>
  )
}

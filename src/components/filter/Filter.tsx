import { FilterParams } from "@api/api"
import { Button } from "@components/button/Button"
import { useState } from "react"
import "./filter.css"

type FilterProps = {
  onFilter: (filters: FilterParams) => void
  onClearFilters: () => void
}

export function Filter({ onFilter, onClearFilters }: FilterProps) {
  const [filters, setFilters] = useState<FilterParams>({
    name: "",
    cityName: "",
    specialtyType: "",
  })

  const handleInputChange = (field: keyof FilterParams, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFilter = () => {
    const activeFilters: FilterParams = {}
    if (filters.name?.trim()) activeFilters.name = filters.name.trim()
    if (filters.cityName?.trim()) activeFilters.cityName = filters.cityName.trim()
    if (filters.specialtyType?.trim()) activeFilters.specialtyType = filters.specialtyType.trim()

    onFilter(activeFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      name: "",
      cityName: "",
      specialtyType: "",
    })
    onClearFilters()
  }

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
          id="nameFilter"
          type="text"
          className="form-control"
          value={filters.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Digite o nome do mentor"
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
          id="specialtyTypeFilter"
          type="text"
          className="form-control"
          value={filters.specialtyType || ""}
          onChange={(e) => handleInputChange("specialtyType", e.target.value)}
          placeholder="Digite o tipo de especialidade"
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
          id="cityNameFilter"
          type="text"
          className="form-control"
          value={filters.cityName || ""}
          onChange={(e) => handleInputChange("cityName", e.target.value)}
          placeholder="Digite o nome da cidade"
        />
      </div>

      <div className="mb-3 filter-control">
        <Button
          type="button"
          variant="danger"
          onClick={handleClearFilters}
        >
          Remover Filtros
        </Button>

        <Button
          type="button"
          variant="edit"
          onClick={handleFilter}
        >
          Filtrar
        </Button>
      </div>
    </section>
  )
}

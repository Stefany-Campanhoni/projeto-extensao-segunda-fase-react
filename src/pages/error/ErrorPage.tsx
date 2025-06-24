import { Button } from "@components/button/Button"
import { Page } from "@components/page/Page"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useRouteError } from "react-router-dom"
import "./error-page.css"

export function ErrorPage() {
  const navigate = useNavigate()
  const error = useRouteError() as Error

  return (
    <Page title="Erro">
      <div className="error-container">
        <h2>Oops! Algo deu errado</h2>
        <p className="error-message">
          {error?.message || "Página não encontrada"}
        </p>
        <Button
          variant="primary"
          icon={faHome}
          onClick={() => navigate("/dashboard")}
        >
          Voltar ao Dashboard
        </Button>
      </div>
    </Page>
  )
}

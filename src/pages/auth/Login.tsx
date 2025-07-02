import { Button } from "@components/button/Button"
import { InputField } from "@components/input/InputField"
import { Page } from "@components/page/Page"
import { faSignInAlt, faXmark } from "@fortawesome/free-solid-svg-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@security/contexts/AuthContext"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { z } from "zod"
import "./login.css"

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido!" }),
  password: z
    .string()
    .min(1, { message: "Senha é obrigatória" })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true)
    setLoginError(null)

    try {
      await login(data)

      const fromState = (location.state as any)?.from?.pathname
      const lastVisited = localStorage.getItem("last_visited_page")
      const redirectTo = fromState || lastVisited || "/dashboard"

      navigate(redirectTo, { replace: true })
    } catch (error) {
      console.error("Error during login:", error)
      setLoginError("Email ou senha inválidos. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <Page title="Login">
      <div className="login-container">
        <form
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="login-header">
            <h2>Fazer Login</h2>
            <p>Entre com suas credenciais para acessar sua conta</p>
            {loginError && (
              <div
                className="login-error"
                style={{
                  color: "#dc2626",
                  fontSize: "0.875rem",
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "0.375rem",
                }}
              >
                {loginError}
              </div>
            )}
          </div>

          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
            placeholder="Digite seu email"
            required
          />

          <InputField
            label="Senha"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
            placeholder="Digite sua senha"
            required
          />

          <section className="login-actions">
            <Button
              type="button"
              variant="danger"
              icon={faXmark}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="save"
              icon={faSignInAlt}
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </section>

          <div className="auth-divider">
            <span>ou</span>
          </div>

          <div className="mentor-signup-section">
            <p>Não tem uma conta?</p>
            <Button
              type="button"
              variant="edit"
              onClick={() => navigate("/mentors/create")}
              className="mentor-signup-button"
            >
              Faça parte do nosso time de mentores!
            </Button>
          </div>
        </form>
      </div>
    </Page>
  )
}

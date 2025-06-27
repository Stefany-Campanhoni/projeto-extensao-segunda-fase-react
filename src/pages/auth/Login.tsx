import { Button } from "@components/button/Button"
import { InputField } from "@components/input/InputField"
import { Page } from "@components/page/Page"
import { faSignInAlt, faXmark } from "@fortawesome/free-solid-svg-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  async function onSubmit(data: LoginFormData) {
    try {
      // TODO: Implement actual login logic here
      console.log("Login data:", data)

      // For now, just navigate to dashboard after "successful" login
      navigate("/dashboard")
    } catch (error) {
      console.error("Error during login:", error)
    }
  }

  const handleCancel = () => {
    navigate(-1) // Go back to previous page
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
            >
              Entrar
            </Button>
          </section>
        </form>
      </div>
    </Page>
  )
}

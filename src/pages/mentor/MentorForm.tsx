import { Button } from "@components/button/Button"
import { InputField } from "@components/input/InputField"
import { Page } from "@components/page/Page"
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import "./mentor-form.css"

const mentorFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nome é obrigatório" })
    .max(45, { message: "O nome deve ser menor que 45 caracteres!" }),

  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido!" }),

  description: z
    .string()
    .min(1, { message: "Descrição é obrigatória" })
    .max(200, { message: "A descrição não deve exceder 200 caracteres!" }),

  cityId: z.coerce
    .number()
    .int()
    .positive({ message: "Cidade inválida!" })
    .refine((val) => !isNaN(val) && val !== 0, {
      message: "Cidade inválida!",
    }),

  specialtyTypeId: z.coerce
    .number()
    .int()
    .positive({ message: "Tipo de especialidade inválido" })
    .refine((val) => !isNaN(val) && val !== 0, {
      message: "Tipo de especialidade inválido",
    }),

  specialtyId: z.coerce
    .number()
    .int()
    .positive({ message: "Especialidade inválida" })
    .refine((val) => !isNaN(val) && val !== 0, {
      message: "Especialidade inválida",
    }),
})

type ValidationSchemaType = z.infer<typeof mentorFormSchema>

function onSubmit(data: ValidationSchemaType) {
  console.log(data)
}

export function MentorForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(mentorFormSchema),
  })

  return (
    <Page title="Cadastrar Mentor">
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="Nome"
          name="name"
          register={register}
          error={errors.name?.message}
          placeholder="Digite seu nome completo"
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          placeholder="Digite seu email"
        />

        <InputField
          label="Descrição"
          name="description"
          type="textarea"
          register={register}
          error={errors.description?.message}
          placeholder="Descreva suas experiências e habilidades..."
        />

        <div className="input-field-container">
          <label
            htmlFor="cityId"
            className="input-label"
          >
            Cidade
            <span className="required-mark">*</span>
          </label>
          <select
            id="cityId"
            className={`input-element ${errors.cityId ? "input-error" : ""}`}
            {...register("cityId")}
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              Selecione uma cidade
            </option>
          </select>
          {errors.cityId && <span className="error-message">{errors.cityId.message}</span>}
        </div>

        <div className="input-field-container">
          <label
            htmlFor="specialtyTypeId"
            className="input-label"
          >
            Tipo de Especialidade
            <span className="required-mark">*</span>
          </label>
          <select
            id="specialtyTypeId"
            className={`input-element ${errors.specialtyTypeId ? "input-error" : ""}`}
            {...register("specialtyTypeId")}
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              Selecione em qual área sua especialidade se encaixa
            </option>
          </select>
          {errors.specialtyTypeId && (
            <span className="error-message">{errors.specialtyTypeId.message}</span>
          )}
        </div>

        <div className="input-field-container">
          <label
            htmlFor="specialtyId"
            className="input-label"
          >
            Especialidade
            <span className="required-mark">*</span>
          </label>
          <select
            id="specialtyId"
            className={`input-element ${errors.specialtyId ? "input-error" : ""}`}
            {...register("specialtyId")}
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              Selecione sua especialidade
            </option>
          </select>
          {errors.specialtyId && (
            <span className="error-message">{errors.specialtyId.message}</span>
          )}
        </div>
        <section className="button-container">
          <Button
            type="button"
            variant="danger"
            icon={faXmark}
            onClick={() => navigate("/")}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="save"
            icon={faFloppyDisk}
            onClick={() => console.log("oie :3")}
          >
            Salvar
          </Button>
        </section>
      </form>
    </Page>
  )
}

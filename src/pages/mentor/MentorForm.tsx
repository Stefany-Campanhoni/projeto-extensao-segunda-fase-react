import { Page } from "@components/page/Page"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./mentor-form.css"

const mentorFormSchema = z.object({
  name: z.string().max(45, {message: "O nome deve ser menor que 45 caracteres!"}),
  email: z.string().email({message: "Email inválido!"}),
  description: z.string().max(200, {message: "A descrição não deve exceder 200 caracteres!"}),
  cityId: z.number().int().min(1, {message: "Cidade inválida!"}),
  specialtyTypeId: z.number().int().min(1, {message: "Tipo de especialidade inválido"}),
  specialtyId: z.number().int().min(1, {message: "Especialidade inválido"})
})

type ValidationSchemaType = z.infer<typeof mentorFormSchema>

function onSubmit(data: ValidationSchemaType) {
  console.log(data)
}

export function MentorForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({ 
    resolver: zodResolver(mentorFormSchema) 
  })

  return (
    <Page title="Cadastrar Mentor">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            {...register("name")}
            required
          />

          {errors.name && <span className="error-field">{errors.name.message}</span>}
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            {...register("email")} 
            required
          />

          {errors.email && <span className="error-field">{errors.email.message}</span>}
        </label>

        <label htmlFor="description">
          Descrição
          <textarea
            id="description"
            required
          ></textarea>

          {errors.description && <span className="error-field">{errors.description.message}</span>}
        </label>

        <label htmlFor="city">
          Cidade
          <select
            id="city"
            name="city"
            required
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

          {errors.cityId && <span className="error-field">{errors.cityId.message}</span>}
        </label>

        <label htmlFor="specialty-type">
          Tipo de Especialidade
          <select
            id="specialtyType"
            name="specialty-type"
            required
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

          {errors.specialtyTypeId && <span className="error-field">{errors.specialtyTypeId.message}</span>}
        </label>

        <label
          id="specialtyLabel"
          htmlFor="specialty"
        >
          Especialidade
          <select
            id="specialty"
            name="specialty"
            required
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

          {errors.specialtyId && <span className="error-field">{errors.specialtyId.message}</span>}
        </label>
      </form>
    </Page>
  )
}
import {
  create,
  getById,
  getCities,
  getSpecialtiesByType,
  getSpecialtyTypes,
} from "@api/mentor.api"
import { Button } from "@components/button/Button"
import { InputField } from "@components/input/InputField"
import { Page } from "@components/page/Page"
import { City, MentorPayload, Specialty } from "@custom-types/mentor.types"
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
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
    .max(80, { message: "O email deve ser menor que 80 caracteres!" })
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

  specialtyType: z.string().min(1, { message: "O tipo de especialidade é obrigatório" }),

  specialtyId: z.coerce
    .number()
    .int()
    .positive({ message: "Especialidade inválida" })
    .refine((val) => !isNaN(val) && val !== 0, {
      message: "Especialidade inválida",
    }),
})

export type MentorFormData = z.infer<typeof mentorFormSchema>

export function MentorForm() {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MentorFormData>({
    resolver: zodResolver(mentorFormSchema),
  })

  const [cities, setCities] = useState<City[]>([])
  const [specialtyTypes, setSpecialtyTypes] = useState<string[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])

  const specialtyType = watch("specialtyType")

  useEffect(() => {
    populateBaseSelect()
  }, [])

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const mentorData = await getById(Number.parseInt(id))

      setValue("name", mentorData.name)
      setValue("email", mentorData.email)
      setValue("description", mentorData.description)
      setValue("cityId", mentorData.city.id)
      setValue("specialtyType", mentorData.specialty.type)
      setValue("specialtyId", mentorData.specialty.id)

      await populateBaseSelect()

      const specialtiesForType = await getSpecialtiesByType(mentorData.specialty.type)
      setSpecialties(specialtiesForType)
    })()
  }, [id, setValue])

  useEffect(() => {
    ;(async () => {
      if (specialtyType) {
        setSpecialties(await getSpecialtiesByType(specialtyType))
      }
    })()
  }, [specialtyType])

  async function populateBaseSelect() {
    const [types, citiesData] = await Promise.all([getSpecialtyTypes(), getCities()])
    setSpecialtyTypes(types)
    setCities(citiesData)
  }

  async function onSubmit(data: MentorFormData) {
    try {
      await create(data as MentorPayload)
      navigate("/")
    } catch (error) {
      console.error("Error creating mentor:", error)
    }
  }

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
            {cities.map((city) => (
              <option
                key={city.id}
                value={city.id}
              >
                {city.name}
              </option>
            ))}
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
            className={`input-element ${errors.specialtyType ? "input-error" : ""}`}
            {...register("specialtyType")}
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              Selecione em qual área sua especialidade se encaixa
            </option>
            {specialtyTypes.map((specialtyType) => (
              <option
                key={specialtyType}
                value={specialtyType}
              >
                {specialtyType}
              </option>
            ))}
          </select>
          {errors.specialtyType && (
            <span className="error-message">{errors.specialtyType.message}</span>
          )}
        </div>

        {specialtyType && (
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
              {specialties.map((specialty) => (
                <option
                  key={specialty.id}
                  value={specialty.id}
                >
                  {specialty.name}
                </option>
              ))}
            </select>
            {errors.specialtyId && (
              <span className="error-message">{errors.specialtyId.message}</span>
            )}
          </div>
        )}

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
          >
            Salvar
          </Button>
        </section>
      </form>
    </Page>
  )
}

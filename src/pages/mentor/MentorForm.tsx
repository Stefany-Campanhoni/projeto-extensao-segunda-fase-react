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
import { City, Mentor, MentorPayload, Specialty } from "@custom-types/mentor.types"
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MentorFormData>({
    resolver: zodResolver(mentorFormSchema),
  })

  const { id } = useParams()

  const [mentor, setMentor] = useState<Mentor>()
  const [cities, setCities] = useState<City[]>([])
  const [specialtyTypes, setSpecialtyTypes] = useState<string[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const specialtyTypeSelected = useRef(watch("specialtyType"))

  useEffect(() => {
    populateBaseSelect()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!id) return

      const mentor = await getById(Number.parseInt(id))
      setMentor(mentor)
      specialtyTypeSelected.current = mentor.specialty.type

      populateBaseSelect()
      populateSpecialtyField()
    })()
  }, [id])

  useEffect(() => {
    ;(async () => {
      populateSpecialtyField()
    })()
  }, [specialtyTypeSelected.current])

  async function populateBaseSelect() {
    setSpecialtyTypes(await getSpecialtyTypes())
    setCities(await getCities())
  }

  async function populateSpecialtyField() {
    setSpecialties(await getSpecialtiesByType(specialtyTypeSelected.current))
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
          value={mentor ? mentor.name : undefined}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          placeholder="Digite seu email"
          value={mentor ? mentor.email : undefined}
        />

        <InputField
          label="Descrição"
          name="description"
          type="textarea"
          register={register}
          error={errors.description?.message}
          placeholder="Descreva suas experiências e habilidades..."
          value={mentor ? mentor.description : undefined}
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
                value={city.id}
                selected={Boolean(mentor?.city)}
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
                value={specialtyType}
                selected={Boolean(mentor?.specialty)}
              >
                {specialtyType}
              </option>
            ))}
          </select>
          {errors.specialtyType && (
            <span className="error-message">{errors.specialtyType.message}</span>
          )}
        </div>

        {specialtyTypeSelected.current && (
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
                  value={specialty.id}
                  selected={Boolean(mentor?.specialty)}
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

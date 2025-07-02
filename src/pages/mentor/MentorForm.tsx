import {
  createMentor,
  getCities,
  getMentorById,
  getSpecialtiesByType,
  getSpecialtyTypes,
  updateMentor,
} from "@api/api"
import { Button } from "@components/button/Button"
import { InputField } from "@components/input/InputField"
import { Page } from "@components/page/Page"
import { City, MentorPayload, Specialty } from "@custom-types/mentor.types"
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@security/contexts/AuthContext"
import { Role } from "@security/types/auth.types"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { z } from "zod"
import "./mentor-form.css"

const baseMentorFormSchema = z.object({
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

const createMentorFormSchema = baseMentorFormSchema.extend({
  password: z
    .string()
    .min(1, { message: "Senha é obrigatória" })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(100, { message: "A senha deve ter no máximo 100 caracteres" }),
})

const editMentorFormSchema = baseMentorFormSchema

export type CreateMentorFormData = z.infer<typeof createMentorFormSchema>
export type EditMentorFormData = z.infer<typeof editMentorFormSchema>
export type MentorFormData = CreateMentorFormData | EditMentorFormData

export function MentorForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const { user } = useAuth()

  useEffect(() => {
    if (isEditing && user) {
      const mentorId = Number.parseInt(id!)
      if (user.role !== Role.ADMIN && user.id !== mentorId) {
        navigate("/public")
        return
      }
    }
  }, [isEditing, user, id, navigate])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateMentorFormData>({
    resolver: zodResolver(isEditing ? (editMentorFormSchema as any) : createMentorFormSchema),
  })

  const [cities, setCities] = useState<City[]>([])
  const [specialtyTypes, setSpecialtyTypes] = useState<string[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])

  const specialtyType = watch("specialtyType")

  useEffect(() => {
    const loadInitialData = async () => {
      populateBaseSelect()
    }

    loadInitialData()
  }, [])

  useEffect(() => {
    if (!id) return

    const loadMentorData = async () => {
      if (!user?.token) return

      try {
        const mentorData = await getMentorById(Number.parseInt(id), user.token)

        setValue("name", mentorData.name)
        setValue("email", mentorData.email)
        setValue("description", mentorData.description)
        setValue("cityId", mentorData.city.id)
        setValue("specialtyType", mentorData.specialty.type)
        setValue("specialtyId", mentorData.specialty.id)

        await populateBaseSelect()

        const specialtiesForType = await getSpecialtiesByType(mentorData.specialty.type)
        setSpecialties(specialtiesForType)
      } catch (error) {
        console.error("Error loading mentor data:", error)
      }
    }

    loadMentorData()
  }, [id, setValue, user?.token])

  useEffect(() => {
    const loadSpecialties = async () => {
      if (specialtyType) {
        try {
          const specialtiesData = await getSpecialtiesByType(specialtyType)
          setSpecialties(specialtiesData)
        } catch (error) {
          console.error("Error loading specialties:", error)
        }
      }
    }

    loadSpecialties()
  }, [specialtyType])

  async function populateBaseSelect() {
    const [types, citiesData] = await Promise.all([getSpecialtyTypes(), getCities()])
    setSpecialtyTypes(types)
    setCities(citiesData)
  }

  async function onSubmit(data: CreateMentorFormData) {
    try {
      if (isEditing) {
        if (!user?.token) return
        const { password, ...updateData } = data
        await updateMentor(Number.parseInt(id!), updateData as MentorPayload, user.token)
      } else {
        await createMentor(data as MentorPayload)
      }
      navigate("/")
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "creating"} mentor:`, error)
    }
  }

  return (
    <Page title={isEditing ? "Editar Mentor" : "Cadastrar Mentor"}>
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
          required
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          placeholder="Digite seu email"
          required
        />

        {!isEditing && (
          <InputField
            label="Senha"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
            placeholder="Digite sua senha"
            required
          />
        )}

        <InputField
          label="Descrição"
          name="description"
          type="textarea"
          register={register}
          error={errors.description?.message}
          placeholder="Descreva suas experiências e habilidades..."
          required
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
            defaultValue=""
            {...register("cityId")}
          >
            <option
              value=""
              disabled
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
            defaultValue=""
            {...register("specialtyType")}
          >
            <option
              value=""
              disabled
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
              defaultValue=""
              {...register("specialtyId")}
            >
              <option
                value=""
                disabled
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

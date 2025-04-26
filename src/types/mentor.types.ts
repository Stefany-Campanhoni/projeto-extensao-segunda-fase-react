export type City = {
  id: number
  name: string
  state: string
}

export type Specialty = {
  id: number
  name: string
  type: string
}

export type Mentor = {
  id: number
  name: string
  description: string
  email: string
  city: City
  specialty: Specialty
}

export type MentorPayload = Omit<Mentor, "city" | "specialty" | "id"> & {
  id?: number
  cityId: number
  specialtyId: number
}

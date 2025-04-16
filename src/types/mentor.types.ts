type City = {
  name: string
  state: string
}

type Specialty = {
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

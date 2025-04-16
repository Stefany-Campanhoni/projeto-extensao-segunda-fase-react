type City = {
  id: number 
  name: string
  state: string
}

type Specialty = {
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

import type Allergies from "./Allergies"

interface Guest {
    FirstName: string
    Attending: boolean
    Allergies: Allergies[]
}

export default Guest
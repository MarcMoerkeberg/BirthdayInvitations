import type Allergies from "./Allergies"

interface Guest {
    Id: string
    FirstName: string
    Attending: boolean
    Allergies: Allergies
}

export default Guest
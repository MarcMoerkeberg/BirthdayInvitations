export interface NewGuest {
    FirstName: string
    LastName: string
    Attending: boolean
    Allergies: string[]
}
export interface Guest extends NewGuest {
    Id: string
}
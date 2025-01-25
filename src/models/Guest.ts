import type { AttendingType } from "./componentModels/AttendingType"

export interface NewGuest {
    FirstName: string
    LastName: string
    Attending: AttendingType[]
    Allergies: string[]
}
export interface Guest extends NewGuest {
    Id: string
}
import type { Timestamp } from "firebase/firestore"

interface Location {
    Id: string
    Name: string
    Website?: string
    Address: string
    Description: string
    Subtitle?: string
    GooglePlaceId?: string
    AdmissionDate?: Timestamp
    BeginDate: Timestamp
}

export default Location
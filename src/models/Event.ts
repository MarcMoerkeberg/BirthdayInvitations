import type { Timestamp } from "firebase/firestore"

interface Event {
    Id: string
    Name: string
    Subtitle?: string
    BeginDate: Timestamp
    EndDate: Timestamp
    Description: string
}

export default Event
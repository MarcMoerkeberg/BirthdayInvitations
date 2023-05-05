import type Allergies from "@/models/Allergies"
import type Event from "@/models/Event"
import type { Family } from "@/models/Family"
import type { Guest } from "@/models/Guest"
import type { VueDatabaseDocumentData, VueFirestoreDocumentData, VueFirestoreQueryData } from "vuefire"

const fireStoreMappers = {
    mapToFamiliesFromDB(dbFamilyData: VueFirestoreQueryData<Family>): Family[] {
        const mappedFamilies = dbFamilyData.map((family: VueDatabaseDocumentData<Family>) => {
            return {
                ...family as Family,
                Id: family?.id
            }
        }) as Family[]

        return mappedFamilies
    },
    mapToGuestsFromDB(dbGuestData: VueFirestoreQueryData<Guest>): Guest[] {
        const mappedGuests = dbGuestData.map((guest: VueDatabaseDocumentData<Guest>) => {
            return {
                ...guest as Guest,
                Id: guest?.id
            }
        }) as Guest[]

        return mappedGuests
    },
    mapToAllergiesFromDB(dbAllergyData: VueFirestoreDocumentData<Allergies>): Allergies {
        return {
            Id: dbAllergyData?.id,
            Allergies: dbAllergyData?.Allergies ?? []
        } as Allergies
    },
    mapToEventFromDB(dbEventData: VueFirestoreQueryData<Event>): Event {
        const mappedEvents = dbEventData.map((event: VueDatabaseDocumentData<Event>) => {
            return {
                ...event,
                Id: event?.id
            }
        }) as Array<Event>

        return mappedEvents[0]
    },
}

export default fireStoreMappers
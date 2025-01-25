import type Allergies from "@/models/Allergies"
import type Event from "@/models/Event"
import type { Family } from "@/models/Family"
import type { Guest } from "@/models/Guest"
import type Location from "@/models/Location"
import type Menu from "@/models/Menu"
import type MenuItem from "@/models/MenuItem"
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
    mapToEventsFromDB(dbEventData: VueFirestoreQueryData<Event>): Array<Event> {
        const mappedEvents = dbEventData.map((event: VueDatabaseDocumentData<Event>) => {
            return {
                ...event,
                Id: event?.id
            }
        }) as Array<Event>

        return mappedEvents
    },
    mapToLocationFromDB(dbEventData: VueFirestoreQueryData<Location>): Array<Location> {
        const mappedLocations = dbEventData.map((event: VueDatabaseDocumentData<Location>) => {
            return {
                ...event,
                Id: event?.id
            }
        }) as Array<Location>

        return mappedLocations
    },
    mapToMenusFromDB(dbEventData: VueFirestoreQueryData<Menu>): Array<Menu> {
        const mappedMenus = dbEventData.map((menu: VueDatabaseDocumentData<Menu>) => {
            return {
                ...menu,
                Id: menu?.id
            }
        }) as Array<Menu>

        return mappedMenus
    },
    mapToMenuItemsFromDB(dbEventData: VueFirestoreQueryData<MenuItem>): Array<MenuItem> {
        const mappedMenuItems = dbEventData.map((menuItem: VueDatabaseDocumentData<MenuItem>) => {
            return {
                ...menuItem,
                Id: menuItem?.id
            }
        }) as Array<MenuItem>

        return mappedMenuItems
    },
}

export default fireStoreMappers
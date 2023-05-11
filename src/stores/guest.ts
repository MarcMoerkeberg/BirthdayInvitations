import { defineStore } from 'pinia'
import fireStoreMappers from '@/mappers/FireStoreMapper'
import { useFirestore, type VueFirestoreDocumentData, type VueFirestoreQueryData } from 'vuefire'
import type Allergies from '@/models/Allergies'
import type { Guest, NewGuest } from '@/models/Guest'
import type { Family } from '@/models/Family'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import CollectionNames from '@/models/CollectionNames'
import useFamilyStore from './family'
import type { AttendingType } from '@/models/componentModels/AttendingType'
import LocalStorageKey from '@/models/componentModels/LocalStorageKey'

interface GuestState {
  guests: Guest[],
  allergies: Allergies
  guestId?: string
}

const useGuestStore = defineStore({
  id: 'guest',
  state: (): GuestState => {
    return {
      guests: [],
      allergies: { Allergies: [] },
      guestId: undefined
    }
  },

  actions: {
    populateGuestsFromDbData(dbResultData: VueFirestoreQueryData<Guest>) {
      const mappedGuests = fireStoreMappers.mapToGuestsFromDB(dbResultData)
      this.guests = mappedGuests
    },
    populateAllergiesFromDbData(dbResultData: VueFirestoreDocumentData<Allergies>) {
      const mappedAllergies = fireStoreMappers.mapToAllergiesFromDB(dbResultData)
      this.allergies = mappedAllergies
    },
    async createNewGuest(newGuest: NewGuest, family: Family): Promise<boolean> {
      const db = useFirestore()
      const dbResult = await addDoc(collection(db, CollectionNames.Guest), newGuest)
      let dbSuccess = !!dbResult.id

      if (dbSuccess) {
        if (family.Id) {
          const familyStore = useFamilyStore()
          await familyStore.addFamilyMember(family, dbResult.id)
        }

        const createdGuest: Guest = { ...newGuest, Id: dbResult.id }
        this.guests.push(createdGuest)
      }

      return dbSuccess
    },
    async updateGuestAttending(guest: Guest, attending: Array<AttendingType>): Promise<void> {
      const db = useFirestore()
      const guestDocRef = doc(db, CollectionNames.Guest, guest.Id)

      await updateDoc(guestDocRef, { Attending: attending })
    },
    async updateGuestAllergies(guest: Guest, allergies: Array<string>): Promise<void> {
      const db = useFirestore()
      const guestDocRef = doc(db, CollectionNames.Guest, guest.Id)

      await updateDoc(guestDocRef, { Allergies: allergies })
    },
    async setGuestId(guestId: string): Promise<void> {
      const isValidFamilyId = await this.guestExists(guestId)

      if (isValidFamilyId) {
        this.guestId = guestId
        localStorage.setItem(LocalStorageKey.GuestId, guestId)
      }
    },
    async guestExists(guestId: string): Promise<boolean> {
      let validFamilyInDB: boolean | undefined = undefined
      const validGuestInState = !!this.guests.find(guest => guest.Id === guestId)

      if (!validGuestInState) {
        const db = useFirestore()
        const guestDocRef = await doc(db, CollectionNames.Guest, guestId)
        const familyDBResult = await getDoc(guestDocRef)
        validFamilyInDB = !!familyDBResult.data()
      }

      return validGuestInState || !!validFamilyInDB
    }
  },

  getters: {
    getGuestsAssociatedWithFamily: (state: GuestState) => (family: Family): Guest[] => {
      var guestsInFamily: Guest[] = []

      if (family.MemberIds) {
        guestsInFamily = state.guests.filter(guest => family.MemberIds?.includes(guest.Id))
      }

      return guestsInFamily
    },
    getAllGuests: (state: GuestState) => (searchString: string | undefined): Array<Guest> => {
      return searchString
        ? state.guests.filter(guest => guest.FirstName.toLowerCase().includes(searchString.toLowerCase()) || guest.LastName.toLowerCase().includes(searchString.toLowerCase()))
        : state.guests
    },
    getAllFamilyMembersFromCurrentGuestId: (state: GuestState): Array<Guest> => {
      const familyStore = useFamilyStore()
      let allFamilyMembers: Guest[] = []
      const guestFamily: Family | undefined = familyStore.getFamilyFromGuestId(state.guestId ?? '')

      if (guestFamily) {
        allFamilyMembers = state.guests.filter(guest => guestFamily.MemberIds?.find(familyMemberId => familyMemberId === guest.Id))
      }
      else {
        const currentGuest = state.guests.find(guest => guest.Id == state.guestId)

        if (currentGuest) {
          allFamilyMembers.push(currentGuest)
        }
      }

      return allFamilyMembers
    },
    getNumberOfGuestsAttendingByType: (state: GuestState) => (attendingtype: AttendingType): number => {
      return state.guests.filter(guest => guest.Attending.includes(attendingtype)).length
    },
    getTotalNumberOfGuests: (state: GuestState): number => {
      return state.guests.length
    }
  }
})

export default useGuestStore
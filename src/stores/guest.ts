import { defineStore } from 'pinia'
import fireStoreMappers from '@/mappers/FireStoreMapper'
import { useFirestore, type VueFirestoreDocumentData, type VueFirestoreQueryData } from 'vuefire'
import type Allergies from '@/models/Allergies'
import type { Guest, NewGuest } from '@/models/Guest'
import type { Family } from '@/models/Family'
import { addDoc, collection } from 'firebase/firestore'
import CollectionNames from '@/models/CollectionNames'
import useFamilyStore from './family'

interface GuestState {
  guests: Guest[],
  allergies: Allergies
}

const useGuestStore = defineStore({
  id: 'guest',
  state: (): GuestState => {
    return {
      guests: [],
      allergies: { Allergies: [] }
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
        const familyStore = useFamilyStore()
        await familyStore.addFamilyMemberId(family, dbResult.id)

        const createdGuest: Guest = { ...newGuest, Id: dbResult.id }
        this.guests.push(createdGuest)
      }

      return dbSuccess
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
    getAllergyId: (state: GuestState): string | undefined => {
      return state.allergies.Id
    }
  }
})

export default useGuestStore
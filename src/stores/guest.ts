import { defineStore } from 'pinia'
import fireStoreMappers from '@/mappers/FireStoreMapper'
import type { VueFirestoreDocumentData, VueFirestoreQueryData } from 'vuefire'
import type Guest from '@/models/Guest'
import type Allergies from '@/models/Allergies'
import type Family from '@/models/Family'

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
    createNewGuest(newGuest: Guest): void {
      console.log(newGuest)
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
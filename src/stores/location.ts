import { defineStore } from 'pinia'
import type Location from '@/models/Location'
import type { VueFirestoreQueryData } from 'vuefire'
import fireStoreMappers from '@/mappers/FireStoreMapper'

interface GuestState {
  locations: Array<Location>,
}

const useLocationStore = defineStore({
  id: 'location',
  state: (): GuestState => {
    return {
      locations: []
    }
  },

  actions: {
    async populateEventFromDbData(dbResultData: VueFirestoreQueryData<Location>) {
      const mappedLocations = fireStoreMappers.mapToLocationFromDB(dbResultData)
      this.locations = mappedLocations
    }
  },

  getters: {
  }
})

export default useLocationStore
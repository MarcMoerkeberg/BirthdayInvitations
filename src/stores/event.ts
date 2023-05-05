import { defineStore } from 'pinia'
import type Event from '@/models/Event'
import type { VueFirestoreQueryData } from 'vuefire'
import fireStoreMappers from '@/mappers/FireStoreMapper'

interface GuestState {
  event: Event,
}

const useEventStore = defineStore({
  id: 'event',
  state: (): GuestState => {
    return {
      event: {} as Event
    }
  },

  actions: {
    async populateEventFromDbData(dbResultData: VueFirestoreQueryData<Event>) {
      const firstEventMapped = fireStoreMappers.mapToEventFromDB(dbResultData)
      this.event = firstEventMapped
    }
  },

  getters: {
  }
})

export default useEventStore
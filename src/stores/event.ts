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
      const mappedEvents = fireStoreMappers.mapToEventsFromDB(dbResultData)
      this.event = mappedEvents[0]
    }
  },

  getters: {
  }
})

export default useEventStore
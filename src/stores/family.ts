import { defineStore } from 'pinia'
import type Family from '@/models/Family'
import fireStoreMappers from '@/mappers/FireStoreMapper'
import type { VueFirestoreQueryData } from 'vuefire'

interface FamilyState {
  families: Family[]
}

const useFamilyStore = defineStore({
  id: 'family',
  state: (): FamilyState => {
    return {
      families: []
    }
  },

  actions: {
    populateFamiliesFromDbData(dbResultData: VueFirestoreQueryData<Family>) {
      const mappedFamilies = fireStoreMappers.mapToFamiliesFromDB(dbResultData)
      this.families = mappedFamilies
    }
  },

  getters: {
  }
})

export default useFamilyStore
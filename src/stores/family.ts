import { defineStore } from 'pinia'
import fireStoreMappers from '@/mappers/FireStoreMapper'
import { useDocument, useFirestore, type VueFirestoreQueryData } from 'vuefire'
import type { Family, NewFamily } from '@/models/Family'
import { addDoc, collection, doc, getDoc, query, updateDoc } from 'firebase/firestore'
import CollectionNames from '@/models/CollectionNames';
import LocalStorageKey from '@/models/componentModels/LocalStorageKey'

interface FamilyState {
  families: Family[]
  familyId?: string
}

const useFamilyStore = defineStore({
  id: 'family',
  state: (): FamilyState => {
    return {
      families: [],
      familyId: undefined
    }
  },

  actions: {
    populateFamiliesFromDbData(dbResultData: VueFirestoreQueryData<Family>) {
      const mappedFamilies = fireStoreMappers.mapToFamiliesFromDB(dbResultData)
      this.families = mappedFamilies
    },
    async createNewFamily(newFamily: NewFamily): Promise<boolean> {
      const db = useFirestore()
      const dbResult = await addDoc(collection(db, CollectionNames.Family), newFamily)
      if (dbResult) {
        const createdFamily: Family = { ...newFamily, Id: dbResult.id }
        this.families.push(createdFamily)
      }

      return !!dbResult
    },
    async addFamilyMember(family: Family, memberId: string): Promise<void> {
      family.MemberIds?.push(memberId)
      const db = useFirestore()
      const familyDocRef = doc(db, CollectionNames.Family, family.Id)

      await updateDoc(familyDocRef, { MemberIds: family.MemberIds })

      const updatedFamilyIndex: number = this.families.findIndex(stateFamily => stateFamily.Id == family.Id)
      this.families.splice(updatedFamilyIndex, 1, family)
    },
    async setFamilyId(familyId: string): Promise<void> {
      const isValidFamilyId = await this.familyExists(familyId)

      if (isValidFamilyId) {
        this.familyId = familyId
        localStorage.setItem(LocalStorageKey.FamilyId, familyId)
      }
    },
    async familyExists(familyId: string): Promise<boolean> {
      let validFamilyInDB: boolean | undefined = undefined
      const validFamilyInState = !!this.families.find(family => family.Id === familyId)

      if (!validFamilyInState) {
        const db = useFirestore()
        const familyDocRef = await doc(db, CollectionNames.Family, familyId)
        const familyDBResult = await getDoc(familyDocRef)
        validFamilyInDB = !!familyDBResult.data()
      }

      return validFamilyInState || !!validFamilyInDB
    }
  },

  getters: {
    currentFamily: (state: FamilyState) => (): Family | undefined => {
      return state.families.find(family => family.Id === state.familyId)
    }
  }
})

export default useFamilyStore
import { defineStore } from 'pinia'
import fireStoreMappers from '@/mappers/FireStoreMapper'
import { useFirestore, type VueFirestoreQueryData } from 'vuefire'
import type { Family, NewFamily } from '@/models/Family'
import { addDoc, collection, doc, getDoc, query, updateDoc } from 'firebase/firestore'
import CollectionNames from '@/models/CollectionNames';

interface FamilyState {
  families: Family[]
}

const useFamilyStore = defineStore({
  id: 'family',
  state: (): FamilyState => {
    return {
      families: [],
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
    }
  },

  getters: {
    getFamilyIdFromGuestId: (state: FamilyState) => (guestId: string): string | undefined => {
      return state.families.find(family => family.MemberIds?.find(memberId => memberId === guestId))?.Id
    },
    getFamilyFromGuestId: (state: FamilyState) => (guestId: string | undefined): Family | undefined => {
      return state.families.find(family => family.MemberIds?.find(memberId => memberId === guestId))
    },
  }
})

export default useFamilyStore
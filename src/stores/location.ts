import { defineStore } from 'pinia'
import type Location from '@/models/Location'
import type { VueFirestoreQueryData } from 'vuefire'

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
      //TODO: Get data from db and map to internal
      const admissionDates = `Sidste tilmeldingsdato for surf er d. 10/06 og sidste tilmeldingsdato for stranden (med frokost) er d. 17/06.`
      const locationDescription = `Da jeg arbejdede i Løkken lærte jeg nogle ret fede surfer-drenge at kende. Jonas og Kasper ejer biksen og er meget passionerede og dygtige til det de gør.
      Jonas har lovet mig at være instruktør, så vi får en rigtig surf-guru til at lære fra sig. Forudsætningen for surf er at man holder sig ædru på stranden, man kan svømme og man kan give et shaka-tegn 🤙
      Hverken tidligere kendskab til surf eller udstyr er nødvendigt, da Jonas supplerer med både våddragter og brædder til alle som ønsker at deltage.
      Til dem som ikke ønsker at surfe vil der være rig mulighed for diverse spil, bade, gå en tur i byen eller hvadend man nu har lyst til.
      Der vil undervejs være rigeligt med kølige drikkevarer, og snacks, udover det sørger jeg for et par sandwich til middag. Vi mødes på selve stranden ved North Shore Surf.
      Vejret spiller dog en rolle for dette arrangement, og da jeg (desværre) ikke styrer vejret, er vi nødt til at tage den på dagen.
      ${admissionDates}`

      const location: Location = {
        Id: 'VXo8YJ4ebz7HKfoLAQtM',
        Name: 'Surf på Løkken strand.',
        Subtitle: 'Lørdag d. 24 Juni kl 11:00.',
        Address: 'Sdr. Strandvej 18, 9480 Løkken',
        GooglePlaceId: 'ChIJGRKUhfrbSEYRVTGJTYRdL7A',
        Website: 'https://www.northshoresurf.dk/',
        Description: locationDescription
      }

      this.locations.push(location)
    }
  },

  getters: {
  }
})

export default useLocationStore
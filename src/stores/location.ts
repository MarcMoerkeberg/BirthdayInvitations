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
      const surfLocationDescription = `Da jeg arbejdede i Løkken lærte jeg nogle ret fede surfer-drenge at kende. Jonas og Kasper ejer biksen og er meget passionerede og dygtige til det de gør.
      Jonas har lovet mig at være instruktør, så vi får en rigtig surf-guru til at lære fra sig.<br/> Forudsætningen for surf er at man holder sig ædru på stranden, man kan svømme og man kan give et shaka-tegn 🤙
      Hverken tidligere kendskab til surf eller udstyr er nødvendigt, da Jonas supplerer med både våddragter og brædder til alle som ønsker at deltage.<br/>
      Til dem som ikke ønsker at surfe vil der være rig mulighed for diverse spil, bade, gå en tur i byen eller hvadend man nu har lyst til.
      Der vil undervejs være rigeligt med kølige drikkevarer, og snacks, udover det sørger jeg for et par sandwich til middag.<br/> Vi mødes på selve stranden ved North Shore Surf.
      Vejret spiller dog en rolle for dette arrangement, og da jeg (desværre) ikke styrer vejret, er vi nødt til at tage den på dagen.<br/><br/>
      ${admissionDates}`

      const surfLocation: Location = {
        Id: 'VXo8YJ4ebz7HKfoLAQtM',
        Name: 'Surf på Løkken strand.',
        Subtitle: 'Lørdag d. 24 Juni kl 11:00.',
        Address: 'Sdr. Strandvej 18, 9480 Løkken',
        GooglePlaceId: 'ChIJGRKUhfrbSEYRVTGJTYRdL7A',
        Website: 'https://www.northshoresurf.dk/',
        Description: surfLocationDescription
      }

      this.locations.push(surfLocation)

      const locationDescription = `Vi skyder festen igang med nogle sprøde bobler, inden vi sætter os til bords og får noget lækkert at spise.
      Når maden er spist, hjælpes vi ad med at få ryddet af, og derefter bliver der sat gang i musikken og festlighederne kan begynde.<br/>
      Der vil være mulighed for at spille et væld af forskellige spil og der er åben bar med mulighed for selv at lave cocktails, eller blot nyde en kold forfriskning.<br/><br/>
      Sidste tilmeldingsfrist er d. 17/06.
      `

      const festLocation: Location = {
        Id: 'VXo8YJ4ebz7HKfoLAQtM',
        Name: 'Fest på Havrevang.',
        Subtitle: 'Lørdag d. 24 Juni kl 17:00.',
        Address: 'Lønstrupvej 36, 9800 Hjørring',
        GooglePlaceId: 'ChIJx_QxZCLFSEYRoKW4q_d4HIw',
        Website: 'https://havrevang.dk/',
        Description: locationDescription
      }
      this.locations.push(festLocation)
    }
  },

  getters: {
  }
})

export default useLocationStore
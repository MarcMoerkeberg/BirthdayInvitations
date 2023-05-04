import { defineStore } from 'pinia'
import type Event from '@/models/Event'
import type { VueFirestoreQueryData } from 'vuefire'

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
      //TODO: Get data from db and map to internal

      const invitation = `I anledningen af min 30 års fødselsdag holder jeg et lille arrangement her i Nordjylland, helt præcist afholdes det på Løkken strand og på Havregaarden. 
      Fordi der er flere som skal rejse langt, vil der være mulighed for overnatning, med den ene krølle at man skal sørge for at medbringe eget sengetøj og håndklæder.
      Forventer man ikke at benytte overnatningsfaciliteterne, bedes i tage kontakt til mig forud for S.U., da jeg skal lave en plan for hvem som skal sove hvor.
      Arrangementet starter officielt lørdag d. 24/6 kl 11:00, på Løkken strand. Dog er alle velkomne på Havregaarden allerede d. 23/6, fra kl 16:00. 
      Man skal selv sørge for transport til og fra stranden, der går busser, men ellers kan man indbyrdes aftale transport. 
      På stranden vil der være mulighed for at surfe (med instruktør på), der er dog tilmelding til surf senest d. 16/6. 
      Ellers vil der være lidt forskellige spil for dem der er til det. Man kan også fint bare ligge og dase og snakke med alle de andre som er med. Undervejs er der kolde forfriskninger, snacks mv. og jeg sørger for frokost i form af nogle sandwiches. 
      Vi skyder festen igang Kl 17:00 på Havregaarden med lidt bobler. Planen er herefter at vi griller (vejret har dog lidt at sige her), hvis nogen har allergier, må de meget gerne melde det ind i god tid, så menuen kan opdateres derefter. Menuen kan ses under menu punktet. 
      Der vil ikke være noget serveringspersonale. Derfor er det høflig selvbetjening, og efter maden hjælpes vi ad med at ryde af og tage opvask. 
      Når maden er spist og vi har fået et stykke kage, bliver der skruet lidt op for musikken og med fri adgang i baren er jeg sikker på vi nok skal få en fremragende fest! 
      Glæder mig til at se jer alle i weekenden d. 23-25 Juni. 
      Kærlige hilsener fra Marc`

      this.event = { Description: invitation } as Event
    }
  },

  getters: {
  }
})

export default useEventStore
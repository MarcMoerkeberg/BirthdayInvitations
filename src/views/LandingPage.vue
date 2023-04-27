<script setup lang="ts">
import { isMobile } from '@/helpers/EnviorementHelper'
import routes from '@/models/componentModels/Routes'
import { useRouter } from 'vue-router'

const description = `I anledningen af min 30 års fødselsdag holder jeg et lille arrangement her i Nordjylland, helt præcist afholdes det på Løkken strand og på Havregaarden. 
Fordi der er flere som skal rejse langt, vil der være mulighed for overnatning, med den ene krølle at man skal sørge for at medbringe eget sengetøj og håndklæder. 
Arrangementet starter officielt lørdag d. 24/6 kl 11:00, på Løkken strand. Dog er alle velkomne på Havregaarden allerede d. 23/6, fra kl 16:00. 
Man skal selv sørge for transport til og fra stranden, der går busser, men ellers kan man indbyrdes aftale transport. 
På stranden vil der være mulighed for at surfe (med instruktør på), der er dog tilmelding til surf senest d. 16/6. 
Ellers vil der være lidt forskellige spil for dem der er til det. Man kan også fint bare ligge og dase og snakke med alle de andre som er med. Undervejs er der kolde forfriskninger, snacks mv. og jeg sørger for frokost i form af nogle sandwiches. 
Vi skyder festen igang Kl 17:00 på Havregaarden med lidt bobler. Planen er herefter at vi griller (vejret har dog lidt at sige her), hvis nogen har allergier, må de meget gerne melde det ind i god tid, så menuen kan opdateres derefter. Menuen kan ses under menu punktet. 
Der vil ikke være noget serveringspersonale. Derfor er det høflig selvbetjening, og efter maden hjælpes vi ad med at ryde af og tage opvask. 
Når maden er spist og vi har fået et stykke kage, bliver der skruet lidt op for musikken og med fri adgang i baren er jeg sikker på vi nok skal få en fremragende fest! 
Glæder mig til at se jer alle i weekenden d. 23-25 Juni. 
Kærlige hilsener fra Marc`

const router = useRouter()
const heroButtonRoutes = routes.getHeroButtonsRouteDetails()
const isMobileDevice = isMobile()

//Tilføj deltager til stranden/ frokost
//Tilføj surf
</script>

<template>
  <v-container v-if="isMobileDevice"
               class="overlap-banner vertical-center btn-container">
    <v-btn v-for="routeDetail in heroButtonRoutes"
           size="large"
           color="var(--vuetify-secondary)"
           @click="router.push(routeDetail.Route)">{{ routeDetail.Title }}</v-btn>
  </v-container>
  <v-row v-else
         class="overlap-banner horizontal-center">
    <v-col cols="6"
           offset="5">
      <v-card title="Invitation"
              subtitle="Marc's 30 års fødselsdag d. 23-25 Juni."
              :text="description" />
    </v-col>
  </v-row>

  <video autoplay
         loop
         muted
         class="video">
    <source src="../assets/video/4000-1_04925.mp4"
            type="video/mp4">
  </video>
</template>

<style scoped>
.v-btn {
  max-width: 14em;
}

.video {
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  position: relative;
  object-position: 30%;
}

.btn-container {
  flex-direction: column;
  gap: 40px;
  width: 100vw;
  height: calc(100vh - 64px);
  flex-wrap: wrap-reverse;
  margin-top: 64px;
}

@media (min-width: 1024px) {
  .video {
    margin-top: var(--minus-vuetify-app-bar-margin)
  }
}
</style>







<script setup lang="ts">
import { isMobile } from '@/helpers/EnviorementHelper'
import routes from '@/models/componentModels/Routes'
import { useRouter } from 'vue-router'

const description = `I anledningen af min 30 års fødselsdag holder jeg et lille arrangement her i Nordjylland, helt præcist afholdes det på Løkken stand og på Havregaarden.`
const description2 = `Fordi der er flere som skal rejse langt, vil der være mulighed for overnatning, med den ene krølle at man skal sørge for at medbringe eget sengetøj.`
const description3 = `Arrangementet starter officielt lørdag d. 24/6 kl 11:00 på Løkken strand. Dog er alle velkomne på Havregaarden allerede d. 23/6, fra kl 16:00.`
const description4 = `Man skal selv sørge for transport til og fra stranden, der går busser, men ellers kan man indbyrdes aftale trnasport.`
const description5 = `På stranden vil der være mulighed for at surfe (med indstruktør på), der er dog tilmelding til surf senest d. 16/6.`
const description6 = `Ellers vil der være lidt forskellige spil for dem der er til det. Man kan også fint bare ligge og dase og snakke med alle de andre som er med. Undervejs er der kolde forfriskninger, snacks mv. og jeg sørger for frokost i form af nogle sandwiches.`
const description7 = `Vi skyder festen igang Kl 17:00 på Havregaarden med lidt bobler. Planen er herefter at vi griller (vejret har dog lidt at sige her), hvis nogen har allergier, må de meget gerne melde det ind i god tid, så menuen kan opdateres derefter. Menuen kan ses under menu punktet.`
const description8 = `Der vil ikke være noget serveringspersonale. Derfor er det høflig selvbetjening, og så gerne vi hjælper hinanden med at ryde af, inden festen rigtig starter.`
const description9 = `Når maden er spist og vi har fået et stykke kage, bliver der skruet lidt op for musikken og med fri adgang i baren er jeg sikker på vi nok skal få en fremragende fest!`
const description10 = `Glæder mig til at se jer alle i weekenden d. 23-25 Juni.`
const description11 = `Kærlige hilsener fra Marc`

const router = useRouter()
const heroButtonRoutes = routes.getHeroButtonsRouteDetails()
const isMobileDevice = isMobile()

//Tilføj deltager til stranden/ frokost
//Tilføj surf
</script>

<template>
  <v-container class="overlap-banner vertical-center btn-container"
               v-if="isMobileDevice">
    <v-btn v-for="routeDetail in heroButtonRoutes"
           size="large"
           color="var(--vuetify-secondary)"
           @click="router.push(routeDetail.Route)">{{ routeDetail.Title }}</v-btn>
  </v-container>
  <video autoplay
         loop
         muted
         class="video">
    <source src="../assets/video/4000-1_04925.mp4"
            type="video/mp4">
  </video>
  <!-- <v-sheet>
    <div>{{ description }}</div>
    <div>{{ description2 }}</div>
    <div>{{ description3 }}</div>
    <div>{{ description4 }}</div>
    <div>{{ description5 }}</div>
    <div>{{ description6 }}</div>
    <div>{{ description7 }}</div>
    <div>{{ description8 }}</div>
    <div>{{ description9 }}</div>
    <div>{{ description10 }}</div>
    <div>{{ description11 }}</div>
  </v-sheet> -->
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







<script setup lang="ts">
import { isMobile } from '@/helpers/EnviorementHelper'
import routes from '@/models/componentModels/Routes'
import { useRouter } from 'vue-router'
import EventComponent from '@/components/EventComponent.vue'
import { computed } from 'vue'

const router = useRouter()
const heroButtonRoutes = computed(() => { return routes.getHeroButtonsRouteDetails() })
const isMobileDevice = isMobile()
</script>

<template>
  <v-container v-if="isMobileDevice"
               class="overlap-banner vertical-center btn-container">
    <v-btn v-for="routeDetail in heroButtonRoutes"
           size="large"
           color="secondary"
           @click="router.push(routeDetail.Route)">{{ routeDetail.Title }}</v-btn>
  </v-container>
  <v-row v-else
         class="overlap-banner horizontal-center">
    <v-col cols="6"
           offset="5">
      <EventComponent />
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
}

.video {
  margin-top: var(--minus-vuetify-app-bar-margin)
}
</style>







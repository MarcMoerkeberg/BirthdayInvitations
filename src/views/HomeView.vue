<script setup lang="ts">
import { collection } from '@firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';

const db = useFirestore()
// const hej = query(collection(db, 'Users'))
// const items = await getDocs(hej)

// items.forEach(doc => console.log(doc.data()))
const allUsers = useCollection(collection(db, 'Users'))

</script>

<template>
  <v-row v-for="user in allUsers">
    <v-col cols="6">
      <v-card color="secondary">
        <v-card-title>
          Hello {{ user.FirstName + ' ' + user.LastName }}!
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

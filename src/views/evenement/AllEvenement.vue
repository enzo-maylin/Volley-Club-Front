<template>
<div class="container mt-5 pt-5">
  <h2 class="text-center mb-4">Liste des Événements</h2>
  <div class="row">
    <BoiteEvenement
    v-for="evenement in allEvenements"
    :key="evenement.id"
    :evenement="evenement"
    @delete-evenement="removeEvenement"
    />

  </div>
</div>

</template>

<script setup lang="ts">
import type {Ref} from 'vue';
import {ref} from 'vue';
import type {Evenement} from '@/types';
import {APIStore} from '@/util/APIStore';
import BoiteEvenement from '@/components/entity/BoiteEvenement.vue';

const allEvenements: Ref<Evenement[]> = ref([]);
  APIStore.getAll('evenements')
    .then(responseJSON => {
      allEvenements.value=responseJSON["member"];
    });
function removeEvenement(idEvenement: string) {
  allEvenements.value = allEvenements.value.filter(e => e.id !== idEvenement);
}
</script>

<template>
  <div class="container mt-5 pt-5">
    <h2 class="text-center mb-4">Liste des Clubs</h2>
    <div class="row">
      <BoiteClub
        v-for="club in allClubs"
        :key="club.id"
        :club="club"
      />

    </div>
  </div>

</template>

<script setup lang="ts">
import type {Ref} from 'vue';
import {ref} from 'vue';
import type {Club} from '@/types';
import {APIStore} from '@/util/APIStore';
import BoiteClub from '@/components/entity/BoiteClub.vue';

const allClubs: Ref<Club[]> = ref([]);

APIStore.getAll('clubs')
  .then(responseJSON => {
    allClubs.value = responseJSON.member;
  });

</script>

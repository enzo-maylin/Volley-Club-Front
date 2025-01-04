<template>
  <div class="container mt-5 pt-5">
    <h2 class="text-center mb-4">Liste des Équipes du club {{club.nom}}</h2>
    <div class="row">
      <BoiteEquipe
        v-for="equipe in allEquipe"
        :key="equipe.id"
        :equipe="equipe"
      />

    </div>
  </div>

</template>

<script setup lang="ts">
import type {Ref} from 'vue';
import {ref} from 'vue';
import type {Club, Equipe} from '@/types';
import {APIStore} from '@/util/APIStore';
import BoiteEquipe from "@/components/entity/BoiteEquipe.vue";
import {useRoute} from "vue-router";

  const route = useRoute();
  const idClub = route.params.id
  const club = ref<Club>({
    id: Number(route.params.id),
    nom: "chargement ...",
    coach: null,
    equipes: null,
  });
  APIStore.getById('clubs', Number(idClub))
  .then(reponseJSON => {
    club.value = reponseJSON;
  });

const allEquipe: Ref<Equipe[]> = ref([]);

APIStore.getIdById('clubs', 'equipes' , Number(idClub))
  .then(responseJSON => {
    allEquipe.value = responseJSON.member;
  });

</script>

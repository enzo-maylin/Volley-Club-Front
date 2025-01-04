<template>
  <div class="container mt-5 pt-5">
    <h2 class="text-center mb-4">Liste des Utilisateurs</h2>
    <div class="row">
      <BoiteUtilisateur
        v-for="utilisateur in allUtilisateurs"
        :key="utilisateur.id"
        :utilisateur="utilisateur"
       :info-annuaire="null"/>

    </div>
  </div>

</template>

<script setup lang="ts">
import type {Ref} from 'vue';
import {ref} from 'vue';
import type {Utilisateur} from '@/types';
import {APIStore} from '@/util/APIStore';
import BoiteUtilisateur from "@/components/entity/BoiteUtilisateur.vue";

const allUtilisateurs: Ref<Utilisateur[]> = ref([]);

APIStore.getAll('utilisateurs')
  .then(responseJSON => {
    allUtilisateurs.value=responseJSON["member"];
  });

</script>

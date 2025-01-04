<script setup lang="ts">
import type {InfoAnnuaire} from '@/types';

defineProps<{infoAnnuaire: InfoAnnuaire|null}>();
</script>

<template>
  <div v-if="infoAnnuaire">
    <p class="card-text"><strong>Numéro de ligne fixe :</strong> {{ infoAnnuaire.landlineNumber }}</p>
    <p class="card-text"><strong>Dernière mise à jour :</strong> {{ infoAnnuaire.updatedAt }}</p>
    <p class="card-text"><strong>Pays :</strong> {{ infoAnnuaire.country }}</p>
    <p class="card-text"><strong>Département :</strong> {{ infoAnnuaire.department }}</p>
    <p class="card-text"><strong>Fonction :</strong> {{ infoAnnuaire.function }}</p>
    <p class="card-text"><strong>Adresse postale :</strong> {{ infoAnnuaire.postalAdresse }}</p>
    <p class="card-text"><strong>Nom :</strong> {{ infoAnnuaire.lastName }}</p>
    <p class="card-text"><strong>Prénom :</strong> {{ infoAnnuaire.firstName }}</p>
    <p class="card-text"><strong>Dernière connexion :</strong> {{ infoAnnuaire.lastSignin }}</p>
  </div>
</template>

<script setup lang="ts">
import type {InfoAnnuaire, Utilisateur} from "@/types";
import BoiteUtilisateur from "@/components/entity/BoiteUtilisateur.vue";
import router from "@/router";

defineProps<{user: Utilisateur, infoAnnuaire: InfoAnnuaire|null}>();

</script>

<template>
  <div class="container mt-5 pt-5">
    <div class="card shadow-lg p-4 bg-light position-static">
      <h2 class="text-center mb-4 text-primary">Profil de {{ user.login }}</h2>
      <div class="row justify-content-center">
        <!-- Composant utilisateur avec un style centré -->
        <BoiteUtilisateur :utilisateur="user" :infoAnnuaire="infoAnnuaire"/>
      </div>
      <!-- Bouton Modifier le profil visible uniquement si l'utilisateur connecté est le même -->
      <div class="text-center mt-4">
        <button
          class="btn btn-primary btn-lg"
          @click="router.push({ name: 'updateProfil' })"
        >
          Modifier Mon Profil
        </button>
      </div>
    </div>
  </div>
</template>

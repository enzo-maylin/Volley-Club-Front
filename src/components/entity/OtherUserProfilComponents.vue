<script setup lang="ts">
import type {Utilisateur, InfoAnnuaire} from "@/types";
import {UserStore} from "@/util/UserStore";
import BoiteInfoAnnuaire from "@/components/entity/BoiteInfoAnnuaire.vue";
defineProps<{user: Utilisateur, infoAnnuaire: InfoAnnuaire|null}>();

</script>

<template>
  <div class="container mt-5 pt-5 ">
    <div class="card shadow-lg p-4 bg-light position-static">
      <h2 class="text-center mb-4 text-primary">Profil de {{ user.login }}</h2>
      <div class="row justify-content-center" v-if="user.id !== UserStore.utilisateurConnecte?.id">
        <div class="card-body">
          <h5 class="card-title">
            <strong>{{ user.login }}</strong>
          </h5>
          <p class="card-text"><strong>Adresse e-mail :</strong> {{ user.adresseEmail }}</p>
          <BoiteInfoAnnuaire :info-annuaire="infoAnnuaire" />
        </div>
      </div>
    </div>
  </div>
</template>

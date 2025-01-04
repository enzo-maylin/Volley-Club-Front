<template>
  <div class="container mt-5 pt-5">
    <div class=" shadow-lg p-4 bg-light">
      <h2 class="text-center mb-4 text-success">Informations du Club</h2>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <p class="fs-5"><strong>Nom du club :</strong> {{ club.nom }}</p>
        </div>
      </div>
      <div class="text-center mt-4">
        <button class="btn btn-danger btn-lg" @click="deleteClub">
          Supprimer
        </button>
      </div>
    </div>

    <!-- Section des équipes -->
    <div class="mt-5">
      <h3 class="text-center text-primary mb-4">Liste des Équipes</h3>
      <div class="row">
        <div v-for="equipe in club.equipes" :key="equipe.id" class="col-md-4 mb-4">
          <!-- Card pour chaque équipe -->
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title text-center">{{ equipe.nom || 'Nom non spécifié' }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import {useRouter} from "vue-router";
import { APIStore } from "@/util/APIStore";
import { ref } from "vue";
import {UserStore} from "@/util/UserStore";
import type {Club} from "@/types";
import {notify} from "@kyvg/vue3-notification";
const router = useRouter();

const club=ref<Club>({
  id:-1,
  nom:"Chargement",
  coach:UserStore.utilisateurConnecte,
  equipes:[]
});

if (UserStore.utilisateurConnecte!.club !== null) {
  club.value = UserStore.utilisateurConnecte!.club;
}

function deleteClub(){
  APIStore.deleteById('clubs',club.value.id).then(
    () => {
      notify({
        type: "success",
        title: "Supprésion réussie",
        text: "Club a plus",
      });
      UserStore.utilisateurConnecte!.club=null
      router.push("home")
    }
  )
}
</script>

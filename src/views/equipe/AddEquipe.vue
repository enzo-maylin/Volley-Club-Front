<template>
  <div class="container my-5 pt-5">
    <h2 class="text-center mb-4 fw-bold text-primary">Créer une équipe</h2>
    <div class="card shadow border-0">
      <div class="card-body p-4">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="nom" class="form-label fw-semibold">Nom de l'équipe</label>
            <input
              v-model="equipe.nom"
              id="nom"
              type="text"
              class="form-control"
              placeholder="Entrez le nom"
              required
            />
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-primary">Créer l'équipe</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import { APIStore } from "@/util/APIStore";
import { ref } from "vue";
import {notify} from "@kyvg/vue3-notification";
const router = useRouter();
const equipe = ref({
  nom: "",
});

async function submitForm(){

  await APIStore.createRessource('equipes',equipe.value)
    .then( statut => {
      if (statut.success) {
        notify({
          type: "success",
          title: "Équipe ajouté !",
        });
        router.push({ name: 'home' });
      }
      else {
        notify({
          type: "error",
          title: "Echec de l'ajout de l'équipe,",
          text: statut.error,
        });
      }
    })
}
</script>

<template>
  <div class="container my-5 pt-5">
    <h2 class="text-center mb-4 fw-bold text-primary">Créer un Événement</h2>
    <div class="card shadow border-0">
      <div class="card-body p-4">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="nom" class="form-label fw-semibold">Nom de l'événement</label>
            <input
              v-model="form.nom"
              id="nom"
              type="text"
              class="form-control"
              placeholder="Entrez le nom"
              required
            />
          </div>

          <div class="mb-3">
            <label for="adresse" class="form-label fw-semibold">Adresse</label>
            <input
              v-model="form.adresse"
              id="adresse"
              type="text"
              class="form-control"
              placeholder="Entrez l'adresse"
              required
            />
          </div>

          <div class="mb-3">
            <label for="prix" class="form-label fw-semibold">Prix</label>
            <input
              v-model.number="form.prix"
              id="prix"
              type="number"
              class="form-control"
              placeholder="Prix d'entrée"
              min="0"
              required
            />
          </div>

          <div class="mb-3">
            <label for="equipeMax" class="form-label fw-semibold">Nombre maximum d'équipes</label>
            <input
              v-model.number="form.equipeMax"
              id="equipeMax"
              type="number"
              class="form-control"
              placeholder="Nombre maximum"
              min="1"
              required
            />
          </div>

          <div class="mb-3">
            <label for="cashPrize" class="form-label fw-semibold">Cash Prize</label>
            <input
              v-model.number="form.cashPrize"
              id="cashPrize"
              type="number"
              class="form-control"
              placeholder="Montant du cash prize"
              min="0"
              required
            />
          </div>

          <div class="mb-3">
            <label for="public" class="form-label fw-semibold">Public</label>
            <div class="form-check form-switch">
              <input
                v-model="form.public"
                id="public"
                type="checkbox"
                class="form-check-input"
              />
              <label class="form-check-label" for="public">
                L'événement est-il public ?
              </label>
            </div>
          </div>

          <div class="mb-3">
            <label for="dateDebut" class="form-label fw-semibold">Date de début</label>
            <input
              v-model="form.dateDebut"
              id="dateDebut"
              type="datetime-local"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="dateFin" class="form-label fw-semibold">Date de fin</label>
            <input
              v-model="form.dateFin"
              id="dateFin"
              type="datetime-local"
              class="form-control"
              required
            />
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-primary">Créer l'Événement</button>
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
const form = ref({
      nom: "",
      adresse: "",
      prix: 0,
      equipeMax: 4,
      cashPrize: 0,
      public: true,
      dateDebut: new Date().toISOString().slice(0, 16), // Format initial pour input datetime-local
      dateFin: new Date().toISOString().slice(0, 16),
    });
async function submitForm(){

  const evenement = {"nom":form.value.nom,'adresse':form.value.adresse,'prix':form.value.prix,"equipeMax":form.value.equipeMax,
    "cashPrize":form.value.cashPrize,"public":form.value.public,"dateDebut":form.value.dateDebut,"dateFin":form.value.dateFin
  };
  if(new Date(form.value.dateDebut).getTime() < Date.now() || new Date(form.value.dateDebut).getTime() > new Date(form.value.dateFin).getTime()){
    notify({
      type: "error",
      title: "Error date",
      text: "Erreur avec les dates",
    });
  }else if(form.value.nom.length<3 || form.value.adresse.length<3 || form.value.prix<0 || form.value.cashPrize<0){
    notify({
      type: "error",
      title: "Error données",
      text: "Erreur avec les données",
    });
  }else{
    APIStore.createRessource('evenements',evenement)
      .then(( statut => {
      if( statut.success ){
        notify({
          type: "success",
          title: "Félicitations !",
          text: "Votre événement a été créé avec succès.",
        });
        router.push({ name: 'home' });
      }
      else {
        notify({
          type: "error",
          title: "Désolé,",
          text: statut.error,
        });
      }
    }))
  }

}
</script>

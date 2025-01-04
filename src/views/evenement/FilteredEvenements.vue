<template>
  <div class="container mt-5 pt-5">
    <h2 class="text-center mb-4">Liste des Événements</h2>

    <!-- Formulaire pour entrer l'email -->
    <div class="mb-4 text-center ">
      <label for="email" class="form-label">Entrez l'email de l'organisateur</label>
      <input
        v-model="emailOrganisateur"
        type="email"
        id="email"
        class="form-control mx-auto"
        :placeholder="emailOrganisateurChoose"
        @input="selectEmailOrganisateur(emailOrganisateur)"
      />

      <!-- Liste des suggestions d'emails -->
      <ul v-if="emailSuggestions.length > 0" class="list-group w-100 mt-2">
        <li
          v-for="(emailOrganisateur, index) in emailSuggestions"
          :key="index"
          class="list-group-item list-group-item-action"
          @click="selectEmailOrganisateur(emailOrganisateur)"
        >
          {{ emailOrganisateur }}
        </li>
      </ul>
    </div>

    <!-- Liste des événements -->
    <div class="row pt-5" v-if="evenements.length > 0">
      <BoiteEvenement
        v-for="evenement in evenements"
        :key="evenement.id"
        :evenement="evenement"
        class="col-md-4 mb-4"
      />
    </div>
    <h3 v-else> Aucun Evenement pour l'organisateur {{emailOrganisateurChoose}} </h3>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from 'vue';
import {ref} from 'vue';
import type {Evenement, Utilisateur} from '@/types';
import {APIStore} from '@/util/APIStore';
import BoiteEvenement from '@/components/entity/BoiteEvenement.vue';
import {notify} from "@kyvg/vue3-notification";

// Déclaration des refs
  const evenements: Ref<Evenement[]> = ref([]);
  const emailOrganisateur = ref('');
  const emailOrganisateurChoose = ref('exemple@domaine.com');
  const emailSuggestions: Ref<string[]> = ref([]);
  const allEmailOrganisateur:Ref<string[]> = ref([]);
  let organisateur: Utilisateur[];
  async function getEmailOrganisateur() {
    const users: { member: Utilisateur[] } = await APIStore.getAll('utilisateurs');

    organisateur = users.member.filter((user) =>
      user.roles.includes('ROLE_ORGANISATEUR')
    );

    allEmailOrganisateur.value = organisateur.map( (user:Utilisateur) => user.adresseEmail);
  }

  getEmailOrganisateur()

  function fetchEvenements () {
    if (emailOrganisateur.value) {
      //filtre pour la sugestion
      emailSuggestions.value = allEmailOrganisateur.value.filter(email =>
        email.toLowerCase().includes(emailOrganisateur.value.toLowerCase())
      );

      //On recup l'id de l'organisateur
      const chooseOrganisateur:Utilisateur |undefined = organisateur.find((user:Utilisateur) => user.adresseEmail==emailOrganisateur.value )
      if(chooseOrganisateur){
        APIStore.getAll(`utilisateurs/${chooseOrganisateur.id}/evenementsOrganises`)
          .then(responseJSON => {
            evenements.value = responseJSON["member"];
            emailOrganisateurChoose.value=emailOrganisateur.value;
            emailOrganisateur.value='';
            emailSuggestions.value=[];

            notify({
              type: "success",
              title: "Affichage des Evenements",
            });
          })
      }

    } else {
      emailSuggestions.value = [];
    }
  }
  function selectEmailOrganisateur (chooseEmailOrganisateur: string)  {
    emailOrganisateur.value = chooseEmailOrganisateur;
    emailSuggestions.value = [];
    fetchEvenements();
  }

</script>

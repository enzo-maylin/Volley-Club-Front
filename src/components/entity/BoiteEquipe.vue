
<script setup lang="ts">
import type {Equipe, Utilisateur} from '@/types';
import {APIStore} from "@/util/APIStore";
import {notify} from "@kyvg/vue3-notification";
import {ref} from "vue";
import {UserStore} from "@/util/UserStore";
defineProps<{equipe: Equipe}>();

const user = UserStore.utilisateurConnecte;
const motDePasse = ref('');

function inscrireEquipe(utilisateur: Utilisateur|null, equipe: Equipe){
  if(utilisateur==null) return;
  APIStore.updateRessource(`utilisateurs/${utilisateur.id}`,{equipe:equipe.id,currentPlainPassword:motDePasse.value})
    .then(response =>{
      if(response.success){
        notify({
          type: "success",
          title: "Inscription réussi",
        })
      }else{
        notify({
          type: "error",
          title: "Erreur lors de l'inscription",
        })
      }
    })
  motDePasse.value=''
}

</script>

<template>
  <div class="modal fade" :id="'Modal_' + equipe.id" tabindex="-1" :aria-labelledby="'ModalLabel_'+equipe.id" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" :id="'ModalLabel_' + equipe.id">S'inscrire dans l'équipe {{equipe.nom}}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form mb-3">
            <input type="password" class="form-control" placeholder="Mot de passe" v-model="motDePasse">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="inscrireEquipe(user, equipe)">Sauvegarder</button>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-6 mb-4">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <h5 class="card-title ">{{ equipe.nom }} </h5>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end" v-if="user?.equipe != null && user.equipe.id != equipe.id ||  user?.equipe == null">
          <button type="button"  class="btn btn-outline-danger" data-bs-toggle="modal" :data-bs-target="'#Modal_'+equipe.id">S'inscrire</button>
        </div>
      </div>
    </div>
  </div>
</template>



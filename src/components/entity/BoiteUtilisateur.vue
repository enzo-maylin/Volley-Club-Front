<script setup lang="ts">
import type {Utilisateur, InfoAnnuaire} from '@/types';
import {UserStore} from "@/util/UserStore";
import {ref} from "vue";
import {APIStore} from "@/util/APIStore";
import {notify} from "@kyvg/vue3-notification";
import DeleteUser from "@/views/user/DeleteUser.vue";
import BoiteInfoAnnuaire from "@/components/entity/BoiteInfoAnnuaire.vue";

defineProps<{utilisateur: Utilisateur, infoAnnuaire: InfoAnnuaire|null}>();
const listeRole = ref([
  "ROLE_COACH",
  "ROLE_ORGANISATEUR",
  "ROLE_ADMIN"
])

const motDePasse = ref('');
let oldRoles:string[] = [];

function addRole(role:string,Utilisateur:Utilisateur){
  if(oldRoles.length==0) oldRoles= Utilisateur.roles
  Utilisateur.roles.push(role)
}
function removeRole(role:string,Utilisateur:Utilisateur){
  if(oldRoles.length==0) oldRoles= Utilisateur.roles
  Utilisateur.roles = Utilisateur.roles.filter(item => item !== role);
}
function sauvegarderRole(Utilisateur:Utilisateur){
  APIStore.updateRessource(`utilisateurs/${Utilisateur.id}`,{roles:Utilisateur.roles,currentPlainPassword:motDePasse.value})
    .then(response =>{
        if(response.success){
          notify({
            type: "success",
            title: "Role enregistré",
          })
        }else{
          notify({
            type: "error",
            title: "Role non enregistré",
          })
        }
    })
  motDePasse.value=''
}

</script>

<template>
  <!-- Modal -->
  <div class="modal fade" :id="'Modal_' + utilisateur.id"  tabindex="-1" :aria-labelledby="'ModalLabel_'+utilisateur.id" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" :id="'ModalLabel_' + utilisateur.id">Sauvegarder les roles</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form mb-3">
            <input type="password" class="form-control" :id="'motDePasse_'+utilisateur.id" placeholder="Mot de passe" v-model="motDePasse">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="sauvegarderRole(utilisateur)">Sauvegarder</button>
        </div>
      </div>
    </div>
  </div>

  <div class="card text-center position-static">
    <div class="card-body">
      <h5 class="card-title">
        <strong>{{ utilisateur.login }}</strong>
      </h5>
      <p class="card-text"><strong>Adresse e-mail :</strong> {{ utilisateur.adresseEmail }}</p>

      <p v-if="infoAnnuaire!=null" class="card-text"><strong>Téléphone mobile :</strong> {{ infoAnnuaire.mobileNumber }}</p>
      <BoiteInfoAnnuaire :info-annuaire="infoAnnuaire" />


      <!-- Rôles et boutons pour ajouter/supprimer des rôles -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <p v-if="UserStore.isAdmin()" class="mb-0"><strong>Role :</strong> {{ utilisateur.roles }}</p>
      </div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <!-- Dropdown Ajouter un rôle -->
        <div v-if="UserStore.isAdmin()" class="dropdown ms-2 position-static">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Ajouter un rôle
          </button>
          <ul class="dropdown-menu">
            <li v-for="role in listeRole" :key="role">
              <a class="dropdown-item" @click="addRole(role, utilisateur)" v-if="utilisateur.roles.indexOf(role) < 0">{{ role }}</a>
            </li>
          </ul>
        </div>

        <div v-if="UserStore.isAdmin()" class="dropdown ms-2 position-static">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Supprimer un rôle
          </button>
          <ul class="dropdown-menu">
            <li v-for="role in listeRole" :key="role">
              <a class="dropdown-item" @click="removeRole(role, utilisateur)" v-if="utilisateur.roles.indexOf(role) >= 0">{{ role }}</a>
            </li>
          </ul>
        </div>

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#Modal_'+utilisateur.id">
          Sauvegarder
        </button>
        <DeleteUser :utilisateur="utilisateur"/>
      </div>

    </div>
  </div>

</template>

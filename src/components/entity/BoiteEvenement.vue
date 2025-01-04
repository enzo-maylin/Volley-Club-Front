<template>
  <div class="col-md-6 mb-4 ">
      <div class="card shadow-sm h-100 position-static">
        <div v-if="UserStore.estConnecte && (UserStore.isAdmin || UserStore.isOrganisateur) && UserStore.utilisateurConnecte!.id == evenement.organisateur.id">
          <button @click="deleteEvenement(evenement.id)" class="btn btn-danger btn-lg ">Supprimer l'évenement</button>
        </div>
        <div class="card-body">
          <h5 class="card-title text-primary">{{ evenement.nom }}</h5>
          <p class="card-text"><strong>Adresse :</strong> {{ evenement.adresse }}</p>
          <p class="card-text"><strong>Prix :</strong> {{ evenement.prix }} €</p>
          <p class="card-text"><strong>Équipe max :</strong> {{ evenement.equipeMax }}</p>
          <p class="card-text"><strong>Cash Prize :</strong> {{ evenement.cashPrize }} €</p>
          <p class="card-text"><strong>Public :</strong> {{ evenement.public?"oui":"non" }}</p>
          <p class="card-text"><strong>Organisateur :</strong>
          <RouterLink :to="{name:'userProfil', params: {id: evenement.organisateur.id}}">{{ evenement.organisateur.adresseEmail }}
            </RouterLink>
          </p>
          <p class="card-text"><strong>Date début :</strong> {{ formatDate(evenement.dateDebut) }}</p>
          <p class="card-text"><strong>Date fin :</strong> {{ formatDate(evenement.dateFin) }}</p>

          <div v-if="UserStore.hasClub()">
            <button @click="inscrire(evenement.id)" class="btn btn-success me-2">Inscrire une Equipe</button>
            <button @click="desinscrire(evenement.id)" class="btn btn-warning">Désinscrire une Equipe</button>
            <p class="mb-0"><strong>Vos equipes :</strong> {{ equipeClub }}</p>
            <input type="text" class="form-control" :id="'motDePasse_'+evenement.id" placeholder="Nom de l'équipe" v-model="nomEquipe">
            </div>
        </div>
      </div>
    </div>
</template>


<script setup lang="ts">
import type {Equipe, Evenement} from '@/types';
defineProps<{ evenement: Evenement}>();
import {UserStore} from '@/util/UserStore';
const emit = defineEmits(['delete-evenement']);
import {notify} from "@kyvg/vue3-notification";
import {useRouter} from "vue-router";
import {APIStore} from "@/util/APIStore";
import { ref} from "vue";
const router = useRouter();
const nomEquipe = ref("");
const equipeClub = ref([""]);

if (UserStore.hasClub()) {
  equipeClub.value = UserStore.utilisateurConnecte?.club?.equipes?.map(equipe => equipe.nom) || [];
}

function formatDate(dateString:Date) {
      return new Date(dateString).toLocaleDateString('fr-FR',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
      });
    }

function deleteEvenement(idEvenement: string){

  APIStore.deleteById('evenements',Number(idEvenement)).then(()=>{
    emit('delete-evenement', idEvenement);
  })

  router.push({ name: 'home' });
  notify({
    type: "success",
    title: "Suppression",
    text: "Evenement supprimé avec success",
  });
}

function inscrire(idEvenement:string){
  const equipes: Equipe[]= UserStore.utilisateurConnecte?.club?.equipes?.filter(equipe => equipe.nom == nomEquipe.value) ?? [];
  if(equipes.length<1){
    notify({
      type: "warn",
      title: "Attention",
      text: "Vous n'avez pas d'équipe avec ce nom",
    });
  }else{
    APIStore.putRessource(`equipes/${equipes[0].id}/evenements/${idEvenement}`)
      .then(()=>{
        notify({
          type: "success",
          title: "YESSSSS",
          text: "Equipe ajouté a l'évenement",
        });
      })
  }
  nomEquipe.value="";
}
function desinscrire(idEvenement:string){
  const equipes: Equipe[] = UserStore.utilisateurConnecte?.club?.equipes?.filter(equipe => equipe.nom == nomEquipe.value) ?? [];
  if(equipes.length<1){
    notify({
      type: "warn",
      title: "Attention",
      text: "Vous n'avez pas d'équipe avec ce nom",
    });
  }else{
    APIStore.deleteRessource(`equipes/${equipes[0].id}/evenements/${idEvenement}`)
      .then(()=>{
        notify({
          type: "success",
          title: "YESSSSS",
          text: "Equipe plus de l'évenement",
        });
      })
  }
  nomEquipe.value="";
}
</script>


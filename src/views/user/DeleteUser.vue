<script setup lang="ts">
import type {Utilisateur} from "@/types";
defineProps<{utilisateur:Utilisateur}>();
import { APIStore } from '@/util/APIStore';
import { useRouter } from 'vue-router';
import {notify} from "@kyvg/vue3-notification";
import {UserStore} from "@/util/UserStore";
const router = useRouter();

function deleteUtilisateur(idUtilisateur:number){
  APIStore.deleteById('utilisateurs',idUtilisateur);
  router.push({ name: 'home' });
  notify({
    type: "success",
    title: "Suppression",
    text: "Utilisateur supprimé avec success",
  });
}
</script>

<template>
  <button v-if="UserStore.estConnecte" @click="deleteUtilisateur(utilisateur.id)" class="btn btn-danger btn-lg ">Supprimer l'utilisateur</button>
</template>

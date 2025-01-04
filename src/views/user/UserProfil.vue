<script setup lang="ts">
import { useRoute } from 'vue-router'
import {ref} from "vue";
import type { Utilisateur} from '@/types';
import {APIStore} from "@/util/APIStore";
import UserProfilComponents from "@/components/entity/UserProfilComponents.vue";
import {UserStore} from "@/util/UserStore";
import OtherUserProfilComponents from "@/components/entity/OtherUserProfilComponents.vue";
import type {Ref} from "vue";
import type {InfoAnnuaire} from "@/types";
import {AnnuaireStore} from "@/util/AnnuaireStore";

const route = useRoute();
const id = route.params.id
const user = ref<Utilisateur>({
  adresseEmail: "Chargement ...",
  id: Number(id),
  login: "Chargement ...",
  roles: [],
  equipe: null ,
  club: null,
  codeAnnuaire:""
});
const infoAnnuaire:Ref<InfoAnnuaire|null> = ref({
  login: "Chargement",
  email: "Chargement",
  mobileNumber: "Chargement",
  landlineNumber: "Chargement",
  updatedAt: "Chargement",
  country: "Chargement",
  department:  "Chargement",
  function: "Chargement",
  postalAdresse: "Chargement",
  lastName: "Chargement",
  firstName: "Chargement",
  lastSignin: "Chargement",
});

APIStore.getById('utilisateurs', Number(route.params.id))
  .then(reponseJSON => {
    user.value = reponseJSON;
    if (user.value.codeAnnuaire == undefined) {
      infoAnnuaire.value = null;
    }
    AnnuaireStore.getInfoUser(user.value.codeAnnuaire)
      .then(responseJSON => {
          infoAnnuaire.value = responseJSON;
      })
  });

</script>
<template>
  <div v-if="UserStore.utilisateurConnecte?.id===user.id">
    <UserProfilComponents :user="user" :infoAnnuaire="infoAnnuaire"/>
  </div>
  <div v-else>
    <OtherUserProfilComponents :user="user" :infoAnnuaire="infoAnnuaire"/>
  </div>
</template>


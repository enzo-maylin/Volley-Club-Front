<script setup lang="ts">
import { UserStore } from "@/util/UserStore";
import {notify} from "@kyvg/vue3-notification";


function deconnexion() {
  UserStore.logout()
    .then(responseJSON => {
    if (responseJSON.success) {
      notify({
        type: "success",
        title: "Déconnexion réussie",
        text: "À bientôt !",
      });
    }
    else {
      notify({
        type: "error",
        title: "Déconnexion échouée",
        text: responseJSON.error,
      });
    }
  })
}

</script>

<template>
  <nav class="navbar navbar-expand-lg" :class="UserStore.estConnecte?'bg-primary':'bg-secondary'">
    <div class="container-fluid">
      <a class="navbar-brand text-white" @click="$router.push({ name: 'home' })" style="cursor: pointer;">Volley Club</a>

      <button class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white"
              role="button"
              data-bs-toggle="dropdown"
              id="navbarDropdownEvenement">
              Evenements
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownEvenement" >
              <li><a class="dropdown-item" @click="$router.push({ name: 'home' })" style="cursor: pointer;">Afficher</a></li>
              <li><a class="dropdown-item" @click="$router.push({ name: 'filteredEvenement' })" style="cursor: pointer;">Afficher par Organisateur</a></li>
              <li><a class="dropdown-item" v-if="UserStore.isOrganisateur()" @click="$router.push({ name: 'addEvenement' })" style="cursor: pointer;">Créer</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white"
               role="button"
               data-bs-toggle="dropdown"
                id="navbarDropdownClubs">
              Clubs
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownClubs" >
              <li><a class="dropdown-item" @click="$router.push({ name: 'allClub' })" style="cursor: pointer;">Afficher</a></li>
              <li><a class="dropdown-item" v-if="UserStore.isCoach() && !UserStore.hasClub()" @click="$router.push({ name: 'addClub' })" style="cursor: pointer;">Créer</a></li>
              <li><a class="dropdown-item" v-if="UserStore.isCoach() && UserStore.hasClub()" @click="$router.push({ name: 'myClub' })" style="cursor: pointer;">Voir mon club</a></li>
            </ul>
          </li>

          <li class="nav-item" v-if="UserStore.estConnecte &&  UserStore.isCoach() && UserStore.hasClub()">
            <a class="nav-link text-white" @click="$router.push({name:'addEquipe'})" style="cursor: pointer;"> Ajouter une Équipe </a>
          </li>

          <li class="nav-item dropdown" v-if="UserStore.isAdmin(  )">
            <a class="nav-link dropdown-toggle text-white"
               role="button"
               data-bs-toggle="dropdown"
                id="navbarDropdownGestion">
              Gestion
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownGestion">
              <li><a class="dropdown-item" @click="$router.push({ name: 'allUser' })" style="cursor: pointer;">Afficher les Utilisateurs</a></li>
            </ul>
          </li>

        </ul>

        <ul class="navbar-nav">
          <li class="nav-item" v-if="UserStore.estConnecte && UserStore.utilisateurConnecte!.id">
            <a class="nav-link text-white" @click="$router.push({name:'userProfil', params: {id: UserStore.utilisateurConnecte!.id}})" style="cursor: pointer;"> Mon Profil </a>
          </li>
          <li class="nav-item" v-if="UserStore.estConnecte">
            <a class="nav-link text-white" @click="deconnexion() " style="cursor: pointer;">Déconnexion</a>
          </li>
          <li class="nav-item" v-else>
            <a class="nav-link text-white" @click="$router.push({ name: 'login' })" style="cursor: pointer;">Connexion</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

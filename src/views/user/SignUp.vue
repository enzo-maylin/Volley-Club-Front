<script setup lang="ts">
import {APIStore} from "@/util/APIStore";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {notify} from "@kyvg/vue3-notification";

const userData = ref({
  login : "",
  adresseEmail : "",
  plainPassword : ""
})

const isLoading = ref(false);
const router = useRouter();
const visibilityPassword = ref(false);
const verifPassword = ref("")

function inscription(): void{
  if (userData.value.plainPassword != verifPassword.value) {
    //les 2 passwords ne sont pas identiques
    notify({
      type: "warn",
      title: "Inscription échouée",
      text: "Les mots de passe ne correspondent pas. Veuillez les vérifier.",
    });
    return;
  }
  isLoading.value = true;
  APIStore.createRessource("utilisateurs", userData.value, false)
    .then(( statut => {
      isLoading.value = false;
      if( statut.success ){
        notify({
          type: "success",
          title: "Inscription réussie",
          text: "Bienvenue parmi nous !",
        });
        router.push({ name: 'login' });
      }
      else {
        notify({
          type: "error",
          title: "Inscription échouée",
          text: statut.error,
        });
      }
    }))
}
</script>

<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center">
    <div class="row w-100">
      <div class="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div class="card shadow-lg border-0">
          <div class="card-body p-4">
<h3 class="text-center mb-4 fw-bold text-primary">Inscription</h3>

<form @submit.prevent="inscription">
  <fieldset>
    <div class="form-floating mb-3">
      <input v-model="userData.login" type="text" class="form-control" id="login" placeholder="Login" required>
      <label for="login">Login</label>
    </div>

    <div class="form-floating mb-3">
      <input v-model="userData.adresseEmail" type="email" class="form-control" id="email" placeholder="E-mail" required>
      <label for="email">E-mail</label>
    </div>

    <div class="input-group mb-3">
      <div class="form-floating">
        <input v-model="userData.plainPassword" :type="visibilityPassword?'text':'password'" class="form-control" placeholder="Password" id="password" required>
        <label for="password">Password</label>
      </div>
      <span class="input-group-text bg-white border-0">
        <i :class="visibilityPassword?'bi bi-eye-fill':'bi bi-eye-slash-fill'" @click="visibilityPassword=!visibilityPassword" style="cursor: pointer;"></i>
      </span>
    </div>

    <div class="input-group mb-3">
      <div class="form-floating">
        <input v-model="verifPassword" :type="visibilityPassword?'text':'password'" class="form-control" placeholder="Password" id="verifPassword" required>
        <label for="verifPassword">Verif Password</label>
      </div>
      <span class="input-group-text bg-white border-0">
        <i :class="visibilityPassword?'bi bi-eye-fill':'bi bi-eye-slash-fill'" @click="visibilityPassword=!visibilityPassword" style="cursor: pointer;"></i>
      </span>
    </div>

    <div class="d-grid mt-5" >
      <button type="submit" class="btn btn-primary rounded-pill"
              :disabled="isLoading" >Créer mon compte
        <div
          v-if="isLoading"
          class="spinner-border spinner-border-sm ms-2"
          role="status"
        >
          <span class="visually-hidden">Chargement...</span>
        </div>
      </button>
    </div>

    <div class="text-center mt-2">
      <p class="small">
        Déjà un compte ?
        <span @click="$router.push({name: 'login'})" class="text-primary fw-semibold" style="cursor: pointer;">Se connecter</span>
      </p>
    </div>

  </fieldset>
</form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

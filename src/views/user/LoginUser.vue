<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {notify} from "@kyvg/vue3-notification";
import {UserStore} from "@/util/UserStore";

const router = useRouter();
const connectingUser = ref({
  login: "",
  password: ""
});
const isLoading = ref(false);
const visibilityPassword = ref(false);

function connect(): void {
  isLoading.value = true;
  UserStore.login(connectingUser.value.login, connectingUser.value.password)
    .then(responseJSON => {
      isLoading.value = false;
      if (responseJSON.success) {
        notify({
          type: "success",
          title: "Connexion réussie",
          text: "Heureux de vous revoir !",
        });
        router.push({ name: 'home' });
      }
      else {
        notify({
          type: "error",
          title: "Connexion échouée",
          text: responseJSON.error,
        });
      }
    })
}
</script>

<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center">
    <div class="row w-100">
      <div class="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div class="card shadow-lg border-0">
          <div class="card-body p-4">
<h3 class="text-center mb-4 fw-bold text-primary">Bienvenue</h3>

<form @submit.prevent="connect">
    <fieldset>
    <div class="form-floating mb-3">
      <input v-model="connectingUser.login" type="text" class="form-control" id="login" placeholder="Login" required>
      <label for="login">Login</label>
    </div>

    <div class="input-group mb-3">
      <div class="form-floating">
        <input v-model="connectingUser.password" :type="visibilityPassword?'text':'password'" class="form-control" placeholder="Password" id="password" required>
        <label for="password">Password</label>
      </div>
      <span class="input-group-text bg-white border-0">
        <i :class="visibilityPassword?'bi bi-eye-fill':'bi bi-eye-slash-fill'" @click="visibilityPassword=!visibilityPassword" style="cursor: pointer;"></i>
      </span>
    </div>

    <div class="d-grid mt-5">
      <button type="submit" class="btn btn-primary rounded-pill"
              :disabled="isLoading">Se connecter
        <div
          v-if="isLoading"
          class="spinner-border spinner-border-sm ms-2"
          role="status"
        >
          <span class="visually-hidden">Chargement...</span>
        </div>
      </button>
    </div>

    <div class="text-center mt-3">
      <p class="small">
        Pas encore de compte ?
        <a @click="$router.push({ name: 'signUp' })" class="text-primary fw-semibold" style="cursor: pointer;">Créer un compte</a>
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

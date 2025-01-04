<script setup lang="ts">
import { ref} from "vue";
import type {Ref} from "vue";
import {APIStore} from "@/util/APIStore";
import {UserStore} from "@/util/UserStore";
import {AnnuaireStore} from "@/util/AnnuaireStore";
import router from "@/router";
import {notify} from "@kyvg/vue3-notification";


if (!UserStore.estConnecte || !UserStore.utilisateurConnecte) {
  notify({
    type: "error",
    title: "Accès refusé",
    text: "Vous devez être connecté(e) pour modifier votre profil.",
  });
  router.push({ name: 'login' });
}
const userData:Ref = ref({
  adresseEmail: UserStore.utilisateurConnecte!.adresseEmail,
  plainPassword: "",
  currentPlainPassword: "",
  codeAnnuaire: UserStore.utilisateurConnecte!.codeAnnuaire,
});


const isLoading = ref(false);
const visibilityPassword = ref(false);
const verifPassword = ref("")


async function update() {
  if (userData.value.plainPassword != verifPassword.value) {
    //les 2 passwords ne sont pas identiques
    notify({
      type: "warn",
      title: "Modification échouée",
      text: "Les nouveaux mots de passe ne correspondent pas. Veuillez les vérifier.",
    });
    return;
  }
  let codeAnnuaireOK:boolean = true;
  if (userData.value.codeAnnuaire && userData.value.codeAnnuaire != "") {
    isLoading.value = true;
    await AnnuaireStore.getInfoUser(userData.value.codeAnnuaire.toString())
      .then(responseJSON => {
        isLoading.value = false;
        if (responseJSON.email == "" || responseJSON.email != userData.value.adresseEmail) {
          codeAnnuaireOK = false;
        }
      })
  }
  if (!codeAnnuaireOK) {
    notify({
      type: "error",
      title: "Modification échouée",
      text: "Votre adresse Email n'est pas celle du profil (annuaire) : " + userData.value.codeAnnuaire,
    });
    return;
  }

  // si l'utilisateur ne change pas son mdp (laisse l'input new password vide)
  // on supprime de userData plainPassword
  // sinon l'API reçoit un string vide ""
  // et elle bloque la modification => mdp pas valide
  if (!userData.value.plainPassword) {
    delete userData.value.plainPassword;
  }
  APIStore.updateRessource(`utilisateurs/${UserStore.utilisateurConnecte!.id}`, userData.value)
    .then(responseJSON => {
      isLoading.value = false;
      if (responseJSON.success) {
        notify({
          type: "success",
          title: "Profil modifié !",
        });
        //On met à jour les données d'utilisateur connecte avec les nouvelles infos avant de renvoyer vers son profil
        UserStore.utilisateurConnecte!.adresseEmail = userData.value.adresseEmail
        UserStore.utilisateurConnecte!.codeAnnuaire = userData.value.codeAnnuaire
        router.push({name: 'userProfil', params: {id: UserStore.utilisateurConnecte!.id}});
      } else {
        //si on a supprimé plainPassword de userData, mais que la modification ne s'est pas faite, on remet plainPassword
        if (!userData.value.plainPassword) {
          userData.value.plainPassword = "";
        }
        notify({
          type: "error",
          title: "Modification échouée",
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
            <h3 class="text-center mb-4 fw-bold text-primary">Modifier le profil</h3>

            <form @submit.prevent="update()">
              <fieldset>
                <div class="input-group mb-3">
                  <div class="form-floating">
                    <input v-model="userData.currentPlainPassword" :type="visibilityPassword?'text':'password'" class="form-control" placeholder="Mot de passe actuel" id="currentPlainPassword" required>
                    <label for="currentPlainPassword">Mot de passe actuel</label>
                  </div>
                  <span class="input-group-text bg-white border-0">
                    <i :class="visibilityPassword?'bi bi-eye-fill':'bi bi-eye-slash-fill'" @click="visibilityPassword=!visibilityPassword" style="cursor: pointer;"></i>
                  </span>
                </div>

                <div class="form-floating mb-3">
                  <input v-model="userData.adresseEmail" type="email" class="form-control" id="email" placeholder="E-mail">
                  <label for="email">E-mail</label>
                </div>

                <div class="form-floating mb-3">
                  <input v-model="userData.codeAnnuaire" type="text" class="form-control" id="codeAnnuaire" placeholder="Code annuaire">
                  <label for="codeAnnuaire">Code annuaire</label>
                </div>

                <div class="input-group mb-3">
                  <div class="form-floating">
                    <input v-model="userData.plainPassword" :type="visibilityPassword?'text':'password'" class="form-control" placeholder="Nouveau mot de passe" id="plainPassword">
                    <label for="plainPassword">Nouveau mot de passe</label>
                  </div>
                  <span class="input-group-text bg-white border-0">
                    <i :class="visibilityPassword?'bi bi-eye-fill':'bi bi-eye-slash-fill'" @click="visibilityPassword=!visibilityPassword" style="cursor: pointer;"></i>
                  </span>
                </div>

                <div class="input-group mb-3">
                  <div class="form-floating">
                    <input v-model="verifPassword" :type="visibilityPassword?'text':'password'" class="form-control" placeholder="Confirmation nouveau mot de passe" id="verifPassword">
                    <label for="verifPassword">Confirmation nouveau mot de passe</label>
                  </div>
                  <span class="input-group-text bg-white border-0">
                    <i :class="visibilityPassword?'bi bi-eye-fill':'bi bi-eye-slash-fill'" @click="visibilityPassword=!visibilityPassword" style="cursor: pointer;"></i>
                  </span>
                </div>

                <div class="d-grid mt-5">
                  <button type="submit" class="btn btn-primary rounded-pill"
                          :disabled="isLoading">Modifier mon compte
                    <div
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm ms-2"
                      role="status"
                    >
                      <span class="visually-hidden">Chargement...</span>
                    </div>
                  </button>
                </div>

              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

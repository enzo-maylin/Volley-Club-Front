import { reactive } from 'vue';
import type { Utilisateur} from '@/types';
import {APIStore} from "@/util/APIStore";
import router from "@/router";

export const UserStore = reactive({
  APIurl: "https://webinfo.iutmontp.univ-montp2.fr/~mayline/volley_club_api/public/api/",
  utilisateurConnecte: null as Utilisateur | null,
  estConnecte: false,

  getRoles(): string[] {
    if(this.utilisateurConnecte)
      return this.utilisateurConnecte['roles'];
    return [];
  },
  isAdmin():boolean{
    return this.getRoles().includes("ROLE_ADMIN");
  },
  isOrganisateur():boolean{
    return this.getRoles().includes("ROLE_ORGANISATEUR");
  },
  isCoach():boolean{
    return this.getRoles().includes("ROLE_COACH");
  },
  hasClub():boolean{
    if(this.estConnecte)return this.utilisateurConnecte!.club!=null;
    return false
  },
  getClubEquipe(id_equipe:number){
    APIStore.getAll(`utilisateur/${UserStore.utilisateurConnecte!.id}/club`)
      .then(responseJSON => {
        if (responseJSON && responseJSON.id) {
          UserStore.utilisateurConnecte!.club = responseJSON;
        } else {
          UserStore.utilisateurConnecte!.club = null;
        }
      });
    APIStore.getById('equipes', id_equipe )
      .then(responseJSON => {
        if (responseJSON && responseJSON.id) {
          UserStore.utilisateurConnecte!.equipe = responseJSON;
        } else {
          UserStore.utilisateurConnecte!.equipe = null;
        }
      });
  },
  login(login: string, password: string): Promise<{ success: boolean, error?: string }> {
    return fetch(this.APIurl + "auth", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({login:login, password:password})
    })
      .then(reponsehttp => {
        if (!reponsehttp.ok) {
          return reponsehttp.json()
            .then(reponseJSON => {
              return { success: false, error: reponseJSON.message };
            })
        } else {
          return reponsehttp.json()
            .then(reponseJSON => {
              UserStore.utilisateurConnecte = reponseJSON;
              UserStore.estConnecte = true;
              this.getClubEquipe(reponseJSON['id_equipe']);
              return { success: true };
            })
        }})
  },
  logout(): Promise<{ success: boolean, error?: string }> {
    return fetch(this.APIurl + "token/invalidate", {
      method: "POST",
      credentials: 'include',
    })
      .then(reponsehttp => {
        if (!reponsehttp.ok) {
          return reponsehttp.json()
            .then(reponseJSON => {
              return { success: false, error: reponseJSON.message };
            })
        } else {
          return reponsehttp.json()
            .then( () => {
              UserStore.utilisateurConnecte = null;
              UserStore.estConnecte = false;
              router.push('home');
              return { success: true };
            })
        }
      })
  },
  refresh ():Promise<{ success: boolean, error?: string }>{
    return fetch(this.APIurl+'token/refresh', {
      method: "POST",
      credentials: 'include',
    })
      .then(reponsehttp => {
        if (!reponsehttp.ok) {
          return reponsehttp.json()
            .then(reponseJSON => {
              return {success: false, error: reponseJSON.message};
            })
        } else {
          return reponsehttp.json()
            .then(reponseJSON => {
              UserStore.utilisateurConnecte = reponseJSON;
              UserStore.estConnecte = true;
              this.getClubEquipe(reponseJSON['id_equipe']);
              return {success: true};
            })
        }
      })
  },
});

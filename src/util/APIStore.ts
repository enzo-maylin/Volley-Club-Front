
import {UserStore} from '@/util/UserStore'
export const APIStore = {
  APIurl: "https://webinfo.iutmontp.univ-montp2.fr/~mayline/volley_club_api/public/api/",

  getAll(ressource:string):Promise<any>{
      return fetch(this.APIurl+ressource)
      .then(reponsehttp => reponsehttp.json())
  },
  getById(ressource:string, id:number):Promise<any>{
    return fetch(this.APIurl+ressource+'/'+id)
      .then(reponsehttp => reponsehttp.json())
  },
  getIdById(ressource1:string, ressource2:string, id:number):Promise<any>{
    return fetch(this.APIurl+ressource1+'/'+id + '/' + ressource2)
      .then(reponsehttp => reponsehttp.json())
  },
  createRessource(ressource: string, data: any, refreshAllowed = true): Promise<{success: boolean, error?: string }> {
    return fetch(this.APIurl+ressource,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify(data)
      })
      .then(reponsehttp => {
        if (reponsehttp.ok) {
          return reponsehttp.json()
            .then(() => {
              return {success: true};
            })
        } else if (reponsehttp.status == 401 && refreshAllowed) {
          return UserStore.refresh()
            .then(
              reponseJSON => {
                if (!reponseJSON.success) {
                  return {success: false, error: "unauthorized, failure to refresh token."};
                }
                return this.createRessource(ressource,data,false);
              }
            )
        } else {
          return reponsehttp.json()
            .then(reponseJSON => {
              return {success: false, error: reponseJSON.message};
            })
        }
      })
  },
  deleteById(ressource: string, id:number, refreshAllowed = true): Promise<{success: boolean, error?: string }> {
    return fetch(this.APIurl + ressource + '/' + id, {
      method: "DELETE",
      credentials: 'include'
    })
      .then(reponsehttp => {
      if (reponsehttp.ok) {
        return reponsehttp.json()
          .then(() => {
            return { success: true };
          });
      } else if (reponsehttp.status === 401 && refreshAllowed) {
        return UserStore.refresh()
          .then(reponseJSON => {
            if (!reponseJSON.success) {
              return { success: false, error: "unauthorized, failure to refresh token." };
            }
            return this.deleteById(ressource, id, false); // Retenter la suppression après le rafraîchissement
          });
      } else {
        return reponsehttp.json()
          .then(reponseJSON => {
            return { success: false, error: reponseJSON.message };
          });
      }
    })
  },
  putRessource(ressource: string): Promise<any> {
    return fetch(this.APIurl + ressource , {
      method: "PUT",
      credentials: 'include'
    })
  },
  deleteRessource(ressource: string): Promise<any> {
    return fetch(this.APIurl + ressource, {
      method: "DELETE",
      credentials: 'include'
    })
  },
  updateRessource(ressource: string, data: any, refreshAllowed=true): Promise<{success: boolean, error?: string }> {
    return fetch(this.APIurl+ressource,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include',
      body: JSON.stringify(data)
    }).then(reponsehttp => {
      if (reponsehttp.ok) {
        return reponsehttp.json()
          .then(() => {
            return {success: true};
          })
      } else if (reponsehttp.status == 401 && refreshAllowed) {
        return UserStore.refresh()
          .then(
            reponseJSON => {
              if (!reponseJSON.success) {
                return {success: false, error: "Non autorisé, échec du rafraîchissement du jeton."};
              }
              return this.updateRessource(ressource, data, false);
            }
          )
      } else {
        return reponsehttp.json()
          .then(reponseJSON => {
            return {success: false, error: reponseJSON.description};
          })
      }
    })
  },
}




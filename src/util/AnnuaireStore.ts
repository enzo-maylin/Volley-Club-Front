import type {InfoAnnuaire} from '@/types';

export const AnnuaireStore = {
  APIurl: "https://webinfo.iutmontp.univ-montp2.fr/~mayline/annuaire/public/",

  getInfoUser(code: string): Promise<InfoAnnuaire> {
    return fetch(this.APIurl+"userJSON?code="+code,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    }).then(
      reponsehttp => reponsehttp.json()
    )
  },


}




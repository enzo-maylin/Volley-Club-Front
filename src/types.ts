export interface Utilisateur{
  id: number,
  login: string,
  adresseEmail: string,
  roles:string[],
  equipe: Equipe | null,
  club: Club | null
  codeAnnuaire : string,
}
export interface Equipe{
  id:number,
  nom:string,
  joueurs:Utilisateur[] | null,
  evenement:Evenement[] | null,
  club:Club,
}
export interface Club{
  id:number,
  nom:string,
  coach:Utilisateur | null,
  equipes:Equipe[] | null,
}
export interface Evenement{
  id:string,
  nom:string,
  adresse:string,
  prix:number,
  equipeMax:number,
  cashPrize:number,
  public:boolean,
  organisateur:Utilisateur,
  dateDebut:Date,
  dateFin:Date,
}
export interface InscriptionEvenement{
  equipe:Equipe,
  evenement:Evenement,
}

export interface InfoAnnuaire{
  "login": string,
  "email": string,
  "mobileNumber": string| null,
  "landlineNumber": string| null,
  "updatedAt": string| null,
  "country": string| null,
  "department": string| null,
  "function": string| null,
  "postalAdresse": string| null,
  "lastName": string| null,
  "firstName": string| null,
  "lastSignin": string| null,
}

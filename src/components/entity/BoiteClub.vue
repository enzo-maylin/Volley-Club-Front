
<script setup lang="ts">
import type {Club} from '@/types';
import {ref} from "vue";
const props= defineProps<{club: Club}>();

const coach = ref({
  id:0,
  email:""
})
if(props.club.coach!=null){
  coach.value.id=props.club.coach.id
  coach.value.email=props.club.coach.adresseEmail
}

</script>

<template>
  <div class="col-md-6 mb-4">
    <div class="card shadow-sm h-100 position-static">
      <div class="card-body">
        <h5 class="card-title text-primary"> <RouterLink :to="{name:'equipeClub', params: {id: club.id}}">
         {{ club.nom }}</RouterLink></h5>
        <p>
          Coach :
          <RouterLink :to="{name:'userProfil', params: {id: coach.id}}">{{ coach.email }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>



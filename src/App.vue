<template>
  <div>
    <header>
      <defaultNavbar class="navbar navbar-expand-lg navbar-light w-100 position-fixed top-0">
        <h1 class="text-center text-white">Volley Club</h1>
      </defaultNavbar>
    </header>

    <main v-if="loaded" class="flex-grow-1 bg-white container">
      <notifications
        position="bottom right"
        :pause-on-hover="true"
      />
      <router-view />
    </main>

    <div v-else>
      <defaultLoading/>
    </div>
  </div>
</template>


<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterView } from 'vue-router';
  import defaultNavbar from '@/components/navbar/defaultNavbar.vue';
  import defaultLoading from '@/components/loading/defaultLoading.vue';
  import {Notifications} from "@kyvg/vue3-notification";
  import {UserStore} from "@/util/UserStore";

const loaded = ref(false);
UserStore.refresh().then(()=>{loaded.value=true})
</script>


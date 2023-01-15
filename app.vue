<script setup>
import { createPinia, storeToRefs } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useAuthStore } from "~~/store/authStore";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const authStore = useAuthStore();
const authInfo = storeToRefs(authStore.getAuthInfo);
if (Object.keys(authInfo).length === 0 && authInfo.constructor === Object) {
  await useUser();
}
</script>

<template>
  <NuxtPage />
</template>

<script setup>
import { useAuthStore } from "~~/store/authStore";
onBeforeMount(() => {
  definePageMeta({
    middleware: "guest",
  });
});
const userName = ref("");
const passWord = ref("");
const authStore = useAuthStore();
const login = async () => {
  const { data, pending, error, refresh } = await useFetch("/api/auth/login", {
    onRequest({ request, options }) {
      (this.method = "POST"),
        (this.body = {
          userName: userName.value,
          passWord: passWord.value,
        });
    },
    onRequestError({ request, options, error }) {},
    onResponse({ request, response, options }) {
      authStore.setAuthInfo(response._data);
      useRouter().push("/");
      return;
    },
    onResponseError({ request, response, options }) {},
  });
};
</script>

<template>
  <span>username</span>
  <input v-model="userName" type="text" />
  <br />
  <span>password</span>
  <input v-model="passWord" type="text" />
  <br />
  <button v-on:click="login">login!</button>
</template>

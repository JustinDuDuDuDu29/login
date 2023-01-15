<script setup>
// import { storeToRefs } from "pinia";
import { useAuthStore } from "~~/store/authStore";
const authStore = useAuthStore();

let testLogin = await useLoggedIn();
const isLoggedIn = ref(testLogin);
let callRefresh;
// let data, pending, error, refresh;
const mys = async () => {
  const { data, pending, error, refresh } = await useFetch("/mys", {
    onRequest({ request, options }) {
      this.method = "GET";
      this.headers = {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      };
    },
    onRequestError({ request, options, error }) {
      // 處理請求時發生的錯誤
      console.log(`onRequestError ${error}`);
    },
    onResponse({ request, response, options }) {
      // 處理請求回應的資料
      return response._data;
    },
    async onResponseError({ request, response, options }) {
      // 處理請求回應發生的錯誤
      console.log(`onResponseError ${JSON.stringify(response)}`);

      if (response._data.statusCode == 401) {
        // jwt timeout
        await useGetAccessToken();
        options = {
          ...options,
          headers: `Authorization: Bearer ${authStore.getAccessToken}`,
        };

        callRefresh(options);
        // const aaa = await refresh(options);
        return;
      }
    },
  });
  callRefresh = async (options) => {
    await refresh(options);
  };

  if (error.value) console.log(error.value);

  if (data.value) console.log(data.value);
};

const logout = () => {};
</script>

<template>
  <div v-if="isLoggedIn">
    <img src="~/assets/out.gif" />
    <button v-on:click="mys">告訴你一個神秘的地方～</button>
    <button v-on:click="logout">登出囉～</button>
  </div>
  <div v-else>
    <img src="~/assets/in.gif" />
  </div>
</template>

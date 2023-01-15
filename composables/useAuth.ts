import { AuthInfo } from "~~/types/IAuthInfo";
import { createPinia, storeToRefs } from "pinia";
import { useAuthStore } from "~~/store/authStore";

export const refreshToken = () => useCookie("refreshToken");

export const useUser = async () => {
  const authStore = useAuthStore();
  if (refreshToken().value) {
    // the user had login
    const cookieHeaders = useRequestHeaders(["cookie"]);

    const { data, pending, error, refresh } = await useFetch("/api/auth/abc", {
      onRequest({ request, options }) {
        (this.method = "POST"), (this.headers = cookieHeaders as HeadersInit);
      },
      onRequestError({ request, options, error }) {},
      onResponse({ request, response, options }) {
        authStore.setAuthInfo(response._data);
        return;
      },
      onResponseError({ request, response, options }) {},
    });
  }
};

export async function useLoggedIn() {
  const authStore = useAuthStore();

  const cookieHeaders = useRequestHeaders(["cookie"]);
  const userName = authStore.getUserName;
  if (authStore.getUserName) {
    return true;
  }
  return false;
}

export const useGetAccessToken = async () => {
  const authStore = useAuthStore();
  // the user had login
  const cookieHeaders = useRequestHeaders(["cookie"]);
  const { data, pending, error, refresh } = await useFetch(
    "/api/auth/getAccessToken",
    {
      onRequest({ request, options }) {
        (this.method = "POST"), (this.headers = cookieHeaders as HeadersInit);
      },
      onRequestError({ request, options, error }) {},
      onResponse({ request, response, options }) {
        authStore.setAccessToken(response._data.accessToken);
        return;
      },
      onResponseError({ request, response, options }) {},
    }
  );
};

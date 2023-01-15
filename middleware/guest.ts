export default defineNuxtRouteMiddleware(async (to) => {
  const isLoggedIn = await useLoggedIn();

  if (isLoggedIn) {
    useRouter().push("/");
  }
});

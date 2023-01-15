import { defineStore } from "pinia";

interface AuthInfo {
  userName?: string;
  UUID?: string;
  accessToken?: string;
} 

let authInfo: AuthInfo = {};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authInfo: authInfo,
  }),
  getters: {
    getUserName(): string | undefined {
      return this.authInfo?.userName;
    },
    getAccessToken(): string | undefined {
      return this.authInfo?.accessToken;
    },
    getUUID(): string | undefined {
      return this.authInfo?.UUID;
    },
    getAuthInfo(): AuthInfo {
      return this.authInfo;
    },
  },
  actions: {
    setAuthInfo(authInfo: AuthInfo) {
      this.authInfo = authInfo;
    },
    setAccessToken(accessToken: string) {
      this.authInfo.accessToken = accessToken;
    },
    setUserName(userName: string) {
      this.authInfo.userName = userName;
    },
  },
  // persist:true,
});

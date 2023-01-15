import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "refreshToken")!;
  // if cookie is in Redis, return cookie
  // else return empty string
  console.log("在那叫什麼");
  return {
    cookie,
  };
});

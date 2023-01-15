import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export default defineEventHandler(async (event) => {
  deleteCookie(event, "refreshToken");

  return {};
});

import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export default defineEventHandler(async (event) => {
  const UUID = "12345678";
  const { userName, passWord } = await readBody(event);
  const refreshSecret = process.env.refreshSecret!;
  const accessSecret = process.env.accessSecret!;

  const payload = {
    UUID: UUID,
    userName: userName,
  };
  const refreshToken = jwt.sign(payload, refreshSecret);
  const accessToken = jwt.sign(payload, accessSecret, {
    expiresIn: "5s",
  });

  setCookie(event, "refreshToken", refreshToken, {
    httpOnly: true,
  });

  return {
    userName: userName,
    UUID: UUID,
    accessToken: accessToken,
  };
});

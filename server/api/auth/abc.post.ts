import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { JwtPayLoad } from "~~/types/IjwtPayload";

dotenv.config();
export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "refreshToken")!;
  const accessSecret = process.env.accessSecret!;
  const refreshSecret = process.env.refreshSecret!;
  let userName;
  let UUID;
  let accessToken;
  // TODO: assign type to payload
  jwt.verify(cookie, refreshSecret, (err, payload) => {
    if (err) {
      // TODO: cant verify, send error
      sendError(
        event,
        createError({ statusCode: 401, statusMessage: "Invalid Data Provided" })
      );
      return;
    }
    const { userName: jwtUserName, UUID: jwtUUID } = <JwtPayLoad>payload;
    userName = jwtUserName;
    UUID = jwtUUID;
    const newPayload = {
      userName: jwtUserName,
      UUID: jwtUUID,
    };
    accessToken = jwt.sign(newPayload, accessSecret, {
      expiresIn: "5s",
    });
  });
  return {
    userName,
    UUID,
    accessToken,
  };
});

import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export default defineEventHandler((event) => {
  const auth = event.req.headers.authorization?.split(" ")[1]!;
  if (!auth) {
    sendError(
      event,
      createError({ statusCode: 400, statusMessage: "no Data Provided" })
    );
  }
  const accessSecret = process.env.accessSecret!;
  jwt.verify(auth, accessSecret, (err, payload) => {
    console.log(auth);
    console.log();
    if (err) {
      console.log("\nerr\n");
      sendError(
        event,
        createError({ statusCode: 401, statusMessage: "Invalid Data Provided" })
      );
    }
  });
  return `一個孩子們的快樂天堂!`;
});

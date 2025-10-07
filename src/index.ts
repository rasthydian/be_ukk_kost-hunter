// index.ts
import dotenv from "dotenv";
dotenv.config();

import Express from "express";
import userRoute from "./router/user/user.route";
import globalRoute from "./router/user/global.route";
import authRoute from "./router/auth.router";


const app = Express();
app.use(Express.json());

app.use("/user-auth", authRoute);
app.use("/user-admin", userRoute);
app.use("/user-global", globalRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

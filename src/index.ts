import  Express  from "express";
import userRoute from "./router/user.router";

const app = Express();

app.use(Express.json());

app.use("/user", userRoute);

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
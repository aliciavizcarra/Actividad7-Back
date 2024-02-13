import dotenv from "dotenv";
import express from "express";
import { routerUsuarios } from "./usuarios/infrastructure/rest/usuarioRouter";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/usuarios", routerUsuarios)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// server/index.js
import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js"
import vetRoutes from './routes/vet.routes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(vetRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
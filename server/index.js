// server/index.js
import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js"
import vetRoutes from './routes/vet.routes.js'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment-timezone";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
}));

const zonaHorariaColombia = 'America/Bogota';
moment.tz.setDefault(zonaHorariaColombia);

dotenv.config()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(indexRoutes);
app.use(vetRoutes);


app.options('/UniversoPet/Api/Login', cors());

app.listen(PORT, () => {
    app.timeout = 60000;
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
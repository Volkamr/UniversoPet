//Crear una base de datos
//Crear un usuario veterinario@% y darle todos los permisos
//Crear una tabla veterinaria

import { createPool } from "mysql2/promise"

export const pool = createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'ubuntusql',
    database: 'veterinaria'
})
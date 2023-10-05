import formidable from "formidable"
import { pool } from '../db.js'

export const getServices = async (req, res) => {
    const [result] = await pool.query(
        "SELECT * FROM Servicios"
    );
    res.json(result);
}

export const getSedes = async (req, res) => {
    const [result] = await pool.query(
        "SELECT idSede, img, ciudad, titulo, descripcion FROM Sedes inner join Ciudades on Sedes.idCiudad = Ciudades.idCiudad"
    );
    res.json(result);
}

export const postServices = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, (error, fields, files) => {
        if (error) throw error;
        const data = { ...fields, ...files }

        pool.query("INSERT INTO Servicios set ?",
            {
                imgVista: data.imgVista,
                imgServicio: data.imgServicio,
                idName: data.idName,
                nombre: data.nombre,
                descripcion: data.descripcion
            }, (error) => {
                if (error) throw error;
            }
        )
        res.send("DATA SAVE!")
    })
}

export const postSedes = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, (error, fields, files) => {
        if (error) throw error;
        const data = { ...fields, ...files }

        async function ciudad() {
            const [result] = await pool.query(
                "SELECT * FROM Ciudades where ciudad='" + data.ciudad + "'"
            );

            if (result.length == 0) {
                await pool.query("insert into Ciudades set ?", {
                    ciudad: data.ciudad
                })
            }

            const id = await pool.query("select idCiudad from Ciudades where ciudad='" + data.ciudad + "'")
            const idCiu = id[0][0].idCiudad

            pool.query("insert into Sedes set ?", {
                img: data.img,
                idCiudad: idCiu,
                titulo: data.titulo,
                descripcion: data.descripcion
            })

            res.send('Sede ---> OK!')
        }

        ciudad()
    })
}
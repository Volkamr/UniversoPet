import formidable from "formidable"
import { pool } from '../db.js'

//---------------------------------------------------------------------------> GET

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

export const getService = async (req, res) => {
    const [result] = await pool.query(
        "SELECT * FROM Servicios where idServicio = ?", [req.params.idServicio]
    );

    if (result.length == 0) {
        return res.status(404).json({ message: "Servicio no encontrado" })
    }

    res.json(result[0]);
}


export const getPersonal = async (req, res) => {
    const [result] = await pool.query(
        "SELECT cedula, password, nombres, apellidos, email, profesion, fotoPerfil, estado, tipoPersonal FROM ((Personal inner join TipoPersonal on Personal.idTipoPersonal = TipoPersonal.idTipoPersonal) inner join Estados on Personal.idEstado = Estados.idEstado)"
    );
    res.json(result);
}

//---------------------------------------------------------------------------> POST

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

export const postPersonal = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, (error, fields, files) => {
        if (error) throw error;
        const data = { ...fields, ...files }

        async function personal() {

            const [estado] = await pool.query(
                "SELECT * FROM Estados where estado='" + data.estado + "'"
            );

            if (estado.length == 0) {
                await pool.query("insert into Estados set ?", {
                    estado: data.estado
                })
            }

            const [tipo] = await pool.query(
                "SELECT * FROM TipoPersonal where tipoPersonal='" + data.tipoPersonal + "'"
            );

            if (tipo.length == 0) {
                await pool.query("insert into tipoPersonal set ?", {
                    tipoPersonal: data.tipoPersonal
                })
            }

            const idEstado = await pool.query("select idEstado from Estados where estado='" + data.estado + "'")
            const idEst = idEstado[0][0].idEstado

            const idTipo = await pool.query("select idTipoPersonal from TipoPersonal where tipoPersonal='" + data.tipoPersonal + "'")
            const idT = idTipo[0][0].idTipoPersonal

            pool.query("insert into Personal set ?", {
                cedula: data.cedula,
                password: data.password,
                nombres: data.nombres,
                apellidos: data.apellidos,
                email: data.email,
                profesion: data.profesion,
                fotoPerfil: data.fotoPerfil,
                idTipoPersonal: idT,
                idEstado: idEst
            })

        }

        personal()

        res.send("DATA SAVE!")
    })
}
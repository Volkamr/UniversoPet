import formidable from "formidable"
import { pool } from '../db.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

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
        "SELECT cedula, password, nombres, apellidos, email, profesion, fotoPerfil, estado, tipoPersonal FROM ((Personal inner join TipoPersonal on Personal.idTipoPersonal = TipoPersonal.idTipoPersonal) inner join Estados on Personal.idEstado = Estados.idEstado) ORDER BY nombres ASC"
    );
    res.json(result);
}

export const getUsers = async (req, res) => {
    const [result] = await pool.query(
        "SELECT * from Usuarios"
    );
    res.json(result);
}

export const getUser = async (req, res) => {

    const token = req.params.accessToken;
    console.log("token: " + token)
    const key = process.env.SECRET_KEY;

    if (token) {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token inválido" })
            } else {
                req.idUsuario = decoded.idUsuario;
            }
        })
    }

    const id = req.idUsuario;
    console.log("idUser: " + id)
    const [result] = await pool.query("SELECT * From Usuarios WHERE idUsuario = ?", [id]);
    return res.status(200).json(result[0])
}


//Mascotas por usuarios
export const getUserPets = async (req, res) => {
    const token = req.params.accessToken;
    console.log("token: " + token)
    const key = process.env.SECRET_KEY;

    if (token) {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token inválido" })
            } else {
                req.idUsuario = decoded.idUsuario;
            }
        })
    }

    const id = req.idUsuario;
    const [result] = await pool.query("select idMascota, nombre, peso, fechaNac, tipoAnimal, raza, imagen, estado from ((Mascotas inner join Razas on Mascotas.idRaza = Razas.idRaza) inner join TipoAnimal on TipoAnimal.idTipoAnimal = Razas.idTipoAnimal) inner join Estados on Mascotas.idEstado = Estados.idEstado where idUsuario=? and estado=?", [id, "activo"]);
    res.json(result);
}


export const getPersonalP = async (req, res) => {
    const [result] = await pool.query(
        "SELECT cedula, password, nombres, apellidos, email, profesion, fotoPerfil, estado, tipoPersonal FROM ((Personal inner join TipoPersonal on Personal.idTipoPersonal = TipoPersonal.idTipoPersonal) inner join Estados on Personal.idEstado = Estados.idEstado) limit 3"
    );
    res.json(result);
}


//---------------------------------------------------------------------------> POST

export const postLogin = async (req, res) => {


    try {
        const data = req.body;
        if (data.email != null && data.password != null) {

            let passwordHaash = await (bcrypt.hash(data.password, 8))
            const [result] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [data.email]);

            if (result.length === 0) {
                return res.status(200).json({
                    message: "USUARIO NO ENCONTRADO",
                    success: false
                });
            } else if (!(await bcrypt.compare(data.password, result[0].password))) {
                return res.status(200).json({
                    message: "CONTRASEÑA INCORRECTA",
                    success: false
                });
            } else {
                const secretKey = process.env.SECRET_KEY;
                const accessToken = jwt.sign({ idUsuario: result[0].idUsuario }, secretKey, {
                    expiresIn: process.env.JWT_TIEMPO_EXPIRA
                })
                /*
                res.status(200).json({
                    message: "Sesión iniciada",
                    success: true,
                    idUsuario: result[0].idUsuario
                });
                */
                res.status(200).json({
                    accessToken: accessToken,
                    success: true
                })
            }
        } else {
            return res.status(200).json({
                message: "No deben haber campos vacíos",
                success: false
            });
        }

    } catch (error) {
        console.error('Error en la función postLogin:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            success: false
        });
    }
};


export const postRegistro = async (req, res) => {

    try {
        const data = req.body;
        const [result_email] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [data.email]);
        const [result_celular] = await pool.query("SELECT * FROM Usuarios WHERE celular = ?", [data.celular]);
        console.log(result_celular)
        if (result_email.length != 0) {
            return res.status(200).json({
                success: false,
                message: "El correo ya está en uso"
            })
        } else if (result_celular.length != 0) {
            return res.status(200).json({
                success: false,
                message: "El celular ya está en uso"
            })
        } else if (data.celular.length != 10) {
            return res.status(200).json({
                success: false,
                message: "El celular debe tener 10 caracteres"
            })
        }
        else if (data.password.length < 6) {
            return res.status(200).json({
                success: false,
                message: "La contraseña debe tener al menos 6 caracteres"
            })
        } else if (data.nombres == null || data.apellidos == null || data.password == null || data.email == null) {
            return res.status(200).json({
                success: false,
                message: "No debe haber campos vacíos"
            })
        } else if (data.edad < 18) {
            return res.status(200).json({
                success: false,
                message: "Debe ser menor de edad para crear una cuenta"
            })
        }

        else {
            const estado = 1;
            let passwordHaash = await bcrypt.hash(data.password, 8);
            pool.query("INSERT INTO Usuarios set ? ",
                {
                    email: data.email,
                    password: passwordHaash,
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    idEstado: estado,
                    celular: data.celular,
                    edad: data.edad,
                    fotoPerfil: null //No debería ser null
                },
            )

            return res.status(200).json({
                success: true,
                message: "Usuario registrado"
            })
        }
    } catch (error) {
        console.error('Error en la función postLogin:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            success: false
        });
    }
}

export const postCambiarInfo = async (req, res) => {
    try {
        const data = req.body;
        const [user] = await pool.query("SELECT * FROM Usuarios where idUsuario = ?", [data.idUsuario]);
        const [result_email] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [data.email]);
        const [result_celular] = await pool.query("SELECT * FROM Usuarios WHERE celular = ?", [data.celular])

        if (data.email == null || data.celular == null || data.nombres == null) {
            return res.status(200).json({
                success: false,
                message: "No puede enviar campos vacíos"
            })
        } else if (result_email.length != 0 && user[0].email != data.email) {
            return res.status(200).json({
                success: false,
                message: "El correo electrónico ya está registrado"
            })
        } else if (result_celular.length != 0 && user[0].celular != data.celular) {
            return res.status(200).json({
                success: false,
                message: "El celular ingresado ya está en uso"
            })
        } else if (user[0].celular == data.celular && user[0].email == data.email && user[0].nombres == data.nombres) {
            return res.status(200).json({
                success: false,
                message: "No realizó ningún cambio"
            })
        } else if (user[0].celular != data.celular && user[0].email == data.email && user[0].nombres == data.nombres) {
            pool.query("UPDATE Usuarios SET ? ", { celular: data.celular }, "WHERE idUsuario = ?", [data.idUsuario])
            return res.status(200).json({ success: true, message: "Cambió su celular exitosamente" })
        } else if (user[0].celular != data.celular && user[0].email != data.email && user[0].nombres == data.nombres) {
            pool.query("UPDATE Usuarios SET ? ",
                { celular: data.celular, email: data.email }, "WHERE idUsuario = ?", [data.idUsuario])
            return res.status(200).json({ success: true, message: "Cambió su celular y email exitosamente" })
        } else if (user[0].celular == data.celular && user[0].email != data.email && user[0].nombres == data.nombres) {
            pool.query("UPDATE Usuarios SET ? ", { email: data.email }, "WHERE idUsuario = ?", [data.idUsuario])
            return res.status(200).json({ success: true, message: "Cambió su email exitosamente" })
        } else if (user[0].celular == data.celular && user[0].email == data.email && user[0].nombres != data.nombres) {
            pool.query("UPDATE Usuarios SET ? ", { nombres: data.nombres }, "WHERE idUsuario = ?", [data.idUsuario])
            return res.status(200).json({ success: true, message: "Cambió sus nombres exitosamente" })
        } else if (user[0].celular != data.celular && user[0].email == data.email && user[0].nombres != data.nombres) {
            pool.query("UPDATE Usuarios SET ? ",
                { celular: data.celular, nombres: data.nombres }, "WHERE idUsuario = ?", [data.idUsuario])
            return res.status(200).json({ success: true, message: "Cambió su celular y nombres exitosamente" })
        } else if (user[0].celular == data.celular && user[0].email != data.email && user[0].nombres != data.nombres) {
            pool.query("UPDATE Usuarios SET ? ",
                { email: data.email, nombres: data.nombres }, "WHERE idUsuario = ?", [data.idUsuario])
            return res.status(200).json({ success: true, message: "Cambió su correo y nombres exitosamente" })
        } else {
            pool.query("UPDATE Usuarios SET ? ",
                {
                    celular: data.celular,
                    nombres: data.nombres,
                    email: data.email
                }, "WHERE idUsuario = ?", [data.idUsuario])
            return res.status(200).json({ success: true, message: "Cambió sus datos exitosamente" })
        }
    } catch (error) {
        console.log("Error al cambiar la información del usuario: " + error)
    }
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

export const postMascota = async (req, res) => {

    try {

        const data = req.body

        const token = data.token;
        console.log("token: " + token)
        const key = process.env.SECRET_KEY;

        if (token) {
            jwt.verify(token, key, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Token inválido" })
                } else {
                    req.idUsuario = decoded.idUsuario;
                }
            })
        }

        const id = req.idUsuario;

        if (data.nombre == null) {
            return res.status(200).json({
                success: false,
                message: "Una mascota necesita un nombre"
            })
        } else if (data.peso <= 0) {
            return res.status(200).json({
                success: false,
                message: "El peso de una mascota no puede ser negativo"
            })
        } else if (new Date(data.fechaNac) > new Date(Date.now())) {
            return res.status(200).json({
                success: false,
                message: "Una mascota no puede nacer en el futuro"
            })
        } else if (data.tipoAnimal == null) {
            return res.status(200).json({
                success: false,
                message: "Una mascota debe tener un tipo"
            })
        } else if (data.raza == null) {
            return res.status(200).json({
                success: false,
                message: "Una mascota debe tener una raza"
            })
        }

        async function mascota() {

            const [tipoAnimal] = await pool.query(
                "SELECT * FROM TipoAnimal where tipoAnimal='" + data.tipoAnimal + "'"
            );

            if (tipoAnimal.length == 0) {
                await pool.query("insert into TipoAnimal set ?", {
                    tipoAnimal: data.tipoAnimal
                })
            }

            const idTipoAnimal = await pool.query("select idTipoAnimal from TipoAnimal where tipoAnimal='" + data.tipoAnimal + "'")
            const idTA = idTipoAnimal[0][0].idTipoAnimal

            const [estado] = await pool.query(
                "SELECT * FROM Estados where estado='" + data.estado + "'"
            );

            if (estado.length == 0) {
                await pool.query("insert into Estados set ?", {
                    estado: data.estado
                })
            }

            const [raza] = await pool.query(
                "SELECT * FROM Razas where raza='" + data.raza + "'"
            );

            if (raza.length == 0) {
                await pool.query("insert into Razas set ?", {
                    raza: data.raza,
                    idTipoAnimal: idTA
                })
            }

            const idRaza = await pool.query("select idRaza from Razas where raza='" + data.raza + "'")
            const idRA = idRaza[0][0].idRaza

            const idEstado = await pool.query("select idEstado from Estados where estado='" + data.estado + "'")
            const idEst = idEstado[0][0].idEstado

            pool.query("INSERT INTO Mascotas set ?",
                {
                    nombre: data.nombre,
                    fechaNac: data.fechaNac,
                    peso: data.peso,
                    idRaza: idRA,
                    idEstado: idEst,
                    imagen: data.imagen,
                    idUsuario: id
                }, (error) => {
                    if (error) throw error;
                }
            )

        }

        const exist = await pool.query("select * from ((Mascotas inner join Razas on Mascotas.idRaza = Razas.idRaza) inner join TipoAnimal on TipoAnimal.idTipoAnimal = Razas.idTipoAnimal) where nombre=? and fechaNac=? and tipoAnimal=? and raza = ? and idUsuario=? ", [data.nombre, data.fechaNac, data.tipoAnimal, data.raza, id])
        console.log(exist.length)

        if (exist.length == 1) {

            data.imagen = exist[0][0].imagen
            const [estado] = await pool.query(
                "SELECT * FROM Estados where estado='activo'"
            );

            if (estado.length == 0) {
                await pool.query("insert into Estados set ?", {
                    estado: "activo"
                })
            }

            const Ces = await pool.query("select idEstado from Estados where estado='activo'")
            const idCes = Ces[0][0].idEstado

            if (data.imagen != "") {
                pool.query("update Mascotas set ? where nombre=? and fechaNac=? and tipoAnimal=? and raza=? and idUsuario=?", [data.nombre, data.fechaNac, data.tipoAnimal, data.raza, id],
                    {
                        peso: data.peso,
                        idEstado: idCes,
                        imagen: data.imagen,
                    }, (error) => {
                        if (error) throw error;
                    }
                )
            }

        } else {
            mascota()
        }

        return res.status(200).json({
            success: true,
            message: "Mascota Agregada"
        })

    } catch (error) {
        console.error('Error en la función postMascota:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            success: false
        });
    }

}

export const updateMascota = async (req, res) => {

    try {

        const data = req.body
        const ant = await pool.query("select idMascota, nombre, peso, fechaNac, tipoAnimal, raza, imagen from ((Mascotas inner join Razas on Mascotas.idRaza = Razas.idRaza) inner join TipoAnimal on TipoAnimal.idTipoAnimal = Razas.idTipoAnimal) where idMascota=?", [data.idMascota]);

        if (data.peso == null) data.peso = ant[0][0].peso

        if (data.peso <= 0) {
            return res.status(200).json({
                success: false,
                message: "El peso de una mascota no puede ser negativo"
            })
        } else if (new Date(data.fechaNac) > new Date(Date.now())) {
            return res.status(200).json({
                success: false,
                message: "Una mascota no puede nacer en el futuro"
            })
        }
        if (data.nombre == null) {
            data.nombre = ant[0][0].nombre
        }
        if (data.fechaNac == null) {
            data.fechaNac = ant[0][0].fechaNac
        }
        if (data.peso == null) {
            data.peso = ant[0][0].peso
        }
        if (data.tipoAnimal == null) {
            data.tipoAnimal = ant[0][0].tipoAnimal
        }
        if (data.imagen == "") {
            data.imagen = ant[0][0].imagen
        }
        if (data.raza == null) {
            data.raza = ant[0][0].raza
        }

        async function mascota() {

            const [tipoAnimal] = await pool.query(
                "SELECT * FROM TipoAnimal where tipoAnimal='" + data.tipoAnimal + "'"
            );

            if (tipoAnimal.length == 0) {
                await pool.query("insert into TipoAnimal set ?", {
                    tipoAnimal: data.tipoAnimal
                })
            }

            const idTipoAnimal = await pool.query("select idTipoAnimal from TipoAnimal where tipoAnimal='" + data.tipoAnimal + "'")
            const idTA = idTipoAnimal[0][0].idTipoAnimal

            const [raza] = await pool.query(
                "SELECT * FROM Razas where raza='" + data.raza + "'"
            );

            if (raza.length == 0) {
                await pool.query("insert into Razas set ?", {
                    raza: data.raza,
                    idTipoAnimal: idTA
                })
            } else {
                await pool.query("update Razas set ? where raza='" + ant[0][0].raza + "'", {
                    raza: data.raza
                })
            }

            const idRaza = await pool.query("select idRaza from Razas where raza='" + data.raza + "'")
            const idRA = idRaza[0][0].idRaza

            if (data.raza != null && data.imagen != "") {
                pool.query("update Mascotas set ? where idMascota='" + data.idMascota + "'",
                    {
                        nombre: data.nombre,
                        fechaNac: data.fechaNac,
                        peso: data.peso,
                        idRaza: idRA,
                        imagen: data.imagen
                    }, (error) => {
                        if (error) throw error;
                    }
                )
            }
        }

        mascota()
        return res.status(200).json({
            success: true,
            message: "Mascota Actualizada"
        })

    } catch (error) {
        console.error('Error en la función updateMascota:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            success: false
        });
    }

}

export const eliMascota = async (req, res) => {

    try {
        const data = req.body

        const [estado] = await pool.query(
            "SELECT * FROM Estados where estado='cesante'"
        );

        if (estado.length == 0) {
            await pool.query("insert into Estados set ?", {
                estado: "cesante"
            })
        }

        const Ces = await pool.query("select idEstado from Estados where estado='cesante'")
        const idCes = Ces[0][0].idEstado
        await pool.query("update Mascotas set ? where idMascota='" + data.idMascota + "'", {
            idEstado: idCes
        })
        return res.status(200).json({
            success: true,
            message: "Mascota Eliminada"
        })
    } catch (error) {
        console.error('Error en la función eliMascota:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            success: false
        });
    }

}
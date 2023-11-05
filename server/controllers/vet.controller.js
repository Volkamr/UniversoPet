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
    const [result] = await pool.query("SELECT * From Usuarios WHERE idUsuario = ?", [id]);
    return res.status(200).json(result[0])
}

export const getVeterinario = async (req, res) => {
    const token = req.params.vetToken;
    const key = process.env.SECRET_KEY;

    if (token) {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(403).json({ messaje: "Token inváido" })
            } else {
                req.cedula = decoded.cedula;
            }
        })
    }

    const cedula = req.cedula;
    const [result] = await pool.query("SELECT * FROM Personal WHERE cedula = ? ", [cedula]);
    return res.status(200).json(result[0])
}

export const getAdministrador = async (req, res) => {
    const token = req.params.adminToken;
    const key = process.env.SECRET_KEY;

    if (token) {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(403).json({ messaje: "Token inváido" })
            } else {
                req.adminusr = decoded.adminusr;
            }
        })
    }

    const adminusr = req.adminusr;
    const [result] = await pool.query("SELECT * FROM admins WHERE admin = ? ", [adminusr]);
    return res.status(200).json(result[0])
}


//Mascotas por usuarios
export const getUserPets = async (req, res) => {
    const id = req.params.idUsuario;
    const [result] = await pool.query("select idMascota, nombre, peso, fechaNac, tipoAnimal, raza, imagen, estado from ((Mascotas inner join Razas on Mascotas.idRaza = Razas.idRaza) inner join TipoAnimal on TipoAnimal.idTipoAnimal = Razas.idTipoAnimal) inner join Estados on Mascotas.idEstado = Estados.idEstado where idUsuario=? and estado=?", [id, "activo"]);
    res.json(result);
}


export const getPersonalP = async (req, res) => {
    const [result] = await pool.query(
        "SELECT cedula, password, nombres, apellidos, email, profesion, fotoPerfil, estado, tipoPersonal FROM ((Personal inner join TipoPersonal on Personal.idTipoPersonal = TipoPersonal.idTipoPersonal) inner join Estados on Personal.idEstado = Estados.idEstado) limit 3"
    );
    res.json(result);
}

export const getVeterinariosxSede = async (req, res) => {
    try {
        const idSede = req.params.idSede;
        const [result] = await pool.query(
            "SELECT Personal.cedula, nombres, apellidos FROM Personal inner join historialPersonal on historialPersonal.cedula = Personal.cedula inner join Sedes on historialPersonal.idSede = Sedes.idSede WHERE historialPersonal.FechaFinal IS NULL AND historialPersonal.idSede =? ", [idSede]
        )
        console.log(result)
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
}


export const getCitasMascota = async (req, res) => {
    try {
        const idMascota = req.params.idMascota;
        const [result] = await pool.query("SELECT titulo AS sede, Servicios.nombre AS servicio, nombres AS nombres_vet, apellidos AS apellidos_vet, FechaInicio, estadoCita  From Citas inner join Sedes on Sedes.idSede = Citas.idSede" +
            " inner join Servicios on Servicios.idServicio = Citas.idServicio inner join Personal on Personal.cedula = Citas.cedula inner join EstadosCitas on EstadosCitas.idEstadoCita = Citas.idEstadoCita" +
            " inner join Mascotas on Mascotas.idMascota = Citas.idMascota WHERE Mascotas.idMascota = ? ", [idMascota]);

        return res.status(200).json(result)
    } catch (error) {
        console.error('Error en la función postLogin:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            success: false
        });
    }
}

export const getCitasUsuario = async (req, res) => {
    try {

        const idUsuario = req.params.idUsuario;
        const [result] = await pool.query("SELECT Mascotas.idMascota, Mascotas.nombre AS nombre_mascota, Servicios.nombre AS servicio, Sedes.titulo AS sede, Personal.nombres AS nombre_vet, Personal.apellidos AS apellidos_vet, FechaInicio, estadoCita FROM Citas Inner Join Mascotas on Mascotas.idMascota = Citas.idMascota " +
            " inner join Sedes on Citas.idSede = Sedes.idSede inner join Servicios on Citas.idServicio = Servicios.idServicio inner join Personal on Citas.cedula = Personal.cedula inner join Usuarios on Mascotas.idUsuario = Usuarios.idUsuario" +
            " inner join EstadosCitas on Citas.idEstadoCita = EstadosCitas.idEstadoCita WHERE Usuarios.idUsuario = ? ", [idUsuario])

        return res.status(200).json(result)

    } catch (error) {
        console.error('Error en la función postLogin:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            success: false
        });
    }

}

export const getCitasVet = async (req, res) =>{
    try{
        
        const cedula = req.params.cedula;
        const[result] = await pool.query("SELECT Mascotas.idMascota, Mascotas.nombre AS nombre_mascota, Mascotas.idUsuario, Servicios.nombre AS servicio, Sedes.titulo AS sede, FechaInicio, estadoCita, Usuarios.email as correo_usuario FROM Citas Inner Join Mascotas on Mascotas.idMascota = Citas.idMascota"+
        " inner join EstadosCitas on Citas.idEstadoCita = EstadosCitas.idEstadoCita inner join Servicios on Citas.idServicio = Servicios.idServicio inner join Sedes on Sedes.idSede = Citas.idSede inner join Usuarios on Usuarios.idUsuario = Mascotas.idUsuario where cedula = ?", [cedula])
        return res.status(200).json(result)
    }catch(error){
        console.error('Error en la función postLogin:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            success: false
        });
    }
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

//Login para veterinarios

export const postLoginVet = async (req, res) => {
    try {
        const data = req.body;
        if (data.cedula != null && data.password != null) {
            const [result] = await pool.query("SELECT * FROM Personal WHERE cedula = ?", [data.cedula]);
            if (result.length === 0) {
                return res.status(200).json({
                    message: "VETERINARIO NO ENCONTRADO",
                    success: false
                });
            } else if (data.password != result[0].password) {
                return res.status(200).json({
                    message: "Contraseña incorrecta",
                    success: false
                });
            } else {
                const secretKey = process.env.SECRET_KEY;
                const accessToken = jwt.sign({ cedula: result[0].cedula }, secretKey, {
                    expiresIn: process.env.JWT_TIEMPO_EXPIRA
                })
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
        console.error('Error en la función postLoginVet:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            success: false
        });
    }
}

export const postLoginAdmin = async (req, res) => {
    try {
        const data = req.body;
        if (data.admin != null && data.password != null) {
            const [result] = await pool.query("SELECT * FROM admins WHERE admin = ?", [data.admin]);
            if (result[0].length === 0) {
                return res.status(200).json({
                    message: "ADMINISTRADOR NO ENCONTRADO",
                    success: false
                });
            } else if (data.password != result[0].password) {
                return res.status(200).json({
                    message: "Contraseña incorrecta",
                    success: false
                });
            } else {
                const secretKey = process.env.SECRET_KEY;
                const accessToken = jwt.sign({ adminusr: result[0].admin }, secretKey, {
                    expiresIn: process.env.JWT_TIEMPO_EXPIRA
                })
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

    }

}

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
        //MODIFICAR
        const data = req.body;
        const [user] = await pool.query("SELECT * FROM Usuarios where idUsuario = ?", [data.idUsuario]);
        const [result_email] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [data.email]);
        const [result_celular] = await pool.query("SELECT * FROM Usuarios WHERE celular = ?", [data.celular])

        if (data.imagen == "") data.imagen = user[0].fotoPerfil;

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
        } else if (user[0].celular == data.celular && user[0].email == data.email && user[0].nombres == data.nombres && user[0].fotoPerfil == data.imagen) {
            return res.status(200).json({
                success: false,
                message: "No realizó ningún cambio"
            })
        }

        pool.query("UPDATE Usuarios SET fotoPerfil = ?, celular = ?, email = ?, nombres = ? WHERE idUsuario = ?",
            [data.imagen, data.celular, data.email, data.nombres, data.idUsuario])
        return res.status(200).json({ success: true, message: "Cambió sus datos exitosamente" })
    } catch (error) {
        console.log("Error al cambiar la información del usuario: " + error)
    }
}


export const PostAgendarCita = async (req, res) => {

    try {
        const data = req.body;

        const fechaActual = new Date();
        const horaActual = fechaActual.getHours();
        const minutoActual = fechaActual.getMinutes();
        const minutoHoraActual = (horaActual * 60) + minutoActual;
        const diaActual = fechaActual.getDate();

        const fechaCita = new Date(data.fecha);
        const horaCita = fechaCita.getHours();
        const diaCita = fechaCita.getDate();
        const minutoCita = fechaCita.getMinutes();

        const minutoHoraCita = (horaCita * 60) + minutoCita;

        if (data.fecha == null) {
            return res.status(200).json({
                success: false,
                title: 'Datos incompletos',
                message: "La cita debe tener una fecha"
            })
        } else if (data.cedulaVet == null || data.cedulaVet == '') {
            return res.status(200).json({
                success: false,
                title: 'Datos incompletos',
                message: "Debe seleccionar un veterinario"
            })
        } else if (data.idSede == null || data.idSede == '') {
            return res.status(200).json({
                success: false,
                title: 'Datos incompletos',
                message: "Debe seleccionar una sede"
            })
        } else if (data.idMascota == null || data.idMascota == '') {
            return res.status(200).json({
                success: false,
                title: 'Datos incompletos',
                message: "Debe seleccionar una mascota"
            })
        } else if (data.idServicio == null || data.idServicio == '') {
            return res.status(200).json({
                success: false,
                title: 'Datos incompletos',
                message: "Debe seleccionar un servicio"
            })
        } else if (fechaCita < fechaActual) {
            return res.status(200).json({
                success: false,
                title: 'Fecha incorrecta',
                message: "Debe seleccionar una fecha futura"
            })
        } else if (minutoCita % 30 != 0) {
            return res.status(200).json({
                success: false,
                title: 'Hora incorrecta',
                message: "La hora debe estar solo en rangos de media hora \n Ejemplo: (..,2:00, 2:30,..)"
            })
        } else if (minutoHoraCita < 480 || minutoHoraCita > 1170) {
            return res.status(200).json({
                success: false,
                title: 'Hora incorrecta',
                message: "Nuestro Horario de atención es de 8:00AM a 8:00PM"
            })
        } else if (((minutoHoraCita - minutoHoraActual) < 30) && diaCita == diaActual) {
            return res.status(200).json({
                success: false,
                title: 'Hora incorrecta',
                message: "Debe agendar su cita al menos con media hora de anticipación"
            })
        }
        else {

            const [result_estado] = await pool.query("Select idEstadoCita FROM EstadosCitas WHERE estadoCita = ?", ["agendada"]);
            const idEstado = result_estado[0].idEstadoCita;
            const [result_fecha_servicio] = await pool.query("SELECT * FROM Citas WHERE FechaInicio = ? AND idEstadoCita = ? AND idServicio = ? AND idSede = ?", [fechaCita, idEstado, data.idServicio, data.idSede]);
            const [result_vet] = await pool.query('SELECT * FROM Citas WHERE FechaInicio = ? AND cedula = ? AND idEstadoCita', [fechaCita, data.cedulaVet, idEstado]);

            if (result_fecha_servicio.length != 0) {
                return res.status(200).json({
                    success: false,
                    title: "Fecha y hora no disponible",
                    message: "Esa fecha ya está tomada por otro paciente para el servicio solicitado en la sede especificada"
                })
            } else {
                if (result_vet.length != 0) {
                    return res.status(200).json({
                        success: false,
                        title: "Veterinario ocupado",
                        message: "Ese veterinario está ocupado para la fecha y hora especificadas"
                    })
                } else {

                    const [result_mascota_servicio] = await pool.query("Select * FROM Citas WHERE idMascota = ? AND FechaInicio = ? AND idEstadoCita = ?", [data.idMascota, fechaCita, idEstado])
                    if (result_mascota_servicio.length != 0) {
                        return res.status(200).json({
                            success: false,
                            title: 'Mascota ya agendada',
                            message: "La mascota seleccionada ya tiene agendade una cita"
                        })
                    }

                    try {
                        await pool.query("INSERT INTO Citas SET ?", {
                            fechaInicio: fechaCita,
                            idServicio: data.idServicio,
                            idMascota: data.idMascota,
                            cedula: data.cedulaVet,
                            idSede: data.idSede,
                            idEstadoCita: idEstado
                        })

                    } catch (error) {
                        console.error('Error al enviar datos a la BD:', error);
                        return res.status(500).json({
                            message: "Error en el servidor",
                            success: false
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        title: 'Cita agendada correctamente',
                        message: "Recibirá un correo con la confirmación de su cita"
                    })

                }
            }
        }

    } catch (error) {
        console.error('Error en la función postAgendarCita:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            success: false
        });
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

        const id = data.idUsuario;

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
        } else if (data.fechaNac == null) {
            return res.status(200).json({
                success: false,
                message: "Debe ingresar la fecha de nacimiento de su mascota"
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
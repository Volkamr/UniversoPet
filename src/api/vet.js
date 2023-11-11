import axios from "axios"

//GET

export const getServicesRequest = async () => {
    return await axios.get("http://localhost:3001/UniversoPet/Api/Services");
}

export const getSedesRequest = async () => {
    return await axios.get("http://localhost:3001/UniversoPet/Api/Sedes");
}

export async function getService(idServicio) {
    return await axios.get(`http://localhost:3001/UniversoPet/Api/Services/${idServicio}`);
}

export const getPersonalRequest = async () => {
    return await axios.get("http://localhost:3001/UniversoPet/Api/Personal");
}

export const getUserRequest = async (authToken) => {

    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/Usuario/${authToken}`,
        {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        }
    );
    console.log(response)
    return response;
}

export const getUserPetsRequest = async (idUsuario) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/MascotasUser/${idUsuario}`,);
    return response;
}

export const getVetRequest = async (vetToken) => {
    return await axios.get(`http://localhost:3001/UniversoPet/Api/Veterinario/${vetToken}`, {
        headers: {
            'Authorization': `Bearer ${vetToken}`,
        }
    })
}

export const getAdminRequest = async (adminToken) => {
    return await axios.get(`http://localhost:3001/UniversoPet/Api/Administrador/${adminToken}`, {
        headers: {
            'Authorization': `Bearer ${adminToken}`,
        }
    })
}

export const getPersonalPRequest = async () => {
    return await axios.get("http://localhost:3001/UniversoPet/Api/PersonalP");
}

export const getVeterinarioxSedeRequest = async (idSede) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/VetxSedes/${idSede}`,)
    return response;
}

export const getCitasxMascotaRequest = async (idMascota) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/CitasxMascota/${idMascota}`)
    return response;
}

export const getCitasxUsuarioRequest = async (idUsuario) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/CitasxUsuario/${idUsuario}`)
    return response;
}

export const getCitasxVetRequest = async (cedula) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/CitasxVet/${cedula}`)
    return response;
}

export const getCitaRequest = async (idCita) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/Cita/${idCita}`)
    console.log(response)
    return response;
}

export const getDiagnosticoxCitaRequest = async (idCita) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/DiagnosticoCita/${idCita}`)
    return response;
}

export const busSede = async (name) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/Buscar/Sede/${name}`)
    return response;
}

export const busPersonal = async (name) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/Buscar/Personal/${name}`)
    return response;
}

export const busServicio = async (name) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/Buscar/Servicio/${name}`)
    return response;
}

export const sendEmail = async (email) => await axios.post('http://localhost:3001/UniversoPet/Api/sendEmail', email);

export const createSedes = async (sede) => await axios.post('http://localhost:3001/UniversoPet/Api/CreateSedes', sede);

export const createServices = async (service) => await axios.post('http://localhost:3001/UniversoPet/Api/CreateServices', service);

export const createPersonal = async (personal) => await axios.post('http://localhost:3001/UniversoPet/Api/CreatePersonal', personal);

export const createMascota = async (mascota) => await axios.post('http://localhost:3001/UniversoPet/Api/CreateMascota', mascota);

export const updateMascota = async (mascota) => await axios.post('http://localhost:3001/UniversoPet/Api/UpdateMascota', mascota);

export const eliMascota = async (idMascota) => await axios.post('http://localhost:3001/UniversoPet/Api/eliMascota', idMascota);

export const postCambioInfoRequest = async (idUsuario, email, celular, nombres, imagen) => {
    return await axios.post("http://localhost:3001/UniversoPet/Api/cambiarInfo", {
        email: email,
        idUsuario: idUsuario,
        celular: celular,
        nombres: nombres,
        imagen: imagen
    })
}

export const postLoginRequest = async (email, password) => {
    return await axios.post("http://localhost:3001/UniversoPet/Api/Login", {
        email: email,
        password: password
    })
}

export const postLoginVetRequest = async (cedula, password) => {
    return await axios.post("http://localhost:3001/UniversoPet/Api/LoginVet", {
        cedula: cedula,
        password: password
    })
}

export const postLoginAdminRequest = async (adminusr, password) => {
    return await axios.post("http://localhost:3001/UniversoPet/Api/LoginAdmin", {
        admin: adminusr,
        password: password
    })
}

export const postAgendarCitaRequest = async (fecha, cedulaVet, idSede, idMascota, idServicio) => {
    return await axios.post('http://localhost:3001/UniversoPet/Api/AgendarCita', {
        fecha: fecha,
        cedulaVet: cedulaVet,
        idSede: idSede,
        idMascota: idMascota,
        idServicio: idServicio
    })
}

export const postDiagnosticoRequest = async (idCita, comentario, diagnostico) => {
    return await axios.post('http://localhost:3001/UniversoPet/Api/postDiagnostico', {
        idCita: idCita,
        diagnostico: diagnostico,
        comentario: comentario
    })
}
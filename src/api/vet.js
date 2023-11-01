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

export const getUserPetsRequest = async (authToken) => {
    const response = await axios.get(`http://localhost:3001/UniversoPet/Api/MascotasUser/${authToken}`,
        {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        }
    );
    console.log(response)
    return response;
}

export const getVetRequest = async (vetToken) =>{
    return await axios.get(`http://localhost:3001/UniversoPet/Api/Veterinario/${vetToken}`,{
        headers: {
            'Authorization': `Bearer ${vetToken}`,
        }
    })
}

export const getPersonalPRequest = async () => {
    return await axios.get("http://localhost:3001/UniversoPet/Api/PersonalP");
}

export const createMascota = async (mascota) => await axios.post('http://localhost:3001/UniversoPet/Api/CreateMascota', mascota);

export const updateMascota = async (mascota) => await axios.post('http://localhost:3001/UniversoPet/Api/UpdateMascota', mascota);

export const eliMascota = async (idMascota) => await axios.post('http://localhost:3001/UniversoPet/Api/eliMascota', idMascota);

export const postCambioInfoRequest = async (idUsuario, email, celular, nombres) =>{
    return await axios.post("http://localhost:3001/UniversoPet/Api/cambiarInfo",{
        email: email,
        idUsuario: idUsuario,
        celular: celular,
        nombres: nombres
    })
}

export const postLoginRequest = async (email, password) =>{
    return await axios.post("http://localhost:3001/UniversoPet/Api/Login", {
        email: email,
        password: password
    })
}

export const postLoginVetRequest = async (cedula, password) =>{
    return await axios.post("http://localhost:3001/UniversoPet/Api/LoginVet",{
        cedula: cedula,
        password: password
    }) 
}

export const postLoginAdminRequest = async (adminusr, password) =>{
    return await axios.post("http://localhost:3001/UniversoPet/Api/LoginAdmin", {
        admin: adminusr,
        password: password
    })
}
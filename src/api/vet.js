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

export const getUserRequest = async (idUsuario) =>{
    return await axios.get(`http://localhost:3001/UniversoPet/Api/Usuario/${idUsuario}`);
}

export const getUserPetsRequest = async(idUsuario) =>{
    return await axios.get(`http://localhost:3001/UniversoPet/Api/MascotasUser/${idUsuario}`)
}
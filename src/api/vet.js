import axios from "axios"

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
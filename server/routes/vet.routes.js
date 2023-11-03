import { Router } from "express";
import {
    getServices,
    getSedes,
    postSedes,
    postServices,
    postRegistro,
    postLogin,
    postLoginVet,
    postLoginAdmin,
    getService,
    postPersonal,
    getPersonal,
    postCambiarInfo,
    getUsers,
    getUser,
    getUserPets,
    getPersonalP,
    postMascota,
    updateMascota,
    eliMascota,
    getVeterinario,
    getAdministrador,
    getVeterinariosxSede,
} from '../controllers/vet.controller.js'

const router = Router()

router.get('/UniversoPet/Api/Services', getServices)
router.get('/UniversoPet/Api/Sedes', getSedes)
router.get('/UniversoPet/Api/Services/:idServicio', getService)
router.get('/UniversoPet/Api/Personal', getPersonal)
router.get('/UniversoPet/Api/Usuarios', getUsers)
router.get('/UniversoPet/Api/Usuario/:accessToken', getUser)
router.get('/UniversoPet/Api/MascotasUser/:idUsuario', getUserPets)
router.get('/UniversoPet/Api/PersonalP', getPersonalP)
router.get('/UniversoPet/Api/Veterinario/:vetToken', getVeterinario)
router.get('/UniversoPet/Api/Administrador/:adminToken', getAdministrador)
router.get('/UniversoPet/Api/VetxSedes/:idSede', getVeterinariosxSede)

router.post('/UniversoPet/Api/CreateServices', postServices)
router.post('/UniversoPet/Api/CreateSedes', postSedes)
router.post('/UniversoPet/Api/CreatePersonal', postPersonal)
router.post('/UniversoPet/Api/RegistrarUsuario', postRegistro)
router.post('/UniversoPet/Api/Login', postLogin)
router.post('/UniversoPet/Api/LoginVet', postLoginVet)
router.post('/UniversoPet/Api/LoginAdmin', postLoginAdmin)
router.post('/UniversoPet/Api/CreateMascota', postMascota)
router.post('/UniversoPet/Api/UpdateMascota', updateMascota)
router.post('/UniversoPet/Api/eliMascota', eliMascota)
router.post('/UniversoPet/Api/cambiarInfo', postCambiarInfo)



export default router
import { Router } from "express";
import {
    getServices,
    getSedes,
    postSedes,
    postServices,
    postRegistro,
    postLogin,
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
    eliMascota
} from '../controllers/vet.controller.js'

const router = Router()

router.get('/UniversoPet/Api/Services', getServices)
router.get('/UniversoPet/Api/Sedes', getSedes)
router.get('/UniversoPet/Api/Services/:idServicio', getService)
router.get('/UniversoPet/Api/Personal', getPersonal)
router.get('/UniversoPet/Api/Usuarios', getUsers)
router.get('/UniversoPet/Api/Usuario/:accessToken', getUser)
router.get('/UniversoPet/Api/MascotasUser/:accessToken', getUserPets)
router.get('/UniversoPet/Api/PersonalP', getPersonalP)

router.post('/UniversoPet/Api/CreateServices', postServices)
router.post('/UniversoPet/Api/CreateSedes', postSedes)
router.post('/UniversoPet/Api/CreatePersonal', postPersonal)
router.post('/UniversoPet/Api/RegistrarUsuario', postRegistro)
router.post('/UniversoPet/Api/Login', postLogin)
router.post('/UniversoPet/Api/CreateMascota', postMascota)
router.post('/UniversoPet/Api/UpdateMascota', updateMascota)
router.post('/UniversoPet/Api/eliMascota', eliMascota)
router.post('/UniversoPet/Api/cambiarInfo', postCambiarInfo)



export default router
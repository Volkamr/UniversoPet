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
    getUsers
} from '../controllers/vet.controller.js'

const router = Router()

router.get('/UniversoPet/Api/Services', getServices)
router.get('/UniversoPet/Api/Sedes', getSedes)
router.get('/UniversoPet/Api/Services/:idServicio', getService)
router.get('/UniversoPet/Api/Personal', getPersonal)
router.get('/UniversoPet/Api/Usuarios', getUsers)

router.post('/UniversoPet/Api/CreateServices', postServices)
router.post('/UniversoPet/Api/CreateSedes', postSedes)
router.post('/UniversoPet/Api/CreatePersonal', postPersonal)
router.post('/UniversoPet/Api/RegistrarUsuario', postRegistro)
router.post('/UniversoPet/Api/Login', postLogin)


export default router
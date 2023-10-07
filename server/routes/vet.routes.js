import { Router } from "express";
import {
    getServices,
    getSedes,
    postSedes,
    postServices,
    getService,
    postPersonal,
    getPersonal
} from '../controllers/vet.controller.js'

const router = Router()

router.get('/UniversoPet/Api/Services', getServices)
router.get('/UniversoPet/Api/Sedes', getSedes)
router.get('/UniversoPet/Api/Services/:idServicio', getService)
router.get('/UniversoPet/Api/Personal', getPersonal)

router.post('/UniversoPet/Api/CreateServices', postServices)
router.post('/UniversoPet/Api/CreateSedes', postSedes)
router.post('/UniversoPet/Api/CreatePersonal', postPersonal)

export default router
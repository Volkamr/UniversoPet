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
    PostAgendarCita,
    getCitasMascota,
    getCitasUsuario,
    getCitasVet,
    getCita,
    getDiagnosticoxCita,
    sendEmail,
    postDiagnostico,
    busSede,
    busPersonal,
    busServicio,
    putCancelarCita,
    updateSede,
    updatePersonal,
    updateServicio,
    eliSede,
    eliPersonal,
    eliServicio,
    pruinsert,
    recuperar,
    cambiar_contrasena,
    mail_cita
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
router.get('/UniversoPet/Api/CitasxMascota/:idMascota', getCitasMascota)
router.get('/UniversoPet/Api/CitasxUsuario/:idUsuario', getCitasUsuario)
router.get('/UniversoPet/Api/CitasxVet/:cedula', getCitasVet)
router.get('/UniversoPet/Api/Cita/:idCita', getCita)
router.get('/UniversoPet/Api/DiagnosticoCita/:idCita', getDiagnosticoxCita)
router.get('/UniversoPet/Api/Buscar/Sede/:name', busSede)
router.get('/UniversoPet/Api/Buscar/Personal/:name', busPersonal)
router.get('/UniversoPet/Api/Buscar/Servicio/:name', busServicio)

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
router.post('/UniversoPet/Api/AgendarCita', PostAgendarCita)
router.post('/UniversoPet/Api/sendEmail', sendEmail)
router.post('/UniversoPet/Api/postDiagnostico', postDiagnostico)
router.put('/UniversoPet/Api/CancelarCita', putCancelarCita)
router.post('/UniversoPet/Api/UpdateSede', updateSede)
router.post('/UniversoPet/Api/UpdatePersonal', updatePersonal)
router.post('/UniversoPet/Api/UpdateServicio', updateServicio)
router.post('/UniversoPet/Api/EliSede', eliSede)
router.post('/UniversoPet/Api/EliPersonal', eliPersonal)
router.post('/UniversoPet/Api/EliServicio', eliServicio)
router.post('/UniversoPet/Api/pruinsert', pruinsert)
router.post('/UniversoPet/Api/recuperar', recuperar)
router.post('/UniversoPet/Api/cam_con', cambiar_contrasena)
router.post('/UniversoPet/Api/m_cita', mail_cita)

export default router
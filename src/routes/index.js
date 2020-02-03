/** ==================================
 *        Enrutador Principal
 ================================== */
const express = require('express');
const cors = require('cors'); // CORS de las peticiones
const helmet = require('helmet'); // Brechas de Seguridad
const compression = require('compression'); // Comprimir peticiones HTTP
require('express-async-errors'); // Capturar excepciones de las Promesas ASYNC
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares'); // Cargar Middlewares de error

module.exports = function({
    HomeRoutes,
    UserRoutes,
    IdeaRoutes,
    CommentRoutes,
    AuthRoutes
}) { // Recibe las rutas requeridas
    const router = express.Router(); // Enrutador global
    const apiRoutes = express.Router(); // Enrutador de la API


    /** ==================================
    *          Cargar Middlewares
    ====================================== */
    apiRoutes // 
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());

    // -----------------------------------
    //              Rutas
    // -----------------------------------
    apiRoutes.use("/home", HomeRoutes);
    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/idea", IdeaRoutes);
    apiRoutes.use("/comment", CommentRoutes);
    apiRoutes.use("/auth", AuthRoutes);


    // -----------------------------------
    //   Establecer prefijo en la ruta
    // -----------------------------------
    router.use("/v1/api", apiRoutes);
    router.use("/v1/api", apiRoutes);

    /** ==================================
    *     Cargar Middlewares de rutas 
    ====================================== */
    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router; // Retornar Enrutador Global
}
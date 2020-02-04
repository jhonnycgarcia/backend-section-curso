/** ==================================
 *        Enrutador Principal
 ================================== */
const express = require('express');
const cors = require('cors'); // CORS de las peticiones
const helmet = require('helmet'); // Brechas de Seguridad
const compression = require('compression'); // Comprimir peticiones HTTP
require('express-async-errors'); // Capturar excepciones de las Promesas ASYNC
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares'); // Cargar Middlewares de error

const swaggerUI = require('swagger-ui-express'); // Libreria para documentacion
const { SWAGGER_PATH } = require('../config'); // PATH Swagger
const swaggerDocument = require('../config/swagger/swaggerDEV.json'); // Cargar documento

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
    router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument)); // Cargar ruta para documentacion

    /** ==================================
    *     Cargar Middlewares de rutas 
    ====================================== */
    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router; // Retornar Enrutador Global
}
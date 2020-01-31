const { createContainer, asClass, asValue, asFunction } = require('awilix'); // Cargar dependencias AWILIX

// -----------------------------------
//        Variables del Config
// -----------------------------------
const config = require('../config');

// -----------------------------------
//     Cargar servidor configurado
// -----------------------------------
const app = require('.');

/** ==================================
 *             Importar
 ================================== */
// Services - Servicios
const { HomeService } = require('../services');

// Controllers - Controladores
const { HomeController } = require('../controllers');

// Routes - Rutas
const { HomeRoutes } = require('../routes/index.routes');
const Routes = require('../routes'); // Importar enrutador global

// Models - Modelos
const { Comment, Idea, User } = require('../models');

// Container
const container = createContainer(); // -- Crear contenedor
container
    .register({
        app: asClass(app).singleton(), // Inyectar servidor instanciado
        router: asFunction(Routes).singleton(), // inyectar rutas
        config: asValue(config) // inyectar variables de configuracion
    })
    .register({ // Inyectar Servicio
        HomeService: asClass(HomeService).singleton()
    })
    .register({ // Inyectar Controlador
        HomeController: asClass(HomeController.bind(HomeController)).singleton()
    })
    .register({ // Inyectar Rutas
        HomeRoutes: asFunction(HomeRoutes).singleton()
    })
    .register({ // Inyectar Modeos
        User: asValue(User),
        Idea: asValue(Idea),
        Comment: asValue(Comment)
    });

module.exports = container; // Exportar Contenedor
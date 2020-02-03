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
const {
    HomeService,
    CommentService,
    IdeaService,
    UserService
} = require('../services');

// Controllers - Controladores
const {
    HomeController,
    UserController,
    CommentController,
    IdeaController
} = require('../controllers');

// Routes - Rutas
const {
    HomeRoutes,
    CommentRoutes,
    IdeaRoutes,
    UserRoutes
} = require('../routes/index.routes');
const Routes = require('../routes'); // Importar enrutador global

// Models - Modelos
const { Comment, Idea, User } = require('../models');

// Repositories - Repositorios
const { CommentRepository, IdeaRepository, UserRepository } = require('../repositories');

// Container
const container = createContainer(); // -- Crear contenedor
container
    .register({
        app: asClass(app).singleton(), // Inyectar servidor instanciado
        router: asFunction(Routes).singleton(), // inyectar rutas
        config: asValue(config) // inyectar variables de configuracion
    })
    .register({ // Inyectar Servicio
        HomeService: asClass(HomeService).singleton(),
        IdeaService: asClass(IdeaService).singleton(),
        UserService: asClass(UserService).singleton(),
        CommentService: asClass(CommentService).singleton()
    })
    .register({ // Inyectar Controlador
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
        CommentController: asClass(CommentController.bind(CommentController)).singleton()
    })
    .register({ // Inyectar Rutas
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        IdeaRoutes: asFunction(IdeaRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
        CommentRoutes: asFunction(CommentRoutes).singleton()
    })
    .register({ // Inyectar Modelos
        User: asValue(User),
        Idea: asValue(Idea),
        Comment: asValue(Comment)
    })
    .register({ // Inyectar Repositorios
        UserRepository: asClass(UserRepository).singleton(),
        IdeaRepository: asClass(IdeaRepository).singleton(),
        CommentRepository: asClass(CommentRepository).singleton()
    });

module.exports = container; // Exportar Contenedor
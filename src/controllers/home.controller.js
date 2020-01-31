let _homeService = null;

class HomeController {
    constructor({ HomeService }) { // Inyectar servicio desde AWILIX
        _homeService = HomeService;
    }

    index(req, res) {
        res.send(_homeService.index());
    }
}

module.exports = HomeController;
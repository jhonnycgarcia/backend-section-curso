const BaseRepository = require('./base.repository');
let _idea = null;

class IdeaRepository extends BaseRepository {

    constructor({ Idea }) { // Inyectar variable AWILIX
        super(Idea); // Cargar constructor padre
        _idea = Idea; // Cargar en variable externa
    }

    async getUserIdeas(author) { // Obtener ideas del usuario
        return await _idea.find({ author });
    }

}
module.exports = IdeaRepository;
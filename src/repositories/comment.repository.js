const BaseRepository = require('./base.repository');
let _comment = null;

class CommentRepository extends BaseRepository {

    constructor({ Comment }) { // Inyectar variable AWILIX
        super(Comment); // Cargar constructor padre
        _comment = Comment; // Cargar en variable externa
    }

}
module.exports = CommentRepository;
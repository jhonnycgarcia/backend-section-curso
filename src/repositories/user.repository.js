const BaseRepository = require('./base.repository');
let _user = null;

class UserRepository extends BaseRepository {

    constructor({ User }) { // Inyectar variable AWILIX
        super(User); // Cargar constructor padre
        _user = User; // Cargar en variable externa
    }

    async getUserByUsername(username) { // Obtener usuario por nombre
        return await _user.findOne({ userName: { $regex: new RegExp(username, 'i') } })
    }
}
module.exports = UserRepository;
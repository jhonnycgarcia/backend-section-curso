class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async get(id) { // Obtener por ID
        return await this.model.findById(id);
    }

    async getAll() { // Obtener todos
        return await this.model.find();
    }

    async create(entity) { // Registrar
        return await this.model.create(entity);
    }

    async update(id, entity) { // Actualizar
        return await this.model.findByIdAndUpdate(id, entity, { new: true });
    }

    async delete(id) { // Eliminar
        return await this.model.findByIdAndDelete(id);
    }

}
module.exports = BaseRepository;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async get(id) { // Obtener por ID
        return await this.model.findById(id);
    }

    async getAll(pageSize = 5, pageNumber = 1) { // Obtener todos
        const skips = pageSize * (pageNumber - 1);
        return await this.model.find().skip(skips).limit(pageSize);
    }

    async create(entity) { // Registrar
        return await this.model.create(entity);
    }

    async update(id, entity) { // Actualizar
        return await this.model.findByIdAndUpdate(id, entity, { new: true });
    }

    async delete(id) { // Eliminar
        // return await this.model.findByIdAndDelete(id);
        await this.model.findByIdAndDelete(id);
        return true;
    }

}
module.exports = BaseRepository;
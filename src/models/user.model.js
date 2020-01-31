const mongoose = require('mongoose');
const { Schema } = mongoose;

const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: true } });



/** ================================
 * Eliminar campo contraseña cada vez que se lean los registros
 ================================*/
UserSchema.methods.toJSON = function() {
    let user = this.toObject();
    delete user.password;
    return user;
}

/** ================================
 * Metodo creado para comparar contraseñas
 ================================*/
UserSchema.methods.comparePasswords = function(password) {
    return compareSync(password, this.password);
}

/** ================================
 *   Antes de guardar un registro
 ================================*/
UserSchema.pre('save', async function(next) {
    const user = this; // Capturar registro de usuario

    if (!user.isModified('password')) { // Si no se modifica el password
        return next();
    }

    const salt = genSaltSync(10); // Generar salto
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model('User', UserSchema); // Exportar Modelo
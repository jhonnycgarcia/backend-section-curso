const { UserRepository } = require('../../../src/repositories'); // Repository
const { User } = require('../../../src/models'); // Model
const mockingoose = require('mockingoose').default;

let { UserModelMock: { user, users }, UserRepositoryMock } = require('../../mocks');

describe("User Repository Test", () => {
    beforeEach(() => { // Antes de ejecutar
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    it("Should return a user by id", async() => {
        const _user = {...user }; // Copiar el objeto User del modelo.mock
        delete _user.password; // Eliminar clave
        mockingoose(User).toReturn(user, "findOne");

        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.get(_user._id);

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should find a user by username", async() => {
        const _user = {...user }; // Copiar el objeto User del modelo.mock
        delete _user.password; // Eliminar clave
        mockingoose(User).toReturn(user, "findOne");

        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getUserByUsername(_user.username);
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should return a user collection", async() => {
        const _users = users.map(user => {
            delete user.password;
            return user;
        });

        mockingoose(User).toReturn(users, "find");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_users);
    });

    it("Should update an especific user by id", async() => {
        const _user = {...user }; // Copiar el objeto User del modelo.mock
        delete _user.password; // Eliminar clave
        mockingoose(User).toReturn(user, "findOneAndUpdate");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.update(_user._id, { name: "Test Jest Update" });
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should delete an especific user by id", async() => {
        const _user = {...user }; // Copiar el objeto User del modelo.mock
        mockingoose(User).toReturn(user, "findOneAndDelete");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.delete(_user._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    });

});
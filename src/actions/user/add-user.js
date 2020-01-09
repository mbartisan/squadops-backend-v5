import {makeUser} from "../../entities/user/index.js";
export default function makeAddUser({ usersDb }) {
    return async function addUser(userData) {
        const user = makeUser(userData);

        const exists = await usersDb.users.query.findOne({ id: user.getId() });
        if (exists) throw new Error("User already exists.");

        return usersDb.users.query.insert({
            name: user.getName(),
            email: user.getEmail(),
            identity: user.getIdentity(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt()
        });
    }
}

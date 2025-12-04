import users from "../defaultUsers.js";

import models from "../../models/index.js";
import bcrypt from "bcryptjs";

const populateUsersTable = async() => {
    // Create users
    for (const userData of users) {
        await models.user.create({
            ...userData, 
            password: await bcrypt.hash("123", 10)
        });
    }
}

export default populateUsersTable;
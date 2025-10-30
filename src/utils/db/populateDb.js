import users from "../defaultUsers.js";
import books from "../defaultBooks.js";
import authors from "../defaultAuthors.js";
import genders from "../defaultGenders.js";

import models from "../../models/index.js";

const populateDb = async() => {
    // Create genders first and store them
    const createdGenders = [];
    for (const genderData of genders) {
        const gender = await models.gender.create(genderData);
        createdGenders.push(gender);
    }

    // Create authors and store them
    const createdAuthors = [];
    for (const authorData of authors) {
        const author = await models.author.create(authorData);
        createdAuthors.push(author);
    }

    // Create books with authorId and genderId
    for (let i = 0; i < books.length; i++) {
        const bookData = books[i];
        const book = await models.book.create({
            ...bookData,
            AuthorId: createdAuthors[i % createdAuthors.length]?.id,
            GenderId: createdGenders[i % createdGenders.length]?.id
        });
    }

    // Create users
    for (const userData of users) {
        const user = await models.user.create(userData);
    }
}

export default populateDb;
const AuthorService = {
    getAllAuthors: async (models) => {
        const Author = models.author;
        const authors = await Author.findAll();
        return authors;
    },

    getAuthorById: async (models, id) => {
        const Author = models.author;
        const author = await Author.findByPk(id);
        return author;
    },

    createAuthor: async (models, authorData) => {
        const Author = models.author;
        const {name, nationality, birthDate, bio} = authorData
        const author = await Author.create({
            name: name,
            nationality: nationality,
            birthDate: birthDate,
            bio: bio
        });
        return author;
    },

    updateAuthorById: async (models, id, authorData) => {
        const Author = models.author;
        const author = await Author.findByPk(id);
        if (!author){
            return null;
        }

        const {name, nationality, birthDate, bio} = authorData;

        author.name = name || author.name;
        author.nationality = nationality || author.nationality;
        author.birthDate = birthDate || author.birthDate;
        author.bio = bio || author.bio;

        await author.save();
        return author;
    },

    deleteAuthorById: async (models, id) => {
        const Author = models.author;
        const author = await Author.findByPk(id);
        if (!author){
            return null;
        }

        await author.destroy();
        return author;
    }
}

export default AuthorService;
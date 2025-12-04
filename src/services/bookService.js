import { Op } from "sequelize";

const BookService = {
    getAllBooks: async (models, title) => {
        const Book = models.book;
        const books = await Book.findAll({
            where: {
                title: {[Op.iLike]: `%${title || ''}%`
            }
        }});
        return books;
    },

    getBookById: async (models, id) => {
        const Book = models.book;
        const Review = models.review;
        const book = await Book.findByPk(id, {
            include: ["Author", "Gender"]
        });
        if (!book) return null;
        let avg = await Review.getAvgRateByBookId(id);
        avg = (avg === "NaN") ? 0 : avg;

        return { 
            ...book.toJSON(), 
            avgRating: avg
        };
    },

    createBook: async (models, bookData, authorId, genderId) => {
        const Book = models.book;
        const Author = models.author;
        const Gender = models.gender;
        const {title, description, year, imgUrl} = bookData;

        const author = await Author.findByPk(authorId);
        if (!author) {
            return { success: false, status: 404, message: 'Autor não encontrado' };
        }

        const gender = await Gender.findByPk(genderId);
        if (!gender) {
            return { success: false, status: 404, message: 'Gênero não encontrado' };
        }
        
        const book = await Book.create({
            title: title,
            description: description,
            year: year,
            AuthorId: authorId,
            GenderId: genderId,
            imgUrl: imgUrl
        });
        
        return { success: true, status: 201, data: book };
    },

    updateBookById: async (models, id, bookData) => {
        const Book = models.book;
        const book = await Book.findByPk(id);
        if(!book){
            return null;
        }

        const {title, description, year, imgUrl} = bookData;

        book.title = title || book.title;
        book.description = description || book.description;
        book.year = year || book.year;
        book.imgUrl = imgUrl || book.imgUrl;

        await book.save();
        return book;
    },

    deleteBookById: async (models, id) => {
        const Book = models.book;
        const book = await Book.findByPk(id);
        if(!book){
            return null;
        }

        await book.destroy();
        return book;
    },

    getAllBooksByAuthorId: async (models, authorId) => {
        const Book = models.book;
        const books = await Book.findAllByAuthorId(authorId);
        return books;
    },

    getAllBooksByGenderId: async (models, genderId) => {
        const Book = models.book;
        const books = await Book.findAllByGenderId(genderId);
        return books;
    }
}

export default BookService;
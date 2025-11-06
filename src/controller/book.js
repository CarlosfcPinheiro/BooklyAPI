import { Op } from "sequelize";

const getAllBooks = async (req, res) => {
    try{
        const Book = req.context.models.book;
        const {title} = req.query;
        const books = await Book.findAll({
            where: {
                title: {[Op.iLike]: `%${title || ''}%`
            }
        }});
        if(!books || books.length == 0){
            return res.status(404).json({message: "Nenhum livro encontrado"});
        }
        res.status(200).json({
            message:"Livros encontrados com sucesso", 
            data: books
        });
    } catch(error){
        res.status(500).json({
            message: "Erro ao buscar livros", 
            error: error.message
        });
    }
};

const getBookById = async (req, res) => {
    try{
        const Book = req.context.models.book;
        const {id} = req.params;
        const book = await Book.findByPk(id);
        if(!book){
            return res.status(404).json({message: "Livro não foi encontrado."});
        }

        res.status(200).json({
            message:"Livro encontrado com sucesso.", 
            data: book}
        );
    } catch(error){
        res.status(500).json({
            message: "Erro ao buscar o livro", 
            error: error.message
        });
    }
};

//TODO adicionar lógica de criação de autor caso ainda não exista
const createBook = async (req, res) => {
    try{
        const Book = req.context.models.book;
        const {title, description, year, imgUrl} = req.body;
        const {authorId, genderId} = req.query;

        if (!authorId || !genderId){
            return res.satus(400).json({message: "authorId e genderId são obrigatórios."});
        }

        const book = await Book.create({
            title: title,
            description: description,
            year: year,
            AuthorId: authorId,
            GenderId: genderId,
            imgUrl: imgUrl
        });

        res.status(201).json({
            message: "Livro criado com sucesso.", 
            data: book
        });
    } catch(error){
        res.status(500).json({
            message: "Erro ao criar o Livro", 
            error: error.message
        });
    }
};

const updateBookById = async (req, res) => {
    try{
        const Book = req.context.models.book;
        const {id} = req.params;
        const {title, description, year} = req.body;

        const book = await Book.findByPk(id);
        if(!book){
            return res.status(404).json({message: "Livro não encontrado."});
        }

        book.title = title || book.title;
        book.description = description || book.description;
        book.year = year || book.year;
        
        await book.save();

        res.status(200).json({
            message: "Livro atualizado com sucesso", 
            data: book
        });
    } catch(error){
        res.status(500).json({
            message: "Erro ao atualizar o livro", 
            error: error.message
        });
    }
};

const deleteBookById = async (req, res) => {
    try {
        const Book = req.context.models.book;
        const {id} = req.params;
        const book = await Book.findByPk(id);
        if(!book){
            return res.status(404).json({message: "Livro não encontrado"});
        }

        await book.destroy();

        res.status(200).json({message: "Livro deletado com sucesso"});

    } catch(error){
        res.status(500).json({
            message: "Erro ao deletar o livro", 
            error: error.message
        });
    }
};

const getAllBooksByAuthorId = async (req, res) => {
    try{
        const Book = req.context.models.book;
        const {authorId} = req.params;
        const books = await Book.findAllByAuthorId(authorId);
        if(!books || books.length === 0){
            return res.status(404).json({message: "Nenhum livro encontrado para o autor informado."});
        }

        res.status(200).json({
            message: "Livros do autor encontrados com sucesso", 
            data: books
        });
    } catch(error){
        res.status(500).json({
            message: "Erro ao buscar livros do autor", 
            error: error.message
        });
    }
}

const getAllBooksByGenderId = async (req, res) => {
    try{
        const Book = req.context.models.book;
        const {genderId} = req.params;
        const books = await Book.findAllByGenderId(genderId);
        if(!books || books.length === 0){
            return res.status(404).json({message: "Nenhum livro encontrado para o gênero informado."});
        }

        res.status(200).json({
            message: "Livros do gênero encontrados com sucesso", 
            data: books
        });
    } catch(error){
        res.status(500).json({
            message: "Erro ao buscar livros do gênero", 
            error: error.message
        });
    }
}

export {
    getAllBooks, 
    getBookById,
    createBook, 
    updateBookById, 
    deleteBookById, 
    getAllBooksByAuthorId, 
    getAllBooksByGenderId
}
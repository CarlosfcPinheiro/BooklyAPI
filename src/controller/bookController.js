import BookService from "../services/bookService.js";

const BookController = {
    getAllBooks: async (req, res) => {
        try{
            const {title} = req.query;
            const books = await BookService.getAllBooks(req.context.models, title);
            if(!books || books.length == 0){
                return res.status(204).json({message: "Nenhum livro encontrado"});
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
    },

    getBookById: async (req, res) => {
        try {
            const { id } = req.params;
            const book = await BookService.getBookById(req.context.models, id);   
            if (!book) {
                return res.status(404).json({ message: "Livro não foi encontrado." });
            }

            res.status(200).json({
                message: "Livro encontrado com sucesso.", 
                data: book
            });
        } catch(error) {
            res.status(500).json({
                message: "Erro ao buscar o livro", 
                error: error.message
            });
        }
    },

    createBook: async (req, res) => {
        try {
            const { authorId, genderId } = req.query;
            const result = await BookService.createBook(req.context.models, req.body, authorId, genderId);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }

            res.status(201).json({
                message: 'Livro criado com sucesso',
                data: result.data
            });
        } catch(error) {
            res.status(500).json({
                message: "Erro ao criar o livro", 
                error: error.message
            });
        }
    },

    updateBookById: async (req, res) => {
        try{
            const {id} = req.params;
            const bookData = req.body;

            const book = await BookService.updateBookById(req.context.models, id, bookData);
            if(!book){
                return res.status(404).json({message: "Livro não encontrado."});
            }

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
    },

    deleteBookById: async (req, res) => {
        try {
            const {id} = req.params;
            const book = await BookService.deleteBookById(req.context.models, id);
            if(!book){
                return res.status(404).json({message: "Livro não encontrado"});
            }

            res.status(200).json({message: "Livro deletado com sucesso"});

        } catch(error){
            res.status(500).json({
                message: "Erro ao deletar o livro", 
                error: error.message
            });
        }
    },

    getAllBooksByAuthorId: async (req, res) => {
        try{
            const {authorId} = req.params;
            const books = await BookService.getAllBooksByAuthorId(req.context.models, authorId);
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
    },

    getAllBooksByGenderId: async (req, res) => {
        try{
            const {genderId} = req.params;
            const books = await BookService.getAllBooksByGenderId(req.context.models, genderId);
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
};

export default BookController;
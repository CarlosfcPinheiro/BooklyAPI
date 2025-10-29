import models from "../models/index.js"

const Author = models.author;

//TODO adicionar query param de busca por nome do autor aplicando regex para busca parcial, ex /author?name=jo retorna todos os autores com "jo" no nome
const getAllAuthor = async (req, res) => {
    try {
        const authors = await Author.findAll();
        if (!authors || authors.length == 0){
            return res.status(404).json({message: "Nenhum autor(a) foi encontrado"});
        }

        res.status(200).json({message: "Autores(as) encontrados com sucesso", data: authors})

    } catch(error) {
        res.status(500).json({message: "Erro ao buscar autores", error: error.message});
    }
};

const getAuthorById = async (req, res) => {
    try{
        const { id } = req.params;
        const author = await Author.findByPk(id);
        if(!author) {
            return res.status(404).json({message: "Autor não foi encontrado"});
        }

        res.status(200).json({message: "Autor encontrado com sucesso", data: author});

    } catch(error) {
        res.status(500).json({message: "Erro ao encontrar o autor", error: error.message});
    }
};

const createAuthor = async (req, res) => {
    try{
        const {id, name, nationality, birthDate} = req.body
        const author = await Author.create({
            id,
            name,
            nationality,
            birthDate
        });

        res.status(201).json({message: "Autor(a) criado com sucesso", data: author});

    } catch(error){
        res.status(500).json({message: "Erro ao criar autor(a)", error: error.message});
    }
};

const updateAuthorById = async (req, res) => {
    try{
        const { id } = req.params;
        const {name, nationality, birthDate} = req.body;

        const author = await Author.findByPk(id);
        if(!author){
            return res.status(404).json({message: "Autor(a) não encontrado"});
        }

        author.name = name || author.name;
        author.nationality = nationality || author.nationality;
        author.birthDate = birthDate || author.birthDate;

        await author.save();

        res.status(200).json({message: "Autor(a) atualizado com sucesso", data: author});

    } catch(error){
        res.status(500).json({message: "Erro ao atualizar o autor(a)", error: error.message});
    }
};

const deleteAuthorById = async (req, res) => {
    try {
        const {id} = req.params;
        const author = await Author.findByPk(id);
        if(!author){
            return res.status(404).json({message: "Autor(a) não encontrado"});
        }

        await author.destroy();

        res.status(200).json({message: "Autor(a) deletado com sucesso"});

    }catch(error){
        res.status(500).json({message: "Erro ao deletar o autor(a)", error: error.message});
    }
};

export {getAllAuthor, getAuthorById, createAuthor, updateAuthorById, deleteAuthorById}
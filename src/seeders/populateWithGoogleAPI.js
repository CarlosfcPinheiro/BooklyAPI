import models from "../models/index.js";                                                                             
import authors from "../utils/defaultAuthors.js";

// Cria registros de autores, livros e generos utilizando a Google Books API
const populateWithGoogleAPI = async () => {
    for (const author of authors) {
        // criando autor no banco de dados
        const createdAuthor = await models.author.create(author);
        // parametros de busca para a requisição à Google Books API
        const langRestrict = 'pt';
        const maxResults = 5;
        const query = `inauthor:${author.name}`;

        const url = `https://www.googleapis.com/books/v1/volumes?
        q=${encodeURIComponent(query)}&
        langRestrict=${langRestrict}&
        maxResults=${maxResults}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.items) {
                for (const book of data.items) {
                    // Verificar e criar gênero se necessário
                    let genderId = null;  
                    if (book.volumeInfo.categories && book.volumeInfo.categories.length > 0) {
                        const categoryName = book.volumeInfo.categories[0];
                        
                        let [gender, created] = await models.gender.findOrCreateByName(categoryName, `descrição da categoria: ${categoryName}`);
                        
                        genderId = gender.id;
                    }

                    await models.book.create({
                        title: book.volumeInfo.title,
                        description: book.volumeInfo.description || "Descrição não disponível.",
                        year: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.substring(0, 4) : null,
                        AuthorId: createdAuthor.id,
                        GenderId: genderId,
                        imgUrl: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null
                    });
                }
            }
        } catch (error) {
            console.error(`Erro ao buscar livros de ${author.name} através da Google Books API:`, error);
        }
    }
}

export default populateWithGoogleAPI;
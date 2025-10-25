import express from "express";
//import routes from "./routes/index.js";
import "dotenv/config";
import cors from "cors";
import {sequelize} from "./models/index.js";

import router from "./routes/index.js";

import users from "./utils/defaultUsers.js";
import books from "./utils/defaultBooks.js";

const app = express();
const port = process.env.PORT ?? 3000;
// Aplicar middlewares globais
app.use(cors());
app.use(express.json());

// Aplicar middlewares de rotas
app.use("/reviews", router.review);


app.get("/", (req, res) =>{
    res.send("API biblioteca.");
});

const eraseDatabseOnSync = process.env.ERASE_DATABASE === 'true';
// inicia a API caso a conexão com o banco de dados for sucedida.
sequelize.sync({ force: eraseDatabseOnSync }).then(async() => {
    if (eraseDatabseOnSync){
        createDefaultUsers();
        console.log('Banco de dados reiniciado!');
    }

    app.listen(port, () => {
        console.log(`Servidor ouvindo na porta ${port}...`);
    });
});

const createDefaultUsers = async() => {
    users.forEach( async (userData) => {
        const user = await sequelize.models.user.create(userData);
    });
}

export default app;
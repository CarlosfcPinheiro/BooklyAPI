import express from "express";
import "dotenv/config";
import cors from "cors";

import {sequelize} from "./models/index.js";
import models from "./models/index.js";

import router from "./routes/index.js";
import authRouter from "./auth/index.js";

import populateDb from "./utils/db/populateDb.js";

const app = express();
const port = process.env.PORT ?? 3000;
// Aplicar middlewares globais
app.use(cors());
app.use(express.json());

// Aplicar contexto de models
app.use((req, res, next) => {
    req.context = {models};
    next();
});

// Aplicar middlewares de rotas
app.use("/reviews", router.review);
app.use("/authors", router.author);
app.use("/books", router.book);
app.use("/users", router.user); 
app.use("/genders", router.gender);
app.use("/auth", authRouter);

app.get("/", (req, res) =>{
    res.send("API biblioteca.");
});

const eraseDatabseOnSync = process.env.ERASE_DATABASE === 'true';
// inicia a API caso a conexão com o banco de dados for sucedida.
sequelize.sync({ force: eraseDatabseOnSync }).then(async() => {
    if (eraseDatabseOnSync){
        await populateDb();
        console.log('🧹 Banco de dados reiniciado!');
    }

    app.listen(port, () => {
        console.log(`🛜 Servidor ouvindo na porta ${port}...`);
    });
});

export default app;
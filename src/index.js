import express from "express";
//import routes from "./routes/index.js";
import "dotenv/config";
import cors from "cors";
import {sequelize} from "./models/index.js";

const app = express();
const port = process.env.PORT ?? 3000;


app.use(express.json());


app.get("/", (req, res) =>{
    res.send("API biblioteca.");
});

// inicia a API caso a conexão com o banco de dados for sucedida.
sequelize.sync().then( async() => {
    app.listen(port, () => {
        console.log(`Servidor ouvindo na porta ${port}...`);
    });

});

export default app;
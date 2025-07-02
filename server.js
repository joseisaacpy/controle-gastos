// Imports
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Constantes
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

// Middlewares
app.use(cors()); // Habilita o CORS
app.use(express.json()); // Habilita o JSON no corpo da requisição
app.use(express.static(path.join(__dirname, "public/client"))); // Habilita o uso de arquivos estáticos na pasta public

// Rotas
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Imports
import express from "express";
import db from "../database/db.js";

// Constantes
const router = express.Router();

// Rotas
// Create
router.post("/", (req, res) => {
  // Dados do corpo da requisição destruturados
  const { descricao, categoria, valor, data } = req.body;

  try {
    const insert = db.prepare(
      "INSERT INTO gastos (descricao, categoria, valor, data) VALUES (?, ?, ?, ?)"
    );

    const result = insert.run(descricao, categoria, valor, data);

    res.status(201).json({ msg: "Gasto criado com sucesso!", dados: req.body });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar gasto!" });
  }
});
// Read
router.get("/", (req, res) => {
  // Mostra todos os gastos
  const gastos = db.prepare("SELECT * FROM gastos").all();
  // Resposta da requisição
  res.status(200).send(gastos);
});
// Update

// Delete

// Exporta as rotas
export default router;

// Imports
import Database from "better-sqlite3";

// Constantes
const db = new Database("./database.db");

// Criação da tabela de gastos
db.exec(`
    CREATE TABLE IF NOT EXISTS gastos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    categoria TEXT NOT NULL,
    valor REAL NOT NULL,
    data TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`);

// Exporta o banco de dados
export default db;

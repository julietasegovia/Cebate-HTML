// server.js
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Configurar ruta de archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// --- Inicializar base de datos ---
const db = await open({
  filename: "./db/cebate.db",
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    precio REAL,
    imagen TEXT
  )
`);

// --- API: agregar producto ---
app.post("/api/productos", async (req, res) => {
  const { nombre, precio, imagen } = req.body;
  if (!nombre || !precio) return res.status(400).send("Faltan datos");
  await db.run("INSERT INTO productos (nombre, precio, imagen) VALUES (?, ?, ?)", [nombre, precio, imagen]);
  res.json({ message: "Producto guardado correctamente" });
});

// --- API: listar productos ---
app.get("/api/productos", async (req, res) => {
  const productos = await db.all("SELECT * FROM productos");
  res.json(productos);
});

// --- Iniciar servidor ---
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

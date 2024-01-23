// Importarea modulelor necesare
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

// Crearea unei aplicații Express
const app = express();

// Servirea fișierelor statice din directorul curent
app.use(express.static(path.join(__dirname)));

// Servirea fișierelor statice din directorul 'licenta'
app.use(express.static(path.join(__dirname, "licenta")));

// Analiza cererilor de tip JSON
app.use(bodyParser.json());

// URL-ul de conectare la MongoDB și numele bazei de date
const url = "mongodb://localhost:27017";
const dbName = "Licenta"; // Înlocuiți cu numele real al bazei de date

// Ruta de exemplu pentru gestionarea cererilor POST pentru autentificare
app.post("/login", async (req, res) => {
    // Extrageți numele de utilizator și parola din corpul cererii
    const { username, password } = req.body;

    try {
        // Conectarea la MongoDB
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db(dbName);

        // Exemplu: Verificați dacă utilizatorul există în colecția 'Users' din baza de date
        const user = await db
            .collection("users")
            .findOne({ username, password });

        // Trimiteți un răspuns JSON în funcție de faptul că utilizatorul a fost găsit sau nu
        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }

        // Închideți conexiunea la MongoDB
        client.close();
    } catch (error) {
        // Gestionarea erorilor în timpul procesului de autentificare
        console.error("Eroare în timpul autentificării:", error);
        res.status(500).json({
            success: false,
            error: "Eroare internă a serverului",
        });
    }
});

// Pornirea serverului pe portul 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serverul rulează la adresa http://localhost:${PORT}`);
});

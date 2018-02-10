const path = require("path");
const express = require("express");

const swaggerPath = path.resolve(__dirname, "..", "swagger");
const app = express();

process.env.NODE_ENV = "development";

app.use(express.static(swaggerPath));

app.get("/swagger", (req, res) => res.sendFile("index.html", {
    root: swaggerPath
}));

app.listen(8080);

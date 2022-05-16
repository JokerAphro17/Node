const express = require("express");
const morgan = require("morgan");
const res = require("express/lib/response");
const { success } = require("./helper");
const favicon = require("serve-favicon");
let pokemons = require("./pokemon.js");

const app = express();
const port = 3000;
app.use((req, res, next) => {
  console.log(`URL :  ${req.path}`);
  next();
});
app.use(favicon(__dirname + "/favicon.icon")).use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello again, Express !"));

// On retourne la liste des pokémons au format JSON, avec un message :
app.get("/api/pokemons", (req, res) => {
  const message = "La liste des pokémons a bien été récupérée.";
  res.json(success(message, pokemons));
});

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokémon a bien été trouvé.";
  res.json(success(message, pokemon));
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);

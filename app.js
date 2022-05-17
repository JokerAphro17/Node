const express = require("express");
const morgan = require("morgan");
const res = require("express/lib/response");
const { success, uniqueId, error } = require("./helper");
const { Sequelize } = require("sequelize");

const favicon = require("serve-favicon");
let pokemons = require("./pokemon.js");
const bodyParser = require("body-parser");
const sequelize = new Sequelize("pokedex", "Jokeru17", "Kakare45", {
  host: "localhost",
  dialect: "mysql",
  logging: false,

  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();
const port = 3000;
app.use((req, res, next) => {
  console.log(`URL :  ${req.path}`);
  next();
});

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello again, Express !"));

// On retourne la liste des pokémons au format JSON, avec un message :

//CRUD

//GET
app.get("/api/pokemons", (req, res) => {
  const message = "La liste des pokémons a bien été récupérée.";
  res.json(success(message, pokemons));
});

//POST
app.post("/api/pokemons", (req, res) => {
  const pokemonCreated = {
    ...req.body,
    ...{ id: uniqueId(pokemons), create: new Date() },
  };
  pokemons.push(pokemonCreated);

  const message = "Un pokémon a bien été créé.";
  res.json(success(message, pokemonCreated));
});

//PUT
app.put("/api/pokemons/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokemons.find((pokemon) => pokemon.id == id);
  if (pokemon) {
    pokemonUpdate = { id: id, ...req.body };
    res.json(success("Le pokémon a bien été modifié.", pokemonUpdate));
  } else {
    res.status(404).json(error("Le pokémon n'a pas été trouvé."));
  }
});

// delelete
app.delete("/api/pokemons/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokemons.find((pokemon) => pokemon.id == id);
  if (pokemon) {
    pokemons = pokemons.filter((pokemon) => pokemon.id != id);
    res.json(success("Le pokémon" + pokemon.name + "a bien été supprimé."));
  } else {
    res.status(404).json(error("Le pokémon n'a pas été trouvé."));
  }
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);

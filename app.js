const express = require("express");
const app = express();
const port = 3000;
const pokemons = require("./pokemon.js");
const helper = require("./helper.js");

app.get("/", (req, res) => res.send("Hello Aphro!"));

app.get("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = "un pokemon a été trouvé";
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  res.json(helper.success(pokemon, message));
});

app.get("/api/pokemon", (req, res) => {
  res.send(
    "il y a " + pokemons.length + " pokemons dans le pokedex pour le moment "
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

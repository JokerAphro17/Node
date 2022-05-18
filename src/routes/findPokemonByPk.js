const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      const message = "Un pokémon a bien été trouvé.";
      console.log(pokemon);
      pokemon
        ? res.json({ message, data: pokemon })
        : res.status(404).json({ message: "Aucun pokémon trouvé." });
    });
  });
};

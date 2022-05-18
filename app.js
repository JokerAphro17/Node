const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = process.env.PORT || 3000;

app.use(favicon(__dirname + "/favicon.ico")).use(bodyParser.json());

sequelize.initDb();
app.get("/", (req, res) => {
  res.json("Hello heroku");
});
// poitn de terminaison
require("./src/routes/findAllPokemon")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
// Error
app.use(({ res }) => res.status(404).json({ message: "Page non trouvé" }));

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);

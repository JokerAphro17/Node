module.exports = {
  success: function (message, data) {
    return {
      message: message,
      data: data,
    };
  },
  uniqueId: function (pokemons) {
    const pokemonsId = pokemons.map((pokemon) => pokemon.id);
    const maxId = pokemonsId.reduce((max, id) => (id > max ? id : max));
    return maxId + 1;
  },
};

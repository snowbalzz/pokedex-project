<script context="module">

  import {pokemonStore} from "../store"
  import {GET_POKEMON_BY_NATIONAL_NUMBER} from "../services/firebase"

  export const addPokemonToStore = (_pokemon) => {
    pokemonStore.set(_pokemon.national_number, _pokemon); 
  }

  export const fetchPokemon = (id) => {
    return new Promise(async (resolve, reject) => {
      await GET_POKEMON_BY_NATIONAL_NUMBER(id)
        .then((pokemon) => {
          let p = Object.values(pokemon)[0];
          addPokemonToStore(p);
          resolve(p);
        })
        .catch((err) => reject(err));
    });
  };
  // pokemonStore.subscribe((v) => console.log(v));
</script>

<script>
  import { goto } from "@roxi/routify";
  import { random  } from "lodash"
  import { getPokemonById } from "../services"
  import {addPokemonToStore} from "../components/Pokemon.svelte"
  import ListItem from '../components/ListItem.svelte'
  import Loading from '../components/Loading.svelte'
  import Autocomplete from '../components/Autocomplete.svelte'

  let list = [];
  let isLoading = false;

  //Checking if there are double in the JSON FILE
  let checkDoubles = 1;

  const getRandom = async () =>{
    list = new Array();
    isLoading = true;
    
    for (let i = 0; i < 8; i++) {
      let randomId = random(0, 856);
      const pokemon = await getPokemonById(randomId);
      list.push({id: randomId, ...pokemon})
      addPokemonToStore(pokemon);
    }
    isLoading = false;
  }

  const goToPokemon = (id) => {
    $goto(`/pokemon/${id}`);
  }

  /**
   * Function to display original 151 pokemons
   */
   const getOrignalPokemon = async () =>{
    list = new Array();
    isLoading = true;

    for (let i = 0; i < 184; i++) {
      await getPokemonById(i)
        .then((pokemon) => { 
          if (checkDoubles ===  pokemon.national_number) {
            return
          } else {
            checkDoubles = pokemon.national_number;
            list.push({id: i, ...pokemon})
            addPokemonToStore(pokemon);
          }
        })
        .catch((err) =>{
          console.log(err); 
        })
    }
    isLoading = false;
  }
  

  // getRandomPokemons();
  getOrignalPokemon();
</script>

<main >
  <div class = 'grid-cols-1 gap-3 px-6 mt-16 mb-32' >
    <div class="text-center mb-5 text-5xl font-bold">
      <h1>Poke Serach</h1>
    </div>
    <Autocomplete />
  </div>
  <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-3 px-6 mt-3">
    {#if isLoading}
      <Loading />
    {:else if !list.length}
      <p>We are poke-gone!</p>
    {:else}
      {#each list as pokemon}
        <ListItem {pokemon} on:click={goToPokemon(pokemon.national_number)}/>
      {/each}
    {/if}
  </div>
</main>

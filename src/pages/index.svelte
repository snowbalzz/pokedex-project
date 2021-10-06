<script>

  import { random  } from "lodash"
  import { getPokemonById } from "../services"
  import {addPokemonToStore} from "../components/Pokemon.svelte"
  import {Loading, ListItem} from '../components'

  let list = [];
  let isLoading = false;

  const getRandomPokemons = async () =>{
    list = new Array();
    isLoading = true;

    for (let i = 0; i < 10; i++) {
      let randomId = random(0, 806);
      await getPokemonById(randomId)
        .then((pokemon) => { 
          list.push({id: randomId, ...pokemon})
          addPokemonToStore(pokemon);
        })
        .catch((err) =>{
          console.log(err); 
        })
    }
    isLoading = false;
  }

  getRandomPokemons();
</script>

<main >
  <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-3 px-6">
    {#if isLoading}
      <Loading />
    {:else if !list.length}
      <p>No results!</p>
    {:else}
      {#each list as pokemon}
        <ListItem {pokemon} />
      {/each}
    {/if}
  </div>
</main>

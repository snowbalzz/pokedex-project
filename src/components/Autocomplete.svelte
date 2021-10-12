<script>
    import { goto } from "@roxi/routify";
    import { GET_POKEMON_BY_NAME } from "../services/firebase";
    import ListItem from '../components/ListItem.svelte'
    import Loading from '../components/Loading.svelte'

    let isLoading = false;
    let search = undefined;
    let result = [];

    const goToPokemon = function ({ national_number }) {
      $goto(`/pokemon/${national_number}`);
      search = undefined;
    };

    const searching = async () => {
    if (!search) return;
    isLoading = true;
    await GET_POKEMON_BY_NAME(search)
      .then((val) => {
        if (val !== null) {
          result = Object.values(val);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => (isLoading = false));
  };
  
  </script>
  
  <main class="relative">
    <input
      class=" border rounded-md outline-none px-2 py-1 bg-gray-100"
      bind:value={search}
      on:input={searching}
      placeholder="Search Pokemon ..."
    />
    {#if search}
      <div
        class="absolute flex flex-col items-center justify-center p-2 z-50 top-6 w-full border border-t-0 rounded-bl-md rounded-br-md bg-gray-100 shadow-md">
        {#if isLoading}
          <Loading />
        {:else if result.length === 0}
          <p>No results</p>
        {:else}
          {#each result as pokemon}
          <div on:click={goToPokemon(pokemon)}>
            <div class="cursor-pointer py-8 rounded-xl border bg-whiterounded-lg grid grid-flow-row grid-cols-3 row-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
              <div class="col-span-1 flex-grow justify-center items-center" on:click>
                <img src={pokemon.sprites.normal} alt={pokemon.name} class="m-auto" />
              </div>
              <div class="col-span-2" on:click>
                <p class="text-xs text-gray-500"># {pokemon.national_number}</p>
                <p class="text-lg font-bold my-1">{pokemon.name}</p>
              </div>
            </div>
          </div>
          {/each}
        {/if}
      </div>
    {/if}
  </main>
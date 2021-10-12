<script>
  import { user } from "../../components/Auth.svelte";
  import { userStore } from "../../store";
  import { setPokemonAsFavorite } from "../../services";
  import { params } from "@roxi/routify/runtime/helpers";
  import Button from "../../components/Button.svelte";
  import Loading from "../../components/Loading.svelte";
  import Label from "../../components/Lable.svelte";
  import { fetchPokemon } from "../../components/Pokemon.svelte";

  let pokemon;
  let _user;
  let favorites = [];

  let editeId = $params.id;

  editeId = editeId.replace(/^0+/, "");

  const apiURL = `https://pokeapi.co/api/v2/pokemon/${editeId}`;
  const evoChain = `https://pokeapi.co/api/v2/evolution-chain/${editeId}`;

  //pokemon stats
  let pokemonName;
  let pokemonHeight;
  $: abilitiesArray = [];

  function evolutionChain() {
    const fetchEvolution = async () => {
      await getChain();
    };

    const getChain = async () => {
      const res = await fetch(evoChain);
      const chain = await res.json();
      dispalyChain(chain);
    };

    function dispalyChain(chain) {
      console.log(chain);
    }

    fetchEvolution();
  }

  function getDataFromPokeApi() {
    const fetchPokemons = async () => {
      await getPokemon();
    };

    const getPokemon = async () => {
      const res = await fetch(apiURL);
      const pokemon = await res.json();
      insertPokemon(pokemon);
    };

    function insertPokemon(pokemon) {
      pokemonName = pokemon.name;
      pokemonHeight = pokemon.height;

      //logs ability
      pokemon.abilities.forEach((element) => {
        abilitiesArray.push(element.ability);
        abilitiesArray = abilitiesArray;
      });
    }

    fetchPokemons();
  }

  evolutionChain();
  getDataFromPokeApi();

  user.subscribe((v) => (_user = v));
  userStore.subscribe((s) => {
    favorites = s.favorites;
  });

  // const setNewFavorite = async () => {
  //   await setPokemonAsFavorite(pokemon.national_number, _user.id)
  //     .then((data) => {
  //       console.log(data);
  //       userStore.set("favorites", data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  if (!pokemon) {
    fetchPokemon($params.id)
      .then((p) => (pokemon = p))
      .catch((err) => console.log(err));
  }
</script>

<main>
  <div id="pokemonEl">Namej:{pokemonName}</div>
  <div id="pokemonEl">Height:{pokemonHeight}</div>

  {#each abilitiesArray as ability}
    <div>
      Ability:{ability.name}
    </div>
  {/each}
  <!-- <div class="cursor-pointer p-5 rounded-xl border bg-whiterounded-lg flex px-4 row-6 shadow-lg my-16 bg-white">
    <div class="my-2">
      {#if pokemon}
        {#if pokemon.sprites}
          <div class="flex items-center justify-center mb-8">
            <img src={pokemon.sprites.large} alt={pokemon.name} />
          </div>
        {/if}
        <div class="flex flex-col items-center justify-center">
          <h1 class="text-4xl font-medium mb-2">{pokemon.name}</h1>
          <p class="text-gray-500"># {pokemon.national_number}</p>
          {#if pokemon && pokemon.type}
            <div class="flex my-2">
              {#each pokemon.type as type}
                <Label {type} />
              {/each}
            </div>
          {/if}
          {#if favorites && favorites.includes(pokemon.national_number)}
          <Button title="Remove" red on:click={setNewFavorite}/>
          {:else}
          <Button title="Favorite" red on:click={setNewFavorite}/>
          {/if}
        </div>
      {:else}
        <Loading />
      {/if}
    </div>
  </div> -->
</main>

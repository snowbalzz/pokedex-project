<script>
  import { user } from '../components/Auth.svelte';
  import { userStore } from '../store';
  import Lable from './Lable.svelte'
  import Favorite from './Favorite.svelte'
  import Button from './Button.svelte'
  import Loading from './Loading.svelte'
  import {setPokemonAsFavorite} from '../services'
  
  export let pokemon;
  let isLoading = false;
  let _user;
  let favorites = [];

  user.subscribe((v) => (_user=v));
  userStore.subscribe((s) => favorites = s.favorites);

  // userStore.subscribe((v) => {console.log(v.favorites)});

  const setNewFavorite = async () => {
    await setPokemonAsFavorite(pokemon.national_number, _user.id)
      .then((data) => {
        console.log(data);
        userStore.set("favorites", data);
      })
      .catch((err) => console.log(err));
  };

</script>

<div class="cursor-pointer p-5 rounded-xl border bg-whiterounded-lg grid grid-flow-row grid-cols-3 px-4 row-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
  <div class="col-span-1 flex-grow justify-center items-center" on:click>
    <img src={pokemon.sprites.normal} alt={pokemon.name} class="m-auto" />
  </div>
  <div class="col-span-1" on:click>
    <p class="text-xs text-gray-500"># {pokemon.national_number}</p>
    <p class="text-lg font-bold my-1">{pokemon.name}</p>
    <div class="list-item-type flex">
      {#each pokemon.type as type}
        <Lable {type} />
      {/each}
    </div>
  </div>
  <div class="col-span-1 flex items-start justify-end">
    <!-- <Favorite /> --> 
    <!-- {#if isLoading}
    <Loading />
    {:else if favorites && favorites.includes(pokemon.national_number)}
      <Button title="Remove" red on:click={setNewFavorite}/>
      {:else}
      <Button title="Favorite" red on:click={setNewFavorite}/>
    {/if} -->
  </div>
</div>
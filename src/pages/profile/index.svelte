

<script>
  import { user } from '../../components/Auth.svelte';
  import { userStore } from "../../store";
  import {setPokemonAsFavorite} from '../../services' 
  
  let pokemon;
  let _user;
  let favorites = [];

  user.subscribe((v) => (_user=v));
  userStore.subscribe((s) => {
    favorites = s.favorites;
});

console.log(favorites);

  

  const setNewFavorite = async () => {
    await setPokemonAsFavorite(pokemon.national_number, _user.id)
      .then((data) => {
        console.log(data);
        userStore.set("favorites", data);
      })
      .catch((err) => console.log(err));
  };


</script>

<main>
    
</main>
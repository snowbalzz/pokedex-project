<script>

  import { random  } from "lodash"
  import { getPokemonById } from "../services"

  let list = [];
  let isLoading = false;

  const getRandomPokemons = async () =>{
    list = new Array();
    isLoading = true;

    for (let i = 0; i < 5; i++) {
      let randomId = random(0, 806);
      await getPokemonById(randomId)
        .then((pokemon) => {
          console.log(pokemon)
          list.push({id: randomId, ...pokemon})
        })
        .catch((err) =>{
          console.log(err); 
        })
    }

  }

  getRandomPokemons();
</script>

<main>

  <p>index</p>

</main>

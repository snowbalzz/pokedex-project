<script>

</script>

<main>
  <div class="cursor-pointer p-5 rounded-xl border bg-whiterounded-lg flex px-4 row-6 shadow-lg my-16 bg-white">
    <div class="my-2">
      {#if pokemon}
        {#if pokemon.sprites}
          <div class="flex items-center justify-center mb-8">
            <img src={pokemon.sprites.large} alt={pokemon.name} />
          </div>
        {/if}
        <div class="flex flex-col items-center justify-center">
          <h1 class="text-4xl font-medium mb-2">{pokemon.name}</h1>
          <p class="text-gray-500">Number {pokemon.national_number}</p>
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
  </div>
</main>